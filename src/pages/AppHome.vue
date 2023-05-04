<script>
import AppCard from '../components/Main/AppCard.vue';

import { store } from '../store.js';

import ListAutoComplete from '../components/Main/ListAutoComplete.vue';

// Axios
import axios from 'axios';

export default {
  name: "AppHome",
  data() {
    return {
      query: '',
      autocomplete: [],
      activeAuto: false,
      store,
      apartments: null,
      lat: '',
      lon: ''
    };
  },
  components: { 
    AppCard,
    ListAutoComplete
   },
  methods: {
    getApiProjects() {
      axios.get(`https://api.tomtom.com/search/2/search/${this.store.address}.json`, {
        params: {
          'key': 'zYPEasZvEN9Do06ieftila5uHNmiGZtG',
          'countrySet' : 'IT',
          'lat' : '45.4642',
          'lon' : '9.1900',
          'radius' : '20000',
          'limit' : '5',
        }
      })
        .then(response => {
          this.autocomplete = response.data.results
        });
    },
    getApiHome() {
      axios.get(`${this.store.pathServerHome}home`)
        .then(response => {
          this.apartments = response.data.apartments;
        }
      );
    },
    controlModal(){
      if (this.store.address.length == 0 )
      this.activeAuto = false
      else{
        if(this.store.address.length > 2)
          this.getApiProjects()
        this.activeAuto = true
      }
    },
    sendAddress(){
      this.store.lat = this.autocomplete[0].position.lat;
      this.store.lon = this.autocomplete[0].position.lon;
    }
  },
  created(){
    this.getApiHome()
  }
}
</script>

<template>
  <section class="my-5 min-vh-md-100 d-flex align-items-center">
    <div class="container">
      <div class="row">

        <!-- Jumbotron con sezione di ricerca appartamenti -->
        <div id="first-section" class="jumbo position-relative col-12 col-lg-8 offset-lg-4 col-xl-8 offset-xl-3 mb-3 mt-3">
          <form submit.prevent >

            <div class=" my-research p-4 p-md-5 shadow-lg">
              <h3>
                Trova alloggi su BoolBNB
              </h3>
              <p class="text-gray">
                Scopri alloggi interi e stanze ideali per ogni tipo di viaggio
              </p>

              <div class="mb-3 position-relative" @click.stop> 
                <label for="exampleFormControlInput1" class="form-label">Dove</label>
                <input type="search" class="form-control radius" v-model="store.address" name="address" @click="store.addressListVisible = true" @input="controlModal()" id="exampleFormControlInput1"
                  placeholder="Inserisci una destinazione" autocomplete="off">
                  <ListAutoComplete v-if="store.addressListVisible" class="position-absolute card radius" style="width: 100%;" :class="activeAuto? 'd-block':'d-none'" :itemsComplete="autocomplete" />
              </div>

              <router-link :to="{ name: 'apartments-index' }" class="btn">
                Cerca
              </router-link>

            </div>
          </form>

          <div class="image-container d-none d-lg-block">
            <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Homepage image">
          </div>

        </div>

        <div class="d-flex justify-content-center mt-5">
          <a href="#second-section" class="my-link d-none d-lg-block">
            <font-awesome-icon :icon="['fas', 'chevron-down']" bounce />
          </a>
        </div>

      </div>
    </div>
  </section>

  <!-- Sezione intermedia -->
  <section id="second-section" class="mb-5 text-center min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">
            Viaggia in tutta tranquillità prenotando su BoolBNB
          </h2>
        </div>
        <div class="row g-4 my-margin">

          <div class="col-12 col-lg-4 mb-3">
            <h1>
              <font-awesome-icon class="my-text-primary" :icon="['fas', 'shield']" />
            </h1>
            <h3>
              Protezione con AirCover
            </h3>
            <p>
              La copertura più completa per i tuoi viaggi. Sempre inclusa e gratuita.
            </p>
          </div>

          <div class="col-12 col-lg-4 mb-3">
            <h1>
              <font-awesome-icon class="my-text-primary" :icon="['fas', 'calendar']" />
            </h1>
            <h3>
              Opzione di cancellazione con termini flessibili
            </h3>
            <p>
              Grazie alle opzioni di cancellazione, è più semplice riprenotare se i programmi cambiano
            </p>
          </div>

          <div class="col-12 col-lg-4 mb-3">
            <h1>
              <font-awesome-icon class="my-text-primary" :icon="['fas', 'headset']" />
            </h1>
            <h3>
              Assistenza clienti 24h su 24
            </h3>
            <p>
              Contatta il nostro team di assistenza ovunque ti trovi e a qualsiasi ora
            </p>
          </div>
          
        </div>

      </div>

      <div class="d-flex justify-content-center mt-5">
          <a href="#last-section" class="my-link d-none d-lg-block">
            <font-awesome-icon :icon="['fas', 'chevron-down']" bounce />
          </a>
      </div>

    </div>
  </section>

  <!-- Sezione con appartamenti sponsorizzati -->
  <section id="last-section" class="pb-5">
    <div class="container">

      <div class="row">
        <div class="col-12">
          <h2 class="mb-5">
            Appena prenotati in questa località
          </h2>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-4 g-4">
        <AppCard :apartment="apartment" v-for="apartment in apartments" />
      </div>

      <div class="row">
        <div class="col text-center text-lg-start">
          <router-link :to="{ name: 'apartments-index' }" class="btn btn-color">
            Esplora tutto
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>


<style lang="scss" scoped>

.btn-color {
  background-color: $color_primary;
  color: $color_light;
}

.my-text-primary {
  color: $color_primary;
}

.text-gray {
  color: lightgray;
}

.my-research {
  border-radius: 30px;
  background-color: $color_light;

  .radius {
        &:focus {
            border-radius: 5px 5px 0 0;
            box-shadow: none;
            border: 2px solid $color_primary;
        }
    }

  .btn {
    width: 100%;
    background-color: $color_primary;
    color: $color_light;
  }

  .form-control::-webkit-search-cancel-button {
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

}

.image-container {
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
  }

}

.my-margin{
  margin: 0 0;
}

.my-link{
  color: $color_primary;
}

@media screen and (min-width: 320px) {}

@media screen and (min-width: 576px) {}

@media screen and (min-width: 768px) {}

@media screen and (min-width: 992px) {

  .jumbo {
  margin-top: 4rem;

  .my-research {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
  }

  .image-container {
    min-height: 500px;

    img {
      min-height: 550px;
    }
  }
}
}

@media screen and (min-width: 1200px) {
  .my-research {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
  }
}

@media screen and (min-width: 1400px) {}

</style>