const pluginId = require("../admin/src/pluginId");
const name = "input";
const type = "string";
/* NOTE: THIS CUSTOM FIELD JUST FOR TESTING  */

const serverRegister = () => {
  strapi.customFields.register({
    name,
    plugin: pluginId,
    type,
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};

const adminRegister = (app) => {
  app.customFields.register({
    name,
    pluginId,
    type,
    intlLabel: {
      id: "input",
      defaultMessage: "Input",
    },
    intlDescription: {
      id: "description",
      defaultMessage: "Testing custom field",
    },
    // icon: ColorPickerIcon, // don't forget to create/import your icon component
    components: {
      Input: async () =>
        import(
          /* webpackChunkName: "input-component" */ "../admin/src/components/Input"
        ),
    },
    options: {
      // declare options here
    },
  });
};
module.exports = {
  serverRegister,
  adminRegister,
};
