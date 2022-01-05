import React from 'react'

const TilePlayer2 = ( {player2, player1, positionArrayPlayer2, hitArrayPlayer2, missArrayPlayer2, play, winner, messageActive, clickHandle} ) => {
    let content = []
    const tiles = () => {
        for (let x=1; x<37; x++) {
            content.push(   <button  key={x}
                                className={ (player2 && !play && positionArrayPlayer2.find(tile => tile === x)) || (positionArrayPlayer2.find(tile => tile === x) && winner) ? 'player2-cell ship' 
                                            : player1 && play && hitArrayPlayer2.find(tile => tile === x) ? 'player2-cell hit' 
                                            : (player1 && play && missArrayPlayer2.find(tile => tile === x)) || (missArrayPlayer2.find(tile => tile === x) && winner) ? 'player2-cell miss'
                                            : winner ? 'player1-cell winner'
                                            : (player2 && !play) || (player1 && play) ? 'player2-cell active' : 'player2-cell'}  
                                id={`player2-${x}`} 
                                onClick={() => clickHandle(x)}
                                disabled={(player1 && !play) || (play && !player1) || winner || messageActive}
                            >
                            </button>
                        ) 
        }
        return content
    }
    return <div className='player2-board'>{tiles()}</div>
}

export default TilePlayer2
