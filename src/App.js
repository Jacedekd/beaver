import { useState, useEffect } from 'react';
import Coll from './components/Coll/Coll'
import Control from './components/Control/Control';
import Modal from './components/Modal/Modal';
import cn from 'classnames'
import './App.css';

const BOARD_SIZE = 16;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0))
const BEAVER_MOVES = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

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

  const [beaver, setBeaver] = useState([[0, 0]])
  const [food, setFood] = useState([])
  const [following, setFollowing] = useState(false)
  const [show, setShow] = useState(false)
  const [nextLevel, setNextLevel] = useState(false)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [beaver]);

  useEffect(() => {
    if (following === true) {
      setFood(beaver[0])
    }

  }, [beaver])

  useEffect(() => {

    let isEqual = beaver[0].toString() === food.toString();
    if (isEqual == true) {
      document.addEventListener('keydown', (e) => {
        if (e.key == 'e') {
          if (following === false) {
            setFollowing(true)
          }
        }
      })
    }
    document.addEventListener('keydown', (e) => {
      if (e.key == 'e') {

        if (following === true) {
          setFollowing(false)
          const isEqual = (a) => {
            return beaver.toString() === a.toString();
          }
          if (isEqual([0, 8]) || isEqual([0, 9]) || isEqual([0, 10]) || isEqual([1, 8]) || isEqual([1, 7]) || isEqual([1, 6]) || isEqual([2, 6]) || isEqual([2, 7]) || isEqual([15, 5]) || isEqual([14, 6]) || isEqual([14, 7]) || isEqual([14, 8]) || isEqual([15, 9])) {
            setShow(true)
          }

        }
      }
    })
  }, [beaver])



  useEffect(() => {
    generatedFood()
  }, [])

  const generatedFood = () => {
    let newFood;
    newFood = [
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE)
    ]
    setFood(newFood)
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case BEAVER_MOVES[0]:
        setBeaver([[beaver[0][0], beaver[0][1] - 1]])
        break;
      case BEAVER_MOVES[1]:
        setBeaver([[beaver[0][0], beaver[0][1] + 1]])
        break;
      case BEAVER_MOVES[2]:
        setBeaver([[beaver[0][0] - 1, beaver[0][1]]]);
        break;
      case BEAVER_MOVES[3]:
        setBeaver([[beaver[0][0] + 1, beaver[0][1]]]);
        break;
      default:
        break;
    }

  };

  const backModal = () => {
    setShow(false)
  }
  const reloadPage = () => {
    setBeaver([[0, 0]])
    setFollowing(false)
    generatedFood()
    setShow(false)
    setNextLevel(true)
  }

  return (
    <div className='Main'>
      <div className='AppTitle'>Задача:<span>Добраться до бревна и перенести его в водоём</span></div>
      <div className={cn('App', {next: nextLevel})}>
        <Modal reloadPage={reloadPage} backModal={backModal} show={show} />
        {DEFAULT_CELLS_VALUE.map((row, indexR) => (
          <div key={indexR} className="row">
            {row.map((coll, indexC) => {
              let type = beaver.some(elem => elem[0] === indexR && elem[1] === indexC) && 'beaver'
              // if (type !== 'beaver') {
              let typeF = (food[0] === indexR && food[1] === indexC) && 'food'
              // }
              return (
                <Coll key={indexC} type={type} typeF={typeF} />
              )
            })}
          </div>
        ))}
        <div className='control'>
          <Control />
        </div>
      </div>
    </div>


  );
}

export default App;
