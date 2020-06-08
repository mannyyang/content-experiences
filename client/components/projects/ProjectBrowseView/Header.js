import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PlusCircle as PlusIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      container
      justify="space-between"
      spacing={3}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/projects"
          >
            Projects
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Browse
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          See the latest opportunities
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          to="/app/projects/create"
          variant="contained"
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <PlusIcon />
          </SvgIcon>
          Add new project
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
