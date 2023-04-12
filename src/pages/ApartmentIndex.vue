<script>

import AppCard from '../components/Main/AppCard.vue';

export default {
  name: 'ApartmentIndex',
  components:  {
    AppCard
  },
  data(){
    return{
        apartment: [],
        moreFilters: false,
        services: [
            'Wi-fi',
            'Parcheggio',
            'Cucina',
            'Aria condizionata',
            'Asciugacapelli',
            'Allarme antincendio'
        ]
    }
  }
  
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-3">
                    Tutti gli appartamenti BoolBnB
                </h1>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col">
                <div class="form-container d-flex justify-content-center my-3 py-3 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <form action="" class="col-10"> 
                        <div class="mb-3">
                            <!-- <label for="place" class="form-label">
                                Dove
                            </label> -->
                            <input type="text" class="form-control" id="place" placeholder="Dove">
                        </div>

                        <div class="mb-3">
                            <!-- <label for="check-in" class="form-label">
                                Check-in
                            </label> -->
                            <input type="date" class="form-control" id="check-in" placeholder="Check-in">
                        </div>

                        <div class="mb-3">
                            <!-- <label for="check-out" class="form-label">
                                Check-out
                            </label> -->
                            <input type="date" class="form-control" id="check-out" placeholder="Check-out">
                        </div>

                        <div class="mb-3">
                            <!-- <label for="guests" class="form-label">
                                Numero ospiti
                            </label> -->
                            <input type="number" class="form-control" id="guests" placeholder="Numero ospiti" max="20">
                        </div>
                        <!-- Filtri avanzati -->
                        <div :class="moreFilters == false ? 'd-block' : 'd-none'">
                            <button type="button" class="my-btn mb-3" @click="moreFilters = true">
                                <font-awesome-icon icon="fa-solid fa-sort" /> Filtri avanzati
                            </button>
                        </div>

                        <!-- Estensione filtri -->
                        <div :class="moreFilters == false ? 'd-none' : 'd-block'">
                            <div class="mb-3">
                                <label for="price" class="form-label">
                                    Prezzo massimo
                                </label>
                                <input type="number" class="form-control" id="price">
                            </div>

                            <div class="mb-3">
                                <label for="beds" class="form-label">
                                    Nr. letti
                                </label>
                                <input type="text" class="form-control" id="beds" max="20">
                            </div>
                
                            <div class="mb-3">
                                Servizi 
                            </div>
                            <div class="form-check">
                                <div class="mb-1" v-for="service in services">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        {{ service }}
                                    </label>
                                </div>
                            </div>
                        </div>
                
                        <button type="submit" class="my-submit my-3">
                            Cerca
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-sm-3 g-md-3 g-lg-3">
            <AppCard :apartment="apartment"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.form-container {
    border: 1px solid $color_light_gray;
    border-radius: 10px;

    .my-btn {
        padding: 0.5rem;
        display: inline-block;
        background-color: $color_light_gray;
        color: $color_dark;
        text-decoration: none;
        border-radius: 3px;
        border: 1px solid $color_gray;
    }


    .more-filters {

        display: none;
        .form-check-input {
        &:checked {
            background-color: $color_primary;
            border-color: $color_primary;
        }
    }
    }
    
    
    .my-submit {
        padding: 0.5rem;
        display: inline-block;
        background-color: $color_primary;
        color: $color_light;
        text-decoration: none;
        border-radius: 3px;
        border: 1px solid $color_primary;

    }
}

</style>
