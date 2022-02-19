import React, { useEffect, useRef, useState } from 'react'
import mazeData from "./mazeArrayData"
import MazeCreateer from './CreateMaze'
import Player from './PlayerClass'
import CollisionHandler from './CollisionsHandler'

export default function CanvasBasedMaze(props) {
  const [sceneWidth, setSceneWidth] = useState(0)
  const [sceneHeight, setSceneHeight] = useState(0)
  const [player, setPlayer] = useState(null)
  const [myMaze, setMyMaze] = useState(null)
  const [collisionHandler, setCollisionHandler] = useState(null)
  var playerSpeed = 2;
  var running = false;
  var directionVector = 0;
  var keyPressed = []
  const scene = useRef()

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    setSceneWidth(cw)
    setSceneHeight(ch)
    running = true;
    gameLoop(cw, ch)

    return () => {
      running = false;
    };
  }, [])

  window.onkeydown = function(e) {
    keyPressed[e.key] = true;

    if (keyPressed['a'] || keyPressed['A']) {
      player.movePlayerX(playerSpeed, -1)
      collisionMazeReset()
    }
    if (keyPressed['d'] || keyPressed['D']) {
      player.movePlayerX(playerSpeed, 1)
      collisionMazeReset()
    }
    if (keyPressed['w'] || keyPressed['W']) {
      player.movePlayerY(playerSpeed, -1)
      collisionMazeReset()
    }
    if (keyPressed['s'] || keyPressed['S']) {
      player.movePlayerY(playerSpeed, 1)
      collisionMazeReset()
    }
  }

  window.onkeyup = function(e) {
    delete keyPressed[event.key];
  }

  const collisionMazeReset = () => {
    if (myMaze != null) {
      myMaze.createMaze(sceneWidth, sceneHeight)
      if (collisionHandler != null && player != null) {
        //Temp
        const sceneContext = scene.current.getContext("2d")
        //^
        handleCollision(collisionHandler.checkForCollision(player.playerX(), player.playerY(), player.playerWidth(), player.playerHeight(), sceneContext), sceneContext)
      }
    }
  }

  const handleCollision = (theCollision, canvas) => {
    //canvas temp
    if(theCollision.length > 0 && player != null) {
      console.log(theCollision)
      collisionHandler.handleNodeCollisionCalculation(theCollision, player, playerSpeed, canvas)
    }
  }

  const gameLoop = (cw, ch) => {
    console.log(scene)
    const sceneContext = scene.current.getContext("2d")
    const newCW = Math.ceil(Math.min(cw, ch) / 60)
    var newPlayer = new Player(100, 100, newCW / 2, newCW / 2, sceneContext, "#00ff00")
    setPlayer(newPlayer)
    console.log(newPlayer)
    const maze = new MazeCreateer(sceneContext, mazeData, cw, ch)
    setMyMaze(maze)
    maze.createMaze()
    var mazeNodeDimens = Math.ceil(newCW)
    var collHandler = new CollisionHandler(maze.addAllMazeNodes(), mazeNodeDimens, mazeNodeDimens)
    setCollisionHandler(collHandler)
  }

  return (<div style={{ height: "100vh" }}>
    <canvas ref={scene} width={sceneWidth} height={sceneHeight} className="canvasDiv" />
  </div>)
}


