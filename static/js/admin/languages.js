'use strict';

/* Rank v6 */
angular.module('bombolone.controllers.languages', [])
.controller('LanguagesCtrl', [
  "$scope", 
  "$resource", 
  "$rootScope", 
  "api",
  function($scope, $resource, $rootScope, api) {
    var adminLanguage, adminLanguageUpdate, languageIndex, languageNew,
        languageUpdate;
    $scope.sort_table = $scope.$parent.lan;
    $scope.language = {};

    languageIndex = path.match(/^\/admin\/languages\/?$/i);
    languageNew = path.match(/^\/admin\/languages\/new\/?$/i);
    languageUpdate = path.match(/^\/admin\/languages\/update\/([^\/]+)\/?$/i);

    adminLanguage = function() {
      var params;
      $rootScope.admin_module = "languages";
      params = {};
      api.languageList.get(params, function(resource) {
        $rootScope.items_list = resource.languages;
        $rootScope.items_list.forEach(function(item) {
          item.name = resource.chosen.value[item.code];
        });
      });
    };

    adminLanguageUpdate = function() {
      var params;
      params = {
        "rank-id": rank_update[1]
      }
      api.languageShow.get(params, function(resource) {
        $scope.rank = resource.rank;
      });
    };

    $scope.create_rank = function() {
      var params;
      params = {
        'name': $scope.rank.name,
        'rank': $scope.rank.rank,
      };
      api.languageCreate.post(params, function(resource) {
        $scope.show_message(resource);
      });
    };

    $scope.update_rank = function() {
      var params;
      params = {
        'rank-id': rank_update[1],
        'name': $scope.rank.name,
        'rank': $scope.rank.rank,
      };
      api.languageUpdate.post(params, function(resource) {
        $scope.show_message(resource);
      });
    };

    if (languageIndex) {
      adminLanguage();
    } else if (languageNew) {
      $scope.update = false;
    } else if (languageUpdate) {
      adminLanguageUpdate();
      $scope.update = true;
    }
  }
]);
