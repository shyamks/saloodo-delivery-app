import { WAITING, ASSIGNED, PICKED_UP, DELIVERED } from "../../constants"

export const parcel = (state= [], action) => {
    switch (action.type) {
        case 'ASSIGN_PARCEL':
            return state.map(parcel =>
                parcel.id === action.id ? { ...parcel, status: ASSIGNED, assignedBiker: action.biker } : parcel
            )
        case 'REASSIGN_PARCEL':
            return state.map(parcel =>
                parcel.id === action.id ? { ...parcel, status: WAITING, assignedBiker: null } : parcel
            )
        case 'PICKUP_BIKER_PARCEL':
            return state.map(parcel =>
                parcel.id === action.id ? { ...parcel, status: PICKED_UP, pickupTime: action.time } : parcel
            )
        case 'DELIVER_BIKER_PARCEL':
            return state.map(parcel =>
                parcel.id === action.id ? { ...parcel, status: DELIVERED, deliveryTime: action.time } : parcel
            )
        case 'SET_PARCELS':
            return action.parcels
        default:
            return state
    }
}
