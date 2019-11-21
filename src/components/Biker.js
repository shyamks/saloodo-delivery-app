import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Body, StatusMessage } from '../constants'
import { setParcelsInStore } from '../redux/actions'
import { ConnectedBikerParcel } from './BikerParcel'
import { getParcels } from '../services'

const Title = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

export function Biker({ allParcels, accessToken, myParcels, setParcels }){

    const [data, setData] = useState({ isLoading: null, error: null })

    useEffect(() => {
        if (!allParcels.length){
            setData({ ...data, isLoading: true })
            getParcels(accessToken)
            .then(res => {
                setParcels(res)
                setData({ ...data, isLoading: false })
            })
            .catch(err => {
                setData({ ...data, isLoading: false, error: 'Something went wrong!' })
            })
        }
        
    }, [])

    let allMyParcels = myParcels.map((parcel) => {
        return <ConnectedBikerParcel id={parcel.id} parcelData={parcel} initialDateTime={new Date()} />
    })
    return (
        <Body>
            <Title> My parcels </Title>
            {data.isLoading && <h2>{'Loading...'}</h2>}
            {data.error && <h2>{data.error}</h2>}
            {!data.isLoading && myParcels.length == 0 && <StatusMessage> No parcels </StatusMessage> }
            {!data.isLoading && myParcels.length > 0 && allMyParcels }
        </Body>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        myParcels: state.parcels.filter(parcel => parcel.assignedBiker === ownProps.username),
        allParcels: state.parcels
    }
}

const mapDispatchToProps = dispatch => ({
    setParcels: (parcels) => dispatch(setParcelsInStore(parcels))
})

export const ConnectedBiker = connect(
    mapStateToProps,
    mapDispatchToProps
)(Biker)