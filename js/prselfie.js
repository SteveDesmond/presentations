(function () {

  var app = angular.module('prselfie', []);

  function PullRequestController($scope, $http) {
    var vm = this;
    vm.repo = {};
    vm.repoInfo = {};
    vm.newPR = {};
    vm.webcamStream = {};

    function checkMergeStatus(errorInfo, pullRequest) {
      if (pullRequest.state == 'open') {
        setTimeout(function () { waitForMerge(pullRequest.number); }, 5000);
      }
      else {
      new window.Notification('Pull Request Merged', { body: 'yay!' });
      }
    }

    function waitForMerge(id) {
      vm.repo.getPull(id, checkMergeStatus);
    }

    function handleCreatePullRequestResponse(errorInfo, pullRequestInfo) {
      jQuery('#form').html('Thanks!');
      waitForMerge(pullRequestInfo.number);
    }

    function requestNotificationPermission() {
      window.Notification.requestPermission(function (permissionInfo) {
      });
    }

    function createPullRequest(gifURL) {
      var pr = {
        title: vm.newPR.title,
        body: jQuery('div[contenteditable]').html() + '\n\n![](' + gifURL + ')',
        head: "pull-requests",
        base: "master"
      };
      vm.repo.createPullRequest(pr, handleCreatePullRequestResponse);
    }

    vm.submit = function submit() {
      requestNotificationPermission();
      createPullRequest('http://stevedesmond.ca/steve.jpg');
    };

    function updateRepoInfo(errorInfo, repoInfo) {
      $scope.$apply(function () {
        vm.repoInfo = repoInfo;
      });
    }

    function getRepoInfo() {
      var github = new Github({
        token: githubKey,
        auth: "oauth"
      });

      vm.repo = github.getRepo("stevedesmond-ca", "pr-selfies");
      vm.repo.show(updateRepoInfo);
    }

    function showVideo(stream) {
      vm.webcamStream = stream;
      var video = jQuery('#camera')[0];

      video.videoSource(stream);

      video.play();
    }

    function showVideoError(error) {
      alert(error);
    }

    function startCamera() {
      navigator.getUserMedia({ video: true }, showVideo, showVideoError);
    }

    vm.record = function record() {
      gifshot.createGIF({ 'gifWidth': 320, 'gifHeight': 240, 'cameraStream': vm.webcamStream, 'keepCameraOn': true }, function (obj) {
        if (!obj.error) {
          var image = obj.image,
            animatedImage = document.createElement('img');
          animatedImage.src = image;
          jQuery('#gif').html(animatedImage);
        }
      });
    }

    function init() {
      getRepoInfo();
      startCamera();
    }

    init();
  }

  app.controller('pr', ['$scope', '$http', PullRequestController]);

})();