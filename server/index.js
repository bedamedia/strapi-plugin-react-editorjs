"use strict";

const services = require("./services");
const routes = require("./routes");
const controllers = require("./controllers");
const wysiwyg_field_register = require("../custom_fields/wysiwyg_field_register");

module.exports = {
	services,
	routes,
	controllers,
	register({ strapi }) {
		wysiwyg_field_register.serverRegister()
	},
}
