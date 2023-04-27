<script>
import Map from "../components/Main/Map.vue";
import { store } from "../store.js";

// Axios
import axios from "axios";

export default {
  name: "ApartmentShow",
  components: {
    Map,
  },
  data() {
    return {
      apiKey: "CBlWoj5lPfzTxbpwHbHcPvuhg8ukNzCs",
      apartment: [],
      services: [],
      store,
      formData: {},
      isSent: false,
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
            console.log(response);
            this.apartment = response.data.apartment;
            if (response.data.apartment.services > 0) {
              this.services = response.data.apartment.services;
            }
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
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<template>
  <div class="container">
    <!-- Titolo e immagini -->
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

              <!-- 1 immagine -->
              
              <div v-if="apartment.full_image_gallery = 0">
                <div class="col-12" >
                  <img :src="apartment.full_path_main_img" alt="Img" class="img-fluid">
                </div>
              </div>


              <!-- 2 immagini -->

              <div v-else-if="apartment.full_image_gallery = 1">
              
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="img-fluid">
                </div>

                <div class="col-6">
                  <img src="" alt="">
                </div>
              
              </div>



              <!-- 3 immagini -->

              <div  v-else-if="apartment.full_image_gallery = 2">
              
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="img-fluid">
                </div>

                <div class="col-6">
                  <div class="row">
                    <div class="col-12">
                      <img src="" alt="">
                    </div>
                    <div class="col-12">
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              
              </div>



              <!-- 4 immagini -->

              <div  v-else-if="apartment.full_image_gallery = 3">
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="img-fluid">
                </div>

                <div class="col-3">
                  <img src="" alt="">
                </div>

                <div class="col-3">
                  <div class="row">
                    <div class="col-6">
                      <img src="" alt="">
                    </div>
                    <div class="col-6">
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>


              <!-- 5 immagini -->

              <div  v-else-if="apartment.full_image_gallery = 4">
              
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="img-fluid">
                </div>

                <div class="col-6 d-none d-lg-block">
                  <div class="row g-2 align-items-center">
                    <div class="col-6">
                      <img :src="apartment.full_path_main_img" alt="Img" class="w-100 img-fluid">
                    </div>
                    <div class="col-6">
                      <img :src="apartment.full_path_main_img" alt="Img" class="w-100 img-fluid">
                    </div>
                    <div class="col-6">
                      <img :src="apartment.full_path_main_img" alt="Img" class="w-100 mb-3 img-fluid">
                    </div>
                    <div class="col-6">
                      <img :src="apartment.full_path_main_img" alt="Img" class="w-100 mb-3 img-fluid">
                    </div>
                  </div>
                </div>
              
              </div>
              

            </div>
          </div>

        </div>


        <!-- <h1>{{ apartment.title }}</h1>

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
            <font-awesome-icon :icon="['fas', 'eye']" />
            {{ apartment.views_count }} Visualizzazioni
          </div>
        </div> -->

        <!-- Carosello di immagini -->

        <!-- <div class="img-container">
          <div class="row">
            <div class="col-12 col-lg-6">
              <img :src="apartment.full_path_main_img" alt="Img" class="img-fluid" />
            </div>

            <div class="col-6 d-none d-lg-block">
              <div class="row g-2 align-items-center">
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="w-100 img-fluid" />
                </div>
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="w-100 img-fluid" />
                </div>
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="w-100 mb-3 img-fluid" />
                </div>
                <div class="col-6">
                  <img :src="apartment.full_path_main_img" alt="Img" class="w-100 mb-3 img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div> -->
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
                  <font-awesome-icon
                    :icon="['fas', 'heart-circle-plus']"
                    size="xl"
                    style="color: #ff385c"
                  />
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
                  <font-awesome-icon
                    :icon="['fas', 'key']"
                    size="xl"
                    style="color: #ff385c"
                  />
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
                  <font-awesome-icon
                    :icon="['fas', 'calendar']"
                    size="xl"
                    style="color: #ff385c"
                  />
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
            <ul v-if="apartment.services.length > 0">
              <!-- STAMPARE QUI SERVIZI CON RELATIVE ICONE -->
              <li v-for="service in apartment.services">
                <font-awesome-icon :icon="service.icon" /> {{ service.name }}
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
                <div class="d-flex justify-content-between">
                  <div class="mb-2">
                    <label for="name">Nome</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      class="form-control outline-primary"
                      v-model="formData.sender_name"
                      required
                    />
                  </div>
                  <div class="mb-2">
                    <label for="surname">Cognome</label>
                    <br />
                    <input
                      type="text"
                      id="surname"
                      class="form-control outline-primary"
                      v-model="formData.sender_surname"
                      required
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label for="email">Email</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    class="form-control outline-primary"
                    v-model="formData.sender_email"
                    required
                  />
                </div>
                <div class="mb-2">
                  <label for="subject">Oggetto</label>
                  <br />
                  <input
                    type="text"
                    id="subject"
                    class="form-control outline-primary"
                    v-model="formData.object"
                    required
                  />
                </div>
                <div class="mb-2">
                  <label for="message">Messaggio</label>
                  <br />
                  <textarea
                    id="message"
                    class="form-control outline-primary"
                    v-model="formData.sender_text"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn my-btn-primary mt-2"
                  @click="setApartmentId()"
                >
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
          <h5 class="my-3">Dove ti troverai</h5>
          <!-- !! MAPPA !! -->
          <div>
            <Map
              :apiKey="store.apiKey"
              :lat="apartment.latitude"
              :long="apartment.longitude"
            ></Map>
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
  object-fit: contain;
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
</style>
