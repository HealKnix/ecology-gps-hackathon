<template>
  <div id="map">
    <div class="ildus_say_meow"></div>
    <div
      class="show_sensor_zones_btn"
      :style="{ backgroundColor: showSensorZones ? '#6979f8' : 'white' }"
      @click="
        () => {
          showSensorZones = !showSensorZones;
          if (showSensorZones) {
            sensorsList.forEach((sensor: RootObject) => {
              sensor.polygon.setStyle({
                color: sensor.color_quality,
                fillColor: sensor.color_quality,
                interactive: true,
              });
              sensor.polygon.redraw();
            });
          } else {
            sensorsList.forEach((sensor: RootObject) => {
              sensor.polygon.setStyle({
                color: '#00000000',
                fillColor: '#00000000',
                interactive: false,
              });
              sensor.polygon.redraw();
            });
          }
        }
      "
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
  import 'leaflet-routing-machine';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
  import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
  import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
  import { onBeforeMount, onMounted, watchEffect, ref } from 'vue';
  import { useGeolocation } from '@vueuse/core';
  import axios from 'axios';

  import { userMarker, nearbyMarkers } from '@/stores/mapStore';
  import type { RootObject, SensorDataValue } from '@/types/SensorType';

  const showSensorZones = ref(false);

  const { coords } = useGeolocation();

  let map: leaflet.Map;
  let userGeoMarker: leaflet.Marker;

  let sensorsList: RootObject[] = [];

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

  const coordIrkutsk = {
    latitude: 51,
    longitude: 13,
  };

  onBeforeMount(async () => {
    sensorsList = await axios
      .get('https://data.sensor.community/static/v1/data.json')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    let scale = 19 - map.getZoom();

    if (map.getZoom() >= 12) {
      scale = (19 - 15) * 0.5;
    } else if (map.getZoom() >= 8) {
      scale = (19 - map.getZoom()) ** 1.25;
    } else {
      scale = (19 - map.getZoom()) ** 1.75;
    }

    sensorsList?.forEach((sensor: RootObject) => {
      const sensorLatitude = parseFloat(sensor.location.latitude);
      const sensorLongitude = parseFloat(sensor.location.longitude);

      let description: string = '';
      let pmQuality = 0;
      let colorQuality = '#6979f8';

      sensor.sensordatavalues?.forEach((data: SensorDataValue) => {
        if (data.value_type.includes('P'))
          pmQuality += parseFloat(data.value ?? '') ?? 0;
        description += `<strong>${data.value_type}</strong> : ${data.value ?? 'Нет данных'} </br>`;
      });

      if (pmQuality <= 10) {
        colorQuality = '#00796B';
      } else if (pmQuality <= 20) {
        colorQuality = '#F9A825';
      } else if (pmQuality <= 40) {
        colorQuality = 'E65100';
      } else if (pmQuality <= 60) {
        colorQuality = '#DD2C00';
      } else {
        colorQuality = '#960084';
      }

      sensor['color_quality'] = colorQuality;

      sensor['polygon'] = leaflet
        .polygon(
          [
            [sensorLatitude + 0.001 * scale, sensorLongitude],
            [
              sensorLatitude + 0.0005 * scale,
              sensorLongitude + 0.00145 * scale,
            ],
            [
              sensorLatitude - 0.0005 * scale,
              sensorLongitude + 0.00145 * scale,
            ],
            [sensorLatitude - 0.001 * scale, sensorLongitude],
            [
              sensorLatitude - 0.0005 * scale,
              sensorLongitude - 0.00145 * scale,
            ],
            [
              sensorLatitude + 0.0005 * scale,
              sensorLongitude - 0.00145 * scale,
            ],
          ],
          {
            color: showSensorZones.value ? colorQuality : '#00000000',
            fillColor: showSensorZones.value ? colorQuality : '#00000000',
            fillOpacity: 0.2,
            weight: 0.5,
            interactive: true,
          },
        )
        .addTo(map)
        .bindPopup(
          `
            ${sensor.timestamp} </br>
            Страна: ${sensor.location.country} </br>
            Координаты (<strong>${sensorLatitude.toFixed(3)}, ${sensorLongitude.toFixed(3)}</strong>) </br>
            ${description}
            `,
          {
            offset: [0, -15],
          },
        );
    });
  });

  onMounted(async () => {
    map = leaflet
      .map('map')
      .setView([coordIrkutsk.latitude, coordIrkutsk.longitude], 4);

    map.addEventListener('zoom', () => {
      let scale = 19 - map.getZoom();

      if (map.getZoom() >= 12) {
        scale = (19 - 15) * 0.5;
      } else if (map.getZoom() >= 8) {
        scale = (19 - map.getZoom()) ** 1.25;
      } else {
        scale = (19 - map.getZoom()) ** 1.75;
      }

      sensorsList?.forEach((sensor: RootObject) => {
        const sensorLatitude = parseFloat(sensor.location.latitude);
        const sensorLongitude = parseFloat(sensor.location.longitude);

        sensor.polygon.setLatLngs([
          [sensorLatitude + 0.001 * scale, sensorLongitude],
          [sensorLatitude + 0.0005 * scale, sensorLongitude + 0.00145 * scale],
          [sensorLatitude - 0.0005 * scale, sensorLongitude + 0.00145 * scale],
          [sensorLatitude - 0.001 * scale, sensorLongitude],
          [sensorLatitude - 0.0005 * scale, sensorLongitude - 0.00145 * scale],
          [sensorLatitude + 0.0005 * scale, sensorLongitude - 0.00145 * scale],
        ]);

        sensor.polygon.redraw();
      });
    });

    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map);

    nearbyMarkers.value.forEach(({ latitude, longitude }: any) => {
      leaflet
        .marker([latitude, longitude])
        .addTo(map)
        .bindPopup(
          `Координаты (<strong>${latitude.toFixed(3)}, ${longitude.toFixed(3)}</strong>)`,
        );
    });

    let markers = <
      {
        start: leaflet.Marker | null;
        end: leaflet.Marker | null;
      }
    >{
      start: null,
      end: null,
    };
    leaflet.Marker;
    let control: leaflet.Routing.Control;
    let index = 0;

    map.addEventListener('click', async (e) => {
      // @ts-ignore
      if (!e.originalEvent.srcElement?.id) return;

      const { lat: latitude, lng: longitude } = e.latlng;

      // markers.push({ x: latitude, y: longitude });

      // leaflet
      //   .marker([latitude, longitude])
      //   .addTo(map)
      //   .bindPopup(
      //     `Координаты (<strong>${latitude.toFixed(3)}, ${longitude.toFixed(3)}</strong>)`,
      //   );

      if (index == 2) {
        map.removeControl(control);
        // @ts-ignore
        map.removeLayer(markers.start);
        // @ts-ignore
        map.removeLayer(markers.end);
        index = 0;
        return;
      }

      if (index == 0) {
        markers.start = leaflet.marker([latitude, longitude]).addTo(map);
        index++;
        // nearbyMarkers.value.push({ latitude, longitude });
        return;
      } else {
        markers.end = leaflet.marker([latitude, longitude]).addTo(map);
        index++;
      }

      control = leaflet.Routing.control({
        waypoints: [
          leaflet.latLng(markers.start?.getLatLng() ?? [0, 0]),
          leaflet.latLng(markers.end?.getLatLng() ?? [0, 0]),
        ],
        // @ts-ignore
        lineOptions: {
          styles: [
            {
              color: '#6979f8',
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
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(map);
    });
  });

  watchEffect(() => {
    if (
      coords.value.latitude !== Number.POSITIVE_INFINITY &&
      coords.value.longitude !== Number.POSITIVE_INFINITY
    ) {
      userMarker.value.latitude = coords.value.latitude;
      userMarker.value.longitude = coords.value.longitude;

      if (userGeoMarker) {
        map.removeLayer(userGeoMarker);
      }

      userGeoMarker = leaflet
        .marker([userMarker.value.latitude, userMarker.value.longitude])
        .addTo(map)
        .bindPopup('User Marker');

      map.setView([userMarker.value.latitude, userMarker.value.longitude], 13);

      const el = userGeoMarker.getElement();
      if (el) {
        el.style.filter = 'hue-rotate(120deg)';
      }
    }
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
