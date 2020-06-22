import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Link,
  List,
  ListItem,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
  listItem: {
    padding: theme.spacing(2, 0),
    justifyContent: 'space-between',
  },
}));

function Holder({ project, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        avatar={(
          <Avatar
            alt="Author"
            className={classes.avatar}
            src={project.author.avatar}
            to="#"
          >
            author name
          </Avatar>
        )}
        className={classes.header}
        disableTypography
        subheader={(
          <Link
            color="textPrimary"
            to="#"
            underline="none"
            variant="h6"
          >
            {project.author.name}
          </Link>
        )}
        title={(
          <Typography
            display="block"
            variant="overline"
            color="textSecondary"
          >
            Contest holder
          </Typography>
        )}
      />
      <CardContent className={classes.content}>
        <List>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Deadline
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {moment(project.deadline).format('DD MMM YYYY')}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Per Project
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {project.price}
              {' '}
              {project.currency}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Last Update
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {moment(project.updatedAt).format('DD MMM YYYY')}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

Holder.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default Holder;
