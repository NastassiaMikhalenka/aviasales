import axios, {AxiosResponse} from 'axios'
import {setTickets} from "../bll/tickets_reducer";

const instance = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/',
    withCredentials: true,

})
// api
export const ticketsAPI = {
    getData() {
        axios.get('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                const key = res.data.searchId
                axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${key}`)
                    .catch((error) => {
                        console.log("error")
                    })
            })
    },
}