import SlateBlock from '~/components/editorPlugins/SlateBlock';

class BlockEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    import('@editorjs/editorjs').then(editor => {
      const EditorJS = editor.default;
      const editorjs = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holderId: 'ce-block-editor',
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
          slateBlock: SlateBlock
        }
      });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div id="ce-block-editor" className="ce-block-editor" />
        <style jsx>{`
          .wrapper {
            display: flex;
            justify-content: center;
          }
        `}</style>
        <style global jsx>{`
          .ce-block-editor {
            width: 750px;
          }
        `}</style>
      </div>
    );
  }
}

export default BlockEditor;
