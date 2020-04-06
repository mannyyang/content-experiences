import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class BlockEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    import('@editorjs/editorjs').then(editor => {
      const EditorJS = editor.default;
      this.editorjs = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'ce-block-editor',
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {

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

  onSave = () => {
    this.editorjs
      .save()
      .then((outputData) => {
        this.props.onSave(outputData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error)
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div id="ce-block-editor" className="ce-block-editor" />
        <Button
          color="primary"
          type="button"
          onClick={this.onSave}
        >
          Save Changes
        </Button>
      </div>
    );
  }
}

export default BlockEditor;
