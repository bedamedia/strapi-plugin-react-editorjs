import wysiwyg_field_register from "../../custom_fields/wysiwyg_field_register";
import pluginPkg from "../../package.json";
// import Wysiwyg from "./components/Wysiwyg";
import pluginId from "./pluginId";
import { Initializer } from "./components/Initializer";

export default {
  register(app) {
    // executes as soon as the plugin is loaded
    const pluginDescription =
      pluginPkg.strapi?.description || pluginPkg.description;

    const name = pluginPkg.strapi?.name ?? pluginPkg.name;

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      name,
    });

    wysiwyg_field_register.adminRegister(app);
  },
  bootstrap() {},
};
