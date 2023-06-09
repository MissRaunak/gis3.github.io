﻿///////////////////////////////////////////////////////////////////////////
// Copyright Â© Esri. All Rights Reserved.
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
  "_widgetLabel": "Byggnadsutfärdare",
  "newTraverseButtonLabel": "Påbörja nytt polygontåg",
  "invalidConfigMsg": "Ogiltig konfiguration",
  "geometryServiceURLNotFoundMSG": "Det gick inte att hämta webbadress till geometritjänst",
  "editTraverseButtonLabel": "Redigera polygontåg",
  "mapTooltipForStartNewTraverse": "Börja genom att välja en punkt på kartan eller skriva nedan",
  "mapTooltipForEditNewTraverse": "Välj en byggnad att redigera",
  "mapTooltipForUpdateStartPoint": "Klicka för att uppdatera startpunkten",
  "mapTooltipForScreenDigitization": "Klicka för att lägga till en byggnadspunkt",
  "mapTooltipForUpdatingRotaionPoint": "Klicka för att uppdatera rotationspunkten",
  "mapTooltipForRotate": "Dra för att rotera",
  "mapTooltipForScale": "Dra för att skala",
  "backButtonTooltip": "Bakåt",
  "newTraverseTitle": "Nytt polygontåg",
  "editTraverseTitle": "Redigera polygontåg",
  "clearingDataConfirmationMessage": "Ändringarna ignoreras. Vill du fortsätta?",
  "unableToFetchParcelMessage": "Det gick inte att hämta byggnaden.",
  "unableToFetchParcelLinesMessage": "Det gick inte att hämta byggnadslinjerna.",
  "planSettings": {
    "planSettingsTitle": "Inställningar",
    "directionOrAngleTypeLabel": "Riktnings- eller vinkeltyp",
    "directionOrAngleUnitsLabel": "Riktnings- eller vinkelenheter",
    "distanceAndLengthUnitsLabel": "Avstånd och längdenheter",
    "areaUnitsLabel": "Areaenheter",
    "circularCurveParameters": "Cirkulära kurvparametrar",
    "northAzimuth": "Nordlig azimut",
    "southAzimuth": "Sydlig azimut",
    "quadrantBearing": "Kvadrantposition",
    "radiusAndChordLength": "Radie- och kordalängd",
    "radiusAndArcLength": "Radie- och båglängd",
    "expandGridTooltipText": "Expandera rutnät",
    "collapseGridTooltipText": "Komprimera rutnät",
    "zoomToLocationTooltipText": "Zooma till plats",
    "onScreenDigitizationTooltipText": "Digitalisera",
    "updateRotationPointTooltipText": "Uppdatera rotationspunkt"
  },
  "traverseSettings": {
    "bearingLabel": "Bäring",
    "lengthLabel": "Längd",
    "radiusLabel": "Radie",
    "noMiscloseCalculated": "Misclose har inte beräknats",
    "traverseMiscloseBearing": "Misclose-bäring",
    "traverseAccuracy": "Noggrannhet",
    "accuracyHigh": "Hög",
    "traverseDistance": "Misclose-avstånd",
    "traverseMiscloseRatio": "Misclose-förhållande",
    "traverseStatedArea": "Angivet område",
    "traverseCalculatedArea": "Beräknat område",
    "addButtonTitle": "Lägg till",
    "deleteButtonTitle": "Ta bort",
    "compassRuleAppliedHint": "Beräknat misclose-avstånd är mindre än konfigurerat misclose-avstånd,\n fastigheten justeras automatiskt med kompassregeln."
  },
  "parcelTools": {
    "rotationToolLabel": "Vinkel",
    "scaleToolLabel": "Skala"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ogiltig bäring.",
    "invalidLengthMessage": "Ogiltig längd.",
    "invalidRadiusMessage": "Ogiltig radie.",
    "negativeLengthMessage": "Endast giltig för kurvor",
    "enterValidValuesMessage": "Ange giltiga värden.",
    "enterValidParcelInfoMessage": "Ange giltig byggnadsinfo så att det går att spara.",
    "unableToDrawLineMessage": "Det gick inte att rita linjen.",
    "invalidEndPointMessage": "Ogiltig slutpunkt. Det gick inte att rita linjen.",
    "lineTypeLabel": "Linjetyp"
  },
  "planInfo": {
    "requiredText": "(obligatoriskt)",
    "optionalText": "(valfritt)",
    "parcelNamePlaceholderText": "Byggnadsnamn",
    "parcelDocumentTypeText": "Dokumenttyp",
    "planNamePlaceholderText": "Plannamn",
    "cancelButtonLabel": "Avbryt",
    "saveButtonLabel": "Spara",
    "saveNonClosedParcelConfirmationMessage": "Den angivna byggnaden är inte avslutad. Vill du ändå fortsätta och bara spara byggnadslinjerna?",
    "unableToCreatePolygonParcel": "Det gick inte att skapa byggnadspolygonen.",
    "unableToSavePolygonParcel": "Det gick inte att spara byggnadspolygonen.",
    "unableToSaveParcelLines": "Det gick inte att spara byggnadslinjerna.",
    "unableToUpdateParcelLines": "Det gick inte att uppdatera byggnadslinjerna.",
    "parcelSavedSuccessMessage": "Byggnaden har sparats.",
    "parcelDeletedSuccessMessage": "Fastigheten har tagits bort.",
    "parcelDeleteErrorMessage": "Fel vid borttagningen av fastigheten.",
    "enterValidParcelNameMessage": "Ange ett giltigt byggnadsnamn.",
    "enterValidPlanNameMessage": "Ange ett giltigt plannamn.",
    "enterValidDocumentTypeMessage": "Ogiltig dokumenttyp.",
    "enterValidStatedAreaNameMessage": "Ange ett giltigt angivet område.",
    "showAttributeList": "Visa attributlista",
    "hideAttributeList": "Dölj attributlista"
  },
  "xyInput": {
    "explanation": "Ange koordinater i samma geografiska referens som lagret"
  }
});