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
                <div class="mt-2 d-flex flex-column justify-content-center d-md-block">
                    <!-- Ricerca - Mobile -->
                    <button type="button" class="search my-btn rounded-pill my-3 p-3 d-md-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ricerca appartamenti
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Ricerca appartamenti
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" class="form-container-small">
                                        <div class="mb-3">
                                            <label for="place" class="form-label">
                                                Dove
                                            </label>
                                            <input type="text" class="form-control" id="place">
                                        </div>
                                        <div class="mb-3">
                                            <label for="check-in" class="form-label">
                                                Check-in
                                            </label>
                                            <input type="date" class="form-control" id="check-in">
                                        </div>
                                        <div class="mb-3">
                                            <label for="check-out" class="form-label">
                                                Check-out
                                            </label>
                                            <input type="date" class="form-control" id="check-out">
                                        </div>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Seleziona nr. ospiti</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <button type="submit" class="my-submit rounded">
                                            Vai
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <!-- Ricerca - Tablet / Desktop -->
                    <div class="form-container-large rounded-pill p-2 shadow bg-body-tertiary rounded d-none d-md-inline-block">
                        <form action="" class="d-flex justify-content-between align-items-center">
                            <span>
                                <span class="form-floating mb-3">
                                    <label for="place">
                                        Dove
                                    </label>
                                    <input type="text" id="place" class="ms-3">
                                </span>
                                <span class="form-floating mb-3">
                                    <input type="date" id="check-in" placeholder="Da quando">
                                </span>
                                <span class="form-floating mb-3">
                                    <input type="date" id="check-out" placeholder="A quando">
                                </span>
                                <span class="mb-3">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Ospiti</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </span>
                            </span>
                            <button type="submit" class="my-submit rounded-pill px-3">
                                Cerca
                            </button>
                        </form>
                    </div>

                    <!-- Bottone filtri avanzati -->
                    <button type="button" class="filter my-btn ms-2 p-3 rounded-pill d-md-none d-lg-inline" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        <font-awesome-icon icon="fa-solid fa-sort" /> Filtri avanzati
                    </button>

                    <!-- Bottone filtri avanzati per tablet / lg -->
                    <button type="button" class="filter my-btn ms-2 p-3 rounded-pill d-none d-md-inline d-lg-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        <font-awesome-icon icon="fa-solid fa-sort" />
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Filtri avanzati
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="" class="form-container-small">
                                        <div class="mb-3">
                                            <label for="price" class="form-label">
                                                Prezzo per notte
                                            </label>
                                            <input type="number" class="form-control" min="0" max="3000" id="price">
                                        </div>

                                        <div class="mb-3">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Numero stanze</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>

                                        <div class="mb-3">
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Numero bagni</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
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
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="my-btn rounded" data-bs-dismiss="modal">
                                    Esci
                                </button>
                                <button type="submit" class="my-submit rounded">
                                    Aggiungi filtri
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Titolo pagina -->
    <div class="container">
        <div class="row">
            <div class="col my-5">
                <h1 class="text-center text-md-start">
                    Tutti gli appartamenti BoolBnB
                </h1>
            </div>
        </div>
    </div>

    <!-- Cards -->
    <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-sm-3 g-md-3 g-lg-3">
            <AppCard class="d-lg-none" v-for="index in 5" />
            <AppCard class="d-none d-lg-block" v-for="index in 20" />
        </div>
    </div>
</template>

<style lang="scss" scoped>

.my-btn {
        padding: 0.5rem;
        display: inline-block;
        background-color: $color_light;
        color: $color_dark;
        text-decoration: none;
        border: 1px solid $color_gray;
    }


.modal-content {

    border-radius: 0.5rem;

    .modal-body {
        border-radius: 0.5rem;

        .form-container-small {

            .my-submit {
                padding: 0.5rem;
                display: inline-block;
                background-color: $color_primary;
                color: $color_light;
                text-decoration: none;
                border: 1px solid $color_primary;
                margin-top: 2rem;
                padding: 0.5rem 1rem;
            }
        }
    }
}

.form-container-large {
    // width: 70%;
    border: 1px solid $color_gray;

    .form-floating > label {
            padding: 0 0.5rem;
            overflow: visible;
            top: -2px;
        }

        input {
            border-top-style: hidden;
            border-right-style: hidden;
            border-left-style: hidden;
            border-bottom-style: hidden;
            background-color: $color_light;

            &:focus {
                outline: none;
            }
        }

        .form-select {
            display: inline;
            width: auto;
            background-color: $color_light;
            border: 0;
            border-radius: 0;
            height: auto;

            // TOGLIERE IN FOCUS BORDO BLU
        //     border-top-style: hidden;
        //     border-right-style: hidden;
        //     border-left-style: hidden;
        //     border-bottom-style: hidden;
        //     background-color: $color_light;

        //     &:focus {
        //         outline: none;
        // }
}

        .no-outline:focus {
            outline: none;
        }

        input[type="date"]::-webkit-inner-spin-button,
        input[type="date"]::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
        }
    
    }


        .my-submit {
            padding: 0.5rem;
            display: inline-block;
            background-color: $color_primary;
            color: $color_light;
            text-decoration: none;
            border: 1px solid $color_primary;

        }



.modal-content {
    background-color: $color_light;
    border-radius: 0.5rem 0.5rem 0 0;
    border: none;

    .modal-body {
        border-radius: 0.5rem 0.5rem 0 0;

        .form-check-input {

            &:checked {
                background-color: $color_primary;
            }
        }
    }

}

.modal-footer {
        background-color: $color_light;

        .my-btn {
        padding: 0.5rem;
        display: inline-block;
        background-color: $color_light_gray;
        color: $color_dark;
        text-decoration: none;
        border: 1px solid $color_gray;
    }

    .my-submit {
            padding: 0.5rem;
            display: inline-block;
            background-color: $color_primary;
            color: $color_light;
            text-decoration: none;
            border: 1px solid $color_primary;

        }
}

</style>
