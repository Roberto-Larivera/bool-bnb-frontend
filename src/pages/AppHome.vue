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
    };
  },
  components: { 
    AppCard,
    ListAutoComplete
   },
  methods: {
    getApiProjects() {
      axios.get(`https://api.tomtom.com/search/2/search/${this.query}.json`, {
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
          this.autocomplete = response.data.results
        });
    },
    getApiHome() {
      axios.get(`${this.store.pathServerHome}home`)
        .then(response => {
          console.log(response);
          this.apartments = response.data.apartments;
        }
      );
    },
    controlModal(){
      if (this.query.length == 0 )
      this.activeAuto = false
      else{
        if(this.query.length > 2)
          this.getApiProjects()
        this.activeAuto = true
      }
    },
    takeAddress(address) {
        this.activeAuto = false;
        return this.query = address;
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


        <div class="jumbo position-relative col-12 col-lg-8 offset-lg-4 col-xl-8 offset-xl-3 mb-3 mt-3">
          <div class=" my-research p-4 p-md-5 shadow-lg">

            <h3>
              Trova alloggi su BoolBNB
            </h3>

            <p class="text-gray">
              Scopri alloggi interi e stanze ideali per ogni tipo di viaggio
            </p>



            <div class="mb-3 position-relative">
              <label for="exampleFormControlInput1" class="form-label">Dove</label>
              <input type="text" class="form-control radius" v-model="query" @input="controlModal()" id="exampleFormControlInput1"
                placeholder="Inserisci una destinazione" autocomplete="off">
                <ListAutoComplete class="position-absolute" style="width: 100%;" :class="activeAuto? 'd-block':'d-none'" :itemsComplete="autocomplete" @takeAddress="takeAddress"/>
            </div>
            

            <div class="mb-3 d-sm-flex justify-content-sm-between">
              <div class="data mt-2 me-sm-2" style="width: 100%;">
                <label for="exampleFormControlInput1" class="check-in">Check-in</label>
                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="">
              </div>
              <div class="data mt-2" style="width: 100%;">
                <label for="exampleFormControlInput1" class="check-out">Check-out</label>
                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="">
              </div>
            </div>

            <div class="mb-3">
              <div>
                <label for="exampleFormControlInput1" class="check-in">Ospiti</label>
                <select class="form-select" id="exampleFormControlInput1" placeholder="">
                  <option selected>1</option>
                  <option value="1">2</option>
                  <option value="2">3</option>
                  <option value="3">4</option>
                </select>
              </div>
            </div>

            <button class="btn">
              Cerca
            </button>
          </div>
          <div class="image-container d-none d-lg-block ">
            <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="">
          </div>

        </div>

      </div>
    </div>
  </section>

  <section class="mb-5 text-center min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">
            Viaggia in tutta tranquillità prenotando su BoolBNB
          </h2>
        </div>
        <div class="row g-4">
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
    </div>

  </section>
  <section class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-5">
            Appena prenotati in questa località
          </h2>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-4 g-4">
        <AppCard :apartment="apartments[index-1]" class="d-lg-none" v-for="index in 3" />
        <AppCard :apartment="apartments[index-1]" class="d-none d-lg-block" v-for="index in 4" />
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

// .my-research {
//     .radius {
//         &:focus {
//             border-radius: 5px 5px 0 0;
//             box-shadow: none;
//             border: 2px solid $color_primary;
//         }
//     }
// }
.data {
  width: 49%;
}

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

}

.image-container {
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
  }

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
