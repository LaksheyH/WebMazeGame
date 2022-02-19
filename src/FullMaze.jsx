import './App.css';
import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Body } from 'matter-js';
import mazeData from "./mazeArrayData.jsx"

export default function FullMaze(props) {
  const scene = useRef()
  const engine = useRef(Engine.create())

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    var player = createPlayer(cw, ch);
    createMaze(cw, ch);

    Engine.run(engine.current)
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const createPlayer = (cw, ch) => {
    var A = Bodies.circle(cw / 2, ch / 2, 30, {
        render: {
          fillStyle: '#00ff00'
        }
      })
    return Body.create({
      parts: [A]
    })
  }

  const createMaze = (cw, ch) => {
    const Scale = 60;
    const LeftMargin = cw / 4;
    var widthRatio = Math.min(cw, ch);
    var currentColumn = 0;
    mazeData.forEach(row => {
      //console.log(row)
      currentColumn++;
      var currentRow = 0;
      row.forEach(node => {
        currentRow++;
        //console.log(currentRow);
        //console.log(node);
        //console.log(currentColumn);
        var x = (widthRatio / Scale) * currentColumn + widthRatio / (Scale / 4) + LeftMargin;
        var y = (widthRatio / Scale) * currentRow + widthRatio / (Scale / 4);
        var width = widthRatio / Scale;
        var height = widthRatio / Scale;
        if (node == 0) {
          //console.log("" + x + " " + y + " " + width + " " + height)
          World.add(engine.current.world,
            Bodies.rectangle(x, y, width, height, {
              isStatic: true,
              render: {
                fillStyle: '#0000ff'
              }
            })
          )
        }
      })
    })
  }

  return (
    <div
      style={{ height: "100vh" }}
    >
      <div ref={scene} className="canvasDiv" />
    </div>
  )

} 