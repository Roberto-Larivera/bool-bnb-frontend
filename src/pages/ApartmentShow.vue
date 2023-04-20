<script>
import Map from '../components/Main/Map.vue';

// Axios
import axios from 'axios';

export default {
  name: 'ApartmentShow',
  components: {
    Map
  },
  data() {
    return {
      apiKey: 'CBlWoj5lPfzTxbpwHbHcPvuhg8ukNzCs'  
    }
  },
  methods: {
    getApiShow() {
      axios.get(`http://localhost:8006/api/apartments/appartamento-milano-loreto`)
        .then(response => {
          console.log(response.apartment);
        }
      );
    },
  },
  mounted(){
    this.getApiShow()
  }
}
</script>


<template>
  <div class="container">

    <!-- Titolo e immagini -->

    <div class="row">
      <div class="col">

        <h1>Mirror House North</h1>

        <div class="mb-3">
          <span>
            <font-awesome-icon :icon="['fas', 'location-dot']" />
          </span>
          <span>
            <a href="#" class="my-link mx-2">Bolzano, Trentino-Alto Adige/Südtirol, Italia</a>
          </span>
        </div>

        <!-- Carosello di immagini -->

        <div class="img-container">
          <div class="row">

            <div class="col-12 col-lg-6">
              <img src="https://placehold.co/650x436" alt="Img" class="img-fluid">
            </div>

            <div class="col-6 d-none d-lg-block">
              <div class="row g-2 align-items-center">
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100 img-fluid">
                </div>
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100 img-fluid">
                </div>
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100 mb-3 img-fluid">
                </div>
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100 mb-3 img-fluid">
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
                <h3>Minicase - Host: Sabina Angela</h3>

                <div>
                  <span>4 ospiti · </span>
                  <span>2 camere da letto · </span>
                  <span>1 letto · </span>
                  <span>1 bagno </span>
                </div>

              </div>

              <div>
                <img src="" alt="">
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
            <p>Ogni prenotazione include una protezione gratuita in caso di cancellazione da parte dell'host, di
              inesattezze dell'annuncio e di altri problemi come le difficoltà in fase di check-in.</p>
          </div>

          <hr>

          <!-- Descrizione dell'appartamento -->
          <div class="col">
            <p>The Mirror Houses are a pair of vacation homes, set in the marvellous surroundings of the South Tyrolean
              Dolomites, amidst a beautiful scenery of apple trees, just outside the city of Bolzano. The Mirror houses
              offer a unique chance to spend a beautiful vacation surrounded by contemporary architecture of the highest
              standards and the most astonishing Landscape and beauty nature has to offer.</p>
            <a href="#" class="my-link fw-semibold" data-bs-toggle="modal" data-bs-target="#descriptionModal">Mostra altro
              ></a>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="descriptionModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Descrizione dell'appartamento</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>The Mirror Houses are a pair of vacation homes, set in the marvellous surroundings of the South
                    Tyrolean Dolomites, amidst a beautiful scenery of apple trees, just outside the city of Bolzano. The
                    Mirror houses offer a unique chance to spend a beautiful vacation surrounded by contemporary
                    architecture of the highest standards and the most astonishing Landscape and beauty nature has to
                    offer.</p>
                  <p>The houses are designed to blend in with the natural surroundings and feature floor-to-ceiling
                    windows that provide stunning views of the mountains and the valley below. The interiors are sleek and
                    modern, with minimalist furnishings and high-end finishes. Each house has a fully equipped kitchen, a
                    spacious living room, and a private outdoor terrace.</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                </div>
              </div>
            </div>
          </div>

          <hr>

          <!-- Servizi inclusi -->
          <div class="col">
            <h5 class="my-3">Cosa troverai</h5>
            <ul>
              <li v-for="(service, index) in services" :key="index">
                <font-awesome-icon :icon="service.icon" size="m" style="color: #FF385C;" />
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
          <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Inserisci qua il tuo messaggio</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <input class="px-2" type="text" id="message" name="message"
                      placeholder="Ciao, ti contatto in merito a...">
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn" data-bs-dismiss="modal">Chiudi</button>
                  <button type="button" class="btn my-btn">Invia</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Riepilogo prenotazione e costi (sezione sul lato destro) -->
          <div class="booking-review shadow-lg p-4">

            <div class="mb-3">
              <span class="fw-bold fs-5">220 € </span>
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
              <span class="text-decoration-underline">220 € x 5 notti</span>
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
            <Map :apiKey="apiKey"></Map>
          </div>
          <span class="fw-semibold">Bolzano, Trentino-Alto Adige/Südtirol, Italia</span>
        </div>
      </div>

    </div>


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
}</style>