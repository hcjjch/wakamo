import { App } from "vue";

import button from "./button/button.vue";
import icon from "./icon/icon.vue";
import buttonGrounp from "./button/buttonGrounp.vue";
import { row, col } from "./layout/index";
import { checkbox, checkboxGroup } from "./checkbox/index";
import Message from "./message";
import { ISerinaUI } from "./types/type";
import { container, footer, header, main, aside } from "./container/index";
import inputVue from "./input/src/input.vue";
import upload from "./upLoad";
import progress from "./upLoad/src/progress.vue";
import { datePicker, dateRangePicker } from "./date-picker";

const uiArray: any = {
  "serina-button": button,
  "serina-icon": icon,
  "serina-button-grounp": buttonGrounp,
  "serina-row": row,
  "serina-col": col,
  "serina-checkbox": checkbox,
  "serina-checkbox-group": checkboxGroup,
  "serina-container": container,
  "serina-footer": footer,
  "serina-header": header,
  "serina-main": main,
  "serina-aside": aside,
  "serina-input": inputVue,
  "serina-upload": upload,
  "serina-progress": progress,
  "serina-date-picker": datePicker,
  "serina-date-range-picker": dateRangePicker
};

const serinaUI: ISerinaUI = {
  install: () => {}
};

serinaUI.install = (app: App): void => {
  for (const key in uiArray as object) {
    app.component(key, uiArray[key]);
  }
};

export default serinaUI;
