/* global Geocoder */
/*eslint strict: 0*/

(function (win, doc) {
  'use strict';

  proj4.defs('EPSG:25833', '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs');
  var projection = ol.proj.get('EPSG:25833');

  var olview = new ol.View({
        projection: projection,
        center: ol.proj.transform(
          [12.07409, 54.06996], 'EPSG:4326', projection
        ),
        zoom: 13
      }),
      baseLayer = new ol.layer.Tile({
        source: new ol.source.WMTS({
          projection: projection,
          url: 'https://www.orka-mv.de/geodienste/orkamv/wmts/'
             + 'orkamv/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
          layer: 'orkamv-graustufen',
          matrixSet: 'epsg_25833_adv',
          format: 'image/png',
          requestEncoding: 'REST',
          tileGrid: new ol.tilegrid.WMTS({
            origin: [-464849.38, 6310160.14],
            resolutions: [
              4891.96981025,
              2445.98490513,
              1222.99245256,
              611.496226281,
              305.748113141,
              152.87405657,
              76.4370282852,
              38.2185141426,
              19.1092570713,
              9.5546285356,
              4.7773142678,
              2.3886571339,
              1.194328567,
              0.5971642835,
              0.2985821417],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          })
        })
      }),
      map = new ol.Map({
        target: 'map',
        view: olview,
        layers: [baseLayer]
      }),
      popup = new ol.Overlay.Popup();

  var geocoder = new Geocoder('nominatim', {
    provider: 'geocodr',
    autoComplete: false,
    targetType: 'text-input',
    lang: 'de',
    keepOpen: true,
    placeholder: 'Suche...',
    preventDefault: true,
    projection: projection,
    featureStyle: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(239, 130, 20, 0.5)'
      }),
      stroke: new ol.style.Stroke({
        color: '#EF8214',
        width: 10
      })
    })
  });
  map.addControl(geocoder);
  map.addOverlay(popup);

  geocoder.on('addresschosen', function (evt) {
    map.getView().animate({ zoom: 18, center: evt.coordinate });
    window.setTimeout(function () {
      popup.show(evt.coordinate, evt.address.formatted);
    }, 100);
  });

})(window, document);
