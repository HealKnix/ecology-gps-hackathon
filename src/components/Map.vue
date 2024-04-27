<template>
  <div id="map">
    <div class="ildus_say_meow"></div>
  </div>
</template>

<script setup lang="ts">
  import leaflet, { Marker } from 'leaflet';
  import { onMounted, watchEffect } from 'vue';
  import { useGeolocation } from '@vueuse/core';

  import { userMarker, nearbyMarkers } from '@/stores/mapStore';

  const { coords } = useGeolocation();

  let map: leaflet.Map;
  let userGeoMarker: leaflet.Marker;

  const coordIrkutsk = {
    latitude: 52.28,
    longitude: 104.25,
  };

  onMounted(() => {
    map = leaflet
      .map('map')
      .setView([coordIrkutsk.latitude, coordIrkutsk.longitude], 13);

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
          `Saved Marker at (<strong>${latitude.toFixed(2)},${longitude.toFixed(2)}</strong>)`,
        );
    });

    map.addEventListener('click', (e) => {
      const { lat: latitude, lng: longitude } = e.latlng;

      leaflet
        .marker([latitude, longitude])
        .addTo(map)
        .bindPopup(
          `Saved Marker at (<strong>${latitude.toFixed(2)},${longitude.toFixed(2)}</strong>)`,
        );

      nearbyMarkers.value.push({ latitude, longitude });
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
    height: 600px;
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
</style>
