<script>
import { store } from '../store';

import AppCard from '../components/Main/AppCard.vue';
import ListAutoComplete from '../components/Main/ListAutoComplete.vue';
import MapIndex from '../components/Main/MapIndex.vue';

// Axios
import axios from 'axios';

export default {
    name: 'ApartmentIndex',
    components: {
        AppCard,
        ListAutoComplete,
        MapIndex,
    },
    data() {
        return {
            store,
            apartment: {},
            apartments: [],
            message: 'Non ci sono appartamenti da visualizzare',
            messageChecked: false,
            moreFilters: false,
            services: [],
            moreServices: false,
            query: '',
            autocomplete: [],
            activeAuto: false,
            currentPage: 1,
            numPages: null,
            disabled: false,
            address: '',
            currentGuest: 0,
            maxGuests: 30,
            roomsValue: 0,
            bathsValue: 0,
            priceValue: 0,
            isChecked: [],
            lat: '',
            lon: '',
            thumbPosition: '100%',
        }
    },
    methods: {
        // METODI PER CHIAMATE API
        getApiAddresses() {
            axios
                .get(`https://api.tomtom.com/search/2/search/${this.store.address}.json`, {
                    params: {
                        'key': 'zYPEasZvEN9Do06ieftila5uHNmiGZtG',
                        'countrySet': 'IT',
                        'lat': '45.4642',
                        'lon': '9.1900',
                        'radius': '20000',
                        'limit': '5',
                    }
                })
                .then(response => {
                    this.autocomplete = response.data.results;
                });
        },
        updateThumbPosition() {
            const range = document.getElementById('km');
            if (range) {
                const thumbWidth = getComputedStyle(range).getPropertyValue('--thumb-width');
                const thumbPosition = `${((range.value - range.min) / (range.max - range.min)) * 100}%`;
                this.thumbPosition = `calc(${thumbPosition} - ${thumbWidth} / 2)`;
            }
        },
        getApiApartments() {
            if (this.autocomplete == '') {
            }
            else {
                this.store.lat = this.autocomplete[0].position.lat;
                this.store.lon = this.autocomplete[0].position.lon;
            }
            axios
                .get(store.pathServerApi, {
                    params: {
                        'range': this.store.range,
                        'lat': this.store.lat,
                        'lon': this.store.lon,
                    }
                })
                .then((response) => {

                    if (response.data.success == true) {
                        this.apartments = response.data.apartments.data;
                        this.messageChecked = false;
                        //  pagination
                        this.numPages = response.data.apartments.last_page;
                        this.store.filteredMap = false;
                        this.cancelAddress();
                    }
                    else {
                        this.message;
                        this.messageChecked = true;
                    }

                });
        },
        getApiServices() {
            axios
                .get(store.pathServerApi + 'services', {
                    params: {

                    }
                })
                .then((response) => {
                    return this.services = response.data.services;
                });
        },
        getPagination() {
            let urlPagination = `http://127.0.0.1:8000/api/apartments?page=${this.currentPage} `;


            axios
                .get(urlPagination)
                .then(response => {

                    this.apartments = response.data.apartments.data;
                });
        },
        // metodi per frontend
        controlModal() {
            if (this.store.address.length == 0)
                this.activeAuto = false
            else {
                if (this.store.address.length > 2)
                    this.getApiAddresses()
                this.activeAuto = true
            }
        },
        takeAddress(address) {
            this.activeAuto = false;
            return this.store.address = address;
        },
        goPrev() {
            if (this.currentPage > 1) {

                this.currentPage--;
                this.getPagination();

            }
        },
        goNext() {
            if (this.currentPage < this.numPages) {

                this.currentPage++;
                this.getPagination();
            }
        },
        lessGuests() {
            if (this.currentGuest > 0) {

                this.currentGuest--;
            }
        },
        moreGuests() {
            if (this.currentGuest < this.maxGuests) {

                this.currentGuest++;
            }
        },
        getServices() {
            this.moreServices = true;
        },
        switchFilter() {
            this.apartments = this.filteredApartments;
        },
        cancelFilters() {
            this.currentGuest = 0;
            this.roomsValue = 0;
            this.bathsValue = 0;
            this.priceValue = 0;
            this.isChecked = [];

            if (this.store.range != 20) {
                this.store.range = 20;
                this.getApiApartments();
            }


            return this.filteredApartments;

        },
        startMap() {
            setTimeout(() => this.$refs.MapIndex.getMapIndex(), 5000);
        },
        cancelAddress() {
            if (this.store.address.length > 0) {
                this.startMap()
                this.store.filteredMap = true;
            }
            else {
                this.store.filteredMap = false;
            }
        },
        // styleRange() {
        //     const newValue = Number( (this.store.range.value - range.min) * 100 / (range.max - range.min) ),
        //     newPosition = 10 - (newValue * 0.2);
        //     rangeV.innerHTML = `<span>${range.value}</span>`;
        //     rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        //     }
        // }

    },
    computed: {
        filteredApartments() {

            let newApartments = this.apartments.filter((item) => {
                if (this.currentGuest == 0) {
                    return this.apartments;
                }
                else 
                    return item.max_guests >= this.currentGuest;
                
            });


            newApartments = newApartments.filter((item) => {
                if (this.roomsValue == 0)
                    return newApartments;

                else
                    return item.rooms >= this.roomsValue;
            });


            newApartments = newApartments.filter((item) => {
                if (this.bathsValue == 0)
                    return newApartments;

                else
                    return item.baths >= this.bathsValue;
            });



            newApartments = newApartments.filter((item) => {
                if (this.priceValue == 0)
                    return newApartments;

                else
                    return item.price <= this.priceValue;
            });



            newApartments = newApartments.filter((item) => {
                if (this.isChecked.length === 0)
                    return newApartments;

                else {

                    let bool = true;

                    let aptServicesId = [];

                    item.services.forEach(element => {
                        aptServicesId.push(element.id);
                    });

                    this.isChecked.forEach(serviceChecked => {

                        if (!aptServicesId.includes(serviceChecked)) {
                            bool = false;
                            return bool
                        }
                    });

                    return bool;

                }
            });

            if (newApartments.length > 0 && newApartments != this.apartments) {
                this.store.filteredMap = false;
                this.cancelAddress()
            }

            return newApartments;
        },
        // prova per input range
        newValue() {
            return newValue = Number((this.store.range - this.store.range.min) * 100 / (this.store.range.max - this.store.range.min))
        },
        newPosition() {
            return newPosition = 10 - (this.newValue * 0.2);
        }
    },
    created() {
        this.getApiApartments();
        this.getApiServices();
    },
    mounted() {
        this.$nextTick(() => {
            if (document.querySelector('#rangeV')) {
                this.updateThumbPosition();
            }
        });
    },
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div
                    class="mt-2 d-flex flex-column justify-content-center d-md-flex flex-md-row justify-content-md-between">
                    <!-- Ricerca - Mobile -->
                    <button type="button" class="search my-btn rounded-pill my-3 p-3 d-md-none" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Ricerca appartamenti
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content rounded">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Ricerca appartamenti
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" class="form-container-small" @submit.prevent="getApiApartments()">
                                        <div class="mb-3 position-relative" @click.stop>
                                            <label for="place" class="form-label">
                                                Dove
                                            </label>
                                            <!-- <input type="text" class="form-control" id="place"> -->
                                            <input type="search" class="form-control radius" id="place"
                                                v-model="this.store.address" @input="controlModal()"
                                                @click="store.addressListVisible = true" autocomplete="off">
                                            <ListAutoComplete v-if="store.addressListVisible"
                                                class="position-absolute card radius" style="width: 100%;"
                                                :class="activeAuto ? 'd-block' : 'd-none'" :itemsComplete="autocomplete"
                                                @takeAddress="takeAddress" />
                                        </div>
                                        <button type="submit" class="my-submit-modal rounded" data-bs-dismiss="modal"
                                            @click="cancelAddress()">
                                            Vai
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>



                    <!-- Ricerca - Tablet / Desktop -->
                    <div
                        class="form-container-large rounded-pill p-2 shadow bg-body-tertiary rounded d-none d-md-inline-block flex-md-grow-1">
                        <form action="" class="d-flex justify-content-between align-items-center"
                            @submit.prevent="getApiApartments()">
                            <span class="d-flex justify-content-between align-items-center" style="width: 90%" @click.stop>
                                <span class="form-floating position-relative flex-grow-1" style="z-index: 4;">
                                    <!-- <label for="place">
                                            Dove
                                        </label> -->
                                    <input type="search" id="place" class="ms-3 radius" placeholder="Dove"
                                        style="width: 90%" v-model="this.store.address" @input="controlModal()"
                                        @click="store.addressListVisible = true" autocomplete="off">
                                    <ListAutoComplete v-if="store.addressListVisible" class="position-absolute address-list"
                                        style="width: 100%; z-index: 3;" :class="activeAuto ? 'd-block' : 'd-none'"
                                        :itemsComplete="autocomplete" @takeAddress="takeAddress" />
                                </span>
                            </span>
                            <button type="submit" class="my-submit rounded-pill px-3" @click="cancelAddress()">
                                Cerca
                            </button>
                        </form>
                    </div>

                    <!-- Bottone filtri avanzati -->
                    <button type="button" class="filter my-btn ms-2 p-3 rounded-pill d-md-none d-lg-inline"
                        data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        <font-awesome-icon icon="fa-solid fa-sort" /> Filtri avanzati
                    </button>

                    <!-- Bottone filtri avanzati per tablet / lg -->
                    <button type="button" class="filter my-btn ms-2 p-3 rounded-pill d-none d-md-inline d-lg-none"
                        data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        <font-awesome-icon icon="fa-solid fa-sort" />
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable my-width">
                            <div class="modal-content rounded">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Filtri avanzati
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-container-small">
                                        <!-- raggio 20 km -->
                                        <template v-if="filteredApartments.length > 0 && this.store.filteredMap == true && this.store.address.length > 0">
                                            <div class="mb-3 w-75 mx-auto">
                                                <label for="km" class="form-label" style="display: block;">
                                                    Distanza / km
                                                </label>
                                                <div class="range-wrap">
                                                    <div class="range-value" id="rangeV" :style="{left: thumbPosition}">
                                                        <span>
                                                            {{ store.range }}
                                                        </span>
                                                    </div>
                                                    <input type="range" class="form-range" id="km" min="1" max="20" v-model="store.range" 
                                                        @change="getApiApartments()" step="1" @input="updateThumbPosition">
                                                </div>

                                                <!-- <input type="range" class="form-range" :value="store.range" min="1" max="20" oninput="this.nextElementSibling.value = this.value" style="width: 80%;">
                                                <output>20</output>  -->

                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        1 km
                                                    </div>
                                                    <div>
                                                        20 km
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- mappa da inserire -->
                                            <div class="mb-3 px-5">
                                                <!-- <div class="map-container rounded"> -->
                                                <MapIndex :lat="filteredApartments[0].latitude"
                                                    :long="filteredApartments[0].longitude" :apartments="filteredApartments"
                                                    :apiKey="store.apiKey" class="rounded" ref="MapIndex" />
                                                <!-- </div> -->
                                            </div>
                                        </template>

                                        <!-- ospiti aggiungere -->
                                        <div class="mb-3">
                                            <div class="guests">
                                                <label for="guests" class="form-label">
                                                    Numero ospiti
                                                </label>
                                                <div class="inline-block">
                                                    <div class="d-flex">
                                                        <div class="rounded-start guest cursor_pointer"
                                                            @click="lessGuests()">
                                                            -
                                                        </div>
                                                        <div class="d-flex justify-content-center align-items-center"
                                                            style="width: 50px; border: 1px solid lightgray;">
                                                            {{ currentGuest }}
                                                        </div>
                                                        <div class="rounded-end guest cursor_pointer" @click="moreGuests()">
                                                            +
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- price -->
                                        <div class="mb-3">
                                            <div class="input-group flex-column mb-3">
                                                <label for="price" class="form-label d-block">
                                                    Prezzo massimo / notte
                                                </label>
                                                <div class="d-flex">
                                                    <span class="input-text-price rounded-start">
                                                        &euro;
                                                    </span>
                                                    <input type="number" class="my-form-control rounded-end"
                                                        aria-label="Amount (to the nearest dollar)" step="0.01" min="0.01" max="9999.99" v-model="priceValue">
                                                </div>
                                            </div>
                                        </div>

                                        <!-- numero / stanze e bagni modifica come airbnb -->
                                        <div class="mb-3">
                                            <div class="d-flex">
                                                <div class="rooms" style="width: 50%;">
                                                    <label for="price" class="form-label d-block">
                                                        Numero stanze
                                                    </label>
                                                    <select class="form-select cursor_pointer" aria-label="Default select example"
                                                        v-model="roomsValue">
                                                        <option selected value="0">Scegli...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                                <div class="bathrooms ms-2" style="width: 50%;">
                                                    <label for="price" class="form-label d-block">
                                                        Numero bagni
                                                    </label>
                                                    <select class="form-select cursor_pointer" aria-label="Default select example"
                                                        v-model="bathsValue">
                                                        <option selected value="0">Scegli...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- servizi -->
                                        <div class="mb-3">
                                            Servizi
                                        </div>
                                        <div class="d-lg-none">
                                            <div class="row row-cols-1">
                                                <div class="form-check ms-3">
                                                    <div class="mb-1"
                                                        v-for="service, index in services.slice(0, 7)">
                                                        <input class="form-check-input cursor_pointer" type="checkbox" value=""
                                                            :id="'flexCheckDefault'+index">
                                                        <label class="form-check-label cursor_pointer" :for="'flexCheckDefault'+index">
                                                            {{ service.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <button class="my-submit rounded d-lg-none cursor_pointer" @click="getServices()" :class="{
                                                    // non prende
                                                    'mt-2': moreServices == false,
                                                    'd-none': moreServices
                                                }">
                                                + servizi
                                            </button>
                                        </div>

                                        <!-- più servizi -->
                                        <div class="d-lg-none" v-if="moreServices">
                                            <div class="row row-cols-1">
                                                <div class="form-check ms-3">
                                                    <div class="mb-1" v-for="service, index in services.slice(7)">
                                                        <input class="form-check-input cursor_pointer" type="checkbox" value=""
                                                            :id="'flexCheckDefault'+index">
                                                        <label class="form-check-label cursor_pointer" :for="'flexCheckDefault'+index">
                                                            {{ service.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-none d-lg-block">
                                            <ul class="row row-cols-lg-2">
                                                <li v-for="service, index in services" class="col ps-lg-0">
                                                    <div class="mb-1">
                                                        <input class="form-check-input me-2 cursor_pointer" type="checkbox"
                                                            :value="service.id" :id="'flexCheckDefault'+index" v-model="isChecked">
                                                        <label class="form-check-label text-break cursor_pointer" :for="'flexCheckDefault'+index">
                                                            {{ service.name }}
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="my-btn rounded" data-bs-dismiss="modal"
                                        @click="cancelFilters()">
                                        Rimuovi filtri
                                    </button>
                                    <button type="submit" class="my-submit rounded" @click="switchFilter()"
                                        data-bs-dismiss="modal" v-if="filteredApartments">
                                        Mostra <span> {{ filteredApartments.length }}</span>
                                    </button>

                                    <button type="submit" class="my-submit rounded" @click="switchFilter()"
                                        data-bs-dismiss="modal" v-else>
                                        Mostra <span> 0 </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Cards -->
    <div class="container mb-5" :class="messageChecked == false ? 'd-block' : 'd-none'">
        <div class="row">
            <div class="col my-5">
                <h1 class="text-center text-md-start">
                    Tutti gli appartamenti BoolBnB
                </h1>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-sm-3 g-md-3 g-lg-3">
            <!-- <AppCard class="d-lg-none" v-for="index in 5" /> -->
            <AppCard v-for="apartment in filteredApartments" :apartment="apartment" />
        </div>
    </div>

    <!-- Risposta no apartments -->
    <div class="container" :class="messageChecked == false ? 'd-none' : 'd-block'">
        <div class="row">
            <div class="col mt-5">
                <h3 class="fst-italic">
                    {{ message }}
                </h3>
            </div>
        </div>
    </div>

    <!-- Paginazione -->
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="apartment-pagination">
                    <div class="d-flex justify-content-around py-2">
                        <div :disabled="currentPage === 1" :class="currentPage === 1 ? 'cursor_not-allowed' : 'fw-bold cursor_pointer'" @click="goPrev()">
                            <font-awesome-icon :icon="['fas', 'chevron-left']" /> prev
                        </div>
                        <div>
                            {{ currentPage }} di {{ numPages }}
                        </div>
                        <div :disabled="currentPage === numPages" :class="currentPage === numPages ? 'cursor_not-allowed' : 'fw-bold cursor_pointer'"
                            @click="goNext()">
                            next <font-awesome-icon :icon="['fas', 'chevron-right']" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

input#place::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 1em;
  width: 1em;
  background-color: rgba(255, 56, 92, 0.25);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff0000'%3E%3Cpath d='M19.713 18.287L12.425 11l7.288-7.287a1 1 0 00-1.414-1.414L11.01 9.586 3.723 2.299a1 1 0 00-1.414 1.414L9.586 11l-7.277 7.287a1 1 0 001.414 1.414l7.287-7.277 7.277 7.287a.996.996 0 001.414 0 .999.999 0 000-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  border-radius: 50px;
  }
.range-wrap {
    position: relative;

}

.form-range {
    --thumb-width: 10px;
}

.range-value {
    position: absolute;
    bottom: calc(100% + 20px);
    font-size: 14px;
    color: #000;
    pointer-events: none;
}


.range-value span {
    width: 30px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: $color_primary;
    color: $color_light;
    font-size: 12px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 6px;
}

.range-value span:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid $color_primary;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    margin-top: -1px;
}

.cursor_pointer {
    cursor: pointer;
}
.cursor_not-allowed {
    cursor: not-allowed;
}

.my-btn {
    padding: 0.5rem;
    display: inline-block;
    background-color: $color_light;
    color: $color_dark;
    text-decoration: none;
    border: 1px solid $color_gray;
}

// width del modale modificata 
.my-width {
    max-width: auto;
}

.map-container {
    max-width: 100%;
    aspect-ratio: 1 / 1;
    background-color: lightgray;
    border: 1px solid gray;
}

.guest {
    background-color: lightgray;
    padding: 0.5rem;
    width: 30px;
    border: 1px solid lightgray;
}

.modal-content {

    border-radius: 0.5rem;

    .modal-body {
        border-radius: 0.5rem;

        .form-container-small {

            .radius {
                &:focus {
                    border-radius: 5px 5px 0 0;
                    box-shadow: none;
                    border: 2px solid $color_primary;
                }
            }


            input[type=range] {
                // -webkit-appearance: none;
                margin: 20px 0;
                width: 100%;
            }

            input[type=range]:focus {
                outline: none;
            }

            input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                // animate: 0.2s;
                background: $color_primary;
                border-radius: 25px;
            }

            input[type=range]::-webkit-slider-thumb {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
                cursor: pointer;
                -webkit-appearance: none;
                margin-top: -8px;
            }

            input[type=range]:focus::-webkit-slider-runnable-track {
                background: $color_primary;
            }

            



            .input-text-price {
                display: flex;
                align-items: center;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #212529;
                text-align: center;
                white-space: nowrap;
                background-color: #e9ecef;
                border: 2px solid #ced4da;
            }

            .my-form-control {
                display: block;
                width: 100%;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #212529;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                box-shadow: none !important;
                outline: none;

                // non funziona border input number disabilitato
                &:focus {
                    border-color: $color_primary;
                }

                &:active {
                    border-color: $color_primary;
                }

                &:hover {
                    border-color: $color_primary;
                }

                &:focus-within {
                    border-color: $color_primary;
                }

                &:focus-visible {
                    border-color: $color_primary;
                }
            }

            .form-select {
                &:focus {
                    border: 2px solid;
                    border-color: $color_primary;
                    box-shadow: 0 0 0 0.25rem transparent;
                }

                &:focus-visible {
                    border: 2px solid;
                    border-color: $color_primary;
                }
            }

            .form-check-input {
                &:checked {
                    background-color: $color_primary;
                    border-color: transparent;
                }

                &:focus {
                    border: 2px solid;
                    border-color: $color_primary;
                    box-shadow: 0 0 0 0.25rem transparent;
                }
            }

            .my-submit-modal {
                padding: 0.5rem;
                display: inline-block;
                background-color: $color_primary;
                color: $color_light;
                text-decoration: none;
                border: 1px solid $color_primary;
                padding: 0.5rem 1rem;
                width: 100%;
            }
        }
    }
}

.form-container-large {
    border: 1px solid $color_gray;

    .form-floating>label {
        padding: 0 0.5rem;
        overflow: visible;
        top: -2px;
    }

    input {
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: hidden;
        background-color: $color_light;

        &:focus {
            outline: none;
        }
    }

    .address-list {
        border-radius: 30px;
        box-shadow: none;
        border: 2px solid $color_primary;
        background-color: $color_light;
        top: 60px;
    }

    .form-select {
        display: inline;
        width: auto;
        background-color: $color_light;
        border: 0;
        border-radius: 0;
        height: auto;
    }

    .no-outline:focus {
        outline: none;
    }

    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }

}


.my-submit {
    padding: 0.5rem;
    display: inline-block;
    background-color: $color_primary;
    color: $color_light;
    text-decoration: none;
    border: 1px solid $color_primary;

}



.modal-content {
    background-color: $color_light;
    border-radius: 0.5rem 0.5rem 0 0;
    border: none;

    .modal-body {
        border-radius: 0.5rem 0.5rem 0 0;

        .form-check-input {

            &:checked {
                background-color: $color_primary;
            }
        }
    }

}

.modal-footer {
    background-color: $color_light;

    .my-btn {
        padding: 0.5rem;
        display: inline-block;
        background-color: $color_light_gray;
        color: $color_dark;
        text-decoration: none;
        border: 1px solid $color_gray;
    }

    .my-submit {
        padding: 0.5rem;
        display: inline-block;
        background-color: $color_primary;
        color: $color_light;
        text-decoration: none;
        border: 1px solid $color_primary;

    }
}

.apartment-pagination {
    position: fixed;
    bottom: 112px;
    left: 0;
    width: 100%;
    background-color: $color_light;
    z-index: 9;

}


// MEDIAQUERY
@media screen and (min-width: 768px) {

    .my-width {
        max-width: 60%;

        .map-container {
            // width: 70%;
            margin: 0 auto;
        }
    }
}

@media screen and (min-width: 992px) {

    // width del modale modificata 
    .my-width {
        max-width: 60%;
    }
}


@media screen and (min-width: 1013px) {

    .apartment-pagination {
        bottom: 50px;
    }

}

@media screen and (min-width: 1024px) {

    // width del modale modificata 
    .my-width {
        max-width: 70%;

    }

}
</style>
