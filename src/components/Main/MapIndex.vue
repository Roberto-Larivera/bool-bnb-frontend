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


                const marker = new tt.Marker()
                .setLngLat([apartment.longitude, apartment.latitude])
                .addTo(map);

                // marker.setPopup(new tt.Popup().setHTML(`<p>${apartment.price}</p>`));
                // marker.setPopup(new tt.Popup().setHTML(`<h6>${apartment.title}</h6><p>${apartment.address}</p>`));
                
                console.log(marker);

            });

            map.addControl(new tt.NavigationControl());

            
            return { map };
        }

    },
    mounted() {
        this.getMapIndex();
    }
   
}
</script>

<template>
    <div id="map" class="map-container"></div>
</template>
  
<style scoped>
/* .map-container {
    width: 500px;
} */
</style>
  