<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'Map',
    props: {
        apiKey: String,
        lat: String,
        long: String
    },
    setup(props) {
        let map = null;

        onMounted(() => {
            map = tt.map({
                key: props.apiKey,
                container: 'map',
                center: [props.long, props.lat],
                zoom: 11,
                radius: 20000
            });

            const marker = new tt.Marker().setLngLat([props.long, props.lat]).addTo(map);
            map.addControl(new tt.NavigationControl());

        });

        return { map };
    }
}
</script>

<template>
    <div id="map" class="map-container"></div>
</template>
  
<style scoped>
.map-container {
    height: 500px;
}
</style>
  