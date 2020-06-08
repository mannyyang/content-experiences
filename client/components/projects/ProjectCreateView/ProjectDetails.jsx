/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  // Chip,
  // FormHelperText,
  Grid,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Plus as PlusIcon } from 'react-feather';
import FilesDropzone from 'client/components/FilesDropzone';
import FlipCard from 'client/components/FlipCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2),
  },
  tag: {
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
}));

// const GET_FLIP_CARDS = gql`
//   query allFlipCards {
//     allFlipCards {
//       id
//       front
//       back
//       description
//       createdAt
//     }
//     _allFlipCardsMeta {
//       count
//     }
//   }
// `;

const ADD_FLIP_CARD = gql`
  mutation AddFlipCard(
    $frontTitle: String
    $frontImage: String
    $backTitle: String
    $backImage: String
    $description: String
  ) {
    createFlipCard(
      data: {
        frontTitle: $frontTitle
        frontImage: $frontImage
        backTitle: $backTitle
        backImage: $backImage
        description: $description
      }
    ) {
      id
      front
      back
      description
      createdAt
    }
  }
`;

function ProjectDetails({
  className,
  onBack,
  onNext,
  ...rest
}) {
  const classes = useStyles();
  const [tag, setTag] = useState('');

  const [addFlipCard, { error }] = useMutation(ADD_FLIP_CARD, {
    // After a new one is added, update the cache to include the newly added
    // flip card.
    // update(cache, { data: { createFlipCard } }) {
    //   const { allFlipCards } = cache.readQuery({
    //     query: GET_FLIP_CARDS,
    //   });

    //   cache.writeQuery({
    //     query: GET_FLIP_CARDS,
    //     data: { allFlipCards: allFlipCards.concat([createFlipCard]) },
    //   });
    // },
  });

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  const handleImageUpload = useCallback(async (
    files = [],
    name,
    setFieldvalue,
  ) => {
    if (files[0]) {
      const data = new FormData();
      data.append('file', files[0]);

      const location = await fetch('/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((body) => body.location)
        .catch((err) => {
          console.error(err);
          throw err;
        });

      setFieldvalue(name, location);

      return location;
    }

    return null;
  }, []);


  return (
    <Formik
      initialValues={{
        name: '',
        tags: ['Full-Time'],
        frontTitle: '',
        backTitle: '',
        frontImage: '',
        backImage: '',
        description: '',
      }}
      validationSchema={Yup.object().shape({
        tags: Yup.array(),
        frontTitle: Yup.string().min(3, 'Must be at least 3 characters').max(255).required('Required'),
        backTitle: Yup.string().min(3, 'Must be at least 3 characters').max(255).required('Required'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting,
      }) => {
        try {
          // Do API call to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          await addFlipCard({
            variables: {
              frontTitle: values.frontTitle,
              backTitle: values.backTitle,
              frontImage: values.frontImage,
              backImage: values.backImage,
              description: '',
            },
          });

          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        // setFieldTouched,
        touched,
        values,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Create a New Flip Card
          </Typography>
          {/* <Box mt={2}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Proin tincidunt lacus sed ante efficitur efficitur.
              Quisque aliquam fringilla velit sit amet euismod.
            </Typography>
          </Box> */}
          <Box pb={2}>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="Name"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              variant="outlined"
            />
            <Box
              pt={2}
              display="flex"
              alignItems="center"
            >
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
                variant="outlined"
              />
              <IconButton
                variant="contained"
                className={classes.addTab}
                onClick={() => {
                  if (!tag) {
                    return;
                  }

                  setFieldValue('tags', [...values.tags, tag]);
                  setTag('');
                }}
              >
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </Box>
          </Box>
          <Box pb={2}>
            <Box
              mt={3}
              mb={1}
            >
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >
                Front Side
              </Typography>
            </Box>
            <Grid container>
              <Grid item xs={6}>
                <Box pb={2}>
                  <TextField
                    error={Boolean(touched.frontTitle && errors.frontTitle)}
                    fullWidth
                    helperText={touched.frontTitle && errors.frontTitle}
                    label="Title"
                    name="frontTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.frontTitle}
                    variant="outlined"
                  />
                </Box>
                <FilesDropzone
                  name="frontImage"
                  onDrop={
                  (files, name) => handleImageUpload(files, name, setFieldValue)
                }
                />
              </Grid>
              <Grid
                alignItems="center"
                container
                item
                justify="center"
                xs={6}
              >
                <FlipCard
                  card={{
                    frontTitle: values.frontTitle,
                    backTitle: values.backTitle,
                    frontImage: values.frontImage,
                    backImage: values.backImage,
                  }}
                  isFlipped
                />
              </Grid>
            </Grid>
          </Box>
          <Box pb={2}>
            <Box
              mt={3}
              mb={1}
            >
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >
                Back Side
              </Typography>
            </Box>
            <Grid container>
              <Grid item xs={6}>
                <Box pb={2}>
                  <TextField
                    error={Boolean(touched.frontTitle && errors.frontTitle)}
                    fullWidth
                    helperText={touched.frontTitle && errors.frontTitle}
                    label="Title"
                    name="frontTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.frontTitle}
                    variant="outlined"
                  />
                </Box>
                <FilesDropzone
                  name="frontImage"
                  onDrop={
                  (files, name) => handleImageUpload(files, name, setFieldValue)
                }
                />
              </Grid>
              <Grid
                alignItems="center"
                container
                item
                justify="center"
                xs={6}
              >
                <FlipCard
                  card={{
                    frontTitle: values.frontTitle,
                    backTitle: values.backTitle,
                    frontImage: values.frontImage,
                    backImage: values.backImage,
                  }}
                  isFlipped={false}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            mt={6}
            display="flex"
          >
            <Box flexGrow={1} />
            <Button
              color="secondary"
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              size="large"
            >
              Add New Flip Card
            </Button>
          </Box>
        </form>
      )}
    </Formik>

  );
}

ProjectDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

export default ProjectDetails;
