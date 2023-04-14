<script>
export default {
  name: 'ApartmentShow',
  data(){
    return{

    }
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

            <div class="col-6">
              <img src="https://placehold.co/650x426" alt="Img" >
            </div>

            <div class="col-6">
              <div class="row g-2 align-items-center">
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100">
                </div>
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100">
                </div>
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100 mb-3">
                </div>
                <div class="col-6">
                  <img src="https://placehold.co/300x200" alt="Img" class="w-100 mb-3">
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </div>

      <div class="row pt-5">

        <div class="col-8">

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
                <font-awesome-icon :icon="['fas', 'heart-circle-plus',]" style="color: #FF385C;"/>
                <h6 class="mx-3">Airbnb Plus</h6>
              </div>
              <p>Verifichiano ogni alloggio Plus in termini di qualità. </p>
            </div>

            <div>
              <div class="d-flex">
                <font-awesome-icon :icon="['fas', 'key']" style="color: #FF385C;"/>
                <h6 class="mx-3">Ottima esperienza di check-in</h6>
              </div>
              <p>Il 95% degli ospiti ha valutato con 5 stelle la procedura di check-in.</p>
            </div>

            <div>
              <div class="d-flex">
                <font-awesome-icon :icon="['fas', 'calendar']" style="color: #FF385C;"/>
                <h6 class="mx-3">Cancellazione gratuita entro le ore 12:00 del giorno 13 apr.</h6>
              </div>
            </div>

          </div>

          <hr>

          <!-- Protezione aircover -->
          <div class="col">
            <p>Ogni prenotazione include una protezione gratuita in caso di cancellazione da parte dell'host, di inesattezze dell'annuncio e di altri problemi come le difficoltà in fase di check-in.</p>
            <a href="#" class="my-link fw-semibold">Per saperne di più</a>
          </div>

          <hr>

          <!-- Descrizione dell'appartamento -->
          <div class="col">
            <p>The Mirror Houses are a pair of vacation homes, set in the marvellous surroundings of the South Tyrolean Dolomites, amidst a beautiful scenery of apple trees, just outside the city of Bolzano. The Mirror houses offer a unique chance to spend a beautiful vacation surrounded by contemporary architecture of the highest standards and the most astonishing Landscape and beauty nature has to offer.</p>
            <a href="#" class="my-link fw-semibold">Mostra altro ></a>
          </div>

          <hr>

          <!-- Sezione con le immagini classificate per oggetto rappresentato -->
          <div class="col">
            <h5>Dove dormirai</h5>
            <div class="row">
              <div class="col-6">
                <div class="single-image-container my-3">
                  <img src="https://placehold.co/400x300" alt="Img">
                </div>
                <h6>Camera da letto 1</h6>
                <span class="grey-text">Un letto king California</span>
              </div>
              <div class="col-6">
                <div class="single-image-container my-3">
                  <img src="https://placehold.co/400x300" alt="Img">
                </div>
                <h6>Camera da letto 2</h6>
                <span class="grey-text">Un letto king California</span>
              </div>
            </div>
          </div>

          <hr>

          <!-- Servizi inclusi -->
          <div class="col">
            <h5>Cosa troverai</h5>
            <div>
              <br>
              ...Elenco servizi aggiuntivi...
              <br>
              <br>
            </div>
          </div>

          <!-- Calendario con disponibilità -->
        
          
        </div>
    

        <!-- Riepilogo prenotazione e costi (sezione sul lato destro) -->
        <div class="col-4">
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

            <button class="btn mb-2">
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

    </div>


  </div>
</template>


<style lang="scss" scoped>

.my-link{
  color: $color_dark;
}

img{
  object-fit: contain;
}

.booking-review {
  border-radius: 20px;
  background-color: $color_light;
  min-height: 200px;
}

.btn {
  width: 100%;
  background-color: $color_primary;
  color: $color_light;
}

.grey-text{
  color: $color_gray;
}

.single-image-container img{
  border-radius: 10px;
}

</style>
