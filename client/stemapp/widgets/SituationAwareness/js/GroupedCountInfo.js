///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/Evented',
  'dojo/_base/array',
  'dojo/DeferredList',
  'dojo/Deferred',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/keys',
  'jimu/utils',
  'jimu/dijit/Message',
  'esri/graphic',
  'esri/layers/FeatureLayer',
  'esri/tasks/query',
  './analysisUtils'
], function (
  declare,
  Evented,
  array,
  DeferredList,
  Deferred,
  lang,
  domClass,
  domConstruct,
  on,
  keys,
  utils,
  Message,
  Graphic,
  FeatureLayer,
  Query,
  analysisUtils
) {

  var summaryInfo = declare('GroupedCountInfo', [Evented], {

    summaryLayer: null,
    summaryFields: [],
    summaryIds: [],
    summaryFeatures: [],
    tabNum: null,

    popupFields: [],

    groupedResults: {},
    specialFields: null,
    dateFields: {},

    symbolField: null,
    graphicsLayer: null,
    lyrRenderer: null,
    lyrSymbol: null,
    featureCount: 0,
    incidentCount: 0,
    displayCount: false,
    allFields: false,
    configuredPopUpFields: [],

    constructor: function (tab, container, parent) {
      this.tab = tab;
      this.container = container;
      this.parent = parent;
      this.config = parent.config;
      this.graphicsLayer = null;
      this.specialFields = {};
      this.typeIdField = "";
      this.types = [];
      this.dateFields = {};
      this.baseLabel = tab.label !== "" ? tab.label : tab.layerTitle ? tab.layerTitle : tab.layers;
      this.parentNode = parent.domNode;
    },

    queryTabCount: function (incidents, buffers, updateNode, displayCount) {
      var def = new Deferred();
      this.displayCount = displayCount;
      this.incidentCount = incidents.length;
      var tabLayers = [this.tab.tabLayers[0]];
      if (this.mapServiceLayer && this.tab.tabLayers.length > 1) {
        tabLayers = [this.tab.tabLayers[1]];
      }
      if (this.tab.tabLayers.length > 0) {
        if (this.tab.tabLayers[0].url) {
          if (this.tab.tabLayers[0].url.indexOf("MapServer") > -1) {
            this.mapServiceLayer = true;
            var tempFL;
            if (typeof (this.tab.tabLayers[0].infoTemplate) !== 'undefined') {
              this.summaryLayer = this.tab.tabLayers[0];
              if (this.summaryLayer.hasOwnProperty('loaded') && this.summaryLayer.loaded) {
                this.summaryFields = this._getFields(this.summaryLayer);
                this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
                  def.resolve(r);
                });
              } else {
                tempFL = new FeatureLayer(this.summaryLayer.url);
                tempFL.infoTemplate = this.tab.tabLayers[0].infoTemplate;
                tabLayers = [tempFL];
                this.tab.tabLayers = tabLayers;
                on(tempFL, "load", lang.hitch(this, function () {
                  this.summaryLayer = tempFL;
                  this.summaryFields = this._getFields(this.summaryLayer);
                  this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
                    def.resolve(r);
                  });
                }));
              }
            } else {
              if (!this.loading) {
                tempFL = new FeatureLayer(this.tab.tabLayers[0].url);
                this.loading = true;
                on(tempFL, "load", lang.hitch(this, function () {
                  this.summaryLayer = tempFL;
                  this.summaryFields = this._getFields(this.summaryLayer);
                  var lID = this.tab.tabLayers[0].url.split("MapServer/")[1];
                  var mapLayers = this.parent.map.itemInfo.itemData.operationalLayers;
                  for (var i = 0; i < mapLayers.length; i++) {
                    var lyr = mapLayers[i];
                    if (this.tab.tabLayers[0].url.indexOf(lyr.url) > -1) {
                      if (typeof (lyr.layerObject) !== 'undefined') {
                        if (lyr.layerObject.infoTemplates) {
                          var infoTemplate = lyr.layerObject.infoTemplates[lID];
                          if (infoTemplate) {
                            tempFL.infoTemplate = infoTemplate.infoTemplate;
                            break;
                          }
                        } else if (lyr.layerObject.infoTemplate) {
                          tempFL.infoTemplate = lyr.layerObject.infoTemplate;
                          break;
                        }
                      }
                    }
                  }
                  tabLayers = [tempFL];
                  this.tab.tabLayers = tabLayers;
                  this.loading = false;
                  this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
                    def.resolve(r);
                  });
                }));
              }
            }
          }
        }
      }
      if (!this.mapServiceLayer) {
        this._performQuery(incidents, buffers, updateNode, displayCount, tabLayers).then(function (r) {
          def.resolve(r);
        });
      }
      return def;
    },

    _performQuery: function (incidents, buffers, updateNode, displayCount, tabLayers) {
      var def = new Deferred();
      var defArray = [];
      var geom;
      var prevArray;
      var da;
      var geoms;
      if (buffers.length > 0) {
        geoms = analysisUtils.getGeoms(buffers);
      } else if (incidents.length > 0) {
        geoms = analysisUtils.getGeoms(incidents);
      }
      this.summaryGeoms = geoms;
      if (geoms.length > 0) {
        for (var ii = 0; ii < geoms.length; ii++) {
          geom = geoms[ii];
          da = analysisUtils.createDefArray(tabLayers, geom, this.parent.opLayers, this.tab);
          if (ii === 0) {
            defArray = da;
            prevArray = da;
          } else {
            defArray = prevArray.concat(da);
            prevArray = defArray;
          }
        }
      }
      var defList = new DeferredList(defArray);
      defList.then(lang.hitch(this, function (defResults) {
        var length = 0;
        for (var r = 0; r < defResults.length; r++) {
          var featureSet = defResults[r][1];
          if (!isNaN(featureSet)) {
            length += featureSet;
          } else if (featureSet && featureSet.features) {
            length += featureSet.features.length;
          } else if (featureSet && typeof (featureSet.length) !== 'undefined') {
            length += featureSet.length;
          }
        }
        this.updateTabCount(length, updateNode, displayCount);
        if (this.queryOnLoad) {
          lang.hitch(this, this._queryFeatures(this.summaryGeoms));
        }
        def.resolve(length);
      }));
      return def;
    },

    updateTabCount: function (count, updateNode, displayCount) {
      this.displayCount = displayCount;
      this.featureCount = count;
      analysisUtils.updateTabCount(this.featureCount, updateNode, displayCount, this.baseLabel, this.incidentCount);
    },

    /* jshint unused: true */
    // update for incident
    updateForIncident: function (incidents, buffers, graphicsLayer, num, snapShot, createSnapShot, downloadAll) {
      this.incidentCount = incidents.length;
      if (typeof (createSnapShot) !== 'undefined' && typeof (downloadAll) !== 'undefined') {
        if (!createSnapShot) {
          this.allFields = downloadAll;
        } else {
          this.allFields = true;
        }
      } else {
        this.allFields = false;
      }
      var isSnapShot = typeof (snapShot) !== 'undefined';
      var def;
      this.tabNum = num;
      if (!isSnapShot) {
        this.container.innerHTML = "";
        domClass.add(this.container, "loading");
      } else {
        def = new Deferred();
      }
      this.summaryIds = [];
      this.summaryFeatures = [];
      this.groupedResults = {};
      if (this.tab.tabLayers.length > 0) {
        var geoms = [];
        if (buffers.length > 0) {
          geoms = buffers;
        } else {
          for (var i = 0; i < incidents.length; i++) {
            var geom = incidents[i].geometry ? incidents[i].geometry : incidents[i];
            if (geom.type === 'polygon') {
              geoms.push(geom);
            }
          }
        }
        var tempFL;
        if (typeof (this.tab.tabLayers[0].infoTemplate) !== 'undefined') {
          this.summaryLayer = this.tab.tabLayers[0];
          tempFL = new FeatureLayer(this.summaryLayer.url);
          tempFL.infoTemplate = this.tab.tabLayers[0].infoTemplate;
          this.tab.tabLayers[1] = tempFL;
          this.summaryFields = this._getFields(this.tab.tabLayers[0]);
          this.configuredPopUpFields = analysisUtils.getPopupConfiguredFields(this.tab.tabLayers[0]);
          if (isSnapShot) {
            this._queryFeatures(geoms, isSnapShot).then(function (results) {
              def.resolve(results);
            });
          } else {
            this._initGraphicsLayer(graphicsLayer);
            lang.hitch(this, this._queryFeatures(geoms));
          }
        } else {
          tempFL = new FeatureLayer(this.tab.tabLayers[0].url);
          on(tempFL, "load", lang.hitch(this, function () {
            this.summaryLayer = tempFL;
            if (this.tab.tabLayers[0].url.indexOf("MapServer") > -1) {
              var lID = this.tab.tabLayers[0].url.split("MapServer/")[1];
              var mapLayers = this.parent.map.itemInfo.itemData.operationalLayers;
              for (var i = 0; i < mapLayers.length; i++) {
                var lyr = mapLayers[i];
                if (this.tab.tabLayers[0].url.indexOf(lyr.url) > -1) {
                  if (typeof (lyr.layerObject) !== 'undefined') {
                    if (lyr.layerObject.infoTemplates) {
                      var infoTemplate = lyr.layerObject.infoTemplates[lID];
                      if (infoTemplate) {
                        tempFL.infoTemplate = infoTemplate.infoTemplate;
                        break;
                      }
                    }
                  }
                }
              }
            }
            this.tab.tabLayers[1] = tempFL;
            this.summaryLayer = this.tab.tabLayers[1];
            this.summaryFields = this._getFields(this.tab.tabLayers[1]);
            this.configuredPopUpFields = analysisUtils.getPopupConfiguredFields(this.tab.tabLayers[1]);
            if (isSnapShot) {
              this._queryFeatures(geoms, isSnapShot).then(function (results) {
                def.resolve(results);
              });
            } else {
              this._initGraphicsLayer(graphicsLayer);
              lang.hitch(this, this._queryFeatures(geoms));
            }
          }));
        }
        if (isSnapShot) {
          return def;
        }
      }
    },

    _initGraphicsLayer: function (gl) {
      if (gl !== null) {
        this.graphicsLayer = gl;
        this.graphicsLayer.clear();
        if (this.summaryLayer) {
          if (this.summaryLayer.renderer) {
            this.lyrRenderer = this.summaryLayer.renderer;

            //does not seem to work with an expression
            //only way I have been able to make it work is like this.
            // example expression this is based on "[WIND_DIRECT] + 90"
            // this.lyrRenderer.setRotationInfo({
            //    field: function(graphic){
            //     return graphic.attributes.WIND_DIRECT + 90;
            //    },
            //    type: "geographic"
            // });

            this.graphicsLayer.renderer = this.lyrRenderer;
            if (typeof (this.summaryLayer.renderer.attributeField) !== 'undefined') {
              this.symbolField = this.summaryLayer.renderer.attributeField;
            } else {
              this.lyrSymbol = this.lyrRenderer.symbol;
            }
          }
        }
      }
    },

    _queryFeatures: function (geoms, snapShot) {
      var def;
      if (snapShot) {
        def = new Deferred();
      }
      var defArray = [];
      var id = [null, undefined, ""].indexOf(this.tab.tabLayers[0].id) === -1 ?
        this.tab.tabLayers[0].id : this.tab.layers;
      var expr = analysisUtils.getFilter(id, this.parent.opLayers);
      var query = new Query();
      for (var i = 0; i < geoms.length; i++) {
        var geom = geoms[i];
        query.geometry = geom;
        query.where = expr;
        defArray.push(this.summaryLayer.queryIds(query));
      }

      var defList = new DeferredList(defArray);
      defList.then(lang.hitch(this, function (defResults) {
        var objectIds;
        var prevObjectIds;
        for (var r = 0; r < defResults.length; r++) {
          if (defResults[r][0]) {
            var oids = defResults[r][1];
            if (r === 0) {
              objectIds = oids;
            } else {
              objectIds = prevObjectIds.concat(oids);
            }
            prevObjectIds = objectIds;
          }
        }
        if (objectIds) {
          this.summaryIds = objectIds;
          if (this.summaryIds.length > 0) {
            if (snapShot) {
              this._queryFeaturesByIds(snapShot).then(function (results) {
                def.resolve(results);
              });
            } else {
              this._queryFeaturesByIds();
            }
          } else {
            if (!snapShot) {
              this._processResults();
            }
          }
        } else {
          //TODO this block does not seem like it would be called anymore
          // now that we don't allow you to click a tab with no features
          if (!snapShot) {
            this._processResults();
          }
        }
      }), lang.hitch(this, function (err) {
        console.error(err);
        new Message({
          message: err
        });
      }));
      if (snapShot) {
        return def;
      }
    },

    _queryFeaturesByIds: function (snapShot) {
      var def;
      var defArray = [];
      if (snapShot) {
        def = new Deferred();
      }
      var max = this.summaryLayer.maxRecordCount || 1000;
      var ids = this.summaryIds.slice(0, max);
      this.summaryIds.splice(0, max);
      var query = new Query();
      var id = [null, undefined, ""].indexOf(this.summaryLayer.id) === -1 ? this.summaryLayer.id : this.tab.layers;
      query.where = analysisUtils.getFilter(id, this.parent.opLayers);
      var includeGeom = false;
      array.some(this.summaryFields, lang.hitch(this, function (obj) {
        if (obj.type === "area" || obj.type === "length" || this.graphicsLayer) {
          includeGeom = true;
          return true;
        }
      }));
      //TODO should be avoided for CSV
      if (snapShot) {
        includeGeom = true;
      }
      if (this.summaryLayer.supportsAdvancedQueries) {
        query.orderByFields = [this.summaryFields[0].field];
      }
      query.returnGeometry = includeGeom;
      query.outSpatialReference = this.parent.map.spatialReference;
      //always query all fields for issue #12982
      query.outFields = ['*'];
      query.objectIds = ids;
      defArray.push(this.summaryLayer.queryFeatures(query));
      while (this.summaryIds.length > 0) {
        ids = this.summaryIds.slice(0, max);
        this.summaryIds.splice(0, max);
        query.objectIds = ids;
        defArray.push(this.summaryLayer.queryFeatures(query));
      }

      var defList = new DeferredList(defArray);
      defList.then(lang.hitch(this, function (defResults) {
        this.summaryFeatures = [];
        for (var r = 0; r < defResults.length; r++) {
          if (defResults[r][0]) {
            var featureSet = defResults[r][1];
            if (featureSet.features) {
              this.summaryFeatures = this.summaryFeatures.concat(featureSet.features);
            }
          }
        }
        if (snapShot) {
          this._processResults(snapShot).then(lang.hitch(this, function (results) {
            if (this.SA_SAT_download) {
              domClass.replace(this.SA_SAT_download, "download", "processing");
            }
            def.resolve(results);
          }));
        } else {
          this._processResults();
          if (this.SA_SAT_download) {
            domClass.replace(this.SA_SAT_download, "download", "processing");
          }
        }

        if (this.SA_SAT_download) {
          domClass.replace(this.SA_SAT_download, "download", "processing");
        }
      }), lang.hitch(this, function (err) {
        console.error(err);
        new Message({
          message: err
        });
      }));
      if (snapShot) {
        return def;
      }
    },

    _prepGroupedResults: function () {
      for (var i = 0; i < this.summaryFeatures.length; i++) {
        var feat = this.summaryFeatures[i];
        if (typeof (this.summaryFields) !== 'undefined' && this.summaryFields.length > 0) {
          var lyr = this.layerObject && this.layerObject.renderer ? this.layerObject : this.layerDefinition;
          var v = feat.attributes[this.summaryFields[0].field];
          var fVal = analysisUtils.getFieldValue(this.summaryFields[0].field, v, this.specialFields, this.dateFields,
            'longMonthDayYear', this.typeIdField, this.types, lyr, feat.attributes);
          var val;
          if (typeof (fVal) !== 'undefined' && fVal !== null) {
            val = utils.stripHTML(fVal.toString());
          } else {
            val = "";
          }
          if (!(val in this.groupedResults)) {
            this.groupedResults[val] = { features: [feat] };
          } else {
            this.groupedResults[val].features.push(feat);
          }
        }
      }
    },

    // prep results
    _prepResults: function () {
      for (var key in this.groupedResults) {
        var groupedResult = this.groupedResults[key];
        var obj = this.summaryFields[0];
        obj.total = groupedResult.features.length;
        this.groupedResults[key].total = obj.total;
        this.groupedResults[key].type = obj.type;
        this.groupedResults[key].label = obj.alias;
      }
    },

    // process results
    //Solutions: added a string search looking for area or length to not round up.
    _processResults: function (snapShot) {
      this._prepGroupedResults();
      this._prepResults();
      var results = this.groupedResults;
      var total = 0;
      var tpc;
      var def;
      if (snapShot) {
        def = new Deferred();
      } else {
        this.container.innerHTML = "";
        domClass.remove(this.container, "loading");
        if (Object.keys(this.groupedResults).length === 0) {
          this.container.innerHTML = this.parent.nls.noFeaturesFound;
          return;
        }
        tpc = domConstruct.create("div", {}, this.container);
        domClass.add(tpc, "SAT_tabPanelContent");

        var div_results_extra = domConstruct.create("div", {}, tpc);
        domClass.add(div_results_extra, "SATcolExport");
        domClass.add(div_results_extra, this.parent.lightTheme ? 'lightThemeBorder' : 'darkThemeBorder');

        var div_exp = domConstruct.create("div", {
          'data-dojo-attach-point': 'SA_SAT_download',
          title: this.parent.nls.downloadCSV,
          "tabindex":"0",
          "role": "button",
          "aria-label": this.parent.nls.downloadCSVdownloadCSV,
          "class":"grpSummaryDownLoadCSVButton"
        }, div_results_extra);
        var exportClass = this.parent.isBlackTheme ? 'btnExportBlack' : 'btnExport';
        domClass.add(div_exp, [exportClass, 'download']);
        domClass.add(div_exp, this.parent.lightTheme ? 'lightThemeBackground' : 'darkThemeBackground');
        div_exp.focus();
        utils.initFirstFocusNode(this.parentNode, div_exp);
        utils.initLastFocusNode(this.parentNode, div_exp);
        on(div_exp, "click", lang.hitch(this, this._exportToCSV, results));
        on(div_exp, "keydown", lang.hitch(this, function (evt) {
          if (evt.shiftKey && evt.keyCode === keys.TAB) {
            return;
          }
          if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
            this._exportToCSV(results, evt);
            setTimeout(function () {
              div_exp.focus();
            }, 500);
          }
        }));
      }

      var i = 0;
      var sortedResults = Object.keys(results).sort();
      var snapShotResults = [];
      if (this.displayCount) {
        snapShotResults.push({
          total: this.featureCount,
          a: undefined,
          info: this.parent.nls.count,
          c: undefined
        });
      }
      for (var k in sortedResults) {
        var v = sortedResults[k];
        var f = results[v];
        var info = utils.stripHTML(v.toString());
        total = f.total;
        if (isNaN(total)) {
          total = 0;
        }
        var num = utils.localizeNumber(total);
        var a = f.type === 'pre' ? f.label.trim() : info;
        var b = f.type === 'pre' ? info : f.label.trim();
        var c = f.label !== "" ? 'colGroupedSummary' : 'colSummary';
        if (!snapShot) {
          //TODO see what else we need to keep track of in terms of the label
          var div = domConstruct.create("div", { 'class': 'SATcol' }, tpc);
          domClass.add(div, this.parent.lightTheme ? 'lightThemeBorder' : 'darkThemeBorder');
          var topDiv = domConstruct.create("div", {
            style: 'max-height: 45px;'
          }, div);
          domConstruct.create("div", {
            'class': 'SATcolWrap',
            style: 'max-height: 30px; overflow: hidden;',
            innerHTML: a
          }, topDiv);
          domConstruct.create("div", {
            'class': 'SATcolWrap',
            style: 'max-height: 30px; overflow: hidden;',
            innerHTML: b
          }, topDiv);
          domConstruct.create("div", {
            'class': c,
            innerHTML: num
          }, div);
        } else {
          snapShotResults.push({
            total: num,
            a: a,
            info: b === "" ? a : b,
            c: c
          });
        }
        i += 1;
      }
      var snapShotGraphics = [];
      var gl = this.graphicsLayer !== null;
      if (!snapShot && gl) {
        this.graphicsLayer.clear();
        if (this.tab.tabLayers[1]) {
          this.tab.tabLayers[1].clear();
        }
      }
      if (this.summaryFeatures) {
        for (var ii = 0; ii < this.summaryFeatures.length; ii++) {
          var gra = this.summaryFeatures[ii];
          if (this.lyrSymbol) {
            gra.symbol = this.lyrSymbol;
          }
          else if(this.graphicsLayer) {
            if (this.graphicsLayer.renderer) {
              var sym = this.graphicsLayer.renderer.getSymbol(gra);
              gra.symbol = sym;
            }
          } else if (this.summaryLayer.renderer && this.summaryLayer.renderer.getSymbol) {
            gra.symbol = this.summaryLayer.renderer.getSymbol(gra);
          }
          var g = gra.toJson ? new Graphic(gra.toJson()) : gra;
          if (!snapShot && gl) {
            this.graphicsLayer.add(g);
            this.tab.tabLayers[1].add(g);
          } else {
            snapShotGraphics.push(g);
          }
        }
      }
      if (!snapShot && gl) {
        this.graphicsLayer.setVisibility(true);
        //this.graphicsLayer.visible = true;
        this.parent._toggleTabLayersNew(this.tabNum);

        if (this.tab.retsore) {
          this.emit("summary-complete", {
            bubbles: true,
            cancelable: true,
            tab: this.tabNum
          });
        }
      }
      if (snapShot) {
        def.resolve({
          graphics: snapShotGraphics,
          analysisResults: snapShotResults,
          context: this
        });
        return def;
      }
    },

    _exportToCSV: function (results, snapShot, downloadAll, analysisResults) {
      var csvAllFields;
      //csvAllFields param value depends on old or new key
      if (this.parent.config.hasOwnProperty("exportFieldsOptionForCSV")) {
        //new key
        csvAllFields = this.parent.config.exportFieldsOptionForCSV;
      } else if (this.parent.config.hasOwnProperty("csvAllFields")) {
        //old key
        csvAllFields = this.parent.config.csvAllFields;
      }
      var pi = {
        type: 'grouped',
        baseLabel: this.baseLabel,
        csvAllFields: csvAllFields,
        layer: this.summaryLayer,
        opLayers: this.parent.opLayers,
        nlsValue: this.parent.nls.groupedSummary,
        nlsCount: this.parent.nls.count,
        summaryFields: this.summaryFields,
        allFields: this.allFields, // to identify create snapshot is clicked or not
        configuredPopUpFields: this.configuredPopUpFields
      };
      var res = analysisUtils.exportToCSV(this.summaryFeatures, snapShot, downloadAll, analysisResults, pi);
      this.summaryLayer = res.summaryLayer;
      return res.details;
    },

    //TODO will take some effort to consolidate this with the analysisUtils
    // will get it working here first then move on to the analysisUtils
    /*jshint loopfunc: true */
    _getFields: function (layer) {
      this.layerDefinition = utils.getFeatureLayerDefinition(layer);
      this.layerObject = layer;
      var skipFields = analysisUtils.getSkipFields(layer);
      var expField;
      var fields = [];
      if (typeof (this.tab.advStat) !== 'undefined') {
        var stats = this.tab.advStat.stats;
        for (var key in stats) {
          var txt = "";
          if (stats[key].length > 0) {
            array.forEach(stats[key], function (pStat) {
              var obj = {
                field: pStat.expression,
                alias: pStat.label + txt,
                type: key,
                total: 0
              };
              expField = pStat.expression;
              fields.push(obj);
            });
          }
        }
      }

      // special fields: dates and domains
      var spFields = analysisUtils.getSpecialFields(layer);
      this.dateFields = spFields.dateFields;
      this.specialFields = spFields.specialFields;
      this.typeIdField = spFields.typeIdField;
      this.types = spFields.types;

      if (this.allFields) {
        for (var j = 0; j < layer.fields.length; j++) {
          var fld = layer.fields[j];
          if (skipFields.indexOf(fld.name) === -1 && expField !== fld.name) {
            fields.push({
              field: fld.name,
              alias: fld.alias,
              type: fld.type
            });
          }
        }
      }
      return fields;
    }
  });

  return summaryInfo;
});