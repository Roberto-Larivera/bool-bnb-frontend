<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'MapIndex',
    props: {
        apiKey: String,
        apartments: Array,
        long: String,
        lat: String
    },
    methods: {
        getMapIndex() {
            let map = null;

            map = tt.map({
                key: this.apiKey,
                container: 'map',
                center: [ this.long, this.lat],
                zoom: 10,
                radius: 20000
            });

            this.apartments.forEach(apartment => {

                const marker = new tt.Marker().setLngLat([apartment.lon, apartment.lat]).addTo(map);
                
                
            });

            map.addControl(new tt.NavigationControl());

            return { map };
        }

    },
    mounted() {
        this.getMapIndex;
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
  