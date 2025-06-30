import React from 'react'

function ProductButtons({onClickHandler,value,title}) {
  return (
   <button className="btns" onClick={onClickHandler} value={value}>{title}</button>
  )
}

export default ProductButtons
