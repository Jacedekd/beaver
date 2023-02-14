import { useState, useEffect } from 'react';
import Cell from './components/Cell/Cell'
import Control from './components/Control/Control';
import './App.css';

const BOARD_SIZE = 7;
const SPEED = 500;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
const SNAKE_MOVES = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

const checkAvialableSlot = position => {
  switch (true) {
    case position >= BOARD_SIZE:
      return 0
    case position < 0:
      return BOARD_SIZE - 1
    default:
      return position
  }
}

const App = () => {

  const [snake, setSnake] = useState([[0, 0]])
  const [food, setFood] = useState([])
  const [direction, setDirection] = useState(SNAKE_MOVES[0])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake]);

  useEffect(() => {
    generatedFood()
  }, [])

  const handleKeyDown = (event) => {
    switch (event.key) {
      case SNAKE_MOVES[0]:
        setSnake([[snake[0][0], snake[0][1] - 1]])
        break;
      case SNAKE_MOVES[1]:
        setSnake([[snake[0][0], snake[0][1] + 1]])
        break;
      case SNAKE_MOVES[2]:
        setSnake([[snake[0][0] - 1, snake[0][1]]]);
        break;
      case SNAKE_MOVES[3]:
        setSnake([[snake[0][0] + 1, snake[0][1]]]);
        break;
      default:
        break;
    }
    

  };


  const generatedFood = () => {
    let newFood;
    // do {
    //   newFood = [
    //     Math.floor(Math.random() * BOARD_SIZE),
    //     Math.floor(Math.random() * BOARD_SIZE)
    //   ]
    // } while (snake.some(elem => elem[0] === newFood[0] && elem[1] === newFood[1]))
    newFood = [
          Math.floor(Math.random() * BOARD_SIZE),
          Math.floor(Math.random() * BOARD_SIZE)
        ]
    setFood(newFood)
  }

  return (
    <div className='App'>
      {DEFAULT_CELLS_VALUE.map((row, indexR) => (
        <div key={indexR} className="row">
          {row.map((cell, indexC) => {
            let type = snake.some(elem => elem[0] === indexR && elem[1] === indexC) && 'snake'
            // if (type !== 'snake') {
            let typeF = (food[0] === indexR && food[0] === indexC) && 'food'
            // }
            return (
              <Cell key={indexC} type={type} typeF={typeF} />
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
