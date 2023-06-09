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
  "_widgetLabel": "Nástroj pro návrh parcely",
  "newTraverseButtonLabel": "Začít nový polygonový pořad",
  "invalidConfigMsg": "Neplatná konfigurace",
  "geometryServiceURLNotFoundMSG": "Nelze načíst adresu URL služby geometrie",
  "editTraverseButtonLabel": "Upravit polygonový pořad",
  "mapTooltipForStartNewTraverse": "Nejprve vyberte bod na mapě nebo jej zadejte níže",
  "mapTooltipForEditNewTraverse": "Vyberte parcelu, kterou chcete upravit",
  "mapTooltipForUpdateStartPoint": "Kliknutím aktualizujete počáteční bod",
  "mapTooltipForScreenDigitization": "Kliknutím přidáte bod parcely",
  "mapTooltipForUpdatingRotaionPoint": "Kliknutím aktualizujete bod rotace",
  "mapTooltipForRotate": "Tažením otáčejte",
  "mapTooltipForScale": "Tažením změňte měřítko",
  "backButtonTooltip": "Zpět",
  "newTraverseTitle": "Nový polygonový pořad",
  "editTraverseTitle": "Upravit polygonový pořad",
  "clearingDataConfirmationMessage": "Změny budou zrušeny, chcete pokračovat?",
  "unableToFetchParcelMessage": "Parcelu nelze načíst.",
  "unableToFetchParcelLinesMessage": "Parcelní linie nelze načíst.",
  "planSettings": {
    "planSettingsTitle": "Nastavení",
    "directionOrAngleTypeLabel": "Typ směru nebo úhlu",
    "directionOrAngleUnitsLabel": "Jednotky směru nebo úhlu",
    "distanceAndLengthUnitsLabel": "Jednotky vzdálenosti a délky",
    "areaUnitsLabel": "Plošné jednotky",
    "circularCurveParameters": "Parametry kruhové křivky",
    "northAzimuth": "Azimut k severu",
    "southAzimuth": "Azimut k jihu",
    "quadrantBearing": "Kvadrant",
    "radiusAndChordLength": "Poloměr a délka tětivy",
    "radiusAndArcLength": "Poloměr a délka kruhového oblouku",
    "expandGridTooltipText": "Rozbalit mřížku",
    "collapseGridTooltipText": "Sbalit mřížku",
    "zoomToLocationTooltipText": "Přiblížit na polohu",
    "onScreenDigitizationTooltipText": "Digitalizovat",
    "updateRotationPointTooltipText": "Aktualizovat bod rotace"
  },
  "traverseSettings": {
    "bearingLabel": "Azimut",
    "lengthLabel": "Délka",
    "radiusLabel": "Poloměr",
    "noMiscloseCalculated": "Závěrová chyba nebyla vypočtena",
    "traverseMiscloseBearing": "Směr závěrové chyby",
    "traverseAccuracy": "Přesnost",
    "accuracyHigh": "Vysoká",
    "traverseDistance": "Vzdálenost závěrové chyby",
    "traverseMiscloseRatio": "Poměr závěrové chyby",
    "traverseStatedArea": "Uvedená oblast",
    "traverseCalculatedArea": "Vypočtená oblast",
    "addButtonTitle": "Přidat",
    "deleteButtonTitle": "Odebrat",
    "compassRuleAppliedHint": "Vypočtená vzdálenost závěrové chyby je menší než nastavená vzdálenost závěrové chyby, parcela bude automaticky přizpůsobena pomocí pravidla kompasu"
  },
  "parcelTools": {
    "rotationToolLabel": "Úhel",
    "scaleToolLabel": "Měřítko"
  },
  "newTraverse": {
    "invalidBearingMessage": "Neplatný směr",
    "invalidLengthMessage": "Neplatná délka",
    "invalidRadiusMessage": "Neplatný poloměr",
    "negativeLengthMessage": "Platné pouze pro křivky",
    "enterValidValuesMessage": "Zadejte platné hodnoty.",
    "enterValidParcelInfoMessage": "Zadejte platné informace o parcele, které se uloží.",
    "unableToDrawLineMessage": "Linii nelze nakreslit.",
    "invalidEndPointMessage": "Neplatný koncový bod, linii nelze nakreslit.",
    "lineTypeLabel": "Typ linie"
  },
  "planInfo": {
    "requiredText": "(povinné)",
    "optionalText": "(volitelné)",
    "parcelNamePlaceholderText": "Název parcely",
    "parcelDocumentTypeText": "Typ dokumentu",
    "planNamePlaceholderText": "Název plánu",
    "cancelButtonLabel": "Storno",
    "saveButtonLabel": "Uložit",
    "saveNonClosedParcelConfirmationMessage": "Zadaná parcela není uzavřena, chcete přesto pokračovat a uložit pouze parcelní linie?",
    "unableToCreatePolygonParcel": "Polygon parcely nelze vytvořit.",
    "unableToSavePolygonParcel": "Polygon parcely nelze uložit.",
    "unableToSaveParcelLines": "Parcelní linie nelze uložit.",
    "unableToUpdateParcelLines": "Parcelní linie nelze aktualizovat.",
    "parcelSavedSuccessMessage": "Parcela byla úspěšně uložena.",
    "parcelDeletedSuccessMessage": "Parcela byla úspěšně odstraněna.",
    "parcelDeleteErrorMessage": "Chyba při odstraňování parcely.",
    "enterValidParcelNameMessage": "Zadejte platný název parcely.",
    "enterValidPlanNameMessage": "Zadejte platný název plánu.",
    "enterValidDocumentTypeMessage": "Neplatný typ dokumentu",
    "enterValidStatedAreaNameMessage": "Zadejte platný název uvedené oblasti.",
    "showAttributeList": "Zobrazit seznam atributů",
    "hideAttributeList": "Skrýt seznam atributů"
  },
  "xyInput": {
    "explanation": "Zadejte souřadnice ve stejném souřadnicovém systému, jako je vrstva."
  }
});