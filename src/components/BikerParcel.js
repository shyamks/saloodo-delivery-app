import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Button, ASSIGNED, PICKED_UP, DELIVERED, Box } from '../constants'
import { deliverBikerParcel, pickupBikerParcel } from '../actions';

const BoxTitle = styled.p`
    margin-right: 16px;
`

const PickedUp = styled.div`
    display: flex;
    flex-direction: column;
`
const Assignee = styled.p`
    width: 200px;
    text-align: center;
    @media all and (max-width: 800px) {
        width: 100px;
    }
`

const Center = styled.div`
    margin-left: auto;
    margin-right: auto;
`

export function BikerParcel({ pickupParcel, deliverParcel, parcelData, id, parcelsForReal }) {

    let { assignedBiker, status, pickupTime, deliveryTime } = parcelData

    const [selectedOption, setSelectedOption] = useState(assignedBiker ? { value: assignedBiker, label: assignedBiker } : null)
    const [dateTime, setDateTime] = useState(new Date())

    const onChange = (date, status) => {
        if (status == PICKED_UP){
            if(date > pickupTime)
                setDateTime(date)
        }
        else {
            setDateTime(date)
        }
        console.log(date, 'date')
        
    }
    console.log(parcelsForReal, 'parcelsForReal')

    console.log(parcelData, 'parcelItem')
    console.log(selectedOption, 'selectedOption')
    return (
        <Box id={id}>
            <BoxTitle>{parcelData.name}</BoxTitle>
            {status === ASSIGNED && (
                <>
                    <DatePicker
                        selected={dateTime}
                        onChange={(date) => onChange(date, PICKED_UP)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        timeCaption="time"
                        dateFormat="yyyy/MM/dd h:mm aa"
                    />
                    <Button onClick={() => pickupParcel(id, dateTime)}> Pickup </Button>
                </>
            )}
            {status === PICKED_UP && (
                <>
                    <PickedUp>
                        <Assignee>{`Parcel was picked on ${pickupTime.toLocaleString()}`}</Assignee>
                        <Center>
                            <DatePicker
                                selected={dateTime}
                                onChange={(date) => onChange(date, PICKED_UP)}
                                showTimeSelect
                                excludeOutOfBoundsTimes
                                minDate={pickupTime}
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                timeCaption="time"
                                dateFormat="yyyy/MM/dd h:mm aa"
                            />
                        </Center>
                    </PickedUp>
                    <Button onClick={() => deliverParcel(id, dateTime)}> Delivered </Button>
                </>
            )}
            {status === DELIVERED && (
                <>
                    <Assignee>{`Was picked up on ${pickupTime.toLocaleString()} and delivered on ${deliveryTime.toLocaleString()}`}</Assignee>
                </>
            )}
        </Box>
    )
}

const mapStateToProps = (state, ownProps) => ({
    parcelsForReal: state.parcels
})

const mapDispatchToProps = dispatch => ({
    pickupParcel: (id, time) => dispatch(pickupBikerParcel({ id, time })),
    deliverParcel: (id, time) => dispatch(deliverBikerParcel({ id, time })),
})

export const ConnectedBikerParcel = connect(
    mapStateToProps,
    mapDispatchToProps
)(BikerParcel)