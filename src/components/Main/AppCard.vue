<script>
export default {
    name: 'AppCard',
    props: {
        apartment: Object
    },
    data() {
        return {
        }
    },
    methods: {
    }
}

</script>


<template>
    <div class="col">
        <router-link :to="{ name: 'home' }" class="text-decoration-none">
            <div class="card">
            <img :src="apartment.main_img" class="card-img" alt="img-card">
            <div class="card-body text-center text-lg-start">
                <h5 class="card-title">
                    {{ apartment.title }}
                </h5>
                <div class="card-text">
                    <div>
                        {{ apartment.address }}
                    </div>
                    <div>
                        {{ apartment.price }} &euro; notte
                    </div>
                    <div>
                        {{ apartment.mq }}
                    </div>
                </div>
            </div>
        </div>
        </router-link>
        <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->

    </div>
</template>

<style lang="scss" scoped>
.card {
    padding: 0;
    border: none;
    border-radius: 5px;
    background-color: transparent;

    .card-img {
        max-width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 5px;
    }
}



.card-body {
    padding: 1rem 0;
    background-color: transparent;

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
        background-color: $color_primary;
        color: $color_light;
        border: none;
    }
}
</style>
  