import { AppModel } from "./scripts/AppModel.js";
import { AppView } from "./scripts/AppView.js";
import { AppController } from "./scripts/AppController.js";

const app = document.getElementById("app");
const myapp = (function () {
  AppView;
  AppModel;
  AppController;
  return {
    init: function (container) {
      const view = new AppView();
      const controller = new AppController();
      const model = new AppModel();
      view.init(container);
      model.init(view);
      controller.init(container, model);
    },
  };
})();
myapp.init(app);
