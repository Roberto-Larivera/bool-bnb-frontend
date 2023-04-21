<script>
import { store } from '../store';

import AppCard from '../components/Main/AppCard.vue';
import ListAutoComplete from '../components/Main/ListAutoComplete.vue';

// Axios
import axios from 'axios';

export default {
  name: 'ApartmentIndex',
  components:  {
    AppCard,
    ListAutoComplete
  },
  data(){
    return{
        store,
        apartment: {},
        apartments: [],
        message: 'Non ci sono appartamenti da visualizzare',
        messageChecked: false,
        moreFilters: false,
        services: [],
        query: '',
        autocomplete: [],
        activeAuto: false,
        currentPage: 1,
        numPages: null,
    }
  },
  methods: {
    // METODI PER CHIAMATE API
    getApiProjects() {
      axios
        .get(`https://api.tomtom.com/search/2/search/${this.query}.json`, {
            params: {
            'key': 'zYPEasZvEN9Do06ieftila5uHNmiGZtG',
            'countrySet' : 'IT',
            'lat' : '45.4642',
            'lon' : '9.1900',
            'radius' : '10000',
            'limit' : '5',
            }
        })
        .then(response => {
          console.log(response.data);
          this.autocomplete = response.data.results;
        });
    },
    getApiApartments() {
      axios
        .get(store.pathServerApi, {
            params: {
           
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
        let urlPagination =  `http://127.0.0.1:8000/api/apartments?page=${this.currentPage} `;

    
            axios
            .get(urlPagination)
            .then(response => {

                this.apartments = response.data.apartments.data;
            });
    },
    // metodi per frontend
    controlModal() {
        if (this.query.length == 0 )
        this.activeAuto = false
        else {
            if(this.query.length > 2)
            this.getApiProjects()
            this.activeAuto = true
        }
    },
    takeAddress(address) {
        this.activeAuto = false;
        return this.query = address;
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
                <div class="mt-2 d-flex flex-column justify-content-center d-md-flex flex-md-row justify-content-md-between">
                    <!-- Ricerca - Mobile -->
                    <button type="button" class="search my-btn rounded-pill my-3 p-3 d-md-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ricerca appartamenti
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content rounded">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Ricerca appartamenti
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" class="form-container-small">
                                        <div class="mb-3 position-relative">
                                            <label for="place" class="form-label">
                                                Dove
                                            </label>
                                            <!-- <input type="text" class="form-control" id="place"> -->
                                            <input type="text" class="form-control radius" id="place" v-model="query" @input="controlModal()" autocomplete="off">
                                            <ListAutoComplete class="position-absolute" style="width: 100%;" :class="activeAuto? 'd-block':'d-none'" :itemsComplete="autocomplete" @takeAddress="takeAddress"/>
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
                    <div class="form-container-large rounded-pill p-2 shadow bg-body-tertiary rounded d-none d-md-inline-block flex-md-grow-1">
                        <form action="" class="d-flex justify-content-between align-items-center">
                            <span class="d-flex justify-content-between align-items-center" style="width: 90%">
                                <span class="form-floating position-relative flex-grow-1" style="z-index: 4;">
                                    <!-- <label for="place">
                                        Dove
                                    </label> -->
                                    <input type="text" id="place" class="ms-3 radius" placeholder="Dove" style="width: 90%" v-model="query" @input="controlModal()" autocomplete="off">
                                    <ListAutoComplete class="position-absolute" style="width: 100%; z-index: 3;" :class="activeAuto? 'd-block':'d-none'" :itemsComplete="autocomplete" @takeAddress="takeAddress"/>
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
                    <button type="button" class="filter my-btn ms-2 p-3 rounded-pill d-md-none d-lg-inline" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        <font-awesome-icon icon="fa-solid fa-sort" /> Filtri avanzati
                    </button>

                    <!-- Bottone filtri avanzati per tablet / lg -->
                    <button type="button" class="filter my-btn ms-2 p-3 rounded-pill d-none d-md-inline d-lg-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        <font-awesome-icon icon="fa-solid fa-sort" />
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable my-width">
                            <div class="modal-content rounded">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Filtri avanzati
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" class="form-container-small">
                                        <!-- raggio 20 km -->
                                        <div class="mb-3">
                                            <label for="km" class="form-label">
                                                Distanza / km 
                                            </label>
                                            <input type="range" class="form-range" min="5" max="20" step="5" id="km">
                                        </div>
                                        <div class="mb-3">
                                            <label for="price" class="form-label">
                                                Prezzo per notte
                                            </label>
                                            <input type="number" class="form-control" min="0" max="3000" id="price">
                                        </div>

                                        <div class="mb-3">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Numero stanze</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Numero bagni</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                        
                                        <div class="mb-3">
                                            Servizi 
                                        </div>
                                        <div class="form-check">
                                            <div class="mb-1" v-for="service in services">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    {{ service.name }}
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="my-btn rounded" data-bs-dismiss="modal">
                                        Esci
                                    </button>
                                    <button type="submit" class="my-submit rounded">
                                        Aggiungi filtri
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
            <AppCard v-for="apartment in apartments" :apartment="apartment" />
        </div>
    </div>

    <!-- Risposta no apartments -->
     <div class="container" :class="messageChecked == false ? 'd-none' : 'd-block'">
        <div class="row">
            <div class="col">
                <h1>
                    {{ message }}
                </h1>
            </div>
        </div>
    </div>

    <!-- Paginazione -->
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="apartment-pagination d-flex justify-content-around">
                    <div :disabled="currentPage === 1" @click="goPrev()">
                            <strong><font-awesome-icon :icon="['fas', 'chevron-left']" /> prev</strong>
                    </div>
                    <div>
                        {{ currentPage }} di {{ numPages }}
                    </div>
                    <div :disabled="currentPage === numPages" @click="goNext()">
                            <strong>next <font-awesome-icon :icon="['fas', 'chevron-right']" /></strong>
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

    .form-floating > label {
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
    width: 100%;
    margin-top: 3rem;
}

@media screen and (min-width: 992px) {

    // width del modale modificata 
    .my-width {
        max-width: 80%;
    }

    .apartment-pagination {
        position: fixed;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%);
        padding: 2rem;
}
}



</style>
