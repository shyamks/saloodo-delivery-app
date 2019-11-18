import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { ManagerParcel, ConnectedManagerParcel } from './ManagerParcel'
import { Body } from './constants'
import { setParcelsInStore } from './actions'

const Title = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

export function Manager({ parcels, setParcels }) {

    const [data, setData] = useState({ result: null, isLoading: null, error: null })

    useEffect(() => {
        console.log(parcels,'parcels')
        if (!parcels.length){
            setData({ ...data, isLoading: true })
            fetch('http://localhost:4000/parcels')
            .then(response => response.json())
            .then(res => {
                console.log(res, 'data')
                setParcels(res)
                setData({ ...data, result: res, isLoading: false })
            })
            .catch(err => {
                console.log(err, 'err')
                setData({ ...data, isLoading: false, error: 'Something went wrong!' })
            })
        }
        
    }, [])

    // let parcels = data.result
    return (
        <Body>
            <Title> Manager Dashboard </Title>
            {data.isLoading && <h2>{'Loading...'}</h2>}
            {data.error && <h2>{data.error}</h2>}
            {parcels && parcels.map((parcel) => {
                return <ConnectedManagerParcel id={parcel.id} parcelData={parcel} />
            })}

        </Body>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state,'mapStateToProps')
    return {
        parcels: state.parcels
    }
}

const mapDispatchToProps = dispatch => ({
    setParcels: (parcels) => dispatch(setParcelsInStore(parcels))
})

export const ConnectedManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(Manager)

