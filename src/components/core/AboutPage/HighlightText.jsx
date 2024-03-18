import React from 'react'

const HighlightText = ({text, gradient}) => {
  return (
    <span style={{backgroundImage : gradient}} className={` bg-clip-text text-transparent`}>
        {text}
    </span>
  )
}

export default HighlightText