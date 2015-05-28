(function () {

    if (Number.prototype.toRadians === undefined) {
        Number.prototype.toRadians = function () { return this * Math.PI / 180; };
    }

    var app = angular.module('nearest', []);

    function LabsController($scope, $http) {
        var vm = this;
        vm.currentPosition = {};
        vm.labs = [];

        function updateLabs(data) {
            vm.labs = data.labs;
        }

        function updatePosition(pos) {
            vm.currentPosition = pos;
            vm.labs.forEach(vm.getDistance);

            var mapOptions = {
                center: new google.maps.LatLng(42.4215, -76.4962),
                zoom: 17
            };
            var mapElement = jQuery('#google-map')[0];
            var map = new google.maps.Map(mapElement, mapOptions);

            var myPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var myMarker = new google.maps.Marker({
                position: myPos,
                map: map,
                title: 'You are here'
            });

            angular.forEach(vm.labs, vm.addMarker, map);
        }

        function init() {
            $http.get('geo.json').success(updateLabs);
            navigator.geolocation.getCurrentPosition(updatePosition);
        }

        vm.addMarker = function (lab) {
            var labPos = new google.maps.LatLng(lab.lat, lab.lng);
            var labMarker = new google.maps.Marker({
                position: labPos,
                map: this,
                title: lab.name,
                icon: 'http://www.googlemapsmarkers.com/v1/' + lab.name.substr(0, 1) + '/0099FF/'
            });
        };

        vm.getDistance = function getDistance(lab, index) {
            var currentCoords = vm.currentPosition.coords;
            if (currentCoords !== undefined) {
                var R = 6371000; // metres

                var phi1 = currentCoords.latitude.toRadians();
                var phi2 = lab.lat.toRadians();
                var deltaPhi = (lab.lat - currentCoords.latitude).toRadians();
                var deltaLambda = (lab.lng - currentCoords.longitude).toRadians();

                var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                $scope.$apply(function () {
                    vm.labs[index].distance = R * c;
                });
            }
        };

        init();
    }

    app.controller('labs', ['$scope', '$http', LabsController]);

})();