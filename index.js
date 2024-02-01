require([
  "esri/WebScene",
  "esri/layers/CSVLayer",
  "esri/views/SceneView"
], function(WebScene, CSVLayer, SceneView) {
  var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

  const template = {
    title: "St. Louis Crime Data",
    content: "Crime in STL."
  };

  const csvLayer = new CSVLayer({
    url: url,
    copyright: "USGS Earthquakes",
    popupTemplate: template
  });

  csvLayer.renderer = {
    type: "simple",
    symbol: {
      type: "point-3d",
      symbolLayers: [{
        type: "icon",
        resource: { primitive: "square" },
        material: { color: [0, 0, 255, 1] }, // Blue shade
        size: 5
      }, {
        type: "icon",
        resource: { primitive: "square" },
        material: { color: [0, 0, 255, 0] }, // Transparent blue shade
        outline: { color: [0, 0, 255, 0.6], size: 1 },
        size: 25
      }]
    }
  };

  const map = new WebScene({
    portalItem: {
      id: "a467ef1140de4e88acf34d38df9fb869"
    }
  });

  map.add(csvLayer);

  const view = new SceneView({
    container: "viewDiv",
    qualityProfile: "high",
    map: map,
    center: [-90.1994, 38.6270], // St. Louis coordinates
    zoom: 14, // Adjust zoom level as needed
    alphaCompositingEnabled: true,
    highlightOptions: {
      fillOpacity: 5,
      color: "#ffffff"
    },
    constraints: {
      altitude: {
        min: 700000
      },
      minScale: 50000 // Adjust minScale as needed
    },
    environment: {
      background: {
        type: "color",
        color: [0, 0, 0, 0]
      },
      lighting: {
        type: "virtual"
      }
    }
  });
});
