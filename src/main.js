import { createApp } from 'vue';
import App from './App.vue';




import { router } from './router';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import { Tooltip, Toast, Popover } from 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faShield } from '@fortawesome/free-solid-svg-icons'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faParking } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faShower } from '@fortawesome/free-solid-svg-icons'
import { faFireExtinguisher } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faSoap } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faBabyCarriage } from "@fortawesome/free-solid-svg-icons";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faChargingStation } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { faSmoking } from "@fortawesome/free-solid-svg-icons";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { faSquareH } from "@fortawesome/free-solid-svg-icons";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { faVest } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faUserSecret, faUser,faRocket)
library.add(faSort)
library.add(faShield)
library.add(faHeadset)
library.add(faCalendar)
library.add(faLocationDot, faHeartCirclePlus, faKey)
library.add(faHouse)
library.add(faMagnifyingGlass)
library.add(faEye)
library.add(faWifi)
library.add(faShirt)
library.add(faWind)
library.add(faHouseLaptop)
library.add(faUtensils)
library.add(faSoap)
library.add(faBacon)
library.add(faTemperatureArrowUp)
library.add(faTv)
library.add(faPersonSwimming)
library.add(faSquareParking)
library.add(faBabyCarriage)
library.add(faBurger)
library.add(faFire)
library.add(faWater)
library.add(faChargingStation)
library.add(faDumbbell)
library.add(faMugSaucer)
library.add(faSmoking)
library.add(faUmbrellaBeach)
library.add(faFireExtinguisher)
library.add(faLeaf)
library.add(faMapLocation)
library.add(faKitchenSet)
library.add(faSquareH)
library.add(faWheelchair)
library.add(faVest)
library.add(faCheckCircle)
library.add(faTimes)
library.add(faChevronDown)









library.add(faLocationDot, faHeartCirclePlus, faKey, faWifi, faParking, faUtensils, faSnowflake, faShower, faFireExtinguisher)


createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
