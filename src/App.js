import { useState, useEffect, useRef } from 'react'
import Header from './Components/Header'
import MessageBox from './Components/MessageBox'
import TilePlayer1 from './Components/TilePlayer1'
import TilePlayer2 from './Components/TilePlayer2'
import './App.css'

const App = () => {

  const [player1, setPlayer1] = useState(false)
  const [player2, setPlayer2] = useState(false)
  const [winner, setWinner] = useState(false)
  const [counterPlayer1, setCounterPlayer1] = useState(0)
  const [counterPlayer2, setCounterPlayer2] = useState(0)
  const [positionArrayPlayer1, setPositionArrayPlayer1] = useState([])
  const [positionArrayPlayer2, setPositionArrayPlayer2] = useState([])
  const [hitArrayPlayer1, setHitArrayPlayer1] = useState([])
  const [hitArrayPlayer2, setHitArrayPlayer2] = useState([])
  const [missArrayPlayer1, setMissArrayPlayer1] = useState([])
  const [missArrayPlayer2, setMissArrayPlayer2] = useState([])
  const [messageActive, setMessageActive] = useState(false)
  const [moment, setMoment] = useState(false)
  const [ships, setShips] = useState(0)
  const [clickedId, setClickedId] = useState(0)
  const [message, setMessage] = useState({
    header: 'Would you like to play?',
    paragraph : 'Decide who is player 1 and player 2 and hit start.',
    buttonText: 'Start',
    buttonOnclick: () => start()
  })
  
  const firstLoad = useRef(true)
  const placingShips = useRef(false)
  const play = useRef(false)

  useEffect(() => { 
    if (!firstLoad.current) {    
      const id = clickedId
      if (player1) {
        const prevId1 = positionArrayPlayer1[positionArrayPlayer1.length - 1]
        if (placingShips.current && ships % 2 == 0 && !positionArrayPlayer1.find(tile => tile === id)) {
          //place first tile of ship, anywhere as long as it is not already in pos array
          setPositionArrayPlayer1(prev => [...prev, id])
          setShips(prev => prev + 1)
          return
        }
        if (placingShips.current && ships % 2 != 0 && (prevId1-id === 6 || prevId1-id === -6 || prevId1-id === 1 || prevId1-id === -1) && !positionArrayPlayer1.find(tile => tile === id)) {
          //place second tile of ship, only next to first tile and it is not in pos array
          setPositionArrayPlayer1(prev => [...prev, id])
          setShips(prev => prev + 1)
          return
        }
        if (play.current && positionArrayPlayer2.find(tile => tile === id) && !hitArrayPlayer2.find(tile => tile === id)) {
          //hit
          setHitArrayPlayer2(prev => [...prev, id])
          setCounterPlayer1(prev => prev + 1)
          return
        }
        if (play.current && !positionArrayPlayer2.find(tile => tile === id) && !missArrayPlayer2.find(tile => tile === id)) {
          //miss
          setMissArrayPlayer2(prev => [...prev, id])
          setMessageActive(prev => !prev)
          setMoment(prev => !prev)
          return
        }
      }
      else if (player2) {
        const prevId2 = positionArrayPlayer2[positionArrayPlayer2.length - 1]
        if (placingShips.current && ships % 2 == 0 && !positionArrayPlayer2.find(tile => tile === id)) {
          setPositionArrayPlayer2(prev => [...prev, id])
          setShips(prev => prev + 1)
          return
        }
        if (placingShips.current && ships % 2 != 0 && (prevId2-id === 6 || prevId2-id === -6 || prevId2-id === 1 || prevId2-id === -1) && !positionArrayPlayer2.find(tile => tile === id)) {
          setPositionArrayPlayer2(prev => [...prev, id])
          setShips(prev => prev + 1)
          return
        }
        if (play.current && positionArrayPlayer1.find(tile => tile === id) && !hitArrayPlayer1.find(tile => tile === id)) {
          //hit
          setHitArrayPlayer1(prev => [...prev, id])
          setCounterPlayer2(prev => prev + 1)
          return
        }
        if (play.current && !positionArrayPlayer1.find(tile => tile === id) && !missArrayPlayer1.find(tile => tile === id)) {
          //miss
          setMissArrayPlayer1(prev => [...prev, id])
          setMessageActive(prev => !prev)
          setMoment(prev => !prev)
          return
        }
      }
    }
  }, [clickedId])
  
  useEffect(() => {
    if (!firstLoad.current) {
      //miss, switch players
      setMessage({
        header: 'Miss!!',
        paragraph : 'next player',
        buttonText: '',
        buttonOnclick: null
      })
      const switchPlayers = () => {
        setTimeout(() => {
          setMessageActive(prev => !prev)
          setPlayer2(prev => !prev)
          setPlayer1(prev => !prev)
  
        }, 1000)
      }
      switchPlayers()
      return () => clearTimeout(switchPlayers)
    }
  }, [moment])
  
  useEffect(() => {
    if (ships === 6) {
      //next player to place ships
      setPlayer1(prev => !prev)
      setPlayer2(prev => !prev)
    }
    if (ships === 12) {
      //finished placing ships
      setPlayer1(prev => !prev)
      setPlayer2(prev => !prev)
      placingShips.current = false
      play.current = true
    }
  }, [ships])
  
  useEffect(() => {
    if (counterPlayer1 === 6 || counterPlayer2 === 6) {
      //winner
      let winner
      player1 ? winner = 'player 1' : winner = 'player 2'
      setWinner(true)
      setMessageActive(prev => !prev)
      setMessage({
        header: 'Winner!!',
        paragraph : `${winner} has won!`,
        buttonText: 'Play again',
        buttonOnclick: () => start()
      })
    }
  }, [counterPlayer1, counterPlayer2])

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
      setMessageActive(prev => !prev)
    }
  }, [])

  const countDown = () => {
    setMessage({
      header: '',
      paragraph : '3',
      buttonText: '',
      buttonOnclick: null
    })
    let timeLeft = 3
    const timer = () => {
      setInterval(() => {
        if (timeLeft === 0) {
          placingShips.current = true
          setMessageActive(prev => !prev)
          clearInterval(timer)
        }
        if (timeLeft === 3) {
          setMessage({
            header: '',
            paragraph : '2',
            buttonText: '',
            buttonOnclick: null
          })
        }
        if (timeLeft === 2) {
          setMessage({
            header: '',
            paragraph : '1',
            buttonText: '',
            buttonOnclick: null
          })
        }
        timeLeft--
      }, 1000)
    }
    timer()  
  }
  
  const start = () => {
    placingShips.current = false
    play.current = false
    setWinner(false)
    setShips(0)
    setPlayer1(false)
    setPlayer2(false)
    Math.floor(Math.random() * 2) + 1 === 1 ? setPlayer1(true) : setPlayer2(true)
    setPositionArrayPlayer1([])
    setPositionArrayPlayer2([])
    setHitArrayPlayer1([])
    setHitArrayPlayer2([])
    setMissArrayPlayer2([])
    setMissArrayPlayer1([])
    setCounterPlayer1(0)    
    setCounterPlayer2(0)
    setMessage({
        header: 'Place your ships',
        paragraph : '3 x ■■',
        buttonText: 'Get Ready',
        buttonOnclick: null
    })
    const wait = () => {
      setTimeout(() => {
        countDown()
      }, 1000)
    }
    wait()
  }

  const clickHandle = x => {
      setClickedId(x)
  }  

  return (
    <div className="App">
      <div className='container'>
            <MessageBox       message={message}
                              messageActive={messageActive}
            />
            <Header           player1={player1}
                              player2={player2}
            />
            <div className='board-area'>
                <TilePlayer1  player1={player1}
                              player2={player2}
                              play={play.current}
                              messageActive={messageActive}
                              positionArrayPlayer1={positionArrayPlayer1}
                              hitArrayPlayer1={hitArrayPlayer1}
                              missArrayPlayer1={missArrayPlayer1}
                              winner={winner}
                              clickHandle={clickHandle}
                              
                />
                <div className='middle'></div>
                <TilePlayer2  player2={player2}
                              player1={player1}
                              play={play.current}
                              messageActive={messageActive}
                              positionArrayPlayer2={positionArrayPlayer2}
                              hitArrayPlayer2={hitArrayPlayer2}
                              missArrayPlayer2={missArrayPlayer2}
                              winner={winner}
                              clickHandle={clickHandle}
                              
                />
            </div>
            <footer>Bambam 2021</footer>
        </div>
    </div>
  )
}

export default App;
