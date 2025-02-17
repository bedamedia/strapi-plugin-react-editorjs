import wysiwyg_field_register from "../../custom_fields/wysiwyg_field_register";
import pluginPkg from "../../package.json";
// import Wysiwyg from "./components/Wysiwyg";
import pluginId from "./pluginId";

export default {
  register(app) {
    // executes as soon as the plugin is loaded
    const pluginDescription =
      pluginPkg.strapi?.description || pluginPkg.description;

    const name = pluginPkg.strap?.name ?? pluginPkg.name;
    console.log("🚀 ~ register ~ name:", name);

    app.registerPlugin({
      id: pluginId,
      initializer: () => null,
      isReady: false,
      name,
    });

    wysiwyg_field_register.adminRegister(app);
  },
  bootstrap() {},
};
