// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcmt0YXRvIiwiYSI6ImNtZGF3MjA1MzBueXgybW9pZGN2ZnptbHUifQ.Q1-o6C7ffwx9H9LKeBA_OQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-111.7830, 43.8172], // BYUI approximate center
  zoom: 15
});

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

document.getElementById('generate').addEventListener('click', () => {
  const startValue = document.getElementById('start').value;
  const endValue = document.getElementById('end').value;

  if (!startValue || !endValue) {
    alert('Please select both start and end locations.');
    return;
  }

  const [startLat, startLng] = startValue.split(',').map(Number);
  const [endLat, endLng] = endValue.split(',').map(Number);

  // Remove old markers if needed (not implemented here for brevity)

  // Add start marker
  new mapboxgl.Marker({ color: 'green' })
    .setLngLat([startLng, startLat])
    .setPopup(new mapboxgl.Popup().setText('Start'))
    .addTo(map);

  // Add end marker
  new mapboxgl.Marker({ color: 'red' })
    .setLngLat([endLng, endLat])
    .setPopup(new mapboxgl.Popup().setText('End'))
    .addTo(map);

  // Use Mapbox Directions API via fetch
  getRoute([startLng, startLat], [endLng, endLat]);
});

async function getRoute(start, end) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

  const response = await fetch(url);
  const data = await response.json();

  const route = data.routes[0].geometry.coordinates;

  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };

  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  } else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#1db7dd',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }

  map.fitBounds([start, end], { padding: 50 });
}
