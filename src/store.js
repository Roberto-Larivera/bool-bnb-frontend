import { reactive } from 'vue'
 
export const store = reactive({
    pathServer: "http://127.0.0.1:8000/login",
    pathServerHome: 'http://127.0.0.1:8000/api/',
    pathServerApi: "http://127.0.0.1:8000/api/apartments/"
});