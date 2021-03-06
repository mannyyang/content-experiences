import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NextLink from 'next/link';
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
          <NextLink href="/flip-cards">
            <Link
              variant="body1"
              color="inherit"
              to="/flip-cards"
            >
              All Flip Cards
            </Link>
          </NextLink>
          {/* <Link
            variant="body1"
            color="inherit"
            to="/app/projects"
          >
            Projects
          </Link> */}
          {/* <Typography
            variant="body1"
            color="textPrimary"
          >
            Browse
          </Typography> */}
        </Breadcrumbs>
        {/* <Typography
          variant="h3"
          color="textPrimary"
        >
          See the latest opportunities
        </Typography> */}
      </Grid>
      <Grid item>
        <NextLink href="/flip-cards/create">
          <Button
            color="secondary"
            variant="contained"
          >
            <SvgIcon
              fontSize="small"
              className={classes.actionIcon}
            >
              <PlusIcon />
            </SvgIcon>
            Add New Flip Card
          </Button>
        </NextLink>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
