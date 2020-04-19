import React, { useEffect, useState } from 'react';

const Button = () => {
  const [count, setCount] = useState(0);

  useEffect(() => console.log('mounting'), []);

  const onClick = e => {
    console.log('clicked'); // << is not triggered
    setCount(prevCount => prevCount + 1);
  };

  return (
    <button onClick={onClick} type="button" style={{ padding: 10 }}>
      Click me [clicked: {count} times]
    </button>
  );
};

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export default Wrapper;
