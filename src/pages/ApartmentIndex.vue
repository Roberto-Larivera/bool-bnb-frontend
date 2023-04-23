<script>
import { store } from '../store';

import AppCard from '../components/Main/AppCard.vue';
import ListAutoComplete from '../components/Main/ListAutoComplete.vue';

// Axios
import axios from 'axios';

export default {
    name: 'ApartmentIndex',
    components: {
        AppCard,
        ListAutoComplete
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
            // filteredApartments: []
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
                        'radius': '10000',
                        'limit': '5',
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.autocomplete = response.data.results;
                });
        },
        getApiApartments() {
            if(this.autocomplete == ''){
            }
            else{
                this.store.lat = this.autocomplete[0].position.lat;
                this.store.lon = this.autocomplete[0].position.lon;
            }
            axios
                .get(store.pathServerApi, {
                    params: {
                        'address': this.store.address,
                        'lat': this.store.lat,
                        'lon': this.store.lon
                    }
                })
                .then((response) => {
                    console.log(response.data);

                    if (response.data.success == true) {
                        this.apartments = response.data.apartments.data;
                        this.messageChecked = false;
                        //  pagination
                        this.numPages = response.data.apartments.last_page;
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
                    console.log(response.data.services);
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
            console.log('ok');
            if (this.currentPage > 1) {

                this.currentPage--;
                this.getPagination();

            }
        },
        goNext() {
            console.log('ok');
            if (this.currentPage < this.numPages) {

                this.currentPage++;
                this.getPagination();
            }
        },
        lessGuests() {
            console.log('ok');
            if (this.currentGuest > 1) {

                this.currentGuest--;
            }
        },
        moreGuests() {
            console.log('ok');
            if (this.currentGuest < this.maxGuests) {

                this.currentGuest++;
            }
        },
        getServices() {
            this.moreServices = true;
        },
        switchFilter() {
            this.apartments = this.filteredApartments;
        }
    },
    computed: {
        filteredApartments() {
            let newApartments = this.apartments.filter((item) => {
                if (this.currentGuest == 0) {
                    return this.apartments;
                }
                else {
                    return item.max_guests >= this.currentGuest;
                }
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

            return newApartments;
        }
    },
    created() {
        this.getApiApartments();
        this.getApiServices();
    }
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
                                            <input type="search" class="form-control radius" id="place" v-model="this.store.address" 
                                                @input="controlModal()" @click="store.addressListVisible = true" autocomplete="off">
                                            <ListAutoComplete v-if="store.addressListVisible" class="position-absolute card radius" style="width: 100%;"
                                                :class="activeAuto ? 'd-block' : 'd-none'" :itemsComplete="autocomplete"
                                                @takeAddress="takeAddress" />
                                        </div>
                                        <!-- DATI COMMENTATI -->
                                        <!-- <div class="mb-3">
                                                <label for="check-in" class="form-label">
                                                    Check-in
                                                </label>
                                                <input type="date" class="form-control" id="check-in">
                                            </div>
                                            <div class="mb-3">
                                                <label for="check-out" class="form-label">
                                                    Check-out
                                                </label>
                                                <input type="date" class="form-control" id="check-out">
                                            </div>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Seleziona nr. ospiti</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select> -->
                                        <button type="submit" class="my-submit-modal rounded">
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
                                    <input type="search" id="place" class="ms-3 radius" placeholder="Dove" style="width: 90%"
                                        v-model="this.store.address" @input="controlModal()" @click="store.addressListVisible = true" autocomplete="off">
                                    <ListAutoComplete v-if="store.addressListVisible" class="position-absolute address-list"
                                        style="width: 100%; z-index: 3;" :class="activeAuto ? 'd-block' : 'd-none'"
                                        :itemsComplete="autocomplete" @takeAddress="takeAddress" />
                                </span>
                                <!-- <span class="form-floating">
                                        <input type="date" id="check-in" placeholder="Da quando">
                                    </span>
                                    <span class="form-floating">
                                        <input type="date" id="check-out" placeholder="A quando">
                                    </span> -->
                                <!-- <span>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Ospiti</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </span> -->
                            </span>
                            <button type="submit" class="my-submit rounded-pill px-3">
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
                                        <div class="mb-3">
                                            <label for="km" class="form-label">
                                                Distanza / km
                                            </label>
                                            <input type="range" class="form-range" min="0" max="20" step="5" id="km">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    0 km
                                                </div>
                                                <div>
                                                    20 km
                                                </div>
                                            </div>
                                        </div>

                                        <!-- mappa da inserire -->
                                        <div class="mb-3">
                                            <div class="map-container rounded">

                                            </div>
                                        </div>

                                        <!-- ospiti aggiungere -->
                                        <div class="mb-3">
                                            <div class="guests">
                                                <label for="guests" class="form-label">
                                                    Numero ospiti
                                                </label>
                                                <div class="inline-block">
                                                    <div class="d-flex">
                                                        <div class="rounded-start guest" @click="lessGuests()">
                                                            -
                                                        </div>
                                                        <div class="d-flex justify-content-center align-items-center"
                                                            style="width: 50px; border: 1px solid lightgray;">
                                                            {{ currentGuest }}
                                                        </div>
                                                        <div class="rounded-end guest" @click="moreGuests()">
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
                                                        aria-label="Amount (to the nearest dollar)" v-model="priceValue">
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
                                                    <select class="form-select" aria-label="Default select example"
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
                                                    <select class="form-select" aria-label="Default select example"
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
                                                        v-for="service in services.slice(-services.length, 7)">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="flexCheckDefault">
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            {{ service.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <button class="my-submit rounded d-lg-none" @click="getServices()" :class="{
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
                                                    <div class="mb-1" v-for="service in services.slice(7)">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="flexCheckDefault">
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            {{ service.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-none d-lg-block">
                                            <ul class="row row-cols-lg-2">
                                                <li v-for="service in services" class="col ps-lg-0">
                                                    <div class="mb-1">
                                                        <input class="form-check-input me-2" type="checkbox"
                                                            :value="service.id" id="flexCheckDefault" v-model="isChecked">
                                                        <label class="form-check-label text-break" for="flexCheckDefault">
                                                            {{ service.name }}
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="my-btn rounded" data-bs-dismiss="modal">
                                        Esci
                                    </button>
                                    <button type="submit" class="my-submit rounded" @click="switchFilter()" data-bs-dismiss="modal">
                                        Mostra <span> {{ filteredApartments.length }}</span>
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
    <div class="container" :class="messageChecked == false ? 'd-block' : 'd-none'">
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
                        <div :disabled="currentPage === 1" :class="currentPage === 1 ? '' : 'fw-bold'" @click="goPrev()">
                            <font-awesome-icon :icon="['fas', 'chevron-left']" /> prev
                        </div>
                        <div>
                            {{ currentPage }} di {{ numPages }}
                        </div>
                        <div :disabled="currentPage === numPages" :class="currentPage === numPages ? '' : 'fw-bold'" @click="goNext()">
                            next <font-awesome-icon :icon="['fas', 'chevron-right']" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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


            input[type="range"]::-webkit-slider-thumb {
                background-color: $color_primary;
                border-color: $color_primary;
            }

            input[type="range"]::-moz-range-thumb {
                background-color: $color_primary;
                border-color: $color_primary;
            }

            input[type="range"]::-ms-thumb {
                background-color: $color_primary;
                border-color: $color_primary;
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
                border: 1px solid #ced4da;
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
    width: 100%; 
    background-color: $color_light;
    z-index: 9; 

}


// MEDIAQUERY
@media screen and (min-width: 768px) {

    .my-width {
        max-width: 60%;

        .map-container {
            max-width: 70%;
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

@media screen and (min-width: 1024px) {

    // width del modale modificata 
    .my-width {
        max-width: 60%;

    }

    .apartment-pagination {
        bottom: 50px;
    }
}

</style>
