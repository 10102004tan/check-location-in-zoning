var selectId = document.getElementById.bind(document), infoWindow;

let coords = [
    [10.885340, 106.781530],
    [10.885264, 106.781445],
    [10.885141, 106.781667]
];

var options = {
    strokeWeight: 1,
    editable: true,
    draggable: true
};

var geofence = new Geofence({mapId: 'mymap'});

var oldPolygon = drawPolygon(geofence, 'coordinates');

function drawPolygon(geofence, infoId) {
    var polygon = geofence.draw(coords);
    var map = geofence.map;
    var bounds = geofence.getBounds(polygon);
    map.fitBounds(bounds);
    geofence.setInfo(polygon, infoId);
    geofence.on('nodeClick', [polygon], function (event, polygon) {
        var contentString = '<button id="delete">Delete</button>';
        infoWindow = geofence.createInfowindow(contentString, event);
        geofence.onDomReady(infoWindow, function() {
            selectId('delete').addEventListener('click', function() {
                geofence.close(infoWindow);
                var newPolygon = geofence.deleteNode(event, polygon);
                geofence.setInfo(newPolygon, infoId);
            });
        });
    });

    geofence.on('polygonClick', [polygon], function (event, polygon) {
        var contentString = event.latLng + '';
        infoWindow = geofence.createInfowindow(contentString, event);
    });

    geofence.on('insertAt', [polygon], function(event, polygon) {
        geofence.setInfo(polygon, infoId);
    });

    geofence.on('setAt', [polygon], function(event, polygon) {
        geofence.setInfo(polygon, infoId);
    });

    geofence.on('dragStart', [polygon], function(event, polygon) {
        geofence.close(infoWindow);
        geofence.setInfo(polygon, infoId);
    });

    geofence.on('dragEnd', [polygon], function (event, polygon, previousState) {

        var contentString = '<button id="revert">Revert</button>';
        infoWindow = geofence.createInfowindow(contentString, event);
        geofence.setInfo(polygon, infoId);

        geofence.onDomReady(infoWindow, function() {
            selectId('revert').addEventListener('click', function() {
                geofence.close(infoWindow);
                var newPolygon = geofence.revert(polygon, previousState);
                geofence.setInfo(newPolygon, infoId);
            });
        });
    });

    return polygon;
}

selectId('draw').onclick = function (e) {
    e.preventDefault();
    // var coords = geofence.coordinatesToLatLng(geofence.stringToArray(selectId('coordinates').value.trim()));
    // var poly = geofence.updatePolygonPath(oldPolygon, coords);
    // var map = geofence.map;
    // var bounds = geofence.getBounds(poly);
    // map.fitBounds(bounds);
    coords = geofence.stringToArray(selectId('coordinates').value.trim())
};