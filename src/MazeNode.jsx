import "./App.css"
import React, { useState } from "react"

export default function MazeNode(props) {
  console.log(props.values)
  return(
     <div>
     {props.values.map((obj, i) => (
       <div className="mazeNodeDiv"
       style={{display:"inline-block"}}>
        { obj == 1 ? <h1 className="mazeNode">__</h1> :
        <h1>▉</h1>
        }
       </div>
     ))}
     </div>
  )
}