import React from 'react'

const TilePlayer1 = ( {player1, player2, positionArrayPlayer1, hitArrayPlayer1, missArrayPlayer1, play, winner, messageActive, clickHandle} ) => {
    let content = []
    const tiles = () => {
        for (let x=1; x<37; x++) {
            content.push(   <button  key={x}
                                className={ (player1 && !play && positionArrayPlayer1.find(tile => tile === x)) || (winner && positionArrayPlayer1.find(tile => tile === x)) ? 'player1-cell ship' 
                                            : player2 && play && hitArrayPlayer1.find(tile => tile === x) ? 'player1-cell hit' 
                                            : (player2 && play && missArrayPlayer1.find(tile => tile === x)) || (winner && missArrayPlayer1.find(tile => tile === x)) ? 'player1-cell miss'
                                            : winner ? 'player1-cell winner'
                                            : (player1 && !play) || (player2 && play) ? 'player1-cell active' : 'player1-cell'}                                 
                                id={`player1-${x}`} 
                                onClick={() => clickHandle(x)}
                                disabled={(play && !player2) || (!play && player2) || winner || messageActive}
                            >
                            </button>
                        ) 
        }
        return content
    }
    return <div className='player1-board'>{tiles()}</div>
}

export default TilePlayer1
