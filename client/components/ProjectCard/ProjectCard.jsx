/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { default as NextLink } from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Card,
  // CardMedia,
  Divider,
  // Grid,
  IconButton,
  Link,
  // SvgIcon,
  Tooltip,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
// import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import { Users as UsersIcon } from 'react-feather';
import getInitials from 'client/utils/getInitials';
import FlipCard from 'client/components/FlipCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark,
  },
  likedButton: {
    color: colors.red[600],
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

function ProjectCard({ project, className, ...rest }) {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={3}>
        <FlipCard
          card={project}
          hasActions={false}
        />
        <Box
          pb={2}
          px={3}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {project?.name}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Avatar
            alt="Author"
            src={project?.author?.avatar}
          >
            {getInitials(project?.author?.name)}
          </Avatar>
          <Box ml={2}>
            <Link
              color="textPrimary"
              to="#"
              variant="h5"
            >
              title
              {project?.title}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              by
              {' '}
              <Link
                color="textPrimary"
                to="#"
                variant="h6"
              >
                author name
                {project?.author?.name}
              </Link>
              {' '}
              | Updated
              {' '}
              {moment(project?.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        pb={2}
        px={3}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {project?.description}
        </Typography>
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        alignItems="center"
      >
        {isLiked ? (
          <Tooltip title="Unlike">
            <IconButton
              className={classes.likedButton}
              onClick={handleUnlike}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {likes}
        </Typography>
        {/* <SvgIcon
          fontSize="small"
          color="action"
          className={classes.subscribersIcon}
        >
          <UsersIcon />
        </SvgIcon> */}
        {/* <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {project?.subscribers}
        </Typography>
        <Box flexGrow={1} /> */}
        {/* <Rating
          value={project?.rating}
          size="small"
          readOnly
        /> */}
        <Box flexGrow={1} />
        <NextLink
          href="/flip-cards/[pid]"
          as={`/flip-cards/${project.id}`}
        >
          <Button
            onClick={handleLike}
            width="100%"
          >
            View
          </Button>
        </NextLink>
      </Box>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
