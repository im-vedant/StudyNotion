import React from 'react'
import { TypeAnimation } from 'react-type-animation'
function AnimatedText() {
  return (
    <TypeAnimation 
    style={{ whiteSpace: 'pre-line',color : '#FFE83D', fontWeight: 600, fontSize :'14px', display :'flex'}}
    sequence={[
        `<!DOCTYPE html>
        <html>
        <head><title>Example</title><linkrel="stylesheet" href="styles.css">
        </head>
        <body>
        <h1><ahref="/">Header</a>
        </h1>
        <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
        </nav>`,
        0,
        ""
    ]}
    cursor={false}
    omitDeletionAnimation={true}
    repeat={Infinity}
    />
  )
}

export default AnimatedText