import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'

import { Body, MANAGER, BIKER, BIKER_OPTIONS, Button, ROLE_OPTIONS, StatusMessage } from '../constants'
import { BikerParcel } from './BikerParcel'

const Dropdown = styled.div`
    width: 200px;
`

const BoxTitle = styled.h3`
    text-align: center;
`

const LoginText = styled.p`
@media screen and (max-width: 800px) {
    text-align: center;
}
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

export function Login({ onLogin }) {
    const [role, setRole] = useState(null)

    const [biker, setBiker] = useState(null)

    const [login, setLogin] = useState({ error: null, isLoading: false })
    const onSubmit = () => {
        setLogin({ isLoading: true })
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ userRole: role.value, username: biker && biker.value })
        }).then(response => response.json())
            .then(data => {
                setLogin({ error: null, isLoading: false })
                onLogin(data)
            })
            .catch(err => {
                setLogin({ error: err, isLoading: false })
                console.log(err, 'error')
            })
    }
    const enabled = role && ((role.value === MANAGER) || (role.value === BIKER && biker))
    const {isLoading, error} = login
    return (
        <Body>
            <BoxTitle> Login </BoxTitle>
            {<Column>
                <Row>
                    <LoginText>{`Login as`}</LoginText>
                    <Dropdown>
                        <Select
                            placeholder={`Select Role`}
                            value={role}
                            onChange={setRole}
                            options={ROLE_OPTIONS}
                        />
                    </Dropdown>
                    {role && role.value === BIKER &&
                        <Dropdown>
                            <Select
                                placeholder={`Select Biker`}
                                value={biker}
                                onChange={setBiker}
                                options={BIKER_OPTIONS}
                            />
                        </Dropdown>
                    }
                </Row>
                <Button disabled={!enabled} onClick={onSubmit}>Login</Button>
            </Column>}
            {isLoading && !error && <StatusMessage>{'Loading...'}</StatusMessage>}
            {!isLoading && error && <StatusMessage>{'Something went wrong'}</StatusMessage>}
        </Body>
    )
}