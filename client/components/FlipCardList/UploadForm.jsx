import React, { useEffect, useState } from 'react';
// import fetch from 'isomorphic-fetch';

const UploadFrom = () => {
  const [uploadInput, setUpdateInput] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  const handleUploadImage = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', uploadInput.files[0]);

    fetch('/upload', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((body) => {
        setImgUrl(body.location);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {

  }, []);

  return (
    <form encType="multipart/form-data" onSubmit={handleUploadImage} method="post">
      <div>
        <input name="file" ref={(ref) => { setUpdateInput(ref); }} type="file" />
      </div>
      {/* <div>
        <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
      </div> */}
      <br />
      <div>
        <button>Upload</button>
      </div>
      {imgUrl && <img src={imgUrl} alt="img" />}
    </form>
  );
};

export default UploadFrom;
