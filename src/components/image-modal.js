import React from 'react'

const ImageModal = ({ src, srcSet, handler }) => {
  return (
    <div className="image-modal" onClick={handler}>
      <img src={src} srcSet={srcSet}/>
    </div>
  )
}

export default ImageModal