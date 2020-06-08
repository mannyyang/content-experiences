/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
import Content from './Content';
// import theme from '../../theme';

const drawerWidth = 256;

// const styles = {
//   root: {
//     display: 'flex',
//     minHeight: '100vh',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   app: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   main: {
//     flex: 1,
//     padding: theme.spacing(6, 4),
//     background: '#eaeff1',
//   },
//   footer: {
//     padding: theme.spacing(2),
//     background: '#eaeff1',
//   },
// };

function Paperbase(props) {
  const {
    classes,
    children,
    title,
  } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      {children}
    </div>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

Paperbase.defaultProps = {
  children: null,
};

export default Paperbase;
