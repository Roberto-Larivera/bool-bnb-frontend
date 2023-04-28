<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';
import { store } from '../../store';

export default {
    name: 'MapIndex',
    props: {
        apiKey: String,
        apartments: Array,
        long: String,
        lat: String,
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        getMapIndex() {
            let map = null;

            map = tt.map({
                key: this.apiKey,
                container: 'map',
                center: [this.long, this.lat],
                zoom: 11,
                radius: 20000
            });

            this.apartments.forEach(apartment => {
                const marker = new tt.Marker({ element: this.createMarkerElement(apartment.price), })
                    .setLngLat([apartment.longitude, apartment.latitude])
                marker.addTo(map);

                // marker.setPopup(new tt.Popup().setHTML(`<p>${apartment.price}</p>`));
                marker.setPopup(new tt.Popup().setHTML(`<h6>${apartment.title}</h6><p>${apartment.address}</p>`));

                //     const ttMarker = new tt.Marker({element: createMarkerElement(marker.text),})
                //     .setLngLat(marker.lngLat)
                //         ttMarker.addTo(map)
                //         })

            });

            map.addControl(new tt.NavigationControl());


            return { map };
        },
        createMarkerElement(text) {
            const markerElement = document.createElement('div');
            markerElement.className = 'custom-marker';
            markerElement.innerText = text;
            return markerElement
        }
       

    
    }
    // computed: {

    //     // myStore() {
    //     //     return this.store.filteredMap;
    //     // },

        
    //     // prova() {
    //     //     if(this.store.filteredMap) {
    //     //     setTimeout(() => this.getMapIndex(), 3000);
    //     //     console.log('ok mappa!!!');
    //     //     }
    //     // }      
    // },
    // created() {
    //     if (this.store.filteredMap) {
    //         setTimeout(() => this.getMapIndex(), 3000);
    //     }
    //     // this.$watch(() => store.filteredMap, (newFilteredMap, oldFilteredMap) => {
    //     //     if (newFilteredMap) {
    //     //         setTimeout(() => this.getMapIndex(), 3000);
    //     //         console.log('ok mappa!!!');
    //     //     }
    //     // });


    // },

}
</script>

<template>
    <div id="map" class="map-container my-map"></div>
</template>
  
<style lang="scss">
.my-map {
    width: 100%;
    // height: 100%;

    // Mappa per index
    .custom-marker {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        background-color: $color_light;
        color: $color_primary;
        border-radius: 5px;
        border: 1px solid $color_primary;
        font-size: 12px;
        padding: 0.2rem;
    }
}

// MEDIAQUERY
@media screen and (min-width: 1024px) {

    .my-map {
        width: 60%;
        margin: 0 auto;
        height: 300px;
    }
}
</style>
  