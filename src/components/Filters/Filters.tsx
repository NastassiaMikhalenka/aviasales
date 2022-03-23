import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {filterTickets} from "../../state/bll/tickets_reducer";
import classes from "./filters.module.css";

export type FilterType = {
    id: number;
    title: string;
    value: string;
};

export const Filters = () => {
    const filters: Array<FilterType> = [
        {id: 0, title: "Все", value: 'all'},
        {id: 1, title: "Без пересадок", value: '0'},
        {id: 2, title: "1 пересадка", value: '1'},
        {id: 3, title: "2 пересадки", value: '2'},
        {id: 4, title: "3 пересадки", value: '3'},
    ]

    const dispatch = useDispatch();
    const [activeFilters, setActiveFilters] = useState<Array<string>>([]);

    const handleFilterCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "all") {
            setActiveFilters(
                activeFilters.includes("all") ? [] : filters.map((el) => el.value)
            )
        } else {
            setActiveFilters(
                activeFilters.includes(e.target.id)
                    ? activeFilters.filter((el) => el !== e.target.id && el !== "all")
                    : [...activeFilters, e.target.id]
            )
        }
    };

    useEffect(() => {
        dispatch(filterTickets(activeFilters))
    }, [dispatch, activeFilters]);

    return (
        <div className={classes.mainContainer_Filters}>
            <div className={classes.mainContainer_Name}>
                <p>Количество пересадок</p>
            </div>
            {filters.map((filter) => (
                <div key={filter.id} className={classes.filterContainer}>
                    <input
                        type="checkbox"
                        id={filter.value}
                        checked={activeFilters.includes(filter.value)}
                        onChange={handleFilterCheck}
                    />
                    <label htmlFor={filter.value}>{filter.title}</label>
                </div>
            ))}
        </div>
    );
}





