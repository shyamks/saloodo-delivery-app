import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Button } from './constants'
import { assignBikerToParcel, reassignParcel } from './actions';

const options = [
    { value: 'Biker1', label: 'Biker1' },
    { value: 'Biker2', label: 'Biker2' },
    { value: 'Biker3', label: 'Biker3' },
];

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


export function ManagerParcel({ assign, reassign, parcelData, id, parcelsForReal }) {

    let { assignedBiker } = parcelData
    const [selectedOption, setSelectedOption] = useState(assignedBiker ? { value: assignedBiker, label: assignedBiker }: null)
    const handleAssign = (data) => {
        setSelectedOption(data)
    }
    console.log(parcelsForReal, 'parcelsForReal')

    console.log(parcelData, 'parcelItem')
    console.log(selectedOption, 'selectedOption')
    return (
        <Box id={id}>
            <BoxTitle>{parcelData.name}</BoxTitle>
            {assignedBiker ?
                (
                    <>
                        <Assignee>{`Assigned to ${assignedBiker}`}</Assignee>
                        <Button onClick={() => reassign(id)}> Reassign </Button>
                    </>
                ) : (
                    <>
                        <Dropdown>
                            <Select
                                value={selectedOption}
                                onChange={handleAssign}
                                options={options}
                            />
                        </Dropdown>
                        <Button onClick={() => assign(id, selectedOption.value)}> Assign </Button>
                    </>
                )}
        </Box>
    )
}

// const getParcels = (parcels, status) => {

// }
const mapStateToProps = (state, ownProps) => {
    // console.log(state, 'state')
    return {
        parcelsForReal: state.parcel
    }
    // assigned: ownProps.state.
}

const mapDispatchToProps = dispatch => ({
    assign: (id, biker) => dispatch(assignBikerToParcel({ id, biker })),
    reassign: id => dispatch(reassignParcel(id))
})

export const ConnectedManagerParcel = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagerParcel)