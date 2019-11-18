import styled from 'styled-components'

export const MANAGER = 'manager'
export const BIKER = 'biker'

export const WAITING = 'WAITING'
export const ASSIGNED = 'ASSIGNED'
export const PICKED_UP = 'PICKED_UP'
export const DELIVERED = 'DELIVERED'

// export const MANAGER = 'manager'
export const Body = styled.div`
    margin: 90px 13% 0 13%;
    height: auto;
    padding-bottom: 13rem;
    @media all and (max-width: 800px) {
      margin: 70px 0 0 0;
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
`

export const getCurrentDateTime = () => {
    let currentDateTime = new Date()

    return currentDateTime
}