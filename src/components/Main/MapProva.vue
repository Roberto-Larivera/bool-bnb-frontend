<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'Map',
    props: {
        apiKey: String,
        apartments: Array,
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
                zoom: 10,
                radius: 20000
            });

            props.apartments.forEach(apartment => {   
                const marker = new tt.Marker().setLngLat([apartment.longitude, apartment.latitude]).addTo(map);
                console.log(marker);
            
            });

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
  