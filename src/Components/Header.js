import React from 'react'

const Header = ( {player1, player2} ) => {
    return (
        <div className='top'>
                <h1>BATTLESHIP</h1>
                <div className={player1 ? 'player1 active' : 'player1'}>Player 1
                    <p className='score1'></p>
                </div>
                <div className={player2 ? 'player2 active' : 'player2'}>Player 2
                    <p className='score2'></p>
                </div>
            </div>
    )
}

export default Header
