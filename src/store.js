import { reactive } from 'vue'
 
export const store = reactive({
    pathServer: "#nogo",
    pathServerHome: 'http://127.0.0.1:8000/api/',
    pathServerApi: "http://127.0.0.1:8000/api/apartments/",
    addressListVisible: true
});