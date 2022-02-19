import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Test from "./TestingMaze.jsx"
import FullMaze from "./FullMaze.jsx"
import CanvasBasedMaze from './CanvasBasedMaze'

ReactDOM.render(
  <React.StrictMode>
    <CanvasBasedMaze />
  </React.StrictMode>,
  document.getElementById('root')
)
