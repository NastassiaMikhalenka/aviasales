import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {ticketsShowMore} from "../../state/bll/tickets_reducer";
import {Ticket} from "./Ticket/Ticket";
import classes from "./tickets.module.css";


export const Tickets = React.memo(() => {
    const store = useSelector((state: rootReducerType) => state.tickets)
    const dispatch = useDispatch()
    console.log("Часть билетов")
    return (
        <>
            <div>
                {store.ticketsForFilter.length ?
                    (store.ticketsForFilter
                            .slice(0, store.provideTickets)
                            .map((ticket, i) => <Ticket ticket={ticket} key={i}/>)
                    ) : store.tickets.length ?
                        (store.tickets
                            .slice(0, store.provideTickets)
                            .map((ticket, i) => <Ticket ticket={ticket} key={i}/>))
                        : (<div>ERROR</div>
                        )}
            </div>
            <button
                className={classes.tickets_buttonShowMore}
                onClick={() => dispatch(ticketsShowMore)}>
                Загрузить еще 5 билетов
            </button>
        </>
    );
})

