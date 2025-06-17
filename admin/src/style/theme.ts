import { ThemeConfig } from 'antd';
import {
  black0,
  black10,
  black100,
  black900,
  blue50,
  danger,
  info,
  primary,
  success,
  warning,
} from '@myThingsKr/emcore-js';

const primaryColor = primary[500];
const successColor = success[500];
const warningColor = warning[500];
const dangerColor = danger[500];
const infoColor = info[500];

const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
    colorSuccess: successColor,
    colorError: dangerColor,
    colorWarning: warningColor,
    colorInfo: infoColor,
    padding: 16,
    borderRadius: 4,
    fontSize: 15,
    colorBgLayout: black0,
  },
  components: {
    Layout: {
      padding: 16,
    },
    Input: {},
    Menu: {
      // margin: 20,
      // padding: 20,
      iconMarginInlineEnd: 10,
      itemBorderRadius: 4,
      itemHeight: 50,
      itemMarginBlock: 8,
      itemMarginInline: 8,
      itemPaddingInline: 20,
    },
    Button: {
      borderRadius: 6,
    },
    Typography: {
      fontSize: 15,
    },
    Table: {
      borderColor: black100,
      footerBg: black10,
      footerColor: black900,
      headerBg: black10,
      headerBorderRadius: 0,
      rowHoverBg: black10,
      selectionColumnWidth: 56,
      rowSelectedBg: blue50,
      cellPaddingInlineSM: 16,
      cellPaddingBlockSM: 8,
    },
  },
};

export default theme;
