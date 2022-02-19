import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Engine, Render, Bodies, World, Body } from 'matter-js';

function App() {
  const [player, setPlayer] = useState(null);
  const scene = useRef()
  const isPressed = useRef(false)
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

    setPlayer(createPlayer(cw, ch));

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

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

  const handleDown = () => {
    console.log("pressed")
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
      style={{height:"100vh"}}
      // onMouseDown={handleDown}
      // onMouseUp={handleUp}
      // onMouseMove={handleAddCircle}
    >
      <div ref={scene} className="canvasDiv"/>
    </div>
  )
}

export default App;