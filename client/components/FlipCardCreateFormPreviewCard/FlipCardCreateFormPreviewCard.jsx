import React from 'react'

function FlipCardCreateFormPreviewCard({ title, image, type }) {
  return (
    <div
      style={{
        height: '35vh',
        width: '35vw',
        border: '1px solid black',
        textAlign: 'center',
      }}
    >
      {title === '' && image === null && (
        <div>Preview of {type} card</div>
      )}
      <div
        style={{
          position: 'absolute',
          height: '35vh',
          width: '35vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </div>
      {image && (
        <img
          src={image}
          alt="background"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            zIndex: '-1',
          }}
        />
      )}
    </div>
  )
}

export default FlipCardCreateFormPreviewCard
