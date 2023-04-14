<script>
import AppCard from '../components/Main/AppCard.vue';

export default {
  name: "AppHome",
  data() {
    return {};
  },
  components: { AppCard }
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row">


        <div class="col-12 position-relative col-lg-9 offset-lg-3 col-xl-8 offset-xl-3 my-5">
          <div class=" my-research p-4 p-md-5 shadow-lg p-lg-4">

            <h3>
              Trova alloggi su BoolBNB
            </h3>

            <p class="text-gray">
              Scopri alloggi interi e stanze ideali per ogni tipo di viaggio
            </p>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Dove</label>
              <input type="text" class="form-control" id="exampleFormControlInput1"
                placeholder="Inserisci una destinazione">
            </div>

            <div class="mb-3 d-flex justify-content-between">
              <div class="data">
                <label for="exampleFormControlInput1" class="check-in">Check-in</label>
                <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="">
              </div>
              <div class="data">
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

  <section class="mb-5 text-center">
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
  <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-5">
            Appena prenotati in questa località
          </h2>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-4 g-4">
        <AppCard class="d-lg-none" v-for="index in 3" />
        <AppCard class="d-none d-lg-block" v-for="index in 4" />
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
  .my-research {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
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
