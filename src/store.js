import { reactive } from 'vue'
 
// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    pathServer: "http://127.0.0.1:8000/",
    pathServerHome: 'http://127.0.0.1:8000/api/',
    pathServerApi: "http://127.0.0.1:8000/api/apartments/",
    addressListVisible: true,
    lat: '',
    lon: '',
    address: '',
    range: 20,
    apiKey: 'CBlWoj5lPfzTxbpwHbHcPvuhg8ukNzCs',
    filteredMap: false,
    user_name: 'Accedi',
    user_surname: '',
    user_email: '',
});