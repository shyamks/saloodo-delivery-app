import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Body } from './constants'
import { ConnectedManagerParcel } from './ManagerParcel'
import { setParcelsInStore } from './actions'
import { ConnectedBikerParcel } from './BikerParcel'

const Title = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

export function Biker({ myParcels, setParcels }){

    const [data, setData] = useState({ result: null, isLoading: null, error: null })

    useEffect(() => {
        console.log(myParcels,'myParcels')
        if (!myParcels.length){
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

    return (
        <Body>
            <Title> My parcels </Title>
            {data.isLoading && <h2>{'Loading...'}</h2>}
            {data.error && <h2>{data.error}</h2>}
            {myParcels && myParcels.map((parcel) => {
                return <ConnectedBikerParcel id={parcel.id} parcelData={parcel} />
            })}
        </Body>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state,'state')
    return {
        myParcels: state.parcels.filter(parcel => parcel.assignedBiker === 'Biker2')
    }
}

const mapDispatchToProps = dispatch => ({
    setParcels: (parcels) => dispatch(setParcelsInStore(parcels))
})

export const ConnectedBiker = connect(
    mapStateToProps,
    mapDispatchToProps
)(Biker)