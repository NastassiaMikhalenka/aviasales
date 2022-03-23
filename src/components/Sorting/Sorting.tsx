import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {cheapestTickets, fastestTickets, TicketType} from "../../state/bll/tickets_reducer";
import {rootReducerType} from "../../state/store";
import classes from "./sorting.module.css";

export const Sorting = () => {
    const dispatch = useDispatch();
    const tickets = useSelector<rootReducerType, Array<TicketType>>(state => state.tickets.tickets)

    const [isActive, setIsActive] = useState<'cheapest' | 'fastest'>('cheapest')

    const classActiveButtonCheapest = `${isActive === "cheapest" ? classes.isActive : ''}`
    const classActiveButtonFastest = `${isActive === "fastest" ? classes.isActive : ''}`

    useEffect(() => {
        tickets.length && dispatch(cheapestTickets)
    }, [tickets.length, dispatch])

    return (
        <div className={classes.mainContainer_Sorting}>
            <button className={`${classes.sorting_ButtonCheap} ${classActiveButtonCheapest}`}
                    onClick={() => {
                        dispatch(cheapestTickets);
                        setIsActive('cheapest')
                    }}>Самый дешевый
            </button>
            <button className={`${classes.sorting_ButtonFastest} ${classActiveButtonFastest} `}
                    onClick={() => {
                        dispatch(fastestTickets);
                        setIsActive('fastest')
                    }}>Самый быстрый
            </button>
        </div>
    )
}