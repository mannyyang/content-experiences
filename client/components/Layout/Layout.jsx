/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
import Content from './Content';
import theme from '../../theme';

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

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
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header
          onDrawerToggle={handleDrawerToggle}
          title={title}
        />
        <main className={classes.main}>
          <Content>
            {children}
          </Content>
        </main>
        <footer className={classes.footer}>
          {/* <Copyright /> */}
        </footer>
      </div>
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

export default withStyles(styles)(Paperbase);
