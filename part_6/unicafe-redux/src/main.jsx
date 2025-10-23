// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'


const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <button onClick={() => store.dispatch({ type: 'GOOD'})}>good</button>
            <button onClick={() => store.dispatch({ type: 'OK'})}>ok</button>
            <button onClick={() => store.dispatch({ type: 'BAD'})}>bad</button>
            <button onClick={() => store.dispatch({ type: 'ZERO'})}>reset stats</button>
            <div>good &nbsp;{store.getState().good}</div>
            <div>ok &nbsp;{store.getState().ok}</div>
            <div>bad &nbsp;{store.getState().bad}</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)