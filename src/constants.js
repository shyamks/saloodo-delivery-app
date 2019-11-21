import styled from 'styled-components'

export const ENDPOINT = 'http://localhost:4000'
export const MANAGER = 'manager'
export const BIKER = 'biker'

export const WAITING = 'WAITING'
export const ASSIGNED = 'ASSIGNED'
export const PICKED_UP = 'PICKED_UP'
export const DELIVERED = 'DELIVERED'

export const Body = styled.div`
    margin: 90px 13% 0 13%;
    height: auto;
    padding-bottom: 13rem;
    @media all and (max-width: 800px) {
      margin: 70px 0 0 0;
    }
`

export const Assignee = styled.p`
    width: 200px;
    text-align: center;
    @media all and (max-width: 800px) {
        width: 100px;
    }
    
`

export const StatusMessage = styled.h2`
    text-align: center;
`

export const Box = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px auto 10px auto;

    width: auto;
    height: auto;
    border-radius: 40px;
    padding: 20px 0 20px 0;

    border: 1px solid #60bc0f;

    justify-content: center;
    align-items: center;
    @media screen and (max-width: 800px) {
        display: flex;
        width: auto;
        border-radius: 30px;
    }
`

export const Button = styled.button`
    margin: 20px;
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => (props.color ? props.color : 'white')};
    border-radius: 5px;
    border-width: 0px;
    background-color: ${(props) => props.disabled ? 'grey' : '#60bc0f'};
    height: ${(props) => (props.height ? props.height : '33px')};
    width: ${(props) => (props.width ? props.width : '100px')};
    outline: 0;
    &: hover{
        cursor: pointer;
    }
    &: active {
        outline: 0;
        border: none;
    }
    &: focus {
        outline: 0;
        border: none;
    }
    @media screen and (max-width: 800px) {
        font-size: 12px;
        margin: 10px;
    }
`

export const getCurrentDateTime = () => {
    let currentDateTime = new Date()

    return currentDateTime
}

export const BIKER_OPTIONS = [
    { value: 'Biker1', label: 'Biker1' },
    { value: 'Biker2', label: 'Biker2' },
    { value: 'Biker3', label: 'Biker3' },
    { value: 'Biker4', label: 'Biker4' },
    { value: 'Biker5', label: 'Biker5' },
    { value: 'Biker6', label: 'Biker6' },
    { value: 'Biker7', label: 'Biker7' },
    { value: 'Biker8', label: 'Biker8' },
    { value: 'Biker9', label: 'Biker9' },
    { value: 'Biker10', label: 'Biker10' },
]

export const FILTER_OPTIONS = [
    { value: 'ALL', label: 'ALL' },
    { value: WAITING, label: WAITING },
    { value: ASSIGNED, label: ASSIGNED },
    { value: PICKED_UP, label: PICKED_UP },
    { value: DELIVERED, label: DELIVERED }
];

export const ROLE_OPTIONS = [
    { value: MANAGER, label: 'Manager' },
    { value: BIKER, label: 'Biker' }
]