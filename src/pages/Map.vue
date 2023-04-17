
  
<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'Map',
    props: {
        apiKey: String
    },
    setup(props) {
        let map = null;

        onMounted(() => {
            map = tt.map({
                key: props.apiKey,
                container: 'map',
                center: [12.5674, 41.8719],
                zoom: 10
            });

            const marker = new tt.Marker().setLngLat([12.5674, 41.8719]).addTo(map);
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
  