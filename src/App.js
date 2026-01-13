import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import RussiaSvgMap from './components/RussiaSvgMap';

// Иконка для маркера
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function App() {
  const [activeLayer, setActiveLayer] = useState('osm'); // 'osm', 'topo', 'svg'
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    alert(`Вы выбрали регион: ${regionName}`);
  };

  return (
    <div className="App">


      <div className="controls-panel">
        <div className="layer-controls">
          <h3>Выберите слой карты:</h3>
          <div className="layer-buttons">
            <button
              className={activeLayer === 'osm' ? 'active' : ''}
              onClick={() => setActiveLayer('osm')}
            >
              OpenStreetMap
            </button>
            <button
              className={activeLayer === 'topo' ? 'active' : ''}
              onClick={() => setActiveLayer('topo')}
            >
              Топографический
            </button>
            <button
              className={activeLayer === 'svg' ? 'active' : ''}
              onClick={() => setActiveLayer('svg')}
            >
              SVG Карта
            </button>
          </div>
        </div>

        {selectedRegion && (
          <div className="selected-region">
            <h3>Выбранный регион:</h3>
            <p>{selectedRegion}</p>
          </div>
        )}
      </div>

      <div className="map-container">
        <MapContainer
          center={[61.5240, 105.3188]}
          zoom={3}
          style={{ height: '600px', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* Базовый слой OpenStreetMap */}
          {activeLayer === 'osm' && (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          )}

          {/* Топографический слой */}
          {activeLayer === 'topo' && (
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            />
          )}

          {/* SVG слой карты России */}
          {activeLayer === 'svg' && (
            <ImageOverlay
              url="/russia-map.svg"
              bounds={[[41.0, 19.0], [82.0, 190.0]]}
              opacity={0.8}
            />
          )}

          {/* Регионы России */}
          <GeoJSON
            key="russia-regions"
            data={russiaRegionsGeoJson}
            style={regionStyle}
            onEachFeature={onEachFeature}
          />

          {/* Маркеры для крупных городов */}
          {majorCities.map((city, index) => (
            <Marker key={index} position={city.coordinates} icon={customIcon}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>{city.name}</strong><br />
                  <small>Население: {city.population} млн.</small>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
}

// Стилизация регионов для GeoJSON
const regionStyle = (feature) => {
  const value = feature?.properties?.value || 0;
  return {
    fillColor: getColor(value),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
};

// Цвет в зависимости от значения
const getColor = (value) => {
  return value > 1000 ? '#800026' :
    value > 500 ? '#BD0026' :
      value > 200 ? '#E31A1C' :
        value > 100 ? '#FC4E2A' :
          value > 50 ? '#FD8D3C' :
            value > 20 ? '#FEB24C' :
              value > 10 ? '#FED976' :
                '#FFEDA0';
};

// Обработчик клика для GeoJSON
const onEachFeature = (feature, layer) => {
  if (feature.properties) {
    layer.bindPopup(`
      <div style="padding: 10px;">
        <strong style="font-size: 16px;">${feature.properties.name}</strong><br>
        <hr style="margin: 5px 0;">
        <span style="color: #666;">Население: ${feature.properties.value.toLocaleString()}
 тыс.</span><br>
        <span style="color: #666;">Площадь: ${feature.properties.area} км²</span>
      </div>
    `);
  }

  layer.on({
    mouseover: (e) => {
      e.target.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
      });
      e.target.bringToFront();
    },
    mouseout: (e) => {
      e.target.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      });
    }
  });
};

// Пример GeoJSON данных для регионов России
const russiaRegionsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Москва",
        value: 12678,
        area: 2561
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [55.5, 37.3], [55.5, 37.9], [55.9, 37.9], [55.9, 37.3], [55.5, 37.3]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Санкт-Петербург",
        value: 5398,
        area: 1439
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [59.8, 30.1], [59.8, 30.6], [60.1, 30.6], [60.1, 30.1], [59.8, 30.1]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Московская область",
        value: 7734,
        area: 44300
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [55.1, 36.8], [55.1, 38.8], [56.5, 38.8], [56.5, 36.8], [55.1, 36.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Краснодарский край",
        value: 5668,
        area: 75485
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [44.5, 37.5], [44.5, 41.5], [46.5, 41.5], [46.5, 37.5], [44.5, 37.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Свердловская область",
        value: 4290,
        area: 194307
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [56.0, 57.0], [56.0, 62.0], [59.0, 62.0], [59.0, 57.0], [56.0, 57.0]
        ]]
      }
    }
  ]
};

// Крупные города России
const majorCities = [
  { name: "Москва", coordinates: [55.7558, 37.6173], population: "12.7" },
  { name: "Санкт-Петербург", coordinates: [59.9343, 30.3351], population: "5.4" },
  { name: "Новосибирск", coordinates: [55.0084, 82.9357], population: "1.6" },
  { name: "Екатеринбург", coordinates: [56.8389, 60.6057], population: "1.5" },
  { name: "Казань", coordinates: [55.8304, 49.0661], population: "1.3" },
  { name: "Нижний Новгород", coordinates: [56.2965, 43.9361], population: "1.2" },
  { name: "Челябинск", coordinates: [55.1644, 61.4368], population: "1.2" },
  { name: "Самара", coordinates: [53.2415, 50.2212], population: "1.1" },
  { name: "Омск", coordinates: [54.9885, 73.3242], population: "1.1" },
  { name: "Ростов-на-Дону", coordinates: [47.2225, 39.7188], population: "1.1" }
];

export default App;
