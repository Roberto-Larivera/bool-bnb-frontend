<script>
export default {
    name: 'AppCard',
    props: [
        'apartment'
    ],
    data() {
        return {
        }
    },
    methods: {
    }
}

</script>


<template>
    <div class="col" v-for="index in 8">
        <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
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
                <div>
                    <a href="#" class="my-btn">
                        Dettagli
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    padding: 0;
    border: none;
    border-radius: 5px;

    .card-img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
    }
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
</style>
  