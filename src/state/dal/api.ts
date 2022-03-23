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

// axios.get('https://front-test.beta.aviasales.ru/search')
//     .then(res => {
//         const key = res.data.searchId
//         axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${key}`)
//             .then(response => {
//                 dispatch(setTickets(response.data.tickets))
//                 console.log(response.data.tickets)
//                 console.log("Все билеты")
//             })
//             .catch((error) => {
//                 console.log("error")
//             })
//     })


//
//
// import axios from "axios";
//
// async function fetchData() {
//     try {
//         const response = await axios.get(
//             "https://front-test.beta.aviasales.ru/search"
//         );
//         const searchId = await response.data.searchId;
//
//         const responseTickets = await axios.get(
//             `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
//         );
//         return responseTickets.data.tickets;
//     } catch (e) {
//         throw new Error("");
//     }
// }
//
//
// export { fetchData };