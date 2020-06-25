/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  // Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  // List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText,
  makeStyles,
} from '@material-ui/core';
import IDContext from '../IDContext';

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
}));

const iframeTemplate = (id) => `<iframe src="//flip-cards.com/${id}" style="border:none; width="525px" height="525px">
</iframe>`;

function Members({
  members,
  className,
  ...rest
}) {
  const id = useContext(IDContext);
  const classes = useStyles();
  const embedCode = iframeTemplate(id);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        className={classes.header}
        title="Project members"
        titleTypographyProps={{
          variant: 'overline',
        }}
      />
      <CardContent className={classes.content}>
        <Box mt={2}>
          <TextField
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={embedCode}
            placeholder="IFrame Embed HTML"
            // defaultValue={card.description}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth>
          Copy Embed Code
        </Button>
      </CardActions>
    </Card>
  );
}

Members.propTypes = {
  className: PropTypes.string,
  members: PropTypes.array.isRequired,
};

export default Members;
