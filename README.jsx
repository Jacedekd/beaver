import { useState, useEffect } from 'react';
import Cell from './components/Cell/Cell'
import Control from './components/Control/Control';
import './App.css';

const BOARD_SIZE = 10;
const SPEED = 500;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
const SNAKE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']

const checkAvialableSlot = position => {
  switch(true) {
    case position >= BOARD_SIZE:
      return 0
    case position < 0:
      return BOARD_SIZE - 1
    default: 
    return position
  }
}

const App = () => {

  const [snake, setSnake] = useState([[1, 1]])
  const [food, setFood] = useState([0, 0])
  const [direction, setDirection] = useState(SNAKE_MOVES[0])

  const handleKeyDown = (event) => {
    const index = SNAKE_MOVES.indexOf(event.key)
    console.log(index);
    if (index > -1) {
      setDirection(SNAKE_MOVES[index])
    }
  }

  useEffect(() => {
    gameLoop()
  }, [snake])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  const gameLoop = () => {
    // const timerId = setTimeout(() => {
      let newSnake = snake
      let move = [];
      switch (direction) {
        case SNAKE_MOVES[0]:
          move = [1, 0]
          break;
        case SNAKE_MOVES[1]:
          move = [-1, 0]
          break;
        case SNAKE_MOVES[2]:
          move = [0, 1]
          break;
        case SNAKE_MOVES[3]:
          move = [0, -1]
          break;
      }

      const head = [
        checkAvialableSlot(newSnake[newSnake.length - 1][0] + move[0]),
        checkAvialableSlot(newSnake[newSnake.length - 1][1] + move[1])
      ]

      newSnake.push(head)
      let spliceIndex = 1
      if(head[0] === food[0] && head[1] === food[1]) {
        spliceIndex = 0
        generatedFood()
      }
      setSnake(newSnake.slice(spliceIndex))
    // }, SPEED)
    // return timerId
  }

  const generatedFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE)
      ]
    } while (snake.some(elem => elem[0] === newFood[0] && elem[1] === newFood[1]))

    setFood(newFood)
  }

  return (
    <div className='App'>
      {DEFAULT_CELLS_VALUE.map((row, indexR) => (
        <div key={indexR} className="row">
          {row.map((cell, indexC) => {
            let type = snake.some(elem => elem[0] === indexR && elem[1] === indexC) && 'snake'
            if (type !== 'snake') {
              type = (food[0] === indexR && food[0] === indexC) && 'food'
            }
            return (
              <Cell key={indexC} type={type} />
            )
          })}
        </div>
      ))}
      <div className='control'>
        <Control />
      </div>
    </div>

  );
}

export default App;
