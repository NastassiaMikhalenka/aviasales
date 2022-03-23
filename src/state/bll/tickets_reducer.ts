import {Dispatch} from "redux";
import axios from "axios";
import {ticketsAPI} from "../dal/api";

export type SegmentsType = {
    origin: string
    destination: string
    date: string
    stops: string[]
    duration: number
}

export type TicketType = {
    price: number
    carrier: string
    segments: Array<SegmentsType>
}
export type InitialStateType = {
    tickets: Array<TicketType>
    ticketsForFilter: Array<TicketType>
    provideTickets: number
}

export const initialState: InitialStateType = {
    tickets: [] as Array<TicketType>,
    ticketsForFilter: [] as Array<TicketType>,
    provideTickets: 5,
}

type ActionsType =
    setTicketsType
    | cheapestTicketsType
    | fastestTicketsType
    | ticketsShowMoreType
    | TicketsFiltered


const SET_TICKETS = 'SET_TICKETS'
const CHEAPEST_TICKETS = 'CHEAPEST_TICKETS'
const FASTEST_TICKETS = 'FASTEST_TICKETS'
const TICKETS_SHOW_MORE = 'TICKETS_SHOW_MORE'
const TICKETS_FILTERED = 'TICKETS_FILTERED'


export const tickets_reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_TICKETS : {
            return {
                ...state,
                tickets: action.payload.tickets,
                ticketsForFilter: action.payload.tickets,
            }
        }
        case CHEAPEST_TICKETS: {
            return {
                ...state,
                tickets: [...state.tickets.sort((a, b) => a.price - b.price)],
                ticketsForFilter: [...state.ticketsForFilter.sort((a, b) => a.price - b.price),
                ],
            }
        }
        case FASTEST_TICKETS:
            return {
                ...state,
                tickets: [
                    ...state.tickets.sort((a, b) => a.segments[0].duration > b.segments[0].duration ? 1 : -1),
                ],
                ticketsForFilter: [
                    ...state.ticketsForFilter.sort((a, b) => a.segments[0].duration > b.segments[0].duration ? 1 : -1),
                ],
            };
        case TICKETS_SHOW_MORE: {
            return {
                ...state,
                provideTickets: state.provideTickets + 5
            }
        }
        case TICKETS_FILTERED:
            if (
                action.payload.filters.includes("all") ||
                !action.payload.filters.length
            ) {
                return {...state, ticketsForFilter: [...state.tickets]};
            } else {
                const newState = {...state};
                newState.ticketsForFilter = newState.tickets;
                action.payload.filters.map((item) => {
                    newState.ticketsForFilter = newState.ticketsForFilter.filter((ticket) =>
                            ticket.segments[0].stops.length === +item
                    );
                    return item;
                });
                return {
                    ...state,
                    ticketsForFilter: newState.ticketsForFilter,
                };
            }

        default:
            return state
    }
}

export type setTicketsType = ReturnType<typeof setTickets>
export const setTickets = (tickets: Array<TicketType>) => ({
        type: 'SET_TICKETS',
        payload: {
            tickets: tickets,
        },
    } as const
)

export type cheapestTicketsType = {
    type: 'CHEAPEST_TICKETS';
}
export const cheapestTickets = {
    type: 'CHEAPEST_TICKETS',
}

export type fastestTicketsType = {
    type: 'FASTEST_TICKETS';
}
export const fastestTickets = {
    type: 'FASTEST_TICKETS',
}

export type ticketsShowMoreType = {
    type: 'TICKETS_SHOW_MORE';
}
export const ticketsShowMore = {
    type: 'TICKETS_SHOW_MORE',
}

export type TicketsFiltered = ReturnType<typeof filterTickets>
export const filterTickets = (filters: Array<string>) => ({
        type: 'TICKETS_FILTERED',
        payload: {
            filters: filters
        },
    } as const
)


export const setTicketsTC = () => (dispatch: Dispatch) => {
    axios.get('https://front-test.beta.aviasales.ru/search')
        .then(res => {
            const key = res.data.searchId
            axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${key}`)
                .then(response => {
                    dispatch(setTickets(response.data.tickets))
                    // console.log(response.data.tickets)
                    // console.log("Все билеты")
                })
                .catch((error) => {
                    console.log("error")
                })
        })
}