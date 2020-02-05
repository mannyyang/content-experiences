import Link from 'next/link';
import dynamic from 'next/dynamic';

const EditorJS = dynamic(
  () => {
    return import('@editorjs/editorjs');
  },
  {
    ssr: false
  }
);

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <div id="codex-editor" />
  </div>
);

class Test extends React.Component {
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
        holderId: 'codex-editor'
      });
    });
  }

  render() {
    return <div id="codex-editor">test</div>;
  }
}

export default Test;

// export default BlockEditor() {
//   render() {
//     <Header />
//   }
// }
