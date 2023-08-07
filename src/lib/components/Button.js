import React from 'react'

function Button(props) {
  return (
    <button style={{color:props.color}}>{props.text}</button>
  )
}

export default Button