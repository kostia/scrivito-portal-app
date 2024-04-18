import {
  provideDataValues,
  provideAttributeLocalizers,
} from '../../utils/dataValuesConfig'
import { Order } from './OrderDataClass'

provideDataValues(Order, {
  mainStatus: [
    'PSA_SAP_MAI_ORD_CNC_BEA',
    'PSA_SAP_MAI_ORD_CNC_EIN',
    'PSA_SAP_MAI_QUO_ORD_PRP',
  ],
  status: [
    'PSA_PRO_ORD_CLS',
    'PSA_PRO_ORD_INC',
    'PSA_PRO_ORD_PSI_0',
    'PSA_PRO_ORD_PSI_1',
    'PSA_PRO_ORD_PSI_2',
    'PSA_PRO_ORD_PSI_3',
    'PSA_PRO_ORD_PSI_4',
    'PSA_PRO_ORD_PSI_5',
    'PSA_PRO_ORD_PSI_6',
    'PSA_PRO_ORD_PSI_7',
    'PSA_PRO_ORD_PSI_8',
    'PSA_PRO_ORD_PSI_9',
    'PSA_PRO_ORD_VER',
    'PSA_PRO_ORD_WRK',
  ],
  termsOfDelivery: [
    'FOA',
    'FOR',
    'PSI_TOD_DAP',
    'PSI_TOD_DAT',
    'RFC_TOD_CFR',
    'RFC_TOD_CIF',
    'RFC_TOD_CIP',
    'RFC_TOD_CPT',
    'RFC_TOD_DAF',
    'RFC_TOD_DCP',
    'RFC_TOD_DDP',
    'RFC_TOD_DDU',
    'RFC_TOD_DEQ',
    'RFC_TOD_DES',
    'RFC_TOD_EXQ',
    'RFC_TOD_EXW',
    'RFC_TOD_FAS',
    'RFC_TOD_FCA',
    'RFC_TOD_FH',
    'RFC_TOD_FOB',
    'RFC_TOD_UN',
  ],
  termsOfPayment: [
    'PSA_TOP_10',
    'PSA_TOP_20',
    'PSA_TOP_50',
    'PSA_TOP_60',
    'PSI_TOP_00',
    'PSI_TOP_10',
    'PSI_TOP_20',
    'PSI_TOP_30',
    'PSI_TOP_40',
    'RFC_TOP_NT60',
  ],
  type: [
    'PSA_ORD_STY_GEN_OVR',
    'PSA_ORD_STY_NEW',
    'PSA_ORD_STY_SRV',
    'PSA_ORD_STY_STD',
  ],
})

provideAttributeLocalizers(Order, {
  mainStatus: {
    PSA_SAP_MAI_ORD_CNC_BEA: 'Order processing',
    PSA_SAP_MAI_ORD_CNC_EIN: 'Order inflow',
    PSA_SAP_MAI_QUO_ORD_PRP: 'Evaluation',
  },
  status: {
    PSA_PRO_ORD_CLS: 'order completed',
    PSA_PRO_ORD_INC: 'order entry',
    PSA_PRO_ORD_PSI_0: 'In ERP entered',
    PSA_PRO_ORD_PSI_1: 'In ERP scheduled/allocated',
    PSA_PRO_ORD_PSI_2: 'In ERP with invoice',
    PSA_PRO_ORD_PSI_3: 'In ERP partial delivery',
    PSA_PRO_ORD_PSI_4: 'In ERP partial delivery/partial invoice',
    PSA_PRO_ORD_PSI_5: 'In ERP partial delivery/full invoice',
    PSA_PRO_ORD_PSI_6: 'In ERP delivery',
    PSA_PRO_ORD_PSI_7: 'In ERP delivery/partial invoice',
    PSA_PRO_ORD_PSI_8: 'In ERP canceled',
    PSA_PRO_ORD_PSI_9: 'In ERP completed',
    PSA_PRO_ORD_VER: 'discarded; copied to new version',
    PSA_PRO_ORD_WRK: 'order in progress',
  },
  termsOfDelivery: {
    FOA: 'FOB Airport Named airport of departure',
    FOR: 'Free on Rail Named departure point',
    PSI_TOD_DAP: 'Delivered At Place',
    PSI_TOD_DAT: 'Delivered At Terminal',
    RFC_TOD_CFR: 'cost and freight',
    RFC_TOD_CIF: 'cost, insurance & freight',
    RFC_TOD_CIP: 'carriage and insurance paid to',
    RFC_TOD_CPT: 'carriage paid to',
    RFC_TOD_DAF: 'delivered at frontier',
    RFC_TOD_DCP: '',
    RFC_TOD_DDP: 'delivered duty paid',
    RFC_TOD_DDU: 'delivered duty unpaid',
    RFC_TOD_DEQ: 'delivered ex quay',
    RFC_TOD_DES: 'delivered ex ship',
    RFC_TOD_EXQ: '',
    RFC_TOD_EXW: 'ex works',
    RFC_TOD_FAS: 'free alongside ship',
    RFC_TOD_FCA: 'free carrier',
    RFC_TOD_FH: '',
    RFC_TOD_FOB: 'free on board',
    RFC_TOD_UN: '',
  },
  termsOfPayment: {
    PSA_TOP_10: 'cash payable within 14 days',
    PSA_TOP_20: 'cash',
    PSA_TOP_50: 'by C.O.D.',
    PSA_TOP_60: 'by order',
    PSI_TOP_00: '[00] ERP Payment target',
    PSI_TOP_10: '[10] 8 days 2%, 30 days net',
    PSI_TOP_20: '[20] immediate net',
    PSI_TOP_30: '[30] 30 days net',
    PSI_TOP_40: 'Payment target (ERP 40)',
    RFC_TOP_NT60: 'Net 60',
  },
  type: {
    PSA_ORD_STY_GEN_OVR: 'General overhaul',
    PSA_ORD_STY_NEW: 'Re-equip machine',
    PSA_ORD_STY_SRV: 'Services',
    PSA_ORD_STY_STD: 'Plant',
  },
})