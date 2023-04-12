<script>
export default {
  name: 'AppHome',
  data() {
    return {

    }
  }

}
</script>

<template>
  <section>
    <div class="container">
      <div class="row">


        <div class="col-12 position-relative col-md-8 offset-md-4 mb-3">
          <div class=" my-research p-5 position-absolute top-50 start-0 translate-middle shadow-lg">

            <h1>
              Trova alloggi su BoolBNB
            </h1>

            <p>
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
                <input type="data" class="form-control" id="exampleFormControlInput1" placeholder="">
              </div>
              <div class="data">
                <label for="exampleFormControlInput1" class="check-out">Check-out</label>
                <input type="data" class="form-control" id="exampleFormControlInput1" placeholder="">
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
          <div class="image-container ">
            <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="">
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.data {
  width: 49%;
}

.btn {
  width: 100%;
  background-color: $color_primary;
  color: $color_light;
}

p {
  color: lightgray;
}

.my-research {
  border-radius: 30px;
  background-color: $color_light;
}

.image-container {
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
  }

}
</style>
