import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Select from 'react-select'

import { ConnectedManagerParcel } from './ManagerParcel'
import { StatusMessage, FILTER_OPTIONS } from '../constants'
import { Body } from '../constants'
import { setParcelsInStore } from '../redux/actions'
import { getParcels } from '../services'

const Title = styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

const Dropdown = styled.div`
    margin: 10px auto 10px auto;
    width: 200px;
`

export function Manager({ accessToken, allParcels, setParcels }) {

    const [data, setData] = useState({ result: null, isLoading: null, error: null })

    const [filterOption, setFilterOption] = useState({ label: 'ALL', value: 'ALL' })

    useEffect(() => {
        if (!allParcels.length){
            setData({ ...data, isLoading: true })
            getParcels(accessToken)
            .then(res => {
                setParcels(res)
                setData({ ...data, result: res, isLoading: false })
            })
            .catch(err => {
                setData({ ...data, isLoading: false, error: 'Something went wrong!' })
            })
        }
        
    }, [])

    let filteredParcels = allParcels.reduce((array, parcel) => {
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
                        options={FILTER_OPTIONS}
                    />
                </Dropdown>
            {data.isLoading && <StatusMessage>{'Loading...'}</StatusMessage>}
            {data.error && <StatusMessage>{data.error}</StatusMessage>}
            {!data.isLoading && !data.error && filteredParcels.length == 0 && <StatusMessage> No items </StatusMessage>}
            {!data.isLoading && !data.error && filteredParcels.length > 0 && filteredParcels}

        </Body>
    )
}

const mapStateToProps = (state, ownProps) => ({
        allParcels: state.parcels
})

const mapDispatchToProps = dispatch => ({
    setParcels: (parcels) => dispatch(setParcelsInStore(parcels))
})

export const ConnectedManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(Manager)

