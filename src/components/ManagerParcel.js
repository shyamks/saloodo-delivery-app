import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Button, ASSIGNED, PICKED_UP, WAITING, DELIVERED, Assignee, Box, BIKER_OPTIONS } from '../constants'
import { assignBikerToParcel, reassignParcel } from '../actions';

const BoxTitle = styled.p`
    margin-right: 16px;
`

const Dropdown = styled.div`
    width: 200px;
    @media screen and (max-width: 800px) {
        width: 100px;
    }
`

export function ManagerParcel({ assign, reassign, parcelData, id, parcelsForReal }) {

    let { assignedBiker, status, pickupTime, deliveryTime } = parcelData
    const [selectedOption, setSelectedOption] = useState(null)

    const handleAssign = (data) => {
        setSelectedOption(data)
    }
    return (
        <Box id={id}>
            <BoxTitle>{parcelData.name}</BoxTitle>
            {status === WAITING &&
                (
                    <>
                        <Dropdown>
                            <Select
                                value={selectedOption}
                                onChange={handleAssign}
                                options={BIKER_OPTIONS}
                            />
                        </Dropdown>
                        <Button disabled={!selectedOption} onClick={() => assign(id, selectedOption.value)}> Assign </Button>
                    </>
                )
            }
            {status === ASSIGNED &&
                (
                    <>
                        <Assignee>{`Assigned to ${assignedBiker}`}</Assignee>
                        <Button onClick={() => reassign(id)}> Reassign </Button>
                    </>
                )
            }
            {status === PICKED_UP &&
                (
                    <>
                        <Assignee>{`${assignedBiker} has picked up the parcel on ${pickupTime.toLocaleString()}`}</Assignee>
                    </>
                )
            }
            {status === DELIVERED &&
                 (
                    <>
                        <Assignee>{`${assignedBiker} has picked up the parcel on ${pickupTime.toLocaleString()} and delivered on ${deliveryTime.toLocaleString()}`}</Assignee>
                    </>
                )
            }


        </Box>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        parcelsForReal: state.parcel
    }
}

const mapDispatchToProps = dispatch => ({
    assign: (id, biker) => dispatch(assignBikerToParcel({ id, biker })),
    reassign: id => dispatch(reassignParcel(id))
})

export const ConnectedManagerParcel = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagerParcel)