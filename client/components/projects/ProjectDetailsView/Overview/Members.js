/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
// import PropTypes from 'prop-types';
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
  makeStyles,
} from '@material-ui/core';
// import IDContext from '../IDContext';

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  },
}));

const iframeTemplate = (id) => `<iframe src="//flip-cards.com/flip-cards/embed/${id}" style="border:none; width="525px" height="525px">
</iframe>`;

function Members({
  id,
  members,
  className,
  ...rest
}) {
  // const id = useContext(IDContext);
  const classes = useStyles();
  const [embedCode, setEmbedCode] = useState();
  const textAreaRef = useRef();

  useEffect(() => {
    setEmbedCode(iframeTemplate(id));
  }, [id]);

  const onClick = () => {
    textAreaRef.current.firstChild.firstChild.focus();
    textAreaRef.current.firstChild.firstChild.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log(`Copying text command was ${msg}`);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        className={classes.header}
        title="Embed Code"
        titleTypographyProps={{
          variant: 'overline',
        }}
      />
      <CardContent className={classes.content}>
        <Box mt={2}>
          <TextField
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            value={embedCode}
            placeholder="IFrame Embed HTML"
            ref={textAreaRef}
            // defaultValue={card.description}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          onClick={onClick}
        >
          Copy Embed Code
        </Button>
      </CardActions>
    </Card>
  );
}

Members.propTypes = {
  // className: PropTypes.string,
  // members: PropTypes.array.isRequired,
};

export default Members;
