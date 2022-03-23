import React from "react";
import {SegmentsType, TicketType} from "../../../state/bll/tickets_reducer";
import classes from "./ticket.module.css";
import {v1} from "uuid";


type propsType = {
    ticket: TicketType
}

export const Ticket = ({ticket}: propsType) => {

    return (
        <div className={classes.card_Container}>
            <div className={classes.ticket_Container}>
                <div className={classes.ticket_priceAndImg}>
                    <h2 className={classes.ticket_Price}>{ticket.price} ₽</h2>
                    <button className={classes.ticket_PriceButton}>Выбрать билет</button>
                </div>
                <div className={classes.ticket_Info}>
                    <div>
                        <img src={`https://pics.avs.io/99/36/${ticket.carrier}@2x.png`} alt={ticket.carrier}
                              width={'90px'}/>
                    </div>
                    <div className={classes.ticket_SegmentsList}>{
                        ticket.segments.map((segment: SegmentsType, i: any) => {
                                const getTime = (time: number) => {
                                    let minutes = time % 60;
                                    let hours = (time - minutes) / 60;
                                    return `${hours}ч ${minutes}м`
                                }
                                const getTimeFlight = (date: string, time: number) => {
                                    const startDate = new Date(date);
                                    const endDate = new Date(+startDate + time * 60 * 1000);
                                    return `${startDate.getHours()}:${startDate.getMinutes()} - ${endDate.getHours()}:${endDate.getMinutes()}`;
                                }
                                // 2022-01-30T01:11:00.000Z
                                return (
                                    <div key={v1()} className={classes.ticket_SegmentsListContainer}>
                                        <div className={classes.ticketContent}>
                                            <p
                                                className={classes.ticketSegment_RecordTitle}>{segment.origin} - {segment.destination} </p>
                                            <p
                                                className={classes.ticketSegment_RecordValue}>{getTimeFlight(segment.date, segment.duration)}</p>
                                        </div>
                                        <div className={classes.ticketContent}>
                                            <p className={classes.ticketSegment_RecordTitle}>В ПУТИ</p>
                                            <p
                                                className={classes.ticketSegment_RecordValue}>{getTime(segment.duration)}</p>
                                        </div>
                                        <div className={classes.ticketContent}>
                                            <SegmentStops segment={segment}/>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}


type SegmentStopsPropsType = {
    segment: SegmentsType
}

const SegmentStops = (props: SegmentStopsPropsType) => {
    if (props.segment.stops.length === 0) {
        return (
            <div>
                <div className={classes.ticketSegment_RecordTitle}>БЕЗ ПЕРЕСАДОК</div>
                <div className={classes.ticketSegment_RecordValue}> -</div>
            </div>
        )
    } else if (props.segment.stops.length === 1) {
        return (
            <div>
                <div className={classes.ticketSegment_RecordTitle}>1 ПЕРЕСАДКА</div>
                <div className={classes.ticketSegment_RecordValue}>{props.segment.stops.map(m => {
                    return (
                        <div className={classes.ticketSegmentContainer} key={v1()}>
                        <span>{m} </span>
                        </div>
                    )
                })}</div>
            </div>
        )
    } else if (props.segment.stops.length === 2) {
        return (
            <div>
                <div className={classes.ticketSegment_RecordTitle}>2 ПЕРЕСАДКИ</div>
                <div className={classes.ticketSegment_RecordValue}>{props.segment.stops.map(m => {
                    return (
                        <span key={v1()}>{m} </span>
                    )
                })}</div>
            </div>
        )
    } else if (props.segment.stops.length === 3) {
        return (
            <div>
                <div className={classes.ticketSegment_RecordTitle}>3 ПЕРЕСАДКИ</div>
                <div className={classes.ticketSegment_RecordValue}>{props.segment.stops.map(m => {
                    return (
                        <span key={v1()}>{m} </span>
                    )
                })}</div>
            </div>
        )
    }
    return (
        <></>
    )
}