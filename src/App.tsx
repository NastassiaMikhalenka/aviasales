import React, {useEffect} from 'react';
import {Filters} from "./components/Filters/Filters";
import {Sorting} from "./components/Sorting/Sorting";
import {Tickets} from "./components/Tickets/Tickets";
import {useDispatch} from "react-redux";
import {setTicketsTC} from "./state/bll/tickets_reducer";
import classes from './app.module.css';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTicketsTC())
    }, []);

    return (
        <div className={classes.App}>
            <header className={classes.mainContainerHeader}>
                <div className={classes.containerHeader_Logo}>
                    <img
                        src={'https://aliceskill.ru/media/data/2e/06/2e06b60e-d999-499f-b559-9d835cbaa36e/aviasales-2..256x256_q85_background-%23ffffff.png'}
                        width={'50px'}/>
                </div>
            </header>
            <div className={classes.mainContainer}>
                <div className={classes.mainContainerFilters}>
                    <Filters/>
                </div>
                <div className={classes.mainContainerContent}>
                    <Sorting/>
                    <Tickets/>
                </div>
            </div>
        </div>
    );
}

export default App;
