import './App.css';
import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World } from 'matter-js';
import mazeData from "./mazeArrayData.jsx"
import MazeNodeProp from "./MazeNode.jsx"

function TestMaze() {

  console.log(mazeData)

  return (<div className="mainDiv">
    {
      mazeData.map((obj, i) => (<MazeNodeProp 
      values={obj}
      />))
    }
  </div>);

}

export default TestMaze;