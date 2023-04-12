<script>
export default {
    name: 'AppCard',
    props: [
        'apartment'
    ],
    data(){
        return{

    }
  }
}
</script>


<template>
    <div class="card">
        <img src="https://picsum.photos/200/200" class="card-img" alt="img-card">
        <div class="card-body">
            <h5 class="card-title">
                Appartamento luminoso
            </h5>
            <div class="card-text">
                <div>
                    Via Roma, 2 - Roma, Italia
                </div>
                <div>
                    140 &euro; notte
                </div>
                <div>
                    200 mq
                </div>
            </div>
            <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
            <div>
                <a href="#" class="my-btn">
                    Dettagli
                </a>
            </div>
        </div>
    </div>

    <div class="card">
        <img src="https://picsum.photos/200/200" class="card-img" alt="img-card">
        <div class="card-body">
            <h5 class="card-title">
                Appartamento luminoso
            </h5>
            <div class="card-text">
                <div>
                    Via Roma, 2 - Roma, Italia
                </div>
                <div>
                    140 &euro; notte
                </div>
                <div>
                    200 mq
                </div>
            </div>
            <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
            <div>
                <a href="#" class="my-btn">
                    Dettagli
                </a>
            </div>
        </div>
    </div>

    <div class="card">
        <img src="https://picsum.photos/200/200" class="card-img" alt="img-card">
        <div class="card-body">
            <h5 class="card-title">
                Appartamento luminoso
            </h5>
            <div class="card-text">
                <div>
                    Via Roma, 2 - Roma, Italia
                </div>
                <div>
                    140 &euro; notte
                </div>
                <div>
                    200 mq
                </div>
            </div>
            <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
            <div>
                <a href="#" class="my-btn">
                    Dettagli
                </a>
            </div>
        </div>
    </div>

    <div class="card">
        <img src="https://picsum.photos/200/200" class="card-img" alt="img-card">
        <div class="card-body">
            <h5 class="card-title">
                Appartamento luminoso
            </h5>
            <div class="card-text">
                <div>
                    Via Roma, 2 - Roma, Italia
                </div>
                <div>
                    140 &euro; notte
                </div>
                <div>
                    200 mq
                </div>
            </div>
            <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
            <div>
                <a href="#" class="my-btn">
                    Dettagli
                </a>
            </div>
        </div>
    </div>

    <div class="card">
        <img src="https://picsum.photos/200/200" class="card-img" alt="img-card">
        <div class="card-body">
            <h5 class="card-title">
                Appartamento luminoso
            </h5>
            <div class="card-text">
                <div>
                    Via Roma, 2 - Roma, Italia
                </div>
                <div>
                    140 &euro; notte
                </div>
                <div>
                    200 mq
                </div>
            </div>
            <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
            <div>
                <a href="#" class="my-btn">
                    Dettagli
                </a>
            </div>
        </div>
    </div>

    <!-- Prova con carosello -->
    <!-- <div class="card">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100 card-img" src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=800" alt="First slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100 card-img" src="https://images.pexels.com/photos/144352/pexels-photo-144352.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Second slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100 card-img" src="https://images.pexels.com/photos/301489/pexels-photo-301489.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

        <div class="card-body">
            <h5 class="card-title">
                Appartamento luminoso
            </h5>
            <div class="card-text">
                <div>
                    Via Roma, 2 - Roma, Italia
                </div>
                <div>
                    140 &euro; notte
                </div>
                <div>
                    200 mq
                </div>
            </div>
            <div>
                <a href="#" class="my-btn">
                    Dettagli
                </a>
            </div>
        </div>
    </div> -->

</template>

<style lang="scss" scoped>

    .card {
        max-width: 18rem;
        padding: 0;
        border: none;


        .card-img {
            max-width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 5px;
        }

        .card-body {
            padding: 1rem 0;

            .card-title {
                color: $color_dark;
            }

            .card-text {
                color: $color_gray;
                font-size: 0.8rem;
                padding: 0.5rem 0;

                div {
                    padding: 0.2rem 0;
                }
            }
        }

        // Non sono convinta della larghezza del bottone
        .my-btn {
            font-size: 0.8rem;
            // width: 100%;
            padding: 0.5rem;
            display: inline-block;
            background-color: $color_light_gray;
            color: $color_dark;
            text-decoration: none;
            border-radius: 3px;
            border: 1px solid $color_gray;

            &:hover {
                background-color: $color_gray;
                color: $color_light;
            }
        }

    }
</style>
  