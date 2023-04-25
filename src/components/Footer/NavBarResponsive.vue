<script>
import { store } from '../../store.js';
export default {
    name: 'NavBarResponsive',
    data() {
        return {
            linkHover: null,
            store,
            pathServer: store.pathServer,
        }
    },
}
</script>

<template>
    <div class="container h-100">
        <div class="row h-100">
            <div class="col d-flex align-items-center w-100 h-100">
                <ul class=" d-flex h-100 text-center w-100 justify-content-evenly">
                    <li class="p-2">
                        <router-link :to="{ name: 'home' }" @mouseover="linkHover = 1" @mouseleave="linkHover = null"
                            :class="{
                                'hover': this.$route.path == '/',
                                'notHover': this.$route.path != '/',

                            }" class="p-2 text-decoration-none">
                            <div class="d-flex flex-column align-content-center justify-content-center">
                                <span>
                                    <font-awesome-icon :icon="['fas', 'house']" />
                                </span>
                                <span>
                                    Home
                                </span>
                            </div>
                        </router-link>
                    </li>
                    <li class="p-2">
                        <router-link :to="{ name: 'apartments-index' }" @mouseover="linkHover = 2"
                            @mouseleave="linkHover = null" :class="{
                                'hover': this.$route.path == '/apartments',
                                'notHover': this.$route.path != '/apartments',
                            }" class="p-2 text-decoration-none">
                            <div class="d-flex flex-column align-content-center justify-content-center">
                                <span>
                                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                                </span>
                                <span>
                                    Appartamenti
                                </span>
                            </div>
                        </router-link>
                    </li>
                    <li class="p-2">
                        <a :href="pathServer" class="p-2 notHover  text-decoration-none">
                            <div class="d-flex flex-column align-content-center justify-content-center">
                                <span>
                                    <font-awesome-icon :icon="['fas', 'user']" />
                                </span>
                                <span>
                                    {{ store.user_name }}
                                </span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
ul {
    a {

        padding: 10px;
        color: $color_dark;
        text-decoration: none;
        transition: 0.5s;

        &.hover {
            color: $color_primary;
            text-decoration: underline;
        }

        &.notHover {
            opacity: 0.5;
        }
    }
}
</style>
  