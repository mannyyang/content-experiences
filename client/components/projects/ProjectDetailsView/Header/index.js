import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import NextLink from 'next/link';
import {
  Breadcrumbs,
  Link,
  Box,
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Share2 as ShareIcon,
  Check as CheckIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertIcon,
  DollarSign as DollarSignIcon,
  Send as SendIcon,
} from 'react-feather';
import Application from './Application';

const useStyles = makeStyles((theme) => ({
  root: {},
  badge: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  badgeIcon: {
    marginRight: theme.spacing(1),
  },
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Header({ project, className, ...rest }) {
  const classes = useStyles();
  const [openApplication, setOpenApplication] = useState(false);

  const handleApplicationOpen = () => {
    setOpenApplication(true);
  };

  const handleApplicationClose = () => {
    setOpenApplication(false);
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
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
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {project.title}
        </Typography>
        <Box
          mx={-2}
          display="flex"
          color="text.secondary"
          alignItems="center"
          flexWrap="wrap"
        >
          <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              {project.active ? <CheckIcon /> : <AlertIcon /> }
            </SvgIcon>
            <Typography
              variant="body2"
              color="inherit"
              component="span"
            >
              {project.active ? 'Active' : 'Inactive'}
            </Typography>
          </div>
          <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              <CalendarIcon />
            </SvgIcon>
            <Typography
              variant="body2"
              color="inherit"
              component="span"
            >
              {`Ending ${moment(project.endDate).fromNow()}`}
            </Typography>
          </div>
          <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              <DollarSignIcon />
            </SvgIcon>
            <Typography
              variant="body2"
              color="inherit"
              component="span"
            >
              {`Budget: ${project.price}`}
            </Typography>
          </div>
        </Box>
      </Grid>
      {/* <Grid item>
        <Button className={classes.action}>
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <ShareIcon />
          </SvgIcon>
          Share
        </Button>
        <Button
          className={classes.action}
          onClick={handleApplicationOpen}
          variant="contained"
          color="secondary"
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <SendIcon />
          </SvgIcon>
          Apply for a role
        </Button>
        <Application
          author={{}}
          onApply={handleApplicationClose}
          onClose={handleApplicationClose}
          open={openApplication}
        />
      </Grid> */}
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

Header.defaultProps = {};

export default Header;
