import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './App.css'
import { Header } from './Header'
import { Biker, ConnectedBiker } from './Biker'
import { Manager, ConnectedManager } from './Manager'
import { Body, MANAGER, BIKER } from './constants'
import rootReducer from './reducers'

const store = createStore(rootReducer)

function App() {

  const [view, setView] = useState({ currentView: MANAGER })

  return (
    <Provider store={store}>
      <Header currentView={view.currentView}
        onManagerView={() => setView({ currentView: MANAGER })}
        onBikerView={() => setView({ currentView: BIKER })}
        onLogout={() => setView({ currentView: null })} />
      <Body>
        {view.currentView === 'manager' && <ConnectedManager />}
        {view.currentView === 'biker' && <ConnectedBiker />}
      </Body>
    </Provider>
  )
}

export default App
