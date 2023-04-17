import { createApp } from 'vue';
import App from './App.vue';


import { router } from './router';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
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
import { faParking} from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faShower} from '@fortawesome/free-solid-svg-icons'
import { faFireExtinguisher} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faUserSecret, faUser)
library.add(faSort)
library.add(faShield)
library.add(faHeadset)
library.add(faCalendar)
library.add(faLocationDot, faHeartCirclePlus, faKey)
library.add(faHouse)
library.add(faMagnifyingGlass)

library.add(faLocationDot, faHeartCirclePlus, faKey, faWifi, faParking, faUtensils, faSnowflake, faShower, faFireExtinguisher)


createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

