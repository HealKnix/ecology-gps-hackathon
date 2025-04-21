<template>
  <div id="map">
    <div class="ildus_say_meow"></div>
    <div
      class="show_sensor_zones_btn"
      :style="{ backgroundColor: showSensorZones ? '#6979f8' : 'white' }"
      @click="handleClick"
    >
      <svg
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2L2 9.54839V20.4516L13 28L24 20.4516V9.54839L13 2Z"
          :fill="showSensorZones ? 'white' : '#6979f8'"
          fill-opacity="0.55"
          :stroke="showSensorZones ? 'white' : '#6979f8'"
          stroke-width="3"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
  import leaflet from 'leaflet';
  import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
  import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
  import 'leaflet-routing-machine';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
  import { computed, onMounted, ref } from 'vue';

  import summer_routes from '@/data/summer-routes.json';
  import winter_routes from '@/data/winter-routes.json';

  interface Route {
    id: string;
    name: string;
    color: string;
    markers: {
      position: [number, number];
      name: string;
      description?: string;
    }[];
    start: leaflet.Marker;
    end: leaflet.Marker;
  }

  const showSensorZones = ref(false);
  const isWinterRoutes = ref(false);
  const routeControls = ref<leaflet.Routing.Control[]>([]);

  const coordDefault = {
    latitude: 64.0365088,
    longitude: 129.7415096,
  };

  const map = computed<leaflet.Map>(() =>
    leaflet
      .map('map')
      .setView([coordDefault.latitude, coordDefault.longitude], 5),
  );

  let markerOptions = {
    title: 'MyLocation',
    clickable: true,
    draggable: true,
    iconUrl: '/marker.svg',
  };

  let DefaultIcon = leaflet.icon({
    iconUrl: '/marker.svg',
    iconSize: [41, 41],
    iconAnchor: [20, 35],
    popupAnchor: [-20, -20],
  });
  leaflet.Marker.prototype.options.icon = DefaultIcon;

  leaflet.Marker.mergeOptions(markerOptions);

  const markers = ref<Route[]>(summer_routes as Route[]);

  const handleClick = () => {
    showSensorZones.value = !showSensorZones.value;
    isWinterRoutes.value = !isWinterRoutes.value;

    routeControls.value.forEach((control) => {
      map.value.removeControl(control);
    });
    routeControls.value = [];

    markers.value.forEach((route) => {
      if (route.start) route.start.remove();
      if (route.end) route.end.remove();
    });

    markers.value = isWinterRoutes.value
      ? (winter_routes as Route[])
      : (summer_routes as Route[]);

    drawRoutes();
  };

  const drawRoutes = () => {
    for (let i = 0; i < markers.value.length; i++) {
      if (markers.value[i]) {
        markers.value[i].start = leaflet
          .marker(markers.value[i].markers[0].position)
          .addTo(map.value);
        markers.value[i].end = leaflet
          .marker(markers.value[i].markers[1].position)
          .addTo(map.value);

        const control = leaflet.Routing.control({
          waypoints: [
            leaflet.latLng(markers.value[i].start.getLatLng() ?? [0, 0]),
            leaflet.latLng(markers.value[i].end.getLatLng() ?? [0, 0]),
          ],
          // @ts-ignore
          lineOptions: {
            styles: [
              {
                color: markers.value[i].color,
                weight: 4,
                opacity: 0.75,
              },
            ],
          },
          show: false,
          routeWhileDragging: false,
          // @ts-ignore
          geocoder: leaflet.Control.Geocoder.nominatim(),
          addWaypoints: false,
          showAlternatives: false,
          fitSelectedRoutes: false,
          alternativeClassName: markers.value[i].id,
        }).addTo(map.value);

        routeControls.value.push(control);
      }
    }
  };

  onMounted(() => {
    map.value.addEventListener('zoom', () => {
      let scale = 19 - (map.value?.getZoom() ?? 0);

      if ((map.value?.getZoom() ?? 0) >= 12) {
        scale = (19 - 15) * 0.5;
      } else if ((map.value?.getZoom() ?? 0) >= 8) {
        scale = (19 - (map.value?.getZoom() ?? 0)) ** 1.25;
      } else {
        scale = (19 - (map.value?.getZoom() ?? 0)) ** 1.75;
      }
    });
    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map.value);

    drawRoutes();
  });
</script>

<style scoped>
  #map {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ildus_say_meow {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 20px;
    background-color: white;
    z-index: 3000;
  }

  .show_sensor_zones_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 30px;
    right: 10px;
    width: 50px;
    height: 50px;
    background-color: var(--accent-color-2);
    border-radius: var(--br-small);
    z-index: 5000;
    cursor: pointer;
    box-shadow: 0 0 15px #00000033;
    transition: 0.15s ease-in-out;
  }

  @media (width <=1405px) {
    #map {
      height: calc(100dvh - 200px);
    }
  }

  @media (width <=500px) {
    #map {
      height: calc(100dvh - 50px);
    }
  }
</style>
