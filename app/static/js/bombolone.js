// Generated by CoffeeScript 1.6.3
var checkBroser, host, ot, path, protocol;

ot = angular.module("bombolone", ["ngResource"]);

protocol = window.location.protocol;

host = window.location.host;

path = window.location.pathname;

ot.value("appName", "bombolone");

ot.config(function($locationProvider, $interpolateProvider) {
  $interpolateProvider.startSymbol("[[");
  return $interpolateProvider.endSymbol("]]");
});

ot.run(function($rootScope, $location) {
  $rootScope.API = app["api_path"];
  $rootScope.dropdown_status = "";
  $rootScope.message_show = page["message_show"] || false;
  $rootScope.message_status = page["message_status"] || "";
  $rootScope.message_message = page["message_message"] || "";
  $rootScope.message_icon = "x";
  $rootScope.loader = false;
  $rootScope.lan = app["lan"];
  $rootScope.language = app["language"];
  $rootScope.location = $location;
  $rootScope.list_code = ["en", "it"];
  return window.scope = angular.element(d).scope();
});

checkBroser = function() {
  if (d.all && !d.addEventListener) {
    return alert("You should upgrade your copy of Windows Internet Explorer. This website does not support completely IE <= 8");
  }
};
