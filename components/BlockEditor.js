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
        holder: 'ce-block-editor',
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
          slateBlock: SlateBlock
        },
        data: {
          time: 1552744582955,
          blocks: [
            {
              type: 'paragraph',
              data: {
                text:
                  'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
              }
            }
          ],
          version: '2.11.10'
        }
      });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div id="ce-block-editor" className="ce-block-editor" />
      </div>
    );
  }
}

export default BlockEditor;
