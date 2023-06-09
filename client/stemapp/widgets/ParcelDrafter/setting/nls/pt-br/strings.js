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
  "setBtnLabel": "Configurar",
  "selectLabel": "Selecionar",
  "selectLayerLabel": "Selecionar Camadas de Lotes",
  "selectLayerHintText": "Sugestão: Utilize o botão configurar para selecionar o polígono de lotes e sua camada de linha relacionada",
  "layerSelector": {
    "selectedLayerNotHavingRelatedLayer": "A camada de polígono selecionada não tem uma camada relacionada válida."
  },
  "parcelLineLayer": {
    "selectLayerLabel": "Selecionar Camada de Linha Relacionada",
    "layerSettingTabLabel": "Camadas de Lotes",
    "attributeSettingTabLabel": "Configurações de Atributo",
    "advancedSettingTabLabel": "Configurações Avançadas",
    "selectLayerHintText": "Sugestão: Utilize para armazenar valores COGO na camada de linha de lotes",
    "selectFieldLegendLabel": "Selecione campos para armazenar valores COGO em camada de linha de lotes",
    "bearingFieldLabel": "Direção",
    "chordLengthFieldLabel": "Comprimento da Corda",
    "distanceFieldLabel": "Distância",
    "sequenceIdFieldLabel": "ID de Sequência",
    "radiusFieldLabel": "Raio",
    "foreignKeyFieldLabel": "Chave Externa",
    "arcLengthFieldLabel": "Comprimento do Arco",
    "lineTypeFieldLabel": "Tipo de Linha",
    "parcelPointSymbolLabel": "Símbolo de Ponto de Lotes",
    "parcelPointSymbolHintText": "Sugestão: Utilizado para exibir símbolo de ponto para a origem da linha.",
    "startOrRotationSymbolLabel": "Iniciar e Rotacionar Símbolo de Ponto",
    "startOrRotationSymbolHintText": "Dica: Utilizado para exibir o símbolo de ponto para iniciar e rotacionar.",
    "symbolPickerPreviewText": "Visualizar",
    "selectLineLayerLabel": "Selecionar Camada de Linha"
  },
  "parcelPolygonLayer": {
    "selectPolygonLayerLabel": "Selecionar Camada de Polígono",
    "selectPolygonLayerHintText": "Sugestão: Utilize a camada do polígono de lotes",
    "selectFieldLegendLabel": "Selecione campos para armazenar informações de geometria da coordenada",
    "parcelNameLabel": "Nome do Lote",
    "rotationLabel": "Rotação",
    "planNameLabel": "Nome do Plano",
    "scalingLabel": "Escala",
    "documentTypeLabel": "Tipo de Documento",
    "miscloseRatioLabel": "Taxa de Fechamento",
    "statedAreaLabel": "StatedArea",
    "miscloseDistanceLabel": "Distância de Fechamento",
    "selectPolygonLayerLabelPopUp": "Selecione uma Camada de Polígono",
    "honorSettingRbLabel": "Configurações do Pop-Up de Mapa da Web",
    "customSettingsRbLabel": "Configurações Personalizadas",
    "display": "Exibir",
    "edit": "Editar",
    "editpageName": "Nome",
    "actions": "Ações",
    "editpageAlias": "Nome Alternativo",
    "titleLabel": "Título da Seção"
  },
  "lineTypesTable": {
    "lineTypeLabel": "Tipo de Linha",
    "valueLabel": "Valor",
    "symbolLabel": "Símbolo",
    "connectionLineLabel": "Linha de Conexão",
    "boundaryLineLabel": "Linha de Limite"
  },
  "closureSetting": {
    "snappingLayerLabel": "Ajustar Camadas",
    "snappingBtnLabel": "Configurar",
    "snappingLayerHintText": "Sugestão: Selecione as camadas em que as linhas de lotes serão ajustadas.",
    "miscloseDistanceLabel": "Distância de Fechamento",
    "miscloseDistanceHintText": "Sugestão: Especifique a distância de fechamento e suas unidades.",
    "miscloseRatioLabel": "Taxa de Fechamento",
    "miscloseRatioHintText": "Sugestão: Especifique a relação e fechamento.",
    "snappingToleranceLabel": "Tolerância de Ajuste",
    "pixelLabel": "Pixels",
    "snappingToleranceHintText": "Sugestão: Especifique a tolerância de ajuste.",
    "selectLayerLabel": "Selecionar camada"
  },
  "errorMsg": {
    "bearingFieldErrMsg": "Campo Mais Próximo Inválido",
    "chordLengthErrMsg": "ChordLength Inválido",
    "distanceFieldErrMsg": "Distância Inválida",
    "sequenceIdFieldErrMsg": "SequenceId Inválido",
    "radiusFieldErrMsg": "Raio Inválido",
    "foreignKeyFieldErrMsg": "Chave Externa Inválida",
    "arcLengthFieldErrMsg": "Comprimento de Arco Inválido",
    "lineTypeFieldErrMsg": "Tipo de Linha Inválida",
    "parcelNameFieldErrMsg": "Campo de Nome de Lotes Inválido",
    "planNameFieldErrMsg": "Campo de Nome do Plano Inválido",
    "scaleFieldErrMsg": "Campo de Escala Inválido",
    "documentTypeFieldErrMsg": "Campo de Tipo de Documento Inválido",
    "miscloseRatioFieldErrMsg": "Campo de Relação de Fechamento Inválido",
    "statedAreaFieldErrMsg": "Campo de Área Declarado Inválido",
    "miscloseDistanceFieldErrMsg": "Campo de Distância de Fechamento Inválido",
    "globalIdFieldErrMsg": "A camada de polígono selecionada não tem o campo 'esriFieldTypeGlobalID' válido.",
    "invalidPolylineLayer": "Selecione camada de polilinha de lotes válida",
    "invalidPolygonLayer": "Selecione camada de polígono de lotes válida",
    "invalidMiscloseDistance": "Insira a distância de fechamento válida",
    "invalidSnappingTolerance": "Insira a tolerância de ajuste válida",
    "invalidMiscloseRatio": "Insira relação de fechamento válida",
    "selectDistinctLineTypes": "Selecione valor distinto em cada tipo da linha",
    "invalidConnectionLineType": "Valor de linha de conexão inválido",
    "invalidBoundaryLineType": "Valor de linha de limite inválido",
    "selectDistinctPolylineFields": "Selecione campo distinto para cada valor COGO.",
    "selectDistinctPolygonFields": "Selecione um campo distinto para cada informação de geometria da coordenada"
  }
});