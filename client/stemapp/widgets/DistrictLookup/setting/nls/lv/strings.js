﻿/*global define*/
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
define({
  "units": {
    "miles": "Jūdzes",
    "kilometers": "Kilometri",
    "feet": "Pēdas",
    "meters": "Metri"
  },
  "layerSetting": {
    "layerSettingTabTitle": "Meklēšanas iestatījumi",
    "buttonSet": "Iestatīt",
    "selectLayersLabel": "Izvēlēties slāni",
    "selectLayersHintText": "Padoms. Izmanto, lai izvēlētos laukuma slāni un ar to saistīto punktu slāni.",
    "selectPrecinctSymbolLabel": "Izvēlieties laukuma izcelšanas simbolu",
    "selectGraphicLocationSymbol": "Adreses vai novietojuma simbols",
    "graphicLocationSymbolHintText": "Padoms. Meklētas adreses vai noklikšķināta novietojuma simbols",
    "precinctSymbolHintText": "Padoms. Izmanto, lai parādītu izvēlētā laukuma simbolu",
    "selectColorForPoint": "Atlasīt krāsu, lai izceltu punktu",
    "selectColorForPointHintText": "Padoms. Tiek izmantots, lai parādītu atlasītā punkta izcēluma krāsu"
  },
  "searchSourceSetting": {
    "searchSourceSettingTabTitle": "Meklēšanas avota iestatījumi",
    "searchSourceSettingTitle": "Meklēšanas avota iestatījumi",
    "searchSourceSettingTitleHintText": "Pievienojiet un konfigurējiet ģeokodēšanas servisus vai elementu slāņus kā meklēšanas avotus. Šie norādītie avoti nosaka, ko var meklēt meklēšanas lodziņā",
    "addSearchSourceLabel": "Pievienot meklēšanas avotu",
    "featureLayerLabel": "Elementu slānis",
    "geocoderLabel": "Ģeokodētājs",
    "nameTitle": "Nosaukums",
    "generalSettingLabel": "Vispārīgs iestatījums",
    "allPlaceholderLabel": "Viettura teksts visu vērtību meklēšanai:",
    "allPlaceholderHintText": "Padoms: ievadiet tekstu, kas tiks rādīts kā vietturis, kad meklēsit visus slāņus un ģeokodētāju",
    "generalSettingCheckboxLabel": "Rādīt atrastā elementa vai novietojuma uznirstošo logu",
    "countryCode": "Valsts vai reģiona kods(-i)",
    "countryCodeEg": "piem., ",
    "countryCodeHint": "Ja šī vērtība tiks atstāta tukša, tiks meklētas visas valstis un reģioni.",
    "questionMark": "?",
    "searchInCurrentMapExtent": "Meklēt tikai pašreizējā kartes pārklājumā",
    "zoomScale": "Mēroga skala",
    "locatorUrl": "Ģeokodētāja URL",
    "locatorName": "Ģeokodētāja nosaukums",
    "locatorExample": "Piemērs",
    "locatorWarning": "Šī ģeokodēšanas pakalpojuma versija netiek atbalstīta. Šis logrīks atbalsta ģeokodēšanas servisa versiju 10.0 un jaunākas.",
    "locatorTips": "Ieteikumi nav pieejami, jo ģeokodēšanas serviss neatbalsta ieteikšanas iespēju.",
    "layerSource": "Slāņa avots",
    "setLayerSource": "Iestatīt slāņa avotu",
    "setGeocoderURL": "Iestatīt ģeokodētāja vietrādi URL",
    "searchLayerTips": "Ieteikumi nav pieejami, jo elementu serviss neatbalsta lappušu numerācijas iespēju.",
    "placeholder": "Viettura teksts",
    "searchFields": "Meklēšanas lauki",
    "displayField": "Rādīt lauku",
    "exactMatch": "Precīza atbilstība",
    "maxSuggestions": "Ieteikumu maksimums",
    "maxResults": "Maks. rezultātu skaits",
    "enableLocalSearch": "Iespējot lokālo meklēšanu",
    "minScale": "Minimālo vērtību mērogs",
    "minScaleHint": "Ja kartes mērogs ir lielāks par šo mērogu, tiks lietota lokālā meklēšana",
    "radius": "Rādiuss",
    "radiusHint": "Norāda tās teritorijas rādiusu ap pašreizējo kartes centru, kas tiek izmantots, lai uzlabotu ģeokodēšanas kandidātu rangu, lai vispirms tiktu atgriezti novietojumam tuvākie kandidāti",
    "meters": "Metri",
    "setSearchFields": "Iestatīt meklēšanas laukus",
    "set": "Uzstādīt",
    "fieldName": "Nosaukums",
    "invalidUrlTip": "URL ${URL} nav derīgs vai tam nevar piekļūt.",
    "invalidSearchSources": "Nederīgi meklēšanas avota iestatījumi",
    "errorMessageLabel": "Kļūdas ziņojums",
    "errorMessageHint": "Ieteikums: iestatiet ziņojumu, lai tas tiktu parādīts, ja nav atrasts neviens rezultāts",
    "noPrecinctFoundMsg": "Šai adresei vai izvietojumam nav atrasts neviens poligons"
  },
  "layerSelector": {
    "selectPolygonLayerLabel": "Izvēlēties laukuma slāni",
    "selectPolygonLayerHintText": "Padoms. Izmanto, lai izvēlētos laukuma slāni.",
    "selectRelatedPointLayerLabel": "Izvēlieties ar laukuma slāni saistīto punktu slāni",
    "selectRelatedPointLayerHintText": "Padoms. Izmantot, lai izvēlētos ar laukuma slāni saistīto punktu slāni",
    "polygonLayerNotHavingRelatedLayer": "Izvēlieties laukuma slāni, kam ir saistīts punktu slānis.",
    "errorInSelectingPolygonLayer": "Izvēlieties laukuma slāni, kam ir saistīts punktu slānis.",
    "errorInSelectingRelatedLayer": "Izvēlieties ar laukuma slāni saistītu punktu slāni."
  },
  "routeSetting": {
    "routeSettingTabTitle": "Virzienu iestatījumi",
    "routeServiceUrl": "Maršruta serviss",
    "buttonSet": "Iestatīt",
    "routeServiceUrlHintText": "Padoms. Noklikšķiniet uz Iestatīt, lai pārlūkotu un izvēlētostīkla analīzes maršruta servisu",
    "directionLengthUnit": "Virziena garuma vienības",
    "unitsForRouteHintText": "Padoms. Izmanto norādīto maršruta vienību rādīšanai",
    "selectRouteSymbol": "Izvēlēties maršruta rādīšanas simbolu",
    "routeSymbolHintText": "Padoms. Izmanto, lai parādītu maršruta līnijas simbolu",
    "routingDisabledMsg": "Lai aktivizētu virzienus, ArcGIS Online elementā ir jābūt aktivizētai maršrutēšanai.",
    "enableDirectionLabel": "Iespējot ceļa norādes",
    "enableDirectionText": "Ieteikums. Pārbaudiet, vai logrīkā ir iespējotas ceļa norādes"
  },
  "networkServiceChooser": {
    "arcgislabel": "Pievienot no ArcGIS Online",
    "serviceURLabel": "Pievienot servisa vietrādi URL",
    "routeURL": "Maršruta URL",
    "validateRouteURL": "Validācija",
    "exampleText": "Piemērs",
    "hintRouteURL1": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
    "hintRouteURL2": "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
    "invalidRouteServiceURL": "Norādiet derīgu maršruta servisu.",
    "rateLimitExceeded": "Pārsniegts ātruma ierobežojums. Lūdzu, vēlāk mēģiniet vēlreiz.",
    "errorInvokingService": "Nepareizs lietotājvārds vai parole."
  },
  "symbolPickerPreviewText": "Priekšskatījums:",
  "showToolToSelectLabel": "Iestatīt novietojuma pogu",
  "showToolToSelectHintText": "Padoms: nodrošina pogu novietojuma iestatīšanai kartē tā vietā, lai iestatītu novietojumu ikreiz, kad tiek noklikšķināts uz kartes"
});