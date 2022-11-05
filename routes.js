const routes = require("next-routes")();

routes
  .add("/donations/new", "/donations/new")
  .add("/donations/:address", "/donations/show")
  .add("/donations/:address/requests", "/donations/requests/list")
  .add("/donations/:address/requests/create", "/donations/requests/create")

module.exports = routes;