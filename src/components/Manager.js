import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Select from 'react-select'

import { ConnectedManagerParcel } from './ManagerParcel'
import { ASSIGNED, PICKED_UP, WAITING, DELIVERED, StatusMessage } from '../constants'
import { Body } from '../constants'
import { setParcelsInStore } from '../actions'

const Title = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`
const filterOptions = [
    { value: 'ALL', label: 'ALL' },
    { value: WAITING, label: WAITING },
    { value: ASSIGNED, label: ASSIGNED },
    { value: PICKED_UP, label: PICKED_UP },
    { value: DELIVERED, label: DELIVERED }
];

const Dropdown = styled.div`
    margin: 10px auto 10px auto;
    width: 200px;
`

export function Manager({ accessToken, parcels, setParcels }) {

    const [data, setData] = useState({ result: null, isLoading: null, error: null })

    const [filterOption, setFilterOption] = useState({ label: 'ALL', value: 'ALL' })

    useEffect(() => {
        console.log(parcels,'parcels')
        if (!parcels.length){
            setData({ ...data, isLoading: true })
            fetch('http://localhost:4000/parcels', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
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

    let filteredParcels = parcels.reduce((array, parcel) => {
        if (filterOption.value === 'ALL') {
            return [...array, <ConnectedManagerParcel id={parcel.id} parcelData={parcel} />]
        }
        else {
            if (parcel.status === filterOption.value)
                return [...array, <ConnectedManagerParcel id={parcel.id} parcelData={parcel} />]
        }
        return [...array]
    }, [])
    return (
        <Body>
            <Title> Manager Dashboard </Title>
            <Dropdown>
                    <Select
                        value={filterOption}
                        onChange={setFilterOption}
                        options={filterOptions}
                    />
                </Dropdown>
            {data.isLoading && <StatusMessage>{'Loading...'}</StatusMessage>}
            {data.error && <StatusMessage>{data.error}</StatusMessage>}
            {!data.isLoading && !data.error && filteredParcels.length == 0 && <StatusMessage> No items </StatusMessage>}
            {!data.isLoading && !data.error && filteredParcels.length > 0 && filteredParcels}

        </Body>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state, 'mapStateToProps')
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

