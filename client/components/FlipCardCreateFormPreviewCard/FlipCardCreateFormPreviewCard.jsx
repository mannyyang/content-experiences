import React from 'react';

function FlipCardCreateFormPreviewCard({
  title,
  image,
  type,
}) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        border: '1px solid black',
        textAlign: 'center',
      }}
    >
      {title === '' && image === null && (
        <div>
          Preview of
          {type}
          {' '}
          card
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </div>
      {typeof image === 'string' && (
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
  );
}

export default FlipCardCreateFormPreviewCard;
