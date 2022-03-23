import {applyMiddleware, combineReducers, createStore} from "redux";
import {tickets_reducer} from "./bll/tickets_reducer";
import {loadState, saveState} from "../utils/localstorage-utils";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    tickets: tickets_reducer,
})
let preloadedState = loadState()

export let store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

store.subscribe(() => {
    saveState({
        tickets: store.getState().tickets
    })
})

export type rootReducerType = ReturnType<typeof rootReducer>;

export type AppStoreType = typeof store



// import {combineReducers, createStore} from "redux";
// import {tickets_reducer} from "./tickets_reducer";
//
// let rootReducer = combineReducers({
//     tickets: tickets_reducer,
// })
//
// export let store = createStore(rootReducer);
//
// export type rootReducerType = ReturnType<typeof rootReducer>;
//
// export type AppStoreType = typeof store