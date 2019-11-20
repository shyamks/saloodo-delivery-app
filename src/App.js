import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { Header } from './Header'
import { Login } from './Login'
import { Biker, ConnectedBiker } from './Biker'
import { Manager, ConnectedManager } from './Manager'
import { Body, MANAGER, BIKER } from './constants'
import rootReducer from './reducers'

const store = createStore(rootReducer)

function App() {

  const [loginInfo, setLoginInfo] = useState({})
  let { accessToken, userRole, username } = loginInfo
  return (
    <Provider store={store}>
      <Header currentView={userRole}
        onLogout={() => setLoginInfo({})} />
      <Body>
        {!userRole && <Login onLogin={setLoginInfo} />}
        {userRole === MANAGER && <ConnectedManager accessToken={accessToken} />}
        {userRole === BIKER && <ConnectedBiker username={username} accessToken={accessToken} />}
      </Body>
    </Provider>
  )
}

export default App
