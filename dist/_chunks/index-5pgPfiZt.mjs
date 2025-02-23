import "react";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
const name$1 = "strapi-plugin-react-editorjs";
const strapi = {
  name: "editorjs"
};
const pluginPkg$1 = {
  name: name$1,
  strapi
};
const pluginPkg = pluginPkg$1;
const pluginId$1 = pluginPkg.name.replace(/^strapi-plugin-react-/i, "");
var pluginId_1 = pluginId$1;
const PluginId = /* @__PURE__ */ getDefaultExportFromCjs(pluginId_1);
const pluginId = pluginId_1;
const name = "wysiwyg";
const type = "richtext";
const serverRegister = ({ strapi: strapi2 }) => {
  strapi2.customFields.register({
    name,
    plugin: pluginId,
    type,
    inputSize: {
      // optional
      default: 12,
      isResizable: true
    }
  });
};
const adminRegister = (app) => {
  app.customFields.register({
    name,
    pluginId,
    type,
    intlLabel: {
      id: name,
      defaultMessage: name
    },
    intlDescription: {
      id: name,
      defaultMessage: name
    },
    // icon: ColorPickerIcon, // don't forget to create/import your icon component
    components: {
      Input: async () => import(
        /* webpackChunkName: "input-component" */
        "./index-lq9LMhJD.mjs"
      )
    },
    options: {
      // declare options here
    }
  });
};
var wysiwyg_field_register = {
  serverRegister,
  adminRegister
};
const wysiwyg_field_register$1 = /* @__PURE__ */ getDefaultExportFromCjs(wysiwyg_field_register);
const index = {
  register(app) {
    const name2 = pluginPkg$1.strapi?.name;
    app.registerPlugin({
      id: PluginId,
      initializer: () => null,
      name: name2
    });
    wysiwyg_field_register$1.adminRegister(app);
  },
  bootstrap() {
  }
};
export {
  PluginId as P,
  commonjsGlobal as c,
  getDefaultExportFromCjs as g,
  index as i
};
