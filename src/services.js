import { ENDPOINT } from "./constants"

export const loginApi = (role, biker) => {
    return API(`${ENDPOINT}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ userRole: role.value, username: biker && biker.value })
    })
}

export const getParcels = (accessToken) => {
    return API(`${ENDPOINT}/parcels`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const API = (url, opts) => {
    return new Promise((resolve, reject) => {
        fetch(url, opts).then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}