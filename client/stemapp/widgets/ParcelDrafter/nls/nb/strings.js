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
  "_widgetLabel": "Parcel Drafter",
  "newTraverseButtonLabel": "Start nytt polygondrag",
  "invalidConfigMsg": "Ugyldig konfigurasjon",
  "geometryServiceURLNotFoundMSG": "Kan ikke hente URL for geometritjeneste",
  "editTraverseButtonLabel": "Rediger polygondrag",
  "mapTooltipForStartNewTraverse": "Velg et punkt på kartet eller skriv nedenfor for å begynne",
  "mapTooltipForEditNewTraverse": "Velg en teig som skal redigeres",
  "mapTooltipForUpdateStartPoint": "Klikk for å oppdatere startpunkt",
  "mapTooltipForScreenDigitization": "Klikk for å legge til teigpunkt",
  "mapTooltipForUpdatingRotaionPoint": "Klikk for å oppdatere rotasjonspunkt",
  "mapTooltipForRotate": "Dra for å rotere",
  "mapTooltipForScale": "Dra for å skalere",
  "backButtonTooltip": "Tilbake",
  "newTraverseTitle": "Nytt polygondrag",
  "editTraverseTitle": "Rediger polygondrag",
  "clearingDataConfirmationMessage": "Endringene lagres ikke. Vil du fortsette?",
  "unableToFetchParcelMessage": "Kan ikke hente teig.",
  "unableToFetchParcelLinesMessage": "Kan ikke hente teiglinjer.",
  "planSettings": {
    "planSettingsTitle": "Innstillinger",
    "directionOrAngleTypeLabel": "Retning- eller vinkeltype",
    "directionOrAngleUnitsLabel": "Retning- eller vinkelenheter",
    "distanceAndLengthUnitsLabel": "Avstands- eller lengdeenheter",
    "areaUnitsLabel": "Arealenheter",
    "circularCurveParameters": "Sirkulære kurveparametre",
    "northAzimuth": "Nordlig asimut",
    "southAzimuth": "Sørlig asimut",
    "quadrantBearing": "Kvadrantpeiling",
    "radiusAndChordLength": "Radius og kordelengde",
    "radiusAndArcLength": "Radius og buelengde",
    "expandGridTooltipText": "Vis rutenett",
    "collapseGridTooltipText": "Skjul rutenett",
    "zoomToLocationTooltipText": "Zoom til lokasjon",
    "onScreenDigitizationTooltipText": "Digitaliser",
    "updateRotationPointTooltipText": "Oppdater rotasjonspunkt"
  },
  "traverseSettings": {
    "bearingLabel": "Peiling",
    "lengthLabel": "Lengde",
    "radiusLabel": "Radius",
    "noMiscloseCalculated": "Ikke lukket ikke beregnet",
    "traverseMiscloseBearing": "Ikke lukket peiling",
    "traverseAccuracy": "Nøyaktighet",
    "accuracyHigh": "Høy",
    "traverseDistance": "Ikke lukket avstand",
    "traverseMiscloseRatio": "Ikke lukket forhold",
    "traverseStatedArea": "Oppgitt areal",
    "traverseCalculatedArea": "Beregnet areal",
    "addButtonTitle": "Legg til",
    "deleteButtonTitle": "Fjern",
    "compassRuleAppliedHint": "Den beregnede ikke lukkede avstand er mindre enn den konfigurerte ikke lukkede avstanden,\n pakken justeres automatisk ved hjelp av kompassregel"
  },
  "parcelTools": {
    "rotationToolLabel": "Vinkel",
    "scaleToolLabel": "Målestokk"
  },
  "newTraverse": {
    "invalidBearingMessage": "Ugyldig peiling.",
    "invalidLengthMessage": "Ugyldig lengde.",
    "invalidRadiusMessage": "Ugyldig radius.",
    "negativeLengthMessage": "Bare gyldig for kurver",
    "enterValidValuesMessage": "Angi gyldige verdier.",
    "enterValidParcelInfoMessage": "Angi gyldig teiginformasjon som skal lagres.",
    "unableToDrawLineMessage": "Kan ikke tegne linje.",
    "invalidEndPointMessage": "Ugyldig sluttpunkt. Kan ikke tegne linje.",
    "lineTypeLabel": "Linjetype"
  },
  "planInfo": {
    "requiredText": "(obligatorisk)",
    "optionalText": "(valgfritt)",
    "parcelNamePlaceholderText": "Teignavn",
    "parcelDocumentTypeText": "Dokumenttype",
    "planNamePlaceholderText": "Plannavn",
    "cancelButtonLabel": "Avbryt",
    "saveButtonLabel": "Lagre",
    "saveNonClosedParcelConfirmationMessage": "Den angitte teigen er ikke lukket. Vil du fortsette og kun lagre teiglinjer?",
    "unableToCreatePolygonParcel": "Kan ikke opprette teigpolygon.",
    "unableToSavePolygonParcel": "Kan ikke lagre teigpolygon.",
    "unableToSaveParcelLines": "Kan ikke lagre teiglinjer.",
    "unableToUpdateParcelLines": "Kan ikke oppdatere teiglinjer.",
    "parcelSavedSuccessMessage": "Lagring av teig var vellykket.",
    "parcelDeletedSuccessMessage": "Eiendom er slettet.",
    "parcelDeleteErrorMessage": "Feil ved sletting av eiendom.",
    "enterValidParcelNameMessage": "Angi et gyldig teignavn.",
    "enterValidPlanNameMessage": "Angi et gyldig plannavn.",
    "enterValidDocumentTypeMessage": "Ugyldig dokumenttype",
    "enterValidStatedAreaNameMessage": "Angi et gyldig angitt område.",
    "showAttributeList": "Vis attributtliste",
    "hideAttributeList": "Skul attributtliste"
  },
  "xyInput": {
    "explanation": "Angi koordinater i samme romlig referanse som laget"
  }
});