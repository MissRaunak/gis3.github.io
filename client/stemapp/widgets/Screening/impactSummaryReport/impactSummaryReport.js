///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/text!./impactSummaryReport.html',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/Evented',
  'jimu/BaseWidget',
  'dojo/on',
  'dojo/dom-class',
  'dojo/dom-attr',
  'esri/geometry/geometryEngine',
  'esri/geometry/Polyline',
  'esri/SpatialReference',
  'esri/graphic',
  'dojo/dom-construct',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'dojo/Deferred',
  '../geometryUtils',
  '../conversionUtils',
  '../highlightSymbolUtils',
  '../fieldSelectorPopup/fieldSelectorPopup',
  'esri/lang',
  'jimu/utils',
  'dojo/query',
  'dojo/number',
  'dojo/string',
  'dojo/promise/all',
  'dojo/keys',
  'dijit/focus',
  "dojo/_base/event",
  "esri/arcadeProfiles/fieldCalculateProfile",
  'esri/arcade/arcade',
  'esri/arcade/Feature',
  'esri/support/expressionUtils',
  'esri/arcadeProfiles/utils'
], function (
  declare,
  template,
  _WidgetsInTemplateMixin,
  lang,
  array,
  Evented,
  BaseWidget,
  on,
  domClass,
  domAttr,
  GeometryEngine,
  Polyline,
  SpatialReference,
  Graphic,
  domConstruct,
  Query,
  QueryTask,
  Deferred,
  geometryUtils,
  conversionUtils,
  highlightSymbolUtils,
  fieldSelectorPopup,
  esriLang,
  jimuUtils,
  query,
  dojoNumber,
  string,
  all,
  keys,
  focusUtil,
  Event,
  fieldCalculateProfile,
  Arcade,
  ArcadeFeature,
  expressionUtils,
  utils
) {
  return declare([BaseWidget, _WidgetsInTemplateMixin, Evented], {
    // Set base class for custom impactSummaryReport widget
    baseClass: 'jimu-widget-screening-impactSummaryReport',
    templateString: template,
    _feetUnitData: [], // to store standard feet of intersected feature
    _squareFeetUnitData: [], // to store standard sq. feet of intersected feature
    _milesUnitData: [], // to store miles of intersected feature
    _acresUnitData: [], // to store acres of intersected feature
    _metersUnitData: [], // to store meter of intersected feature
    _squareMetersUnitData: [], // to store square-meter of intersected feature
    _kilometersUnitData: [], // to store kilometers of intersected feature
    _squareKilometersUnitData: [], // to store square-kilometer of intersected feature
    _squareMilesUnitData: [],  // to store square-miles of intersected feature
    _hectaresUnitData: [], // to store hectares of intersected feature
    _printCompleteData: {}, // to store complete data needed for print dijit
    _printData: {}, // to store filtered data needed for print dijit
    _feetUnitInfo: [], // to store area of features in feet unit
    _squareFeetUnitInfo: [], // to store area of features in square-feet unit
    _countUnitInfo: [], // to store count unit info
    _milesUnitInfo: [], // to store area of features in mile unit
    _acresUnitInfo: [], // to store area of features in acre unit
    _metersUnitInfo: [], // to store area of features in meters unit
    _squareMetersUnitInfo: [], // to store area of features in square-meter unit
    _kilometersUnitInfo: [], // to store area of features in kilometer unit
    _squareKilometersUnitInfo: [], // to store area of features in square-kilometer unit
    _hectaresUnitInfo: [], // to store area of features in hectares unit
    _squareMilesUnitInfo: [], // to store area of features in square-miles unit
    _intersectFeatureCount: 0, //to store the count of features intersected to AOI
    isExceedingMaxRecordCount: false, //flag to set if intersecting features exceeds maxRecordCount
    // to store array of ids intersecting to tolerance graphics
    intersectingFeatureIdsToTolerance: [],
    intersectingFeatureIds: [], // to store array of ids intersecting to tolerance graphics
    _lengthAnalysisUnitsArray: [], //to get reports in defined units
    _areaAnalysisUnitsArray: [], // to get the reports in defined area units
    _aggregatedFeatureGeometries: [], //to store all geometries which will be used for highlighting
    _featureIntersectResultArr: [], //to store all features
    _layerDefinition: null, //to store the layers definition to support dijit function to handle subtypes and domains
    _isFieldsSelectorClick: false, // to track whether fields selector icon is clicked or not
    _selectedFields: [], // to store the latest selected fields by user
    sortFieldIndex: null,
    isTimeoutOccurred: false,
    sortFieldType: null,

    constructor: function (options) {
      this._feetUnitData = [];
      this._squareFeetUnitData = [];
      this._milesUnitData = [];
      this._acresUnitData = [];
      this._metersUnitData = [];
      this._squareMetersUnitData = [];
      this._kilometersUnitData = [];
      this._squareKilometersUnitData = [];
      this._squareMilesUnitData = [];
      this._hectaresUnitData = [];
      this._printCompleteData = {};
      this._printData = {};
      this._feetUnitInfo = [];
      this._squareFeetUnitInfo = [];
      this._countUnitInfo = [];
      this._milesUnitInfo = [];
      this._acresUnitInfo = [];
      this._metersUnitInfo = [];
      this._squareMetersUnitInfo = [];
      this._kilometersUnitInfo = [];
      this._squareKilometersUnitInfo = [];
      this._hectaresUnitInfo = [];
      this._squareMilesUnitInfo = [];
      this._intersectFeatureCount = 0;
      this.isExceedingMaxRecordCount = false;
      this.intersectingFeatureIdsToTolerance = [];
      this.intersectingFeatureIds = [];
      this._lengthAnalysisUnitsArray = [];
      this._areaAnalysisUnitsArray = [];
      this._aggregatedFeatureGeometries = [];
      this._featureIntersectResultArr = [];
      this._layerDefinition = null;
      this._isFieldsSelectorClick = false;
      this._selectedFields = [];
      this.sortFieldIndex = null;
      this.isTimeoutOccurred = false;
      this.sortFieldType = null;
      lang.mixin(this, options);
    },

    postCreate: function () {
      this._layerDefinition = jimuUtils.getFeatureLayerDefinition(this.featureLayer);
      this._lengthAnalysisUnitsArray = ["Feet", "Miles", "Meters", "Kilometers"];
      this._areaAnalysisUnitsArray = ["SquareFeet", "Acres", "SquareMeters", "SquareKilometers",
        "Hectares", "SquareMiles"];
      this.own(on(this.impactSummaryLayerMaxRecordHint, "click", lang.hitch(this, function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.isExceedingMaxRecordCount) {
          this.emit("showMessage", this.nls.reportsTab.unableToAnalyzeText);
        } else if (this.isTimeoutOccurred) {
          this.emit("showMessage", this.nls.reportsTab.errorLabel);
        } else {
          this.emit("showMessage", this.nls.reportsTab.layerNotVisibleText);
        }
      })));
      this._attachEventToNodes();
    },

    /**
     * This function is used to display following things when layer is not visible
     * 1. Display message as layer not analyzed
     * 2. Display exclamation icon
     * 3. Hide the count
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _displayLayerNotVisibleText: function () {
      domClass.add(this.impactSummaryLayerFeatureCount, "esriCTHidden");
      domClass.remove(this.layerTitleAndFieldParentContainer, "esriCTLayerSectionDisabled");
      domAttr.set(this.impactSummaryLayerMaxRecordHint, "title", this.nls.reportsTab.layerNotVisibleText);
      domAttr.set(this.impactSummaryLayerMaxRecordHint, "aria-label", this.nls.reportsTab.layerNotVisibleText);
      domClass.remove(this.impactSummaryLayerMaxRecordHint, "esriCTHidden");
      domClass.add(this.impactSummaryLayerTitle, "esriCTLayerTitleOverrideWidth");
      this._showMessage(this.nls.reportsTab.layerNotVisibleText);
    },

    /**
     * This function is used to set the layer title, attach events
     * and generate layer details by calling its functions
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    generateReport: function (bufferGeometry, completeToleranceGeometry, allPointGeometries) {
      var deferred, cutterPolylineArr, featureLayerInfo;
      deferred = new Deferred();
      this._setAttributeToFeatureLayerContainer();
      this._setFeatureLayerTitle();
      this._attachEventToLayerTitle();
      this._aggregatedFeatureGeometries = [];
      this._featureIntersectResultArr = [];
      featureLayerInfo = this.layerInfosObj.getLayerInfoById(this.featureLayer.id);
      if ((featureLayerInfo && featureLayerInfo.isVisible() && featureLayerInfo.isInScale()) ||
        (featureLayerInfo && !featureLayerInfo.isVisible() && !this.config.allowVisibleLayerAnalysisOnly) ||
        (featureLayerInfo && !featureLayerInfo.isInScale() && !this.config.allowVisibleLayerAnalysisOnly) ||
        (this.isFeatureCollectionLayer)) {
        //first get intersecting features to only point geometries
        this._getIntersectingFeaturesCount(allPointGeometries).then(lang.hitch(this,
          function (intersectingIdsToPoint) {
            //Second get intersecting features to tolerance geometries
            //If tolerance is set all point/line graphics will be considered here
            this._getIntersectingFeaturesCount(completeToleranceGeometry).then(lang.hitch(this,
              function (intersectingIdsToTolerance) {
                //get unique ids for point and line
                this.intersectingFeatureIdsToTolerance =
                  this._getUniqueIds(intersectingIdsToPoint, intersectingIdsToTolerance);
                //Third get all intersecting features to polygon
                //this function is used to get the array of feature object id within AOI
                this._getIntersectingFeaturesCount(bufferGeometry).then(lang.hitch(this,
                  function (intersectingFeatureIds) {
                    var geometryToGetChunks;
                    this.intersectingFeatureIds = lang.clone(intersectingFeatureIds);
                    intersectingFeatureIds = this._getUniqueIds(intersectingIdsToTolerance,
                      intersectingFeatureIds);
                    //Don't analyze if exceedingMaxRecordCount
                    if (this.isExceedingMaxRecordCount) {
                      //Set the count of all intersecting features
                      this._setFeatureLayerIntersectFeatureCount(intersectingFeatureIds.length);
                      this._pushDataInPrintDataObj(this.configuredLayerLabel, null, null);
                      this._printData = {};
                      this._printData = lang.clone(this._printCompleteData);
                      this._showMessage(this.nls.reportsTab.unableToAnalyzeText);
                      //remove disable class from layer section container
                      domClass.remove(this.layerTitleAndFieldParentContainer,
                        "esriCTLayerSectionDisabled");
                      // Once all the geometry operations are performed and
                      // report is generated resolve the deferred.
                      this._showReport();
                      deferred.resolve(this._getReportLayerDetails([]));
                    } else {
                      geometryToGetChunks = bufferGeometry || completeToleranceGeometry;
                      // this function is used to get the features in chunks within AOI
                      this._getFeatureByChunks(intersectingFeatureIds, geometryToGetChunks).then(
                        lang.hitch(this, function (intersectFeatureArr) {
                          var filteredIntersectedFeature, featureIntersectResultArr;
                          filteredIntersectedFeature = [];
                          this._featureIntersectResultArr = [];
                          array.forEach(intersectFeatureArr,
                            lang.hitch(this, function (intersectedFeature) {
                              if ((!bufferGeometry) ||
                                (!(GeometryEngine.touches(intersectedFeature.geometry,
                                  bufferGeometry)))) {
                                filteredIntersectedFeature.push(intersectedFeature);
                              }
                            }));
                          featureIntersectResultArr = [];
                          //Set the count of all intersecting features
                          this._setFeatureLayerIntersectFeatureCount(
                            filteredIntersectedFeature.length);
                          // Check if any features are intersecting else set no result found
                          if (filteredIntersectedFeature.length > 0) {
                            // In case of polygon and polyline get cut/within geometry features
                            // and for points directly used the intersected features
                            if ((this.featureLayer.geometryType === "esriGeometryPolyline" ||
                              this.featureLayer.geometryType === "esriGeometryPolygon") &&
                              bufferGeometry) {
                              cutterPolylineArr = this._polygonToPolyline(bufferGeometry);
                              featureIntersectResultArr =
                                this._getCutOrWithInFeatures(cutterPolylineArr,
                                  filteredIntersectedFeature, bufferGeometry);
                            } else {
                              featureIntersectResultArr = filteredIntersectedFeature;
                            }
                            //create detailed report
                            this._createLayerDetails(featureIntersectResultArr,
                              this.featureLayer.geometryType).then(lang.hitch(this, function () {
                                this._filterPrintDataObjAccToConfiguredFields(this.configuredField);
                                // remove disable class from layer field icon container which
                                // indicates that layer has finished processing
                                domClass.remove(this.impactSummaryLayerField,
                                  "esriCTImpactSummaryLayerFieldIconDisabled");
                                //remove disable class from layer section container
                                domClass.remove(this.layerTitleAndFieldParentContainer,
                                  "esriCTLayerSectionDisabled");
                                this._featureIntersectResultArr = featureIntersectResultArr;
                                // Once all the geometry operations are performed and
                                // report is generated resolve the deferred.
                                this._showReport();
                                deferred.resolve(this._getReportLayerDetails(featureIntersectResultArr));
                              }));

                          } else {
                            this._pushDataInPrintDataObj(this.configuredLayerLabel, null, null);
                            this._printData = {};
                            this._printData = lang.clone(this._printCompleteData);
                            this._showMessage(this.nls.reportsTab.noDetailsAvailableText);

                            //remove disable class from layer section container
                            domClass.remove(this.layerTitleAndFieldParentContainer,
                              "esriCTLayerSectionDisabled");
                            this._featureIntersectResultArr = featureIntersectResultArr;
                            // Once all the geometry operations are performed and
                            // report is generated resolve the deferred.
                            this._showReport();
                            deferred.resolve(this._getReportLayerDetails(featureIntersectResultArr));
                          }

                        }));
                    }
                  }));
              }));
          }));
      } else {
        this._displayLayerNotVisibleText();
        deferred.resolve();
      }
      return deferred.promise;
    },

    /**
     * This function is used to retain the selected fields when clicked on report button
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    retainLastSelectedField: function () {
      if (this.retainSelectedFieldsArr !== null) {
        this._selectedFields = this.retainSelectedFieldsArr;
        if (!(domClass.contains(this.impactSummaryLayerField,
          "esriCTImpactSummaryLayerFieldIconDisabled"))) {
          this._filterFieldsForReport(this.retainSelectedFieldsArr);
        }
      }
    },

    /**
     * This function returns the reportDetails object
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getReportLayerDetails: function (featureIntersectResultArr) {
      var reportLayerDetails = {};
      reportLayerDetails.id = this.id;
      reportLayerDetails.featureLayerId = this.featureLayer.id;
      reportLayerDetails.features = featureIntersectResultArr;
      //set info for printing/reporting
      reportLayerDetails.printInfo = {};
      reportLayerDetails.printInfo.isExceedingMaxRecordCount = this.isExceedingMaxRecordCount;
      reportLayerDetails.printInfo.featureCount = this._intersectFeatureCount;
      reportLayerDetails.printInfo.info = this._printData;
      reportLayerDetails.printInfo.feetUnitInfo = this._feetUnitInfo;
      reportLayerDetails.printInfo.squareFeetUnitInfo = this._squareFeetUnitInfo;
      reportLayerDetails.printInfo.countUnitInfo = this._countUnitInfo;
      reportLayerDetails.printInfo.milesUnitInfo = this._milesUnitInfo;
      reportLayerDetails.printInfo.acresUnitInfo = this._acresUnitInfo;
      reportLayerDetails.printInfo.metersUnitInfo = this._metersUnitInfo;
      reportLayerDetails.printInfo.squareMetersUnitInfo = this._squareMetersUnitInfo;
      reportLayerDetails.printInfo.kilometersUnitInfo = this._kilometersUnitInfo;
      reportLayerDetails.printInfo.squareKilometersUnitInfo = this._squareKilometersUnitInfo;
      reportLayerDetails.printInfo.squareMilesUnitInfo = this._squareMilesUnitInfo;
      reportLayerDetails.printInfo.hectaresUnitInfo = this._hectaresUnitInfo;
      reportLayerDetails.printInfo.geometryType = this.featureLayer.geometryType;
      reportLayerDetails.printInfo.groupbyfieldCheckBoxStatus = this.groupbyfieldCheckBoxStatus;
      reportLayerDetails.printInfo.sortInfo = this.sortInfo;
      return reportLayerDetails;
    },

    /**
     * This function is used to set the featureLayerID attr in parent container of layer row
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _setAttributeToFeatureLayerContainer: function () {
      domAttr.set(this.impactSummaryLayerContainer, "featureLayerID", this.featureLayer.id);
    },

    /**
     * This function is used to set the name of layer
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _setFeatureLayerTitle: function (updatedCount) {
      var layerAriaLabel = this.configuredLayerLabel;
      if (!this.configuredLayerLabel) {
        this.configuredLayerLabel = this.featureLayer.name;
        layerAriaLabel = this.featureLayer.name;
      }
      if (updatedCount || updatedCount === 0) {
        layerAriaLabel = string.substitute(this.nls.reportsTab.layerNameWithFeatureCount, {
          layerName: this.configuredLayerLabel,
          featureCount: updatedCount
        });
      }
      domAttr.set(this.impactSummaryLayerTitle, "innerHTML", jimuUtils.sanitizeHTML(this.configuredLayerLabel));
      domAttr.set(this.impactSummaryLayerTitle, "title", jimuUtils.sanitizeHTML(this.configuredLayerLabel));
      domAttr.set(this.layerTitleAndFieldParentContainer, 'aria-label', layerAriaLabel);
    },

    /**
     * This function is used to attach click event to layer row
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _attachEventToLayerTitle: function () {
      this.own(on(this.layerTitleAndFieldParentContainer, "click",
        lang.hitch(this, function (evt) {
          if (domClass.contains(evt.target, "esriCTImpactSummaryLayerFieldIcon")) {
            //open field selector widget if the icon is not disabled
            if (!domClass.contains(this.impactSummaryLayerField,
              "esriCTImpactSummaryLayerFieldIconDisabled")) {
              this._createFieldSelectorPopupWidget();
            }
          } else {
            //open layer details section only if layer has finished processing
            if (!domClass.contains(this.layerTitleAndFieldParentContainer,
              "esriCTLayerSectionDisabled")) {
              this._showOrHideLayerDetailsContainer();
            }
          }
        }))
      );
    },

    /**
     * This function is used create field selector widget for layer section
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _createFieldSelectorPopupWidget: function () {
      this._isFieldsSelectorClick = true;
      this._fieldSelectorWidget = new fieldSelectorPopup({
        outFields: this.configuredField,
        popupTitle: this.configuredLayerLabel,
        fieldTitle: this.nls.reportsTab.selectReportFieldTitle,
        nls: this.nls,
        appConfig: this.appConfig,
        retainSelectedFieldsArr: this._fieldSelectorWidget ? this._selectedFields : this.retainSelectedFieldsArr,
        featureLayer: this.featureLayer,
        sortInfo: this.sortInfo
      });
      this._fieldSelectorWidget.startup();
      on(this._fieldSelectorWidget, "onFieldSelectComplete", lang.hitch(this,
        function (updatedSettings) {
          this._selectedFields = updatedSettings.selectedFields;
          this.sortInfo = updatedSettings.sortInfo;
          this._filterFieldsForReport(this._selectedFields);
        }));
      on(this._fieldSelectorWidget, "onCancel", lang.hitch(this, function (previousSettings) {
        this._selectedFields = previousSettings;
      }));
      // Dart Theme change
      if (this.appConfig.theme.name === "DartTheme") {
        domClass.add(this._fieldSelectorWidget.fieldsPopup.domNode, "esriCTDartPanel");
      }
    },

    /**
     * This function is used return all fields of layer
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getAllFields: function () {
      var field, fields;
      fields = [];
      for (field in this.configuredField) {
        if (this.configuredField.hasOwnProperty(field)) {
          if (this.configuredField[field].hasOwnProperty("fieldName")) {
            fields.push(this.configuredField[field].fieldName);
          }
          if (this.configuredField[field].hasOwnProperty("name")) {
            fields.push(this.configuredField[field].name);
          }
        }
      }
      return fields;
    },

    /**
     * This function is used return selected fields of corresponding layer
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    getSelectedFields: function () {
      // enable field selector
      if (!domClass.contains(this.impactSummaryLayerField,
        "esriCTImpactSummaryLayerFieldIconDisabled")) {
        if (this._isFieldsSelectorClick && this._selectedFields !== null &&
          this._selectedFields.length > 0) {
          return this._selectedFields;
        } else if (this._isFieldsSelectorClick && this._selectedFields !== null &&
          this._selectedFields.length === 0) {
          return [];
        } else if ((!this._isFieldsSelectorClick) && this._selectedFields !== null &&
          this._selectedFields.length > 0) {
          return this._selectedFields;
        } else if ((!this._isFieldsSelectorClick) && this._selectedFields !== null &&
          this._selectedFields.length === 0 &&
          this.retainSelectedFieldsArr === null) {
          return this._getAllFields();
        } else if ((!this._isFieldsSelectorClick) && this._selectedFields !== null &&
          this._selectedFields.length === 0 &&
          this.retainSelectedFieldsArr.length === 0) {
          return [];
        } else {
          return this._getAllFields();
        }
      } else { // disable field selector
        if (this._selectedFields !== null && this._selectedFields.length > 0) {
          return this._selectedFields;
        } else if (this._selectedFields !== null && this._selectedFields.length === 0 &&
          this.retainSelectedFieldsArr === null) {
          return this._getAllFields();
        } else if (this._selectedFields !== null && this._selectedFields.length === 0 &&
          this.retainSelectedFieldsArr.length === 0) {
          return [];
        } else {
          return this._getAllFields();
        }
      }
    },

    /**
     * This function is used filter the configured fields array as per user selection
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _filterFieldsForReport: function (selectedFields) {
      var cloneFields = lang.clone(this.configuredField),
        fieldName;
      for (fieldName in this.configuredField) {
        if (selectedFields.indexOf(fieldName) <= -1) {
          delete cloneFields[fieldName];
        }
      }
      this._filterPrintDataObjAccToConfiguredFields(cloneFields);
      //Remove highlight if fields are filtered for the layer in which some features are highlighted
      var prevSelectedNode = query(".esriCTAttrTableHighlighted", this.domNode.parentElement);
      if (prevSelectedNode && prevSelectedNode.length > 0) {
        if (domAttr.get(prevSelectedNode[0], "esriCTLayerId") === this.featureLayer.id) {
          domClass.remove(prevSelectedNode[0], "esriCTAttrTableHighlighted");
          this.highlightGraphicsLayer.clear();
        }
      }
      //after fields selection change show updated report for selected fields only
      this._showReport();
      this.emit("printDataUpdated", {
        "id": this.id,
        "printData": this._printData,
        "sortInfo": this.sortInfo
      });
    },

    /**
     * This function is used to show/hide the layer details
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _showOrHideLayerDetailsContainer: function () {
      domClass.toggle(this.layerTitleAndFieldParentContainer, "esriCTBoldFont");
      domClass.toggle(this.impactSummaryLayerDetailContainer, "esriCTHidden");
      if (domClass.contains(this.layerSectionIcon, "esriCTLayerPanelExpand")) {
        domClass.replace(this.layerSectionIcon, "esriCTLayerPanelCollapse", "esriCTLayerPanelExpand");
        domAttr.set(this.layerSectionIcon, 'aria-expanded', "true");
      } else {
        domClass.replace(this.layerSectionIcon, "esriCTLayerPanelExpand", "esriCTLayerPanelCollapse");
        domAttr.set(this.layerSectionIcon, 'aria-expanded', "false");
      }
    },

    /**
     * This function is used to get the features count that intersects the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getIntersectingFeaturesCount: function (bufferGeometry) {
      var deferred, shapeFileIntersectFeatureArr, intersectGeometry, i;
      deferred = new Deferred();
      if (bufferGeometry) {
        if (this.isFeatureCollectionLayer) {
          shapeFileIntersectFeatureArr = [];
          if (this.featureLayer.graphics.length > 0) {
            for (i = 0; i < this.featureLayer.graphics.length; i++) {
              if (this.featureLayer.graphics[i].geometry) {
                intersectGeometry =
                  GeometryEngine.intersects(bufferGeometry,
                    this.featureLayer.graphics[i].geometry);
              } else {
                intersectGeometry = null;
              }
              if (intersectGeometry) {
                shapeFileIntersectFeatureArr.push(i);
              }
            }
          }
          deferred.resolve(shapeFileIntersectFeatureArr);
        } else {
          var queryObj, queryTask, appliedFilters, layerInfo;
          queryObj = new Query();
          queryTask = new QueryTask(this.featureLayer.url);
          layerInfo = this.layerInfosObj.getLayerInfoById(this.featureLayer.id);
          if (layerInfo) {
            appliedFilters = layerInfo.getFilter() ? layerInfo.getFilter() : '1=1';
          }
          if (appliedFilters) {
            queryObj.where = appliedFilters;
          }
          queryObj.geometry = bufferGeometry;
          queryTask.executeForIds(queryObj, lang.hitch(this, function (objectIDArr) {
            if (!objectIDArr || objectIDArr.length === 0) {
              deferred.resolve([]);
            } else {
              // If length of features exceeding maxRecordCount than
              // show icon indicating unable to analyze
              if (objectIDArr.length > this.maxFeaturesForAnalysis) {
                domClass.remove(this.impactSummaryLayerMaxRecordHint, "esriCTHidden");
                domClass.add(this.impactSummaryLayerTitle, "esriCTLayerTitleOverrideWidth");
                this.isExceedingMaxRecordCount = true;
                this.emit("exceedingMaxRecordCount");
              }
              deferred.resolve(objectIDArr);
            }
          }), lang.hitch(this, function (error) {
            this.isTimeoutOccurred = true;
            var errorMessage = '';
            if (error && error.message) {
              errorMessage = error.message;
            }
            domClass.remove(this.impactSummaryLayerMaxRecordHint, "esriCTHidden");
            domAttr.set(this.impactSummaryLayerMaxRecordHint, "title",
              this.nls.reportsTab.timedOutErrorLabel);
            domAttr.set(this.impactSummaryLayerMaxRecordHint, "aria-label",
              this.nls.reportsTab.timedOutErrorLabel);
            domClass.add(this.impactSummaryLayerTitle, "esriCTLayerTitleOverrideWidth");
            deferred.resolve([]);
          }));
        }
      } else {
        deferred.resolve([]);
      }
      return deferred.promise;
    },

    /**
     * This function is used to get the features in chunks
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFeatureByChunks: function (intersectingFeatureIds, bufferGeometry) {
      var deferredList, deferred, chunkArr, chunkSize;
      deferred = new Deferred();
      deferredList = [];
      chunkArr = [];
      chunkSize = this.featureLayer.maxRecordCount;
      if (this.isFeatureCollectionLayer) {
        deferredList.push(this._getIntersectFeature(intersectingFeatureIds, bufferGeometry));
      } else {
        while (intersectingFeatureIds.length > 0) {
          deferredList.push(this._getIntersectFeature(intersectingFeatureIds.splice(0, chunkSize),
            bufferGeometry));
        }
      }
      all(deferredList).then(lang.hitch(this, function (featuresArr) {
        var anyTimeoutResults = false;
        var intersectingFeatures;
        intersectingFeatures = [];
        array.forEach(featuresArr, lang.hitch(this, function (features) {
          if (features !== null) {
            intersectingFeatures = intersectingFeatures.concat(features);
          } else {
            //response timed out for some feature chunks
            anyTimeoutResults = true;
          }
        }));
        if (anyTimeoutResults) {
          //if some feature chunks failed, intersecting features will be zero
          deferred.resolve([]);
        } else {
          deferred.resolve(intersectingFeatures);
        }
      }));
      return deferred.promise;
    },

    /**
     * This function is used to get the features that intersects the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getIntersectFeature: function (intersectingFeatureIds, bufferGeometry) {
      var deferred, shapeFileIntersectFeatureArr, i, intersectGeometry, queryTask,
        queryObj;
      deferred = new Deferred();
      if (this.isFeatureCollectionLayer) {
        shapeFileIntersectFeatureArr = [];
        if (this.featureLayer.graphics.length > 0) {
          for (i = 0; i < this.featureLayer.graphics.length; i++) {
            if (this.featureLayer.graphics[i].geometry) {
              intersectGeometry =
                GeometryEngine.intersects(bufferGeometry,
                  this.featureLayer.graphics[i].geometry);
            } else {
              intersectGeometry = null;
            }
            if (intersectGeometry) {
              shapeFileIntersectFeatureArr.push(this.featureLayer.graphics[i]);
            }
          }
        }
        deferred.resolve(shapeFileIntersectFeatureArr.splice(0, this.maxFeaturesForAnalysis));
      } else {
        queryObj = new Query();
        queryObj.outFields = ["*"];
        queryObj.returnGeometry = true;
        queryObj.objectIds = intersectingFeatureIds;
        queryObj.outSpatialReference = bufferGeometry.spatialReference;
        queryTask = new QueryTask(this.featureLayer.url);
        queryTask.execute(queryObj, lang.hitch(this, function (featureSet) {
          if (featureSet.features) {
            deferred.resolve(featureSet.features);
          } else {
            deferred.resolve([]);
          }
        }), lang.hitch(this, function (error) {
          this.isTimeoutOccurred = true;
          var errorMessage = '';
          if (error && error.message) {
            errorMessage = error.message;
          }
          domClass.remove(this.impactSummaryLayerMaxRecordHint, "esriCTHidden");
          domAttr.set(this.impactSummaryLayerMaxRecordHint, "title",
            this.nls.reportsTab.timedOutErrorLabel);
          domAttr.set(this.impactSummaryLayerMaxRecordHint, "aria-label",
            this.nls.reportsTab.timedOutErrorLabel);
          domClass.add(this.impactSummaryLayerTitle, "esriCTLayerTitleOverrideWidth");
          deferred.resolve(null);
        }));
      }
      return deferred.promise;
    },

    /**
     * This function is used to set the count of features that intersects the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _setFeatureLayerIntersectFeatureCount: function (intersectFeatureLength) {
      this._intersectFeatureCount = dojoNumber.format(intersectFeatureLength);
      //remove the loading icon from count div and set the features count
      domClass.remove(this.impactSummaryLayerFeatureCount, "esriCTLoadingIcon");
      domAttr.set(this.impactSummaryLayerFeatureCount,
        "innerHTML", "(" + this._intersectFeatureCount + ")");
      domAttr.set(this.impactSummaryLayerFeatureCount,
        "title", "(" + this._intersectFeatureCount + ")");
      this._setFeatureLayerTitle(intersectFeatureLength);
    },

    /**
     * This function is used to detect polygon feature is a donut polygon
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _isDonutPolygon: function (geometry) {
      var isRingAntiClockWise;
      isRingAntiClockWise = false;
      if (geometry.type === "polygon") {
        if (geometry.rings.length > 1) {
          array.forEach(geometry.rings, lang.hitch(this, function (ring) {
            if (!geometry.isClockwise(ring)) {
              isRingAntiClockWise = true;
            }
          }));
        }
      }
      return isRingAntiClockWise;
    },

    /**
     * This function is used to get feature that cuts the AOI
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getCutOrWithInFeatures: function (cutterPolylineArr, intersectFeatureArr, bufferGeometry) {
      var featureIntersectResultArr, graphic;
      featureIntersectResultArr = [];
      for (var j = 0; j < cutterPolylineArr.length; j++) {
        for (var i = 0; i < intersectFeatureArr.length; i++) {
          var cutFeatureArr =
            GeometryEngine.cut(intersectFeatureArr[i].geometry, cutterPolylineArr[j]);
          if (cutFeatureArr.length > 0) {
            featureIntersectResultArr = this._getWithinFeature({
              "cutFeatureArr": cutFeatureArr,
              "bufferGeometry": bufferGeometry,
              "featureIntersectResultArr": featureIntersectResultArr,
              "intersectFeatureArr": intersectFeatureArr,
              "index": i
            });
          } else if (GeometryEngine.within(intersectFeatureArr[i].geometry, bufferGeometry)) {
            graphic = new Graphic(intersectFeatureArr[i].geometry, null, intersectFeatureArr[i].attributes);
            featureIntersectResultArr.push(graphic);
          } else {
            var intersectGeometry = GeometryEngine.intersect(intersectFeatureArr[i].geometry, bufferGeometry);
            graphic = new Graphic(intersectGeometry, null, intersectFeatureArr[i].attributes, null);
            featureIntersectResultArr.push(graphic);
          }
        }
      }
      return featureIntersectResultArr;
    },

    /**
     * This function is used to get within feature from cut feature array
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getWithinFeature: function (data) {
      var cutFeatureArr, bufferGeometry, intersectFeatureArr, i, featureIntersectResultArr, graphic;
      cutFeatureArr = data.cutFeatureArr;
      bufferGeometry = data.bufferGeometry;
      intersectFeatureArr = data.intersectFeatureArr;
      featureIntersectResultArr = data.featureIntersectResultArr;
      i = data.index;
      array.forEach(cutFeatureArr, lang.hitch(this, function (cutFeature) {
        if (GeometryEngine.within(cutFeature, bufferGeometry)) {
          graphic = new Graphic(cutFeature, null, intersectFeatureArr[i].attributes);
          featureIntersectResultArr.push(graphic);
        }
      }));
      return featureIntersectResultArr;
    },

    /**
     * This function is used to convert polygon AOI to polyline
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _polygonToPolyline: function (polygon) {
      var cutterPolylineArr, polyline, i, pathArr, j;
      cutterPolylineArr = [];
      // Set spatial reference of the polygon
      polyline = new Polyline(new SpatialReference({
        wkid: 102100
      }));
      for (j = 0; j < polygon.rings.length; j++) {
        pathArr = [];
        for (i = 0; i < polygon.rings[j].length; i++) {
          pathArr.push(polygon.rings[j][i]);
        }
        polyline.addPath(pathArr);
      }
      cutterPolylineArr.push(polyline);
      return cutterPolylineArr;
    },

    /**
     * This function is used to get the formatted attribute
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _updateFormattedAttribute: function (intersectFeatureArr) {
      var def = new Deferred();
      var defList = [];
      var layerInfosObj, layerInfosPopupInfo = null;
      //get layer info and it's popupInfo if layer is not a featureCollection layer
      if (!this.isFeatureCollectionLayer) {
        layerInfosObj = this.layerInfosObj.getLayerInfoById(this.featureLayer.id);
        layerInfosPopupInfo = layerInfosObj.originOperLayer.popupInfo;
        if (!layerInfosPopupInfo && layerInfosObj &&
          layerInfosObj.getPopupInfo && layerInfosObj.getPopupInfo()) {
          layerInfosPopupInfo = layerInfosObj.getPopupInfo();
        }
      }

      if (layerInfosPopupInfo && layerInfosPopupInfo.expressionInfos &&
        layerInfosPopupInfo.expressionInfos.length > 0) {
        var parsedExpressionInfos = this.parseArcadeExpressions(layerInfosPopupInfo.expressionInfos);
        array.forEach(intersectFeatureArr, lang.hitch(this, function (feature) {
          defList.push(this.combineFeatureAttributesAndExpressionResolutions(
            feature, layerInfosObj, layerInfosPopupInfo.expressionInfos, parsedExpressionInfos
          ));
        }));
      }
      all(defList).then(lang.hitch(this, function (expressionResolvedAttributes) {
        array.forEach(intersectFeatureArr, lang.hitch(this, function (intersectedFeature, i) {
          var formattedAttrs, unitData, objectId, hideMeasurementDetails, attrsToFormat;
          objectId = intersectedFeature.attributes[this.featureLayer.objectIdField];
          //if feature is not intersecting to polygons hide their measurement info
          if (this.intersectingFeatureIds.indexOf(objectId) === -1) {
            hideMeasurementDetails = true;
          }
          //if fields has any Arcade expression use the ExpressionResolvedAttributes else use the feature attributes
          if (expressionResolvedAttributes && expressionResolvedAttributes.length > 0 && expressionResolvedAttributes[i]) {
            attrsToFormat = lang.clone(expressionResolvedAttributes[i]);
          } else {
            attrsToFormat = lang.clone(intersectedFeature.attributes);
          }
          formattedAttrs = this._getFormatedAttrs(
            attrsToFormat,
            this.featureLayer.fields,
            layerInfosPopupInfo
          );
          intersectFeatureArr[i].setAttributes(formattedAttrs);
          array.forEach(this.featureLayer.fields, lang.hitch(this, function (field) {
            var fieldValue;
            if (!(intersectFeatureArr[i].attributes.hasOwnProperty(field.name))) {
              intersectFeatureArr[i].attributes[field.name] =
                this.nls.reportsTab.noDataText;
            }
            if (intersectFeatureArr[i].attributes.hasOwnProperty(field.name)) {
              fieldValue = intersectFeatureArr[i].attributes[field.name];
              if (fieldValue === undefined || fieldValue === "" || fieldValue === null) {
                intersectFeatureArr[i].attributes[field.name] =
                  this.nls.reportsTab.noDataText;
              } else if (lang.trim(fieldValue.toString()) === "") {
                intersectFeatureArr[i].attributes[field.name] =
                  this.nls.reportsTab.noDataText;
              }
            }
          }));
          //hide measurement details if not intersecting to polygons
          if (hideMeasurementDetails && this.featureLayer.geometryType === "esriGeometryPolygon") {
            this._squareFeetUnitData.push(0);
            this._acresUnitData.push(0);
            this._squareMetersUnitData.push(0);
            this._squareKilometersUnitData.push(0);
            this._squareMilesUnitData.push(0);
            this._hectaresUnitData.push(0);
          } else if (hideMeasurementDetails && this.featureLayer.geometryType === "esriGeometryPolyline") {
            this._feetUnitData.push(0);
            this._milesUnitData.push(0);
            this._metersUnitData.push(0);
            this._kilometersUnitData.push(0);
          } else {
            switch (this.featureLayer.geometryType) {
              case "esriGeometryPolygon":
                unitData = geometryUtils.getAreaOfGeometry(intersectedFeature.geometry);
                this._squareFeetUnitData.push(unitData.squareFeet);
                this._acresUnitData.push(unitData.acres);
                this._squareMetersUnitData.push(unitData.squareMeters);
                this._squareKilometersUnitData.push(unitData.squareKilometer);
                this._squareMilesUnitData.push(unitData.squareMiles);
                this._hectaresUnitData.push(unitData.hectares);
                break;
              case "esriGeometryPolyline":
                unitData = geometryUtils.getLengthOfGeometry(intersectedFeature.geometry);
                this._feetUnitData.push(unitData.feet);
                this._milesUnitData.push(unitData.miles);
                this._metersUnitData.push(unitData.meters);
                this._kilometersUnitData.push(unitData.kilometers);
                break;
            }
          }
        }));
        def.resolve(intersectFeatureArr);
      }));

      return def;
    },

    /**
     * This function is used to get the field text
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFieldText: function (currentFieldObj, fieldName) {
      if (currentFieldObj.label) {
        return currentFieldObj.label;
      } else if (currentFieldObj.alias) {
        return currentFieldObj.alias;
      } else {
        return fieldName;
      }
    },

    /**
     * This function is used to create layer details
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _createLayerDetails: function (intersectFeatureArr, geometryType) {
      var j, fieldData, currentFieldObj,
        currentFieldText, fieldName, configuredFieldLength;
      configuredFieldLength = Object.keys(this.configuredField).length;
      var def = new Deferred();
      this._updateFormattedAttribute(intersectFeatureArr).then(lang.hitch(this, function (result) {
        intersectFeatureArr = result;
        this._pushDataInPrintDataObj(this.configuredLayerLabel, null, null);
        for (fieldName in this.configuredField) {
          currentFieldObj = this.configuredField[fieldName];
          currentFieldText = this._getFieldText(currentFieldObj, fieldName);
          this._printCompleteData.cols.push(currentFieldText);
          for (j = 0; j < intersectFeatureArr.length; j++) {
            fieldData = intersectFeatureArr[j].attributes[fieldName];
            if (fieldData || fieldData === 0) {
              this._pushDataInPrintDataObj(null, j, fieldData);
            } else {
              this._pushDataInPrintDataObj(null, j, "");
            }
            //Add data in unit info array
            switch (geometryType) {
              case "esriGeometryPolyline":
                if (this._printCompleteData.cols.length === configuredFieldLength) {
                  this._feetUnitInfo.push(this._feetUnitData[j]);
                  this._milesUnitInfo.push(this._milesUnitData[j]);
                  this._metersUnitInfo.push(this._metersUnitData[j]);
                  this._kilometersUnitInfo.push(this._kilometersUnitData[j]);
                }
                break;
              case "esriGeometryPolygon":
                if (this._printCompleteData.cols.length === configuredFieldLength) {
                  this._squareFeetUnitInfo.push(this._squareFeetUnitData[j]);
                  this._acresUnitInfo.push(this._acresUnitData[j]);
                  this._squareMetersUnitInfo.push(this._squareMetersUnitData[j]);
                  this._squareKilometersUnitInfo.push(this._squareKilometersUnitData[j]);
                  this._squareMilesUnitInfo.push(this._squareMilesUnitData[j]);
                  this._hectaresUnitInfo.push(this._hectaresUnitData[j]);
                }
                break;
              case "esriGeometryPoint":
                if (this._printCompleteData.cols.length === configuredFieldLength) {
                  this._countUnitInfo.push(1);
                }
                break;
            }
          }
        }
        def.resolve();
      }));
      return def.promise;
    },

    /**
     * This function is used to push data in print data obj needed for print dijit
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _pushDataInPrintDataObj: function (featureTitle, rowIndex, fieldData) {
      if (featureTitle) {
        this._printCompleteData = {};
        this._feetUnitInfo = [];
        this._squareFeetUnitInfo = [];
        this._countUnitInfo = [];
        this._milesUnitInfo = [];
        this._acresUnitInfo = [];
        this._metersUnitInfo = [];
        this._squareMetersUnitInfo = [];
        this._kilometersUnitInfo = [];
        this.squareKilometersUnitInfo = [];
        this.squareMilesUnitInfo = [];
        this._hectaresUnitInfo = [];
        this._printCompleteData.title = featureTitle;
        this._printCompleteData.rows = [];
        this._printCompleteData.cols = [];
      } else {
        if (fieldData === this.nls.reportsTab.noDataText) {
          fieldData = "<i>" + fieldData + "</i>";
        }
        if (this._printCompleteData.rows[rowIndex]) {
          this._printCompleteData.rows[rowIndex].push(fieldData);
        } else {
          this._printCompleteData.rows.push([]);
          this._printCompleteData.rows[rowIndex].push(fieldData);
        }
      }
    },

    /**
     * This function is used to filter the print data object acc to configured fields
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _filterPrintDataObjAccToConfiguredFields: function (configuredField) {
      var i, k, isFieldConfigured, fieldName;
      this._printData = {};
      this._printData = lang.clone(this._printCompleteData);
      for (i = this._printData.cols.length - 1; i >= 0; --i) {
        isFieldConfigured = false;
        for (fieldName in configuredField) {
          switch (this._printData.cols[i]) {
            case configuredField[fieldName].label:
              isFieldConfigured = true;
              break;
            case configuredField[fieldName].alias:
              isFieldConfigured = true;
              break;
            case fieldName:
              isFieldConfigured = true;
              break;
          }
        }
        if (!isFieldConfigured) {
          this._printData.cols.splice(i, 1);
          for (k = 0; k < this._printData.rows.length; k++) {
            this._printData.rows[k].splice(i, 1);
          }
        }
      }
    },

    /**
     * This function is used to get the formatted attributes
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFormatedAttrs: function (attrs, fields, popupInfo) {
      function getFormatInfo(fieldName) {
        if (popupInfo && esriLang.isDefined(popupInfo.fieldInfos)) {
          for (var i = 0, len = popupInfo.fieldInfos.length; i < len; i++) {
            var f = popupInfo.fieldInfos[i];
            if (f.fieldName === fieldName) {
              return f.format;
            }
          }
        }
        return null;
      }
      var nulls = [null, undefined, ''];
      var aliasAttrs = {};
      array.forEach(fields, lang.hitch(this, function (_field, i) {
        if (nulls.indexOf(attrs[_field.name]) !== -1) {
          return;
        }
        var isDate = _field.type === "esriFieldTypeDate";
        var fieldAlias = _field.name;
        var formatInfo = getFormatInfo(_field.name);
        if (fields[i].type === "esriFieldTypeDate") {
          aliasAttrs[fieldAlias] = jimuUtils.fieldFormatter.getFormattedDate(
            attrs[_field.name], formatInfo ? formatInfo : {'dateFormat':'shortDateShortTime'}
          );
        } else if (fields[i].type === "esriFieldTypeDouble" ||
          fields[i].type === "esriFieldTypeSingle" ||
          fields[i].type === "esriFieldTypeInteger" ||
          fields[i].type === "esriFieldTypeSmallInteger") {
          aliasAttrs[fieldAlias] = this._getFormattedNumber(
            attrs[_field.name], formatInfo
          );
        }
        if (!isDate) {
          aliasAttrs[fieldAlias] = fieldAlias in aliasAttrs ?
            aliasAttrs[fieldAlias] : attrs[_field.name];
          var _result = jimuUtils.getDisplayValueForCodedValueOrSubtype(
            this._layerDefinition,
            _field.name,
            attrs
          );
          if (_result && _result.isCodedValueOrSubtype &&
            _result.hasOwnProperty('displayValue') &&
            nulls.indexOf(_result.displayValue) === -1) {
            var _value = _result.displayValue;
            aliasAttrs[fieldAlias] = _value || isFinite(_value) ? _value : "";
          }
        }
      }));
      if (popupInfo && popupInfo.expressionInfos) {
        array.forEach(popupInfo.expressionInfos, lang.hitch(this, function (_field, i) {
          var fieldName = "expression/" + _field.name;
          var _formatInfo = getFormatInfo(fieldName);
          if (nulls.indexOf(attrs[fieldName]) !== -1) {
            return;
          }

          if (_field.returnType === "date") {
            aliasAttrs[fieldName] = jimuUtils.fieldFormatter.getFormattedDate(
              attrs[fieldName], _formatInfo ? _formatInfo : {'dateFormat':'shortDateShortTime'}
            );
          } else if (_field.returnType === "number") {
            aliasAttrs[fieldName] = this._getFormattedNumber(
              Number(attrs[fieldName]), _formatInfo
            );
          } else if (_field.returnType === "string") {
            aliasAttrs[fieldName] = attrs[fieldName];
          }
        }));
      }
      return aliasAttrs;
    },

    /**
     * This function is used to get the formatted number
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getFormattedNumber: function (num, format) {
      if (typeof num === 'number') {
        var decimalStr = num.toString().split('.')[1] || "",
          decimalLen = decimalStr.length;
        num = jimuUtils.localizeNumberByFieldInfo(num, {
          format: {
            places: (format && typeof format.places === 'number') ?
              parseInt(format.places, 10) : decimalLen,
            digitSeparator: format && format.digitSeparator
          }
        });
        return num || "";
      }
      return num;
    },

    /**
     * This function is used to get index of array
     * @memberOf Screening/Widget
     */
    _getArrayIndex: function (arrayOfRows, arrayToBeSearched) {
      var i, j, current, matchedIndex = [];
      for (i = 0; i < arrayOfRows.length; ++i) {
        if (arrayToBeSearched.length === arrayOfRows[i].length) {
          current = arrayOfRows[i];
          j = 0;
          while (j < arrayToBeSearched.length && arrayToBeSearched[j] === current[j]) {
            ++j;
          }
          if (j === arrayToBeSearched.length) {
            matchedIndex.push(i);
          }
        }
      }
      return matchedIndex;
    },

    /**
     * This function is used to perform the aggregation of rows which contains same data
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    getSum: function (arrayOfValues, arrayOfIndex) {
      var sum, filteredArr;
      //filter selected index
      if (arrayOfIndex && arrayOfIndex.length > 0) {
        filteredArr = array.filter(arrayOfValues, function (item, index) { // jshint unused: true
          return arrayOfIndex.indexOf(index) > -1;
        });
      } else {
        filteredArr = arrayOfValues;
      }
      //add values of filteredArr
      sum = filteredArr.reduce(function (prevValue, currentValue) {
        return prevValue + currentValue;
      }, 0);
      if (sum > 0.01) {
        return conversionUtils.honourPopupRounding(2, sum);
      } else {
        return sum;
      }
    },

    /**
     * This function is used to get the units column title based on geometry type
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getAggregatedColTitle: function (geometryType) {
      var colTitle;
      switch (geometryType) {
        case "esriGeometryPoint":
          colTitle = this.nls.reportsTab.featureCountText;
          break;
        case "esriGeometryPolyline":
          colTitle = this.nls.reportsTab.featureLengthText;
          break;
        case "esriGeometryPolygon":
          colTitle = this.nls.reportsTab.featureAreaText;
          break;
      }
      return colTitle;
    },

    /**
     * Based on geometry type and unit selected from analysis setting returns unit text from nls.
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _getUnitsForGeometry: function (geometryType, analysisUnit) {
      var unit;
      switch (geometryType) {
        case "esriGeometryPoint":
          unit = "";
          break;
        case "esriGeometryPolyline":
          unit = this._getAnalysisUnitForGeometry(analysisUnit, geometryType);
          break;
        case "esriGeometryPolygon":
          unit = this._getAnalysisUnitForGeometry(analysisUnit, geometryType);
          break;
      }
      return unit;
    },

    /**
     * Based on config analysis unit value return unit for Length and Area
     * @memberOf Screening/Widget
     */
    _getAnalysisUnitForGeometry: function (analysisUnit, geometryType) {
      var analysisResultUnit;
      switch (analysisUnit) {
        case "Feet":
        case "SquareFeet":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.feetAbbr + "&sup2" : this.nls.units.feetAbbr;
          break;
        case "Miles":
        case "Acres":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.acresAbbr : this.nls.units.milesAbbr;
          break;
        case "Meters":
        case "SquareMeters":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.metersAbbr + "&sup2" : this.nls.units.metersAbbr;
          break;
        case "Kilometers":
        case "SquareKilometers":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.kilometersAbbr + "&sup2" : this.nls.units.kilometersAbbr;
          break;
        case "Hectares":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.reportsTab.hectaresAbbr : this.nls.units.kilometersAbbr;
          break;
        case "SquareMiles":
          analysisResultUnit = (geometryType === "esriGeometryPolygon") ?
            this.nls.units.milesAbbr + "&sup2" : this.nls.units.milesAbbr;
          break;
      }
      return analysisResultUnit;
    },

    /**
     * Shows message in layer details panel
     */
    _showMessage: function (message) {
      domConstruct.empty(this.impactSummaryLayerDetails);
      domAttr.set(this.impactSummaryLayerDetailsMsg, "innerHTML", message);
      domClass.add(this.impactSummaryLayerDetailsMsg, "esriCTLayerDetailCenterText");
    },

    /**
     * Function aggregates and shows report in panel.
     */
    _showReport: function () {
      var data, matchedIndex, temp, aggregatedObj, aggregatedId, measurementUnitColTitle,
        aggregatedData, matchedGeometries = [];
      data = this._printData;
      domConstruct.empty(this.impactSummaryLayerDetails);
      //if no field is selected
      if (!data.cols.length && data.rows.length > 0) {
        this._showMessage(this.nls.reportsTab.noFieldsSelected);
        return;
      }
      if (data.rows && data.rows.length > 0) {
        //if has valid rows empty the message
        domAttr.set(this.impactSummaryLayerDetailsMsg, "innerHTML", "");
        domClass.remove(this.impactSummaryLayerDetailsMsg, "esriCTLayerDetailCenterText");
        matchedIndex = [];
        aggregatedObj = {};
        //aggregate info for showing unique set of attribute values
        for (var i = 0; i < data.rows.length; i++) {
          if (this.groupbyfieldCheckBoxStatus) {
            //if current index is not found in matched index then search array of that index
            if (matchedIndex.indexOf(i) < 0) {
              temp = this._getArrayIndex(data.rows, data.rows[i]);
              aggregatedObj[i] = temp;
              matchedIndex = matchedIndex.concat(temp);
            }
            //if all index are matched break loop
            if (matchedIndex.length === data.rows.length) {
              break;
            }
          } else {
            var tempArr = [];
            tempArr.push(i);
            aggregatedObj[i] = tempArr;
          }
        }
        aggregatedData = {
          "rows": [],
          "cols": lang.clone(data.cols)
        };
        //based on feature layers geometry type show area/length/count as title for col
        measurementUnitColTitle = this._getAggregatedColTitle(this.featureLayer.geometryType);

        if (this.featureLayer.geometryType === "esriGeometryPoint") {
          aggregatedData.cols.push(measurementUnitColTitle); //for count
        } else if (this.featureLayer.geometryType === "esriGeometryPolyline") {
          aggregatedData.cols.push(measurementUnitColTitle); //for feet
          aggregatedData.cols.push(measurementUnitColTitle); //for miles
          aggregatedData.cols.push(measurementUnitColTitle); //for meters
          aggregatedData.cols.push(measurementUnitColTitle); //for kilometers
        } else if (this.featureLayer.geometryType === "esriGeometryPolygon") {
          aggregatedData.cols.push(measurementUnitColTitle); //for square-feet
          aggregatedData.cols.push(measurementUnitColTitle); //for acres
          aggregatedData.cols.push(measurementUnitColTitle); //for square-meter
          aggregatedData.cols.push(measurementUnitColTitle); //for square-kilometer
          aggregatedData.cols.push(measurementUnitColTitle); //for hectares
          aggregatedData.cols.push(measurementUnitColTitle); //for square-miles
        }

        for (aggregatedId in aggregatedObj) {
          var newRowInAggregatedData = lang.clone(data.rows[parseInt(aggregatedId, 10)]);
          var hectorsInfo, kilometersInfo, countUnitInfo, feetInfo, squareFeetInfo;
          if (this.featureLayer.geometryType === "esriGeometryPolyline") {
            //add feet unit info in data
            feetInfo = this.getSum(this._feetUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]);
            newRowInAggregatedData.push(feetInfo);
            //add mile unit info in data
            newRowInAggregatedData.push(
              this.getSum(this._milesUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
            //add meters unit info in data
            newRowInAggregatedData.push(
              this.getSum(this._metersUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
            //add kilometer unit info in data
            kilometersInfo = this.getSum(this._kilometersUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]);
            newRowInAggregatedData.push(kilometersInfo);
          } else if (this.featureLayer.geometryType === "esriGeometryPolygon") {
            //add square-feet unit info in data
            squareFeetInfo = this.getSum(this._squareFeetUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]);
            newRowInAggregatedData.push(squareFeetInfo);
            //add acres unit info in data
            newRowInAggregatedData.push(
              this.getSum(this._acresUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
            //add square-meters unit info in data
            newRowInAggregatedData.push(
              this.getSum(this._squareMetersUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
            //add square-kilometer unit info in data
            newRowInAggregatedData.push(
              this.getSum(this._squareKilometersUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
            //add hectares unit info in data
            hectorsInfo = this.getSum(this._hectaresUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]);
            newRowInAggregatedData.push(hectorsInfo);
            //add square-miles unit info in data
            newRowInAggregatedData.push(
              this.getSum(this._squareMilesUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]));
          } else if (this.featureLayer.geometryType === "esriGeometryPoint") {
            countUnitInfo = this.getSum(this._countUnitInfo, aggregatedObj[parseInt(aggregatedId, 10)]);
            newRowInAggregatedData.push(countUnitInfo);
          }
          aggregatedData.rows.push(newRowInAggregatedData);
          //Create geometries according to the aggregation of the attributes
          if (this._featureIntersectResultArr) {
            if (this.featureLayer.geometryType === "esriGeometryPolyline") {
              matchedGeometries.push({
                "features": this._getAggregatedFeatures(aggregatedObj[aggregatedId]),
                "sortValue": this.sortInfo.sortingField === "esriCTTotalLengthField" ? feetInfo :
                  this._getAggregatedFeatures(aggregatedObj[aggregatedId])[0].attributes[this._getSortFieldValue()]
              });
            } else if (this.featureLayer.geometryType === "esriGeometryPolygon") {
              matchedGeometries.push({
                "features": this._getAggregatedFeatures(aggregatedObj[aggregatedId]),
                "sortValue": this.sortInfo.sortingField === "esriCTTotalAreaField" ? squareFeetInfo :
                  this._getAggregatedFeatures(aggregatedObj[aggregatedId])[0].attributes[this._getSortFieldValue()]
              });
            } else if (this.featureLayer.geometryType === "esriGeometryPoint") {
              matchedGeometries.push({
                "features": this._getAggregatedFeatures(aggregatedObj[aggregatedId]),
                "sortValue": this.sortInfo.sortingField === "esriCTCountField" ? countUnitInfo :
                  this._getAggregatedFeatures(aggregatedObj[aggregatedId])[0].attributes[this._getSortFieldValue()]
              });
            }
          }
        }
        //once data is aggregated render report
        this._renderReport(aggregatedData, matchedGeometries);
      }
    },

    /**
     * Returns features according to attributes aggregation
     */
    _getAggregatedFeatures: function (aggregatedObj) {
      var newGeometriesArray = [];
      array.forEach(aggregatedObj, lang.hitch(this, function (index) {
        newGeometriesArray.push(this._featureIntersectResultArr[index]);
      }));
      return newGeometriesArray;
    },

    /**
     * Sorts the data based on last col values
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _sortFeatureArray: function (a, b) {
      //user number sorting for following dataTypes
      var numberCompare = ["esriFieldTypeOID", "esriFieldTypeSmallInteger",
        "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble", "esriFieldTypeDate"];

      //get the value to be sorted based on the selected sort field index
      var _a = a[this.sortFieldIndex];
      var _b = b[this.sortFieldIndex];

      //If NoData or NA text is in the values consider it as empty
      if (_a === "<i>" + this.nls.reportsTab.noDataText + "</i>" ||
        _a === "<i>" + this.nls.reportsTab.notApplicableText + "</i>") {
        _a = "";
      }
      if (_b === "<i>" + this.nls.reportsTab.noDataText + "</i>" ||
        _a === "<i>" + this.nls.reportsTab.notApplicableText + "</i>") {
        _b = "";
      }

      //if the value is empty/undefined/null based on sort order move the empty record always at the bottom
      if (typeof (_a) === 'undefined' || _a === null || _a === "") {
        return this.sortInfo.sortOrder === "Desc" ? -1 : 1;
      } else if (typeof (_b) === 'undefined' || _b === null || _b === "") {
        return this.sortInfo.sortOrder === "Desc" ? 1 : -1;
      } else if (_a === _b) {
        return 0;
      }

      //if the current sort field type is date get the epoch time for sorting
      if (this.sortFieldType === "esriFieldTypeDate") {
        _a = new Date(_a).getTime();
        _b = new Date(_b).getTime();
      }

      //if the current sort field type is number parse the number to remove the locale char(e.g. comma, space etc)
      if (numberCompare.indexOf(this.sortFieldType) !== -1) {
        return jimuUtils.parseNumber(_a) - jimuUtils.parseNumber(_b);
      } else {
        return _a.toString().localeCompare(_b.toString());
      }
    },

    /**
     * Sorts the data based on last col values
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _sortArrayByKey: function (a, b) {
      //user number sorting for following dataTypes
      var numberCompare = ["esriFieldTypeOID", "esriFieldTypeSmallInteger",
        "esriFieldTypeInteger", "esriFieldTypeSingle", "esriFieldTypeDouble", "esriFieldTypeDate"];

      //get the value to be sorted from the sortValue key in objects
      var _a = a.sortValue;
      var _b = b.sortValue;

      //If NoData or NA text is in the values consider it as empty
      if (_a === this.nls.reportsTab.noDataText ||
        _a === this.nls.reportsTab.notApplicableText) {
        _a = "";
      }
      if (_b === this.nls.reportsTab.noDataText ||
        _a === this.nls.reportsTab.notApplicableText) {
        _b = "";
      }

      //if the value is empty/undefined/null based on sort order move the empty record always at the bottom
      if (typeof (_a) === 'undefined' || _a === null || _a === "") {
        return this.sortInfo.sortOrder === "Desc" ? -1 : 1;
      } else if (typeof (_b) === 'undefined' || _b === null || _b === "") {
        return this.sortInfo.sortOrder === "Desc" ? 1 : -1;
      } else if (_a === _b) {
        return 0;
      }

      //if the current sort field type is date get the epoch time for sorting
      if (this.sortFieldType === "esriFieldTypeDate") {
        _a = new Date(_a).getTime();
        _b = new Date(_b).getTime();
      }

      //if the current sort field type is number parse the number to remove the locale char(e.g. comma, space etc)
      if (numberCompare.indexOf(this.sortFieldType) !== -1) {
        return jimuUtils.parseNumber(_a) - jimuUtils.parseNumber(_b);
      } else {
        return _a.toString().localeCompare(_b.toString());
      }
    },

    /**
     * This function is used to create template node for rendering report info
     * @memberOf Screening/impactSummaryReport/impactSummaryReport
     */
    _createTemplateNode: function () {
      var templateNode, impactSummaryLayerDetailMainNode;
      impactSummaryLayerDetailMainNode = domConstruct.create('div', {
        'class': 'esriCTImpactSummaryLayerDetailMainNode',
        'tabindex': 0,
        "role": "presentation"
      }, this.impactSummaryLayerDetails);
      //create table to show info
      templateNode = domConstruct.create("table", {
        "class": "esriCTAttrTable esriCTCursorPointer",
        "cellpadding": "0px",
        "cellspacing": "0px"
      }, impactSummaryLayerDetailMainNode);
      //add separator after ech table
      domConstruct.create("div", {
        "class": "esriCTInfoDataSeparator"
      }, this.impactSummaryLayerDetails);
      //handle click event to select and highlight the group and its features
      this.own(on(templateNode, 'click', lang.hitch(this, function (evt) {
        var tableNode;
        tableNode = evt.currentTarget;
        this._highlightSelection(tableNode);
      })));
      this.own(on(impactSummaryLayerDetailMainNode, 'keydown', lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          var tableNode;
          tableNode = evt.currentTarget.children[0];
          this._highlightSelection(tableNode);
        }
      })));
      return templateNode;
    },

    /**
     * Using the aggregated data render report info
     */
    _renderReport: function (aggregatedData, intersectingFeaturesArr) {
      var sortingFieldDisplayText;
      var sortingFieldName = this._getSortFieldValue();
      //loop through all the rows and create table for each unique set
      if (aggregatedData.rows && aggregatedData.rows.length > 0) {
        //statistics fields will always be at the end of the column array
        var statisticsFieldsArr = ["esriCTCountField", "esriCTTotalLengthField", "esriCTTotalAreaField"];
        if (statisticsFieldsArr.indexOf(sortingFieldName) !== -1) {
          if (this.featureLayer.geometryType === "esriGeometryPolyline") {
            //statistics field will always be in feet for polyline layer
            this.sortFieldIndex = aggregatedData.cols.length - 4;
          } else if (this.featureLayer.geometryType === "esriGeometryPolygon") {
            //statistics field will always be in square feet for polygon layer
            this.sortFieldIndex = aggregatedData.cols.length - 6;
          } else {
            //statistics fields will always be at the end of the column array for point layer
            this.sortFieldIndex = aggregatedData.cols.length - 1;
          }
        } else {
          sortingFieldDisplayText = this._getFieldText(this.configuredField[sortingFieldName],
            sortingFieldName);
          this.sortFieldIndex = aggregatedData.cols.indexOf(sortingFieldDisplayText);
        }
        this.sortFieldType = this._getFieldType(sortingFieldName, sortingFieldDisplayText);
        //sort data so that rows for which measurement are not to be shown will be shifted top
        aggregatedData.rows = aggregatedData.rows.sort(lang.hitch(this, this._sortFeatureArray));
        if (this.sortInfo.sortOrder === "Desc") {
          aggregatedData.rows.reverse();
        }
        //as data is sorted we also need to sort the features accordingly
        intersectingFeaturesArr = intersectingFeaturesArr.sort(lang.hitch(this, this._sortArrayByKey));
        if (this.sortInfo.sortOrder === "Desc") {
          intersectingFeaturesArr.reverse();
        }
        // once after sorting set the features in _aggregatedFeatureGeometries array
        this._aggregatedFeatureGeometries = intersectingFeaturesArr;
        array.forEach(aggregatedData.rows, lang.hitch(this, function (eachRow, index) {
          var infoTable, valuesTr;
          infoTable = this._createTemplateNode();
          //set the attribute to identify the selected table and layer
          domAttr.set(infoTable, "esriCTTableIndex", index);
          domAttr.set(infoTable, "esriCTLayerId", this.featureLayer.id);
          //Loop through all the rows and create td for each col data
          array.forEach(eachRow, lang.hitch(this, function (rowValue, index) {
            var formattedRowValue, attrName, attrValue, valuesTd, nameTd;
            valuesTr = domConstruct.create("tr", {
              "valign": "top"
            }, infoTable);
            //Add attrName and value td to row
            nameTd = domConstruct.create("td", {
              "class": "esriCTAttrName"
            }, valuesTr);
            valuesTd = domConstruct.create("td", {
              "class": "esriCTAttrValue"
            }, valuesTr);
            //Format value so that url in value will appear as link.
            formattedRowValue = jimuUtils.fieldFormatter.getFormattedUrl(rowValue);
            attrName = aggregatedData.cols[index] + ": ";
            attrValue = formattedRowValue;
            //Last five col values are for analysis report unit info
            var unitColValue;
            switch (this.featureLayer.geometryType) {
              case "esriGeometryPoint":
                unitColValue = 1;
                break;
              case "esriGeometryPolyline":
                unitColValue = 4;
                break;
              case "esriGeometryPolygon":
                unitColValue = 6;
                break;
            }
            if (index >= eachRow.length - unitColValue) {
              var currUnitIndex, analysisUnitClass;
              currUnitIndex = index - (eachRow.length - unitColValue);
              //Append unit to the valid value
              //In case of geometries intersecting to only point/line hide the row
              if (formattedRowValue >= 0.01) {
                if (this.featureLayer.geometryType !== "esriGeometryPoint") {
                  formattedRowValue = dojoNumber.format(formattedRowValue, {
                    places: 2
                  });
                } else {
                  formattedRowValue = dojoNumber.format(formattedRowValue);
                }
                if (this.featureLayer.geometryType === "esriGeometryPolyline") {
                  attrValue = attrName + formattedRowValue + " " +
                    this._getUnitsForGeometry(this.featureLayer.geometryType,
                      this._lengthAnalysisUnitsArray[currUnitIndex]);
                } else if (this.featureLayer.geometryType === "esriGeometryPolygon") {
                  attrValue = attrName + formattedRowValue + " " +
                    this._getUnitsForGeometry(this.featureLayer.geometryType,
                      this._areaAnalysisUnitsArray[currUnitIndex]);
                } else if (this.featureLayer.geometryType === "esriGeometryPoint") {
                  attrValue = attrName + formattedRowValue + " " +
                    this._getUnitsForGeometry(this.featureLayer.geometryType, null);
                }
              } else if (formattedRowValue < 0.01 && formattedRowValue !== 0) {
                if (this.featureLayer.geometryType === "esriGeometryPolyline") {
                  attrValue = attrName + " " + " < " + dojoNumber.format(0.01) + " " +
                    this._getUnitsForGeometry(this.featureLayer.geometryType,
                      this._lengthAnalysisUnitsArray[currUnitIndex]);
                } else if (this.featureLayer.geometryType === "esriGeometryPolygon") {
                  attrValue = attrName + " " + " < " + dojoNumber.format(0.01) + " " +
                    this._getUnitsForGeometry(this.featureLayer.geometryType,
                      this._areaAnalysisUnitsArray[currUnitIndex]);
                } else if (this.featureLayer.geometryType === "esriGeometryPoint") {
                  attrValue = attrName + " " + " < " + dojoNumber.format(0.01) + " " +
                    this._getUnitsForGeometry(this.featureLayer.geometryType, null);
                }
              } else {
                attrValue = attrName + " " + this.nls.reportsTab.notApplicableText;
              }
              attrName = "";
              //align measurement info to right & remove padding from analysis results
              domClass.add(nameTd, "esriCTReportsTabInfoData");
              if (this.featureLayer.geometryType === "esriGeometryPolyline") {
                analysisUnitClass = "esriCTFieldDistinct" + this._lengthAnalysisUnitsArray[currUnitIndex] + "UnitData";
              } else {
                analysisUnitClass = "esriCTFieldDistinct" + this._areaAnalysisUnitsArray[currUnitIndex] + "UnitData";
              }
              domClass.add(valuesTd, "esriCTInfoDataMeasurement esriCTReportsTabInfoData");
              // add units for line
              if (this.featureLayer.geometryType === "esriGeometryPolyline") {
                switch (this._lengthAnalysisUnitsArray[currUnitIndex]) {
                  case "Feet":
                  case "Miles":
                  case "Meters":
                  case "Kilometers":
                    domClass.add(valuesTd, analysisUnitClass);
                    domClass.add(valuesTd, "esriCTEsriGeometryPolyline");
                    break;
                }
                // initially hide other units data, and show only configured
                if (this.config.lengthUnits !== (this._lengthAnalysisUnitsArray[currUnitIndex])) {
                  domClass.add(valuesTd, "esriCTHidden");
                }
              }
              // add units for polygon
              if (this.featureLayer.geometryType === "esriGeometryPolygon") {
                switch (this._areaAnalysisUnitsArray[currUnitIndex]) {
                  case "SquareFeet":
                  case "Acres":
                  case "SquareMeters":
                  case "SquareKilometers":
                  case "Hectares":
                  case "SquareMiles":
                    domClass.add(valuesTd, analysisUnitClass);
                    domClass.add(valuesTd, "esriCTEsriGeometryPolygon");
                    break;
                }
                // initially hide other units data, and show only configured
                if (this.config.areaUnits !== (this._areaAnalysisUnitsArray[currUnitIndex])) {
                  domClass.add(valuesTd, "esriCTHidden");
                }
              }
            }
            domAttr.set(nameTd, "innerHTML", attrName);
            domAttr.set(valuesTd, "innerHTML", attrValue);
          }));
        }));
      }
    },

    /**
     * This function returns unique values from two arrays
     */
    _getUniqueIds: function (arr1, arr2) {
      if (arr1.length === 0) {
        return arr2;
      }
      if (arr2.length === 0) {
        return arr1;
      }
      array.forEach(arr1, lang.hitch(this, function (value) {
        var indexInArr2 = arr2.indexOf(value);
        if (indexInArr2 !== -1) {
          arr2.splice(indexInArr2, 1);
        }
      }));
      return arr1.concat(arr2);
    },

    /**
     * On group row click in widget panel,
     * Highlight row in widget panel and features for that group on map
     */
    _highlightSelection: function (tableNode) {
      var prevSelectedNode, node, tableIndex, features;
      node = tableNode;
      //If current node is already selected then deselect it and remove the highlight
      if (domClass.contains(node, "esriCTAttrTableHighlighted")) {
        domClass.remove(node, "esriCTAttrTableHighlighted");
        this.highlightGraphicsLayer.clear();
        return;
      }
      //Remove highlights of previous selection
      prevSelectedNode = query(".esriCTAttrTableHighlighted", this.domNode.parentElement);
      if (prevSelectedNode && prevSelectedNode.length > 0) {
        domClass.remove(prevSelectedNode[0], "esriCTAttrTableHighlighted");
      }
      //Clear the Graphics Layer before adding any new
      this.highlightGraphicsLayer.clear();
      //Highlight the selected group row in widget panel
      domClass.add(node, "esriCTAttrTableHighlighted");
      //Get features of the selected group
      tableIndex = domAttr.get(node, "esriCTTableIndex");
      features = this._aggregatedFeatureGeometries[parseInt(tableIndex, 10)].features;
      //Highlight each individual feature on map
      array.forEach(features, lang.hitch(this, function (feature) {
        //get the graphics with the highlight
        var graphic = highlightSymbolUtils.getHighLightSymbol(feature, this.featureLayer);
        //add the highlight graphics on map
        this.highlightGraphicsLayer.add(graphic);
      }));
    },

    /**
     * This function is used to attach events to nodes of this widget
     */
    _attachEventToNodes: function () {
      var layerTitleAndFieldEventHandler =
        this.own(on.pausable(this.layerTitleAndFieldParentContainer, 'keydown',
          lang.hitch(this, function (evt) {
            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
              Event.stop(evt);
              this._setFocus();
              layerTitleAndFieldEventHandler[0].pause();
            }
          })));
      this.own(on(this.layerSectionIcon, 'keydown', lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          if (domClass.contains(this.layerTitleAndFieldParentContainer, "esriCTImpactSummaryLayerFieldIcon")) {
            if (!domClass.contains(this.impactSummaryLayerField,
              "esriCTImpactSummaryLayerFieldIconDisabled")) {
              this._createFieldSelectorPopupWidget();
            }
          } else {
            if (!domClass.contains(this.layerTitleAndFieldParentContainer,
              "esriCTLayerSectionDisabled")) {
              this._showOrHideLayerDetailsContainer();
            }
          }
        }
        if (evt.keyCode === keys.ESCAPE) {
          Event.stop(evt);
          this._removeFocus();
          layerTitleAndFieldEventHandler[0].resume();
        }
      })));
      this.own(on(this.impactSummaryLayerField, 'keydown', lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          if (!domClass.contains(evt.target,
            "esriCTImpactSummaryLayerFieldIconDisabled")) {
            this._createFieldSelectorPopupWidget();
          }
        }
        if (evt.keyCode === keys.ESCAPE) {
          Event.stop(evt);
          this._removeFocus();
          layerTitleAndFieldEventHandler[0].resume();
        }
      })));
      this.own(on(this.impactSummaryLayerMaxRecordHint, 'keydown', lang.hitch(this, function (evt) {
        if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
          Event.stop(evt);
          if (this.isExceedingMaxRecordCount) {
            this.emit("showMessage", this.nls.reportsTab.unableToAnalyzeText);
          } else if (this.isTimeoutOccurred) {
            this.emit("showMessage", this.nls.reportsTab.errorLabel);
          } else {
            this.emit("showMessage", this.nls.reportsTab.layerNotVisibleText);
          }
        }
        if (evt.keyCode === keys.ESCAPE) {
          Event.stop(evt);
          this._removeFocus();
          layerTitleAndFieldEventHandler[0].resume();
        }
      })));
    },

    /**
     * This function is set the focus on the parent element
     */
    _removeFocus: function () {
      this._restrictFocus();
      this.emit("initializeAccessibility");
      this._focusOutCurrentNode();
      focusUtil.focus(this.layerTitleAndFieldParentContainer);
    },

    /**
     * This function is used to set the focus
     */
    _setFocus: function () {
      this._allowFocus();
      this._setFirstFocusNode();
      this._setLastFocusNode();
      this._setFocusOnFirstNode();
    },

    /**
     * This function is used to change the tabindex to restrict the focus
     */
    _restrictFocus: function () {
      domAttr.set(this.layerSectionIcon, 'tabindex', "-1");
      domAttr.set(this.impactSummaryLayerMaxRecordHint, 'tabindex', "-1");
      domAttr.set(this.impactSummaryLayerField, 'tabindex', "-1");
    },

    /**
     * This function is used to change the tab index to set the focus
     */
    _allowFocus: function () {
      domAttr.set(this.layerSectionIcon, 'tabindex', "1");
      if (!domClass.contains(this.impactSummaryLayerMaxRecordHint, 'esriCTHidden')) {
        domAttr.set(this.impactSummaryLayerMaxRecordHint, 'tabindex', "1");
      }
      if (!domClass.contains(this.impactSummaryLayerField, 'esriCTImpactSummaryLayerFieldIconDisabled')) {
        domAttr.set(this.impactSummaryLayerField, 'tabindex', "1");
      }
    },

    /**
     * This function is used to set the first focus node
     */
    _setFirstFocusNode: function () {
      jimuUtils.initFirstFocusNode(this.domNodeObj, this.layerSectionIcon);
    },

    /**
     * This function is used to set the last focus node
     */
    _setLastFocusNode: function () {
      // field icon
      if (!domClass.contains(this.impactSummaryLayerField, 'esriCTImpactSummaryLayerFieldIconDisabled')) {
        jimuUtils.initLastFocusNode(this.domNodeObj, this.impactSummaryLayerField);
      } else {
        // hint icon
        if (!domClass.contains(this.impactSummaryLayerMaxRecordHint, 'esriCTHidden')) {
          jimuUtils.initLastFocusNode(this.domNodeObj, this.impactSummaryLayerMaxRecordHint);
        } else {
          // expand/collapse icon
          jimuUtils.initLastFocusNode(this.domNodeObj, this.layerSectionIcon);
        }
      }
    },

    /**
     * This function is used to focus out the current node
     */
    _focusOutCurrentNode: function () {
      if (focusUtil.curNode) {
        focusUtil.curNode.blur();
      }
    },

    /**
     * This function is used to set the focus on first element of this widget
     */
    _setFocusOnFirstNode: function () {
      this._focusOutCurrentNode();
      focusUtil.focus(this.layerSectionIcon);
    },

    /**
     * -----------------------------------
     * Arcade Exp Code
     * -----------------------------------
     * */

    /**
     * Parses Arcade expression infos.
     * @param {array} expressionInfos Expression info list from popupInfo
     * @return {object} List of parsed expressions keyed by the expression name
     */
    parseArcadeExpressions: function (expressionInfos) {
      var parsedExpressions;
      if (Array.isArray(expressionInfos) && expressionInfos.length > 0) {
        parsedExpressions = {};
        array.forEach(expressionInfos, function (info) {
          parsedExpressions[info.name] = Arcade.parseScript(info.expression);
        });
      }
      return parsedExpressions;
    },

    /**
     * Initializes the Arcade context with an ArcadeFeature.
     * @param {object} feature Feature to convert into an ArcadeFeature and to add to the context's vars object
     * @return {object} Arcade context object
     */
    initArcadeContext: function (feature, layer, expressionInfos) {
      var map = null, sr = null;
      if (this.map) {
        map = this.map;
      }
      if (layer && layer.layerObject) {
        layer = layer.layerObject;
      }
      if (feature && feature.geometry && feature.geometry.spatialReference) {
        sr = feature.geometry.spatialReference;
      }

      var context = this.getEvalOptions({
        expression: expressionInfos,
        feature: feature,
        layer: layer,
        map: map,
        sr: sr,
      }).context;
      return context;
    },

    /**
       * Returns an object containing the context needed for evaluating an expression
       * and other options.
       * @param {Object} parameters
       * @param {ArcadeExpression} parameters.expression
       * @param {Graphic} parameters.feature
       * @param {FeatureLayer} parameters.layer
       * @param {Map} parameters.map
       * @param {SpatialReference} parameters.spatialReference
       *
       * @returns {Object}
       */
    getEvalOptions: function (parameters) {
      var feature = parameters.feature;
      var layer = parameters.layer;
      var map = parameters.map;
      var sr = parameters.spatialReference;

      var $feature = (feature)
        ? ArcadeFeature.createFromGraphicLikeObject(feature.geometry, feature.attributes, layer)
        : null;

      var $layer, $datastore;

      if (layer) {
        var options = {
          spatialReference: sr
        };

        $layer = layer.getMap()
          ? expressionUtils.createFeatureSetFromLayer(layer, options)
          : expressionUtils.createFeatureSetFromLayerUrl(layer.url, options);

        var serviceUrl = utils.getServiceUrl(layer.url);

        $datastore = serviceUrl
          ? expressionUtils.createFeatureSetCollectionFromServiceUrl(serviceUrl, options)
          : null;
      }

      var $map = (map)
        ? expressionUtils.createFeatureSetCollectionFromMap(map)
        : null;

      return {
        context: {
          vars: {
            $feature: $feature,
            $layer: $layer,
            $datastore: $datastore,
            $map: $map
          },
          spatialReference: sr
        }
      };
    },

    /**
     * Creates a list of feature attributes and resolved Arcade expressions for the feature.
     * @param {object} feature Feature whose attributes are to be used
     * @param {object} parsedExpressions Parsed Arcade expressions keyed by the expression name; each expression
     *        is resolved and added to the output object keyed by 'expression/' + the expression's name
     * @return {object} Combination of feature attributes and resolved expressions
     */
    combineFeatureAttributesAndExpressionResolutions: function (feature, layer, expressionInfos, parsedExpressions) {
      var def = new Deferred(), defList = [];
      var attributesAndExpressionResolutions, arcadeContext, name;

      // Resolve Arcade expressions for this feature; convert to string in case its return type is not already string
      attributesAndExpressionResolutions = lang.mixin({}, feature.attributes);
      if (parsedExpressions) {
        arcadeContext = this.initArcadeContext(feature, layer, expressionInfos, parsedExpressions);
        for (name in parsedExpressions) {
          defList.push(this.executeArcadeExpression(name, parsedExpressions[name], arcadeContext, attributesAndExpressionResolutions));
        }
        all(defList).then(function () {
          def.resolve(attributesAndExpressionResolutions);
        });
      } else {
        def.resolve(attributesAndExpressionResolutions);
      }

      return def.promise;
    },

    executeArcadeExpression: function (name, parsedExpression, arcadeContext, attributesAndExpressionResolutions) {
      var resolvedExpression, def = new Deferred();
      resolvedExpression = Arcade.executeScript(parsedExpression, arcadeContext);
      //if resolved expression has promise resolve the result after completing the promise,
      //else resolve the result
      if (resolvedExpression && resolvedExpression.then) {
        resolvedExpression.then(function (a) {
          attributesAndExpressionResolutions['expression/' + name] = a ? a.toString() : '';
          def.resolve(a);
        }, function (error) {
          attributesAndExpressionResolutions['expression/' + name] =
            error ? error.toString() : '';
          def.resolve(error);
        });
      } else {
        attributesAndExpressionResolutions['expression/' + name] =
          resolvedExpression ? resolvedExpression.toString() : '';
        def.resolve(resolvedExpression);
      }
      return def.promise;
    },

    /**
     * This function is used to get selected sort field type
     */
    _getFieldType: function (sortingFieldName, sortingFieldDisplayText) {
      var currentFieldObj, currentFieldText, fieldType = "esriFieldTypeString", format;
      //for Count/TotalLength/TotalArea return Integer as field type
      if (sortingFieldName === 'esriCTCountField' ||
        sortingFieldName === 'esriCTTotalLengthField' ||
        sortingFieldName === 'esriCTTotalAreaField') {
        return "esriFieldTypeInteger";
      }
      for (var fieldName in this.configuredField) {
        currentFieldObj = this.configuredField[fieldName];
        currentFieldText = this._getFieldText(currentFieldObj, fieldName);
        if (currentFieldText === sortingFieldDisplayText) {
          if (currentFieldObj.type) {
            fieldType = currentFieldObj.type;
          } else if (currentFieldObj.format) {
            format = currentFieldObj.format;
            if (format.hasOwnProperty("dateFormat")) {
              fieldType = "esriFieldTypeDate";
            }
            if (format.hasOwnProperty("digitSeparator") || format.hasOwnProperty("places")) {
              fieldType = "esriFieldTypeInteger";
            }
          } else if (currentFieldObj.hasOwnProperty("returnType")) {
            if (currentFieldObj.returnType === "number") {
              fieldType = "esriFieldTypeInteger";
            } if (currentFieldObj.returnType === "string") {
              fieldType = "esriFieldTypeString";
            }
          } else {
            fieldType = "esriFieldTypeString";
          }
        }
      }
      return fieldType;
    },

    /**
     * This function is used to get sort field name from its label
     */
    _getSortFieldValue: function () {
      var statisticsFieldsArr = ["esriCTCountField", "esriCTTotalLengthField", "esriCTTotalAreaField"];
      var currentFieldObj, currentFieldText;
      var selectedSortField = this.sortInfo.sortingField;
      var valueArr = Object.keys(this.configuredField);
      //for backward (in case of label or alias of sort field is saved)
      if (valueArr.indexOf(selectedSortField) === -1 &&
        statisticsFieldsArr.indexOf(selectedSortField) === -1) {
        for (var fieldName in this.configuredField) {
          currentFieldObj = this.configuredField[fieldName];
          currentFieldText = this._getFieldText(currentFieldObj, fieldName);
          if (currentFieldText === selectedSortField) {
            selectedSortField = fieldName;
          }
        }
      }
      return selectedSortField;
    }
  });
});