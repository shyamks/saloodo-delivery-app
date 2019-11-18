export const setParcelsInStore = (parcels) => ({
    type: 'SET_PARCELS',
    parcels
})

export const assignBikerToParcel = ({ id, biker }) => ({
    type: 'ASSIGN_PARCEL',
    id,
    biker
})

export const reassignParcel = (id) => ({
    type: 'REASSIGN_PARCEL',
    id
})

export const pickupBikerParcel = ({ id, time }) => ({
    type: 'PICKUP_BIKER_PARCEL',
    id,
    time
})

export const deliverBikerParcel = ({ id, time }) => ({
    type: 'DELIVER_BIKER_PARCEL',
    id,
    time
})

