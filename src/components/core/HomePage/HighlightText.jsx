import React from 'react'

function HighlightText({text}) {
  return (
    <span style={{backgroundImage:'linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)'}} className='gradientText'>{text}</span>
  )
}
export default HighlightText