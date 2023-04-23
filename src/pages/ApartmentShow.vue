<script>
import Map from '../components/Main/Map.vue';
import { store } from '../store.js';

// Axios
import axios from 'axios';

export default {
  name: 'ApartmentShow',
  components: {
    Map
  },
  data() {
    return {
      apiKey: 'CBlWoj5lPfzTxbpwHbHcPvuhg8ukNzCs',
      apartment: {},
      caricamento: false,
      store,
      formData: {}
    }
  },
  methods: {
    setApartmentId() {
      this.formData.apartment_id = this.apartment.id 
    },
    getApiShow() {
      axios.get(`${this.store.pathServerApi}${this.$route.params.slug}`)
        .then(response => {
          console.log(response);
          this.apartment = response.data.apartment;
          this.caricamento = true;
        }
        );
    },
    sendMessage() {
      axios.post('http://127.0.0.1:8000/api/messages/store', this.formData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getApiShow()
  },
  mounted() {
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        const ipAddress = response.data.ip;
        axios.post('http://127.0.0.1:8000/api/view/store', {
          apartment_id: this.apartment.id,
          ip_address: ipAddress,
        })
          .then(response => {
            if (response.data.success) {
              console.log('La view è stata registrata veramente');
            } else {
              console.log('Errore: ' + response.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
}
</script>


<template>
  <div class="container">

    <!-- Titolo e immagini -->
    <template v-if="caricamento">
      <div class="row">
        <div class="col">

          <h1>{{ apartment.title }}</h1>

          <div class="mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span>
                <font-awesome-icon :icon="['fas', 'location-dot']" />
              </span>
              <span>
                <a href="#" class="my-link mx-2">{{ apartment.address }}</a>
              </span>
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'eye']" /> {{ apartment.views_count }} Visualizzazioni
            </div>
          </div>

          <!-- Carosello di immagini -->

          <div class="img-container">
            <div class="row">

              <div class="col-12 col-lg-6">
                <img :src="apartment.main_img" alt="Img" class="img-fluid">
              </div>

              <div class="col-6 d-none d-lg-block">
                <div class="row g-2 align-items-center">
                  <div class="col-6">
                    <img :src="apartment.main_img" alt="Img" class="w-100 img-fluid">
                  </div>
                  <div class="col-6">
                    <img :src="apartment.main_img" alt="Img" class="w-100 img-fluid">
                  </div>
                  <div class="col-6">
                    <img :src="apartment.main_img" alt="Img" class="w-100 mb-3 img-fluid">
                  </div>
                  <div class="col-6">
                    <img :src="apartment.main_img" alt="Img" class="w-100 mb-3 img-fluid">
                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>

        <div class="row pt-5">

          <div class="col-12 col-lg-8">

            <!-- Descrizione e host -->
            <div class="row">
              <div class="col">
                <div>
                  <h3>Host: {{ apartment.user.user_data.name }} {{ apartment.user.user_data.surname }}</h3>
                  <div>
                    <span>{{ apartment.max_guests }} ospiti · </span>
                    <span>{{ apartment.rooms }} camere da letto · </span>
                    <span>{{ apartment.beds }} letto · </span>
                    <span>{{ apartment.baths }} bagno </span>
                  </div>
                </div>
              </div>
            </div>

            <hr>

            <!-- Caratteristiche in rilievo -->
            <div class="col">

              <div>
                <div class="d-flex">
                  <div>
                    <font-awesome-icon :icon="['fas', 'heart-circle-plus',]" size="xl" style="color: #FF385C;" />
                  </div>
                  <div class="px-3">
                    <h6>Airbnb Plus</h6>
                    <p>Verifichiano ogni alloggio Plus in termini di qualità. </p>
                  </div>
                </div>
              </div>

              <div>
                <div class="d-flex">
                  <div>
                    <font-awesome-icon :icon="['fas', 'key']" size="xl" style="color: #FF385C;" />
                  </div>
                  <div class="px-3">
                    <h6>Ottima esperienza di check-in</h6>
                    <p>Il 95% degli ospiti ha valutato con 5 stelle la procedura di check-in.</p>
                  </div>
                </div>
              </div>

              <div>
                <div class="d-flex">
                  <div>
                    <font-awesome-icon :icon="['fas', 'calendar']" size="xl" style="color: #FF385C;" />
                  </div>
                  <div class="px-3">
                    <h6>Cancellazione gratuita entro le ore 12:00 del giorno 13 apr.</h6>
                  </div>
                </div>
              </div>

            </div>

            <hr>

            <!-- Protezione aircover -->
            <div class="col">
              <p>
                Ogni prenotazione include una protezione gratuita in caso di cancellazione da parte dell'host, di
                inesattezze dell'annuncio e di altri problemi come le difficoltà in fase di check-in.
              </p>
            </div>

            <hr>

            <!-- Descrizione dell'appartamento -->
            <div class="col">
              <p>{{ apartment.description }}</p>
            </div>

            <hr>

            <!-- Servizi inclusi -->
            <div class="col">
              <h5 class="my-3">Cosa troverai</h5>
              <ul v-for="service in apartment.services">

                <!-- STAMPARE QUI SERVIZI CON RELATIVE ICONE -->
                
                <li>
                  <font-awesome-icon :icon="service.icon" />
                  {{ service.name }}
                </li>

              </ul>
            </div>

            <hr>

            <!-- Calendario con disponibilità -->
            <div class="col">
              <h5 class="my-3">Calendario disponibilità</h5>
              <p>!!! DA AGGIUNGERE EVENTUALMENTE !!!</p>
            </div>

          </div>


          <div class="col-12 col-lg-4 special-col">
            <!-- Invio messaggio all'host -->
            <!-- Button trigger modal -->
            <button type="button" class="btn my-btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#messageModal">
              Contatta l'host
            </button>

            <!-- Modal -->
            <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Inserisci qua il tuo messaggio</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="sendMessage">
                    <div class="modal-body">
                      <div>
                        <label for="name">Nome:</label>
                        <input type="text" id="name" v-model="formData.sender_name" required>
                      </div>
                      <div>
                        <label for="surname">Cognome:</label>
                        <input type="text" id="surname" v-model="formData.sender_surname" required>
                      </div>
                      <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="formData.sender_email" required>
                      </div>
                      <div>
                        <label for="subject">Oggetto:</label>
                        <input type="text" id="subject" v-model="formData.object" required>
                      </div>
                      <div>
                        <label for="message">Messaggio:</label>
                        <textarea id="message" v-model="formData.sender_text" required></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn" data-bs-dismiss="modal">Chiudi</button>
                      <button type="submit" class="btn my-btn" @click="setApartmentId">Invia</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Riepilogo prenotazione e costi (sezione sul lato destro) -->
            <div class="booking-review shadow-lg p-4">

              <div class="mb-3">
                <span class="fw-bold fs-5">{{ apartment.price }} € </span>
                <span>notte</span>
              </div>

              <div>
                <div class="mb-3">
                  <div class="data">
                    <label for="exampleFormControlInput1" class="check-in">Check-in</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="">
                  </div>
                  <div class="data">
                    <label for="exampleFormControlInput1" class="check-out">Check-out</label>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="">
                  </div>
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

              <button class="btn my-btn-primary mb-2">
                Prenota
              </button>

              <div class="mb-3">
                <p class="grey-text text-center">Non riceverai alcun addebito in questa fase</p>
              </div>

              <div class="mb-3 d-flex justify-content-between">
                <span class="text-decoration-underline">{{ apartment.price }} € x 5 notti</span>
                <span>1.100 €</span>
              </div>

              <div class="mb-3 d-flex justify-content-between">
                <span class="text-decoration-underline">Costi del servizio Airbnb</span>
                <span>189 €</span>
              </div>

              <hr>

              <div class="mb-3 d-flex justify-content-between">
                <span class="fw-bold">Totale</span>
                <span class="fw-bold">1289 €</span>
              </div>

            </div>

          </div>

        </div>

        <!-- Localizzazione dell'appartamento -->
        <div class="row">
          <div class="col mb-3">
            <hr>
            <h5 class="my-3">Dove ti troverai</h5>
            <!-- !! MAPPA !! -->
            <div>
              <Map :apiKey="apiKey" :lat="apartment.latitude" :long="apartment.longitude"></Map>
            </div>
            <span class="fw-semibold">{{ apartment.address }}</span>
          </div>
        </div>

      </div>
    </template>

  </div>
</template>


<style lang="scss" scoped>
.my-link {
  color: $color_dark;
}

img {
  object-fit: contain;
}

.booking-review {
  border-radius: 20px;
  background-color: $color_light;
  min-height: 200px;
}

.my-btn {
  background-color: $color_primary;
  color: $color_light;
}

.my-btn-primary {
  width: 100%;
  background-color: $color_primary;
  color: $color_light;
}

.grey-text {
  color: $color_gray;
}

#message {
  width: 100%;
  border: 1px solid $color_light_gray;
  border-radius: 10px;
}

.single-image-container img {
  border-radius: 10px;
}
</style>