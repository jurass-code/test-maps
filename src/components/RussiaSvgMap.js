import React, { useState } from 'react';
import './RussiaSvgMap.css';

const RussiaSvgMap = ({ onRegionClick }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 'moscow', name: 'Москва', path: 'M 250,150 L 260,145 L 265,155 L 255,160 Z', color: '#FF6B6B' },
    { id: 'spb', name: 'Санкт-Петербург', path: 'M 200,100 L 210,95 L 215,105 L 205,110 Z', color: '#4ECDC4' },
    { id: 'moscow-oblast', name: 'Московская область', path: 'M 240,140 L 270,130 L 280,160 L 250,170 Z', color: '#45B7D1' },
    { id: 'krasnodar', name: 'Краснодарский край', path: 'M 150,250 L 180,240 L 190,270 L 160,280 Z', color: '#96CEB4' },
    { id: 'sverdlovsk', name: 'Свердловская область', path: 'M 350,120 L 380,110 L 390,140 L 360,150 Z', color: '#FFEAA7' },
    { id: 'novosibirsk', name: 'Новосибирская область', path: 'M 400,150 L 430,140 L 440,170 L 410,180 Z', color: '#DDA0DD' },
    { id: 'irkutsk', name: 'Иркутская область', path: 'M 450,180 L 480,170 L 490,200 L 460,210 Z', color: '#98D8C8' },
    { id: 'khabarovsk', name: 'Хабаровский край', path: 'M 550,120 L 580,110 L 590,140 L 560,150 Z', color: '#F7DC6F' },
    { id: 'primorsky', name: 'Приморский край', path: 'M 600,150 L 630,140 L 640,170 L 610,180 Z', color: '#BB8FCE' },
    { id: 'tatarstan', name: 'Татарстан', path: 'M 300,200 L 330,190 L 340,220 L 310,230 Z', color: '#85C1E9' },
    { id: 'bashkortostan', name: 'Башкортостан', path: 'M 320,180 L 350,170 L 360,200 L 330,210 Z', color: '#F8C471' },
    { id: 'chelyabinsk', name: 'Челябинская область', path: 'M 340,160 L 370,150 L 380,180 L 350,190 Z', color: '#82E0AA' },
    { id: 'omsk', name: 'Омская область', path: 'M 380,190 L 410,180 L 420,210 L 390,220 Z', color: '#F1948A' },
    { id: 'tomsk', name: 'Томская область', path: 'M 420,170 L 450,160 L 460,190 L 430,200 Z', color: '#C39BD3' },
    { id: 'krasnoyarsk', name: 'Красноярский край', path: 'M 470,140 L 500,130 L 510,160 L 480,170 Z', color: '#76D7C4' },
    { id: 'yakutia', name: 'Якутия', path: 'M 520,80 L 550,70 L 560,100 L 530,110 Z', color: '#F5B041' },
    { id: 'kamchatka', name: 'Камчатский край', path: 'M 650,100 L 680,90 L 690,120 L 660,130 Z', color: '#EC7063' },
    { id: 'sakhalin', name: 'Сахалинская область', path: 'M 670,150 L 700,140 L 710,170 L 680,180 Z', color: '#AF7AC5' },
    { id: 'kaliningrad', name: 'Калининградская область', path: 'M 100,120 L 130,110 L 140,140 L 110,150 Z', color: '#5DADE2' },
    { id: 'crimea', name: 'Крым', path: 'M 120,280 L 150,270 L 160,300 L 130,310 Z', color: '#58D68D' },
  ];

  const handleRegionClick = (region) => {
    setSelectedRegion(region.id);
    if (onRegionClick) {
      onRegionClick(region.name);
    }
  };

  const handleRegionMouseEnter = (regionId) => {
    setHoveredRegion(regionId);
  };

  const handleRegionMouseLeave = () => {
    setHoveredRegion(null);
  };

  const getRegionStyle = (region) => {
    const isHovered = hoveredRegion === region.id;
    const isSelected = selectedRegion === region.id;

    let fillColor = region.color;
    let strokeColor = '#333';
    let strokeWidth = 1;
    let opacity = 0.7;

    if (isSelected) {
      strokeColor = '#FF0000';
      strokeWidth = 3;
      opacity = 0.9;
    } else if (isHovered) {
      strokeColor = '#666';
      strokeWidth = 2;
      opacity = 0.8;
    }

    return {
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      opacity: opacity,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    };
  };

  const getRegionInfo = () => {
    if (!selectedRegion) return null;
    const region = regions.find(r => r.id === selectedRegion);
    if (!region) return null;

    return (
      <div className="region-info">
        <h3>{region.name}</h3>
        <div className="region-color" style={{ backgroundColor: region.color }}></div>
        <p>Нажмите на другие регионы для получения информации</p>
      </div>
    );
  };

  return (
    <div className="russia-svg-map">
      <div className="map-container">
        <svg
          width="800"
          height="400"
          viewBox="0 0 800 400"
          className="russia-map"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Фон карты */}
          <rect width="800" height="400" fill="#f0f8ff" />

          {/* Границы России */}
          <path
            d="M 100,100 L 200,80 L 300,90 L 400,70 L 500,100 L 600,80 L 700,90 L 750,150 L 700,200 L 650,250 L 600,300 L 500,350 L 400,380 L 300,350 L 200,300 L 150,250 L 100,200 Z"
            fill="none"
            stroke="#333"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Регионы */}
          {regions.map((region) => (
            <path
              key={region.id}
              d={region.path}
              style={getRegionStyle(region)}
              onClick={() => handleRegionClick(region)}
              onMouseEnter={() => handleRegionMouseEnter(region.id)}
              onMouseLeave={handleRegionMouseLeave}
              className="region-path"
            />
          ))}

          {/* Крупные города */}
          <g className="cities">
            <circle cx="250" cy="155" r="4" fill="#333" />
            <text x="260" y="155" fontSize="10" fill="#333">Москва</text>

            <circle cx="210" cy="100" r="4" fill="#333" />
            <text x="220" y="100" fontSize="10" fill="#333">СПб</text>

            <circle cx="400" cy="155" r="4" fill="#333" />
            <text x="410" y="155" fontSize="10" fill="#333">Новосибирск</text>

            <circle cx="360" cy="155" r="4" fill="#333" />
            <text x="370" y="155" fontSize="10" fill="#333">Екатеринбург</text>

            <circle cx="310" cy="205" r="4" fill="#333" />
            <text x="320" y="205" fontSize="10" fill="#333">Казань</text>

            <circle cx="170" cy="265" r="4" fill="#333" />
            <text x="180" y="265" fontSize="10" fill="#333">Краснодар</text>

            <circle cx="660" cy="125" r="4" fill="#333" />
            <text x="670" y="125" fontSize="10" fill="#333">Владивосток</text>

            <circle cx="120" cy="125" r="4" fill="#333" />
            <text x="130" y="125" fontSize="10" fill="#333">Калининград</text>
          </g>

          {/* Легенда */}
          <g className="legend">
            <rect x="10" y="10" width="180" height="80" fill="white" stroke="#ccc" strokeWidth="1" rx="5" />
            <text x="20" y="30" fontSize="12" fontWeight="bold" fill="#333">Легенда:</text>
            <circle cx="30" cy="50" r="6" fill="#FF6B6B" />
            <text x="45" y="55" fontSize="10" fill="#333">Столица</text>
            <circle cx="30" cy="70" r="6" fill="#4ECDC4" />
            <text x="45" y="75" fontSize="10" fill="#333">Города ФО</text>
            <circle cx="110" cy="50" r="6" fill="#45B7D1" />
            <text x="125" y="55" fontSize="10" fill="#333">Области</text>
            <circle cx="110" cy="70" r="6" fill="#96CEB4" />
            <text x="125" y="75" fontSize="10" fill="#333">Края</text>
          </g>
        </svg>
      </div>

      <div className="map-controls">
        {getRegionInfo()}

        <div className="map-instructions">
          <h4>Инструкция:</h4>
          <ul>
            <li>Нажмите на регион для выбора</li>
            <li>Наведите курсор для подсветки</li>
            <li>Каждый регион имеет свой цвет</li>
            <li>Красная обводка - выбранный регион</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RussiaSvgMap;
