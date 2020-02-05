// Import React dependencies.
import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
// Import the Slate editor factory.
import { createEditor } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import Wrapper from '../ButtonTest';

const SlateJS = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);

  return (
    <div>
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable />
      </Slate>
      <Wrapper />
    </div>
  );
};

export default class SlateBlock {
  static get toolbox() {
    return {
      title: 'SlateBlock',
      icon: 'SB'
    };
  }

  constructor(state) {
    this.data = state.data;
  }

  render() {
    this.wrapper = document.createElement('div');
    ReactDOM.render(<SlateJS />, this.wrapper);

    return this.wrapper;
  }

  save() {
    return {
      questions: this.component.currQuestions
    };
  }

  // validate(savedData) {
  //   if (!savedData.url.trim()) {
  //     return false;
  //   }

  //   return true;
  // }
}
