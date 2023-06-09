﻿///////////////////////////////////////////////////////////////////////////
// Copyright ï¿½ Esri. All Rights Reserved.
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
  "configText": "Angi konfigurasjonstekst:",
  "generalSettings": {
    "tabTitle": "Generelle innstillinger",
    "measurementUnitLabel": "Kostnadsenhet",
    "currencyLabel": "Kostnadssymbol",
    "roundCostLabel": "Avrundet kostnad",
    "projectOutputSettings": "Innstillinger for prosjektutdata",
    "typeOfProjectAreaLabel": "Type prosjektområde",
    "bufferDistanceLabel": "Bufferavstand",
    "csvReportExportLabel": "Tillat at bruker eksporterer rapport for prosjektet",
    "editReportSettingsBtnTooltip": "Rediger rapportinnstillinger",
    "roundCostValues": {
      "twoDecimalPoint": "To desimaler",
      "nearestWholeNumber": "Nærmeste hele tall",
      "nearestTen": "Nærmeste tier",
      "nearestHundred": "Nærmeste hundrer",
      "nearestThousand": "Nærmeste tusener",
      "nearestTenThousands": "Nærmeste titusener"
    },
    "reportSettings": {
      "reportSettingsPopupTitle": "Rapportinnstillinger",
      "reportNameLabel": "Rapportnavn (valgfritt):",
      "checkboxLabel": "Vis",
      "layerTitle": "Tittel",
      "columnLabel": "Etikett",
      "duplicateMsg": "Dupliser etikett"
    },
    "projectAreaType": {
      "outline": "Omriss",
      "buffer": "Lag buffer"
    },
    "errorMessages": {
      "currency": "Ugyldig valutaenhet",
      "bufferDistance": "Ugyldig bufferavstand",
      "outOfRangebufferDistance": "Verdien må være større enn 0 og mindre enn eller lik 100"
    }
  },
  "projectSettings": {
    "tabTitle": "Prosjektinnstillinger",
    "costingGeometrySectionTitle": "Definer geografi for kostnadsberegning (valgfritt)",
    "costingGeometrySectionNote": "Merk: Konfigurasjon av dette laget gjør det mulig for brukeren å angi kostnadsligninger for geoobjektmaler basert på geografi.",
    "projectTableSectionTitle": "Mulighet for å lagre / laste inn prosjektinnstillinger (valgfritt)",
    "projectTableSectionNote": "Merk: Konfigurasjon av alle tabeller og lag gjør det mulig for brukeren å lagre / laste inn prosjekter for senere bruk.",
    "costingGeometryLayerLabel": "Geometrilag for kostnadsberegning",
    "fieldLabelGeography": "Felt-til-etikett-geografi",
    "projectAssetsTableLabel": "Tabell over prosjektressurser",
    "projectMultiplierTableLabel": "Tabell over multiplikator for tilleggskostnad for prosjekt",
    "projectLayerLabel": "Prosjektlag",
    "configureFieldsLabel": "Konfigurer felt",
    "fieldDescriptionHeaderTitle": "Feltbeskrivelse",
    "layerFieldsHeaderTitle": "Lagfelt",
    "selectLabel": "Velg",
    "errorMessages": {
      "duplicateLayerSelection": "${layerName} er allerede valgt",
      "invalidConfiguration": "Velg ${fieldsString}"
    },
    "costingGeometryHelp": "<p>Polygonlag med følgende betingelser vises: <br/><li> Laget må ha en spørringsfunksjon</li><li> Laget må ha et GlobalID-felt</li></p>",
    "fieldToLabelGeographyHelp": "<p>Strengen og de numeriske feltene for det valgte geometrilaget for kostnadsberegning vises i rullegardinlisten Felt-til-etikett-geografi.</p>",
    "projectAssetsTableHelp": "<p>Tabell(er) med følgende betingelser vises: <br/><li>Tabellen må ha redigeringsfunksjoner, nærmere bestemt Opprett, Slett og Oppdater</li> <li>Tabellen må ha seks felt med nøyaktig navn og datatype:</li><ul><li> AssetGUID (GUID-typefelt)</li><li> CostEquation (strengtypefelt)</li><li> Scenario (strengtypefelt)</li><li> TemplateName (strengtypefelt)</li><li> GeographyGUID (GUID-typefelt)</li><li> ProjectGUID (GUID-typefelt)</li></ul> </p>",
    "projectMultiplierTableHelp": "<p>Tabell(er) med følgende betingelser vises: <br/> <li>Tabellen må ha redigeringsfunksjoner, nærmere bestemt Opprett, Slett og Oppdater</li> <li>Tabellen må ha fem felt med nøyaktig navn og datatype:</li><ul><li> Description (strengtypefelt)</li><li> Type (strengtypefelt)</li><li> Value (Float/Double-typefelt)</li><li> Costindex (heltallstypefelt)</li><li> ProjectGUID (GUID-typefelt))</li></ul> </p>",
    "projectLayerHelp": "<p>Polygonlag med følgende betingelser vises: <br/> <li>Laget må ha redigeringsfunksjoner, nærmere bestemt Opprett, Slett og Oppdater</li> <li>Laget må ha fem felt med nøyaktig navn og datatype:</li><ul><li>ProjectName (strengtypefelt)</li><li>Description (strengtypefelt)</li><li>Totalassetcost (Float/Double-typefelt)</li><li>Grossprojectcost (Float/Double-typefelt)</li><li>GlobalID (GlobalID-typefelt)</li></ul> </p>",
    "pointLayerCentroidLabel": "Punktlagets tyngdepunkt",
    "selectRelatedPointLayerDefaultOption": "Velg",
    "pointLayerHintText": "<p>Punktlag med følgende vilkår vises: <br/> <li>\tLaget må ha et Prosjekt-ID-felt (av GUID-type)</li><li>\tLaget må ha redigeringsfunksjonene Opprett, Slett og Oppdater</li></p>"
  },
  "layerSettings": {
    "tabTitle": "Laginnstillinger",
    "layerNameHeaderTitle": "Lagnavn",
    "layerNameHeaderTooltip": "Liste over lag i kartet",
    "EditableLayerHeaderTitle": "Redigerbar",
    "EditableLayerHeaderTooltip": "Inkluder laget og malene i miniprogrammet for kostnadsberegning",
    "SelectableLayerHeaderTitle": "Kan velges",
    "SelectableLayerHeaderTooltip": "Geometrien fra geoobjektet kan brukes til å generere et nytt kostnadselement",
    "fieldPickerHeaderTitle": "Prosjekt-ID (valgfritt)",
    "fieldPickerHeaderTooltip": "Valgfritt felt (for strengtypen) for lagring av Prosjekt-ID i",
    "selectLabel": "Velg",
    "noAssetLayersAvailable": "Finner ingen ressurslag i valgt webkart",
    "disableEditableCheckboxTooltip": "Dette laget har ikke redigeringsfunksjoner",
    "missingCapabilitiesMsg": "Laget mangler følgende funksjoner:",
    "missingGlobalIdMsg": "Laget mangler feltet GlobalId.",
    "create": "Opprett",
    "update": "Oppdater",
    "deleteColumnLabel": "Slett",
    "attributeSettingHeaderTitle": "Attributtinnstillinger",
    "addFieldLabelTitle": "Legg til attributter",
    "layerAttributesHeaderTitle": "Lagattributter",
    "projectLayerAttributesHeaderTitle": "Prosjektlagattributter",
    "attributeSettingsPopupTitle": "Innstillinger for lagattributter"
  },
  "costingInfo": {
    "tabTitle": "Kostnadsberegningsinformasjon",
    "proposedMainsLabel": "Foreslått hovedledning",
    "addCostingTemplateLabel": "Legg til kostnadsberegningsmal",
    "manageScenariosTitle": "Administrer scenarioer",
    "featureTemplateTitle": "Geoobjektmal",
    "costEquationTitle": "Kostnadsligning",
    "geographyTitle": "Geografi",
    "scenarioTitle": "Scenario",
    "actionTitle": "Handlinger",
    "scenarioNameLabel": "Scenarionavn",
    "addBtnLabel": "Legg til",
    "srNoLabel": "Nei.",
    "deleteLabel": "Slett",
    "duplicateScenarioName": "Dupliser scenarionavn",
    "hintText": "<div>Tips: Bruk følgende nøkkelord</div><ul><li><b>{TOTALCOUNT}</b>: Bruker det totale antallet av samme type ressurs i en geografi</li> <li><b>{MEASURE}</b>: Bruker lengde for linjeressurs og areal for polygonressurs</li><li><b>{TOTALMEASURE}</b>: Bruker den samlede lengden for linjeressursen og det samlede arealet for polygonressursen av samme type i en geografi</li></ul>Du kan bruke funksjoner som:<ul><li>Math.abs(-100)</li><li>Math.floor({TOTALMEASURE})</li></ul>Rediger kostnadsligningen ut fra prosjektbehovene dine.",
    "noneValue": "Ingen",
    "requiredCostEquation": "Ugyldig kostnadsligning for ${layerName} : ${templateName}",
    "duplicateTemplateMessage": "Duplisert maloppføring finnes for ${layerName} : ${templateName}",
    "defaultEquationRequired": "Standardligning kreves for ${layerName} : ${templateName}",
    "validCostEquationMessage": "Angi en gyldig kostnadsligning",
    "costEquationHelpText": "Rediger kostnadsligningen ut fra prosjektbehovene dine",
    "scenarioHelpText": "Velg scenario ut fra prosjektbehovene dine",
    "copyRowTitle": "Kopier rad",
    "noTemplateAvailable": "Legg til minst én mal for ${layerName}",
    "manageScenarioLabel": "Administrer scenario",
    "noLayerMessage": "Angi minst ett lag i ${tabName}",
    "noEditableLayersAvailable": "Lag(ene) skal merkes som redigerbare i fanen med laginnstillinger",
    "updateProjectCostCheckboxLabel": "Oppdater prosjektets beregninger",
    "updateProjectCostEquationHint": "Tips: Dette gjør det mulig for brukeren å oppdatere kostnadsberegninger som allerede er lagt til eksisterende prosjekter, med de nye beregningene som er utført nedenfor på basis av geoobjektmalen, geografien og scenarioet. Hvis kombinasjonen ikke blir funnet, settes den til standard kostnadsberegning, dvs. at geografi og scenario settes til Ingen. Hvis geoobjektmalen er fjernet, settes kostnaden til 0."
  },
  "statisticsSettings": {
    "tabTitle": "Tilleggsinnstillinger",
    "addStatisticsLabel": "Legg til statistikk",
    "fieldNameTitle": "Felt",
    "statisticsTitle": "Etikett",
    "addNewStatisticsText": "Legg til ny statistikk",
    "deleteStatisticsText": "Slett statistikk",
    "moveStatisticsUpText": "Flytt statistikk opp",
    "moveStatisticsDownText": "Flytt statistikk ned",
    "selectDeselectAllTitle": "Merk alle"
  },
  "projectCostSettings": {
    "addProjectCostLabel": "Legg til ytterligere prosjektkostnader",
    "additionalCostValueColumnHeader": "Verdi",
    "invalidProjectCostMessage": "Ugyldig oppføring for prosjektkostnad",
    "additionalCostLabelColumnHeader": "Etikett",
    "additionalCostTypeColumnHeader": "Type"
  },
  "statisticsType": {
    "countLabel": "Antall",
    "averageLabel": "Gjennomsnitt",
    "maxLabel": "Maksimum",
    "minLabel": "Minimum",
    "summationLabel": "Summering",
    "areaLabel": "Areal",
    "lengthLabel": "Lengde"
  }
});