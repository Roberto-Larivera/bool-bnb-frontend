<script>
import Map from "../components/Main/Map.vue";
import { store } from "../store.js";

import AppSwiperShow from "../components/Main/AppSwiperShow.vue"

// Axios
import axios from "axios";

export default {
  name: "ApartmentShow",
  components: {
    Map,
    AppSwiperShow
  },
  data() {
    return {
      apiKey: "CBlWoj5lPfzTxbpwHbHcPvuhg8ukNzCs",
      apartment: [],
      imageGallery: [],
      servicesArray: [],
      store,
      formData: {
        'sender_name' : store.user_name != 'Accedi' ? store.user_name:'',
        'sender_surname' : store.user_surname != '' ? store.user_surname:'',
        'sender_email' : store.user_email != '' ? store.user_email:'',
      },
      isSent: false,
      loading: true
    };
  },
  methods: {
    setApartmentId() {
      this.formData.apartment_id = this.apartment.id;
    },
    getApiShow() {
      axios
        .get(`${this.store.pathServerApi}${this.$route.params.slug}`)
        .then((response) => {
          if (response.data.success) {
            this.apartment = response.data.apartment;
            this.imageGallery = response.data.apartment.full_image_gallery;

            this.servicesArray = response.data.apartment.services;
          } else {
            this.$router.push({ name: "not-found" });
            // console.log(this.project);
          }
        });
    },
    sendMessage() {
      axios
        .post("http://127.0.0.1:8000/api/messages/store", this.formData)
        .then((response) => {
          this.isSent = true;
          setTimeout(() => {
            this.isSent = false;
          }, 5000);
          this.formData = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getApiShow();
  },
  mounted() {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        const ipAddress = response.data.ip;
        axios
          .post("http://127.0.0.1:8000/api/view/store", {
            apartment_id: this.apartment.id,
            ip_address: ipAddress,
          })
          .then((response) => {
            if (response.data.success) {
              console.log("La view è stata registrata veramente");
            } else {
              console.log("Errore: " + response.data.message);
            }
          })
          .catch((error) => {
          });
      })
      .catch((error) => {
      });
  },
};
</script>

<template>
  <div class="container">
    <!-- Titolo e immagini -->
    <div class="row">
      <div class="col">

        <div v-if="isSent" class="message success d-flex align-items-center justify-content-center">
          <font-awesome-icon :icon="['fas', 'circle-check']" />
          <span class="ms-2 me-4">Messaggio inviato con successo!</span>
          <button class="close" aria-label="Close">
            <font-awesome-icon class="close-icon" :icon="['fas', 'fa-times']" @click="isSent = false" />
          </button>
        </div>

        <h1>{{ apartment.title }}</h1>

        <div class="mb-3 d-flex justify-content-between align-items-center">
          <div>
            <span>
              <font-awesome-icon :icon="['fas', 'location-dot']" />
            </span>
            <span>
              <a href="#dovetitroverai" class="my-link mx-2">{{ apartment.address }}</a>
            </span>
          </div>
          <div>
            <font-awesome-icon :icon="['fas', 'eye']" /> {{ apartment.views_count }}
          </div>
        </div>

        <!-- Carosello di immagini -->

        <div class="img-container">

          <!-- Gallery phone -->
          <div class="row">
            <div class="col">
              <AppSwiperShow :imgDefault="apartment.full_path_main_img" :images="imageGallery" class="d-lg-none"/>
            </div>
          </div>

          <!--  gallery desktop-->
          <div id="image_gallery" class="row d-none d-lg-flex">
            <!-- img default -->
            <div :class="{
              'col-12 ratio ratio-16x9': imageGallery.length == 0,
              'col-6': imageGallery.length >= 1
            }">
              <img :src="apartment.full_path_main_img" class="img-fluid" :class="{

                  'b-all': imageGallery.length == 0,
                  'b-sx': imageGallery.length >= 1,

                }">
            </div>




            <!-- gallery img -->
            <div class="col-6" v-if="imageGallery.length > 0">
              <div class="row h-100" :class="{ 'gy-3': imageGallery.length >= 3 }">


                <div :class="{

                    'col-12': imageGallery.length == 1,
                    'col-6': imageGallery.length == 2,
                    'col-6 ': imageGallery.length >= 3,

                  }" v-if="imageGallery.length >= 1">
                  <img :src="imageGallery[0].full_path_image_gallery" class="img-fluid" :class="{

                      'b-dx': imageGallery.length == 1

                    }">
                </div>



                <div :class="{

                    'col-6': imageGallery.length >= 2,
                    // 'col-6': imageGallery.length >= 3,

                  }" v-if="imageGallery.length >= 2">
                  <img :src="imageGallery[1].full_path_image_gallery" class="img-fluid" :class="{

                      'b-dx': imageGallery.length == 2,
                      'b-dxt': imageGallery.length >= 3,

                    }">
                </div>



                <div :class="{

                    'col-12 ': imageGallery.length == 3,
                    'col-6 ': imageGallery.length == 4,

                  }" v-if="imageGallery.length >= 3">
                  <img :src="imageGallery[2].full_path_image_gallery" class="img-fluid" :class="{

                      'b-dxb': imageGallery.length == 3,
                      

                    }">
                </div>

                <div class="col-6" v-if="imageGallery.length == 4">
                  <img :src="imageGallery[3].full_path_image_gallery" class="img-fluid" :class="{

                      'b-dxb': imageGallery.length == 4,

                    }">
                </div>



              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

    <div class="row pt-5">
      <div class="col-12 col-lg-8">
        <!-- Descrizione e host -->
        <div v-if="apartment.user && apartment.user.user_data" class="row">
          <div class="col">
            <div>
              <h3>
                Host: {{ apartment.user.user_data.name }}
                {{ apartment.user.user_data.surname }}
              </h3>
              <div>
                <span>{{ apartment.max_guests }} ospiti · </span>
                <span>{{ apartment.rooms }} camere da letto · </span>
                <span>{{ apartment.beds }} letto · </span>
                <span>{{ apartment.baths }} bagno </span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <!-- Caratteristiche in rilievo -->
        <div class="col">
          <div>
            <div class="d-flex">
              <div>
                <font-awesome-icon :icon="['fas', 'heart-circle-plus']" size="xl" style="color: #ff385c" />
              </div>
              <div class="px-3">
                <h6>Airbnb Plus</h6>
                <p>Verifichiano ogni alloggio Plus in termini di qualità.</p>
              </div>
            </div>
          </div>

          <div>
            <div class="d-flex">
              <div>
                <font-awesome-icon :icon="['fas', 'key']" size="xl" style="color: #ff385c" />
              </div>
              <div class="px-3">
                <h6>Ottima esperienza di check-in</h6>
                <p>
                  Il 95% degli ospiti ha valutato con 5 stelle la procedura di check-in.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div class="d-flex">
              <div>
                <font-awesome-icon :icon="['fas', 'calendar']" size="xl" style="color: #ff385c" />
              </div>
              <div class="px-3">
                <h6>Cancellazione gratuita entro le ore 12:00 del giorno 13 apr.</h6>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <!-- Protezione aircover -->
        <div class="col">
          <h5 class="my-3">Protezione</h5>
          <p>
            Ogni prenotazione include una protezione gratuita in caso di cancellazione
            da parte dell'host, di inesattezze dell'annuncio e di altri problemi come le
            difficoltà in fase di check-in.
          </p>
        </div>

        <hr />

        <!-- Descrizione dell'appartamento -->
        <div class="col">
          <h5 class="my-3">Descrizione</h5>
          <p>{{ apartment.description }}</p>
        </div>

        <hr />

        <!-- Servizi inclusi -->
        <div class="col">
          <h5 class="my-3">Cosa troverai</h5>
          <ul v-if="servicesArray.length > 0">
            <!-- STAMPARE QUI SERVIZI CON RELATIVE ICONE -->
            <li class="services-complete" v-for="service in servicesArray">
              <span>
                <font-awesome-icon :icon="service.icon" />
              </span>
              <span>
                {{ service.name }}
              </span>
            </li>
          </ul>
        </div>
        <hr class="d-lg-none" />
      </div>

      <!-- Sezione a destra -->
      <div class="col-12 col-lg-4 special-col">
        <!-- Riepilogo prenotazione e costi (sezione sul lato destro) -->
        <div class="message-box shadow-lg p-4">
          <!-- Invio messaggio all'host -->
          <form @submit.prevent="sendMessage()">
            <div class="modal-body">
              <div class="my-4">
                <h5 class="text-center fw-bold color-primary">
                  Vuoi saperne di più ?
                </h5>
              </div>
              
                <div class="mb-3">
                  <label for="name">Nome</label>
                  <br />
                  <input type="text" id="name" class="form-control outline-primary" minlength="3" maxlength="50" v-model="formData.sender_name"
                    required/>
                </div>
                <div class="mb-3">
                  <label for="surname">Cognome</label>
                  <br />
                  <input type="text" id="surname" class="form-control outline-primary" minlength="3" maxlength="50" v-model="formData.sender_surname"
                    required />
                </div>
              
              <div class="mb-3">
                <label for="email">Email</label>
                <br />
                <input type="email" id="email" class="form-control outline-primary" minlength="5" maxlength="255" v-model="formData.sender_email"
                  required />
              </div>
              <div class="mb-3">
                <label for="subject">Oggetto</label>
                <br />
                <input type="text" id="subject" class="form-control outline-primary" minlength="3" maxlength="70" v-model="formData.object" required />
              </div>
              <div class="mb-3">
                <label for="message">Messaggio</label>
                <br />
                <textarea id="message" class="form-control outline-primary" minlength="4" maxlength="4096" v-model="formData.sender_text"
                  required></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn my-btn-primary mt-2" @click="setApartmentId()">
                Contatta l'host
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Localizzazione dell'appartamento -->
    <div class="row">
      <div class="col mb-3">
        <hr />
        <h5 id="dovetitroverai" class="my-3">Dove ti troverai</h5>
        <!-- !! MAPPA !! -->
        <div v-if="apartment.latitude != null && apartment.longitude!= null">
          <Map :apiKey="store.apiKey" :lat="apartment.latitude" :long="apartment.longitude"></Map>
        </div>
        <div class="mt-2">
          <span>
            <font-awesome-icon :icon="['fas', 'location-dot']" />
          </span>
          <span class="fw-semibold mx-2">{{ apartment.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h5.color-primary{
  color:  $color_primary;
}
.message {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  z-index: 9999;
}

.message.success {
  background-color: #28a745;
  color: #fff;
}

.message i {
  font-size: 24px;
  margin-right: 10px;
}

.message span {
  font-size: 18px;
  font-weight: 600;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
}

.close .close-icon {
  font-size: 16px;
  color: #fff;
}


.my-link {
  color: $color_dark;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.message-box {
  border-radius: 20px;
  background-color: $color_light;
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

.form-control:focus {
  outline: none;
  box-shadow: none;
}

input:focus,
textarea:focus {
  border-color: $color_primary;
}



.services-complete{
    padding: .5em;
  
  span:first-child{
    margin-left: .5em;
    color: $color_primary;
  }
  span:last-child{
    margin-left: .5em;
    color: $color_gray;
  }
}
</style>
