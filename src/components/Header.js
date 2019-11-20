import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    justify-content: space-between;
    background-color: white;
    overflow: hidden;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;    
`

const AppHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 13% 5px 13%;
    @media screen and (max-width: 800px) {
        display: flex;
        margin: 30px 20px 5px 20px;
        justify-content: space-between;
    }
`

const AppLeftHeader = styled.div`
    display: flex;
`
const AppRightHeader = styled.div`
    display: flex;
`

const LoginHeader = styled.div`
    margin-right: 20px;
    outline: none;
    &: hover{
        cursor: pointer;
    }
`

export function Header({ currentView, onLogout }) {
    return (
        <Wrapper>
            <AppHeader>
                <AppLeftHeader> Saloodo App </AppLeftHeader>
                <AppRightHeader>
                    {currentView && <LoginHeader onClick={() => onLogout()}> Logout </LoginHeader>}
                </AppRightHeader>
            </AppHeader>
        </Wrapper>
    )
}