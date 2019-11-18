import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Button, ASSIGNED, PICKED_UP, DELIVERED, getCurrentDateTime } from './constants'
import { deliverBikerParcel, pickupBikerParcel } from './actions';

const Box = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px auto 10px auto;
    
    width: 500px;
    border-radius: 40px;
    height: 100px;
    
    border: 1px solid blue;

    justify-content: center;
    align-items: center;
`

const BoxTitle = styled.p`
    margin-right: 16px;
`

const Dropdown = styled.div`
    width: 200px;
`
const Assignee = styled.p`
    width: 200px;
    text-align: center;
`


export function BikerParcel({ pickupParcel, deliverParcel, parcelData, id, parcelsForReal }) {

    let { assignedBiker, status, pickupTime, deliveryTime } = parcelData
    
    console.log(parcelsForReal, 'parcelsForReal')

    console.log(parcelData, 'parcelItem')
    return (
        <Box id={id}>
            <BoxTitle>{parcelData.name}</BoxTitle>
            {status === ASSIGNED && (
                <>
                    {`When the parcel is picked up`}
                    <Button onClick={() => pickupParcel(id, getCurrentDateTime())}> Pickup </Button>
                </>
            )}
            {status === PICKED_UP && (
                <>
                    {`When the parcel is delivered`}
                    <Button onClick={() => deliverParcel(id, getCurrentDateTime())}> Delivered </Button>
                </>
            )}
            {status === DELIVERED && (
                <>
                    {`Was picked up on ${pickupTime} and delivered on ${deliveryTime}`}
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