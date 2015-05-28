(function () {

  var app = angular.module('prselfie', []);

  function PullRequestController($scope, $http) {
    var vm = this;
    vm.repo = {};
    vm.repoInfo = {};
    vm.newPR = {};
    
    function handleCreatePullRequestResponse(errorInfo, pullRequestInfo) {
      alert(JSON.stringify(pullRequestInfo));
    }

    vm.submit = function submit() {
      var pr = {
        title: vm.newPR.title,
        body: jQuery('div[contenteditable]').html(),
        head: "pull-requests",
        base: "master"
      };
      vm.repo.createPullRequest(pr, handleCreatePullRequestResponse);
    };

    function updateRepoInfo(errorInfo, repoInfo) {
      $scope.$apply(function () {
        vm.repoInfo = repoInfo;
      });
    }

    function init() {
      var github = new Github({
        token: "8840569bae23d98594dd6ec3a1784fe481f28ade",
        auth: "oauth"
      });

      vm.repo = github.getRepo("stevedesmond-ca", "pr-selfies");
      vm.repo.show(updateRepoInfo);
    }

    init();
  }

  app.controller('pr', ['$scope', '$http', PullRequestController]);

})();