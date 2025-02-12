"use strict";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
const name$1 = "strapi-plugin-react-editorjs";
const version = "0.0.0-development";
const description = "Plugin for Strapi Headless CMS, hiding the standard WYSIWYG editor and replacing it with Editor.js";
const keywords = [
  "strapi",
  "plugin",
  "editor-js",
  "wysiwyg"
];
const homepage = "https://market.strapi.io/plugins/strapi-plugin-react-editorjs";
const bugs = {
  url: "https://github.com/melishev/strapi-plugin-editor-js/issues"
};
const scripts = {
  build: "strapi-plugin build",
  watch: "strapi-plugin watch",
  "watch:link": "strapi-plugin watch:link",
  verify: "strapi-plugin verify"
};
const type$1 = "commonjs";
const files = [
  "dist"
];
const exports$1 = {
  "./package.json": "./package.json",
  "./strapi-admin": {
    source: "./admin/src/index.js",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    source: "./server/src/index.js",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  }
};
const dependencies = {
  "@strapi/design-system": "^2.0.0-rc.11",
  "@strapi/icons": "^2.0.0-rc.11",
  "@strapi/utils": "^5.1.0",
  "react-intl": "^6.8.0",
  "@editorjs/checklist": "1.6.0",
  "@editorjs/code": "2.9.2",
  "@editorjs/delimiter": "1.4.2",
  "@editorjs/editorjs": "2.30.6",
  "@editorjs/embed": "2.7.6",
  "@editorjs/header": "2.8.8",
  "@editorjs/image": "2.10.0",
  "@editorjs/inline-code": "1.5.1",
  "@editorjs/link": "2.6.2",
  "@editorjs/list": "1.10.0",
  "@editorjs/marker": "1.4.0",
  "@editorjs/paragraph": "2.11.6",
  "@editorjs/quote": "2.7.2",
  "@editorjs/raw": "2.5.0",
  "@editorjs/table": "2.4.2",
  "@editorjs/warning": "1.4.0",
  classnames: "^2.3.1",
  "get-file-object-from-local-path": "1.0.2",
  "open-graph-scraper": "4.9.2",
  "react-editor-js": "2.1.0"
};
const devDependencies = {
  "@semantic-release/changelog": "^6.0.1",
  "@semantic-release/git": "^10.0.1",
  "cz-conventional-changelog": "^3.3.0",
  "semantic-release": "^19.0.2",
  "@strapi/strapi": "^5.1.0",
  "@strapi/sdk-plugin": "^5.2.7",
  prettier: "^3.3.3",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "styled-components": "^6.1.13"
};
const peerDependencies = {
  "@strapi/strapi": "^5.1.0",
  "@strapi/sdk-plugin": "^5.2.7",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "styled-components": "^6.1.13"
};
const config = {
  commitizen: {
    path: "./node_modules/cz-conventional-changelog"
  }
};
const license = "MIT";
const author = {
  name: "Matvey Melishev",
  email: "matvey@melishev.ru",
  url: "https://melishev.ru"
};
const maintainers = [
  {
    name: "Matvey Melishev",
    email: "matvey@melishev.ru",
    url: "https://melishev.ru"
  },
  {
    name: "Jason Skipper",
    url: "https://www.skipperinnovations.com"
  }
];
const repository = {
  type: "git",
  url: "https://github.com/melishev/strapi-plugin-editor-js.git"
};
const pluginPkg$1 = {
  name: name$1,
  version,
  description,
  keywords,
  homepage,
  bugs,
  scripts,
  type: type$1,
  files,
  exports: exports$1,
  dependencies,
  devDependencies,
  peerDependencies,
  config,
  license,
  author,
  maintainers,
  repository
};
const pluginPkg = pluginPkg$1;
const pluginId$1 = pluginPkg.name.replace(
  /^strapi-plugin-react-/i,
  ""
);
var pluginId_1 = pluginId$1;
const PluginId = /* @__PURE__ */ getDefaultExportFromCjs(pluginId_1);
const pluginId = pluginId_1;
const name = "wysiwyg";
const type = "richtext";
const serverRegister = () => {
  console.log("typeof ", typeof strapi.customFields);
  strapi.customFields.register({
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
  console.log("typeof ", typeof app.customFields);
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
      Input: async () => Promise.resolve().then(() => require(
        /* webpackChunkName: "input-component" */
        "./index-BOLzEJ6e.js"
      ))
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
    const pluginDescription = pluginPkg$1.strapi?.description || pluginPkg$1.description;
    app.registerPlugin({
      blockerComponent: null,
      blockerComponentProps: {},
      description: pluginDescription,
      icon: pluginPkg$1.strapi?.icon ?? pluginPkg$1.icon,
      intlLabel: {
        id: PluginId,
        defaultMessage: PluginId
      },
      id: PluginId,
      initializer: () => null,
      injectedComponents: [],
      isReady: true,
      isRequired: pluginPkg$1.strapi?.required || false,
      mainComponent: null,
      name: pluginPkg$1.strap?.name ?? pluginPkg$1.name,
      preventComponentRendering: false,
      settings: null,
      trads: {}
    });
    wysiwyg_field_register$1.adminRegister(app);
  },
  bootstrap() {
  }
};
exports.PluginId = PluginId;
exports.commonjsGlobal = commonjsGlobal;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
exports.index = index;
//# sourceMappingURL=index-CeHhymjG.js.map
