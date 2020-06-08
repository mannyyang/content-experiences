/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  makeStyles,
  withStyles,
  colors,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  User as UserIcon,
  Star as StarIcon,
  Briefcase as BriefcaseIcon,
  File as FileIcon,
} from 'react-feather';
import ProjectDetails from './ProjectDetails';

const steps = [
  {
    label: 'User Details',
    icon: UserIcon,
  },
  {
    label: 'Project Details',
    icon: BriefcaseIcon,
  },
  {
    label: 'Project Description',
    icon: FileIcon,
  },
];

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function CustomStepIcon({ active, completed, icon }) {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon size="20" />
    </Avatar>
  );
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: colors.red[600],
  },
}));

function ProjectCreateView() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  return (
    <div
      className={classes.root}
      title="Project Create"
    >
      <Container maxWidth="lg">
        <Box mb={3}>
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
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Projects
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Create Wizard &amp; Process
          </Typography>
        </Box>
        <Paper>
          <Grid>
            <Grid
              item
            >
              <Box p={3}>
                <ProjectDetails />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default ProjectCreateView;
