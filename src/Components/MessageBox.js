import React from 'react'

const MessageBox = ( {message, messageActive} ) => {
    return (
        <div className={messageActive ? 'msg active' : 'msg'}>
                <p className='msg-p1'
                >
                    {message.header}
                </p>
                <p className={message.header === '' ? 'msg-p2 msg-p2-large' : 'msg-p2'}
                >
                    {message.paragraph}
                </p>
                <button className={message.buttonText === '' ? 'msg-button disabled' : 'msg-button'} 
                        onClick={message.buttonOnclick}
                >
                        {message.buttonText}
                </button>
            </div>
    )
}

export default MessageBox
