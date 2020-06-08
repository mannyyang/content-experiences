/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/MoreVert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import bytesToSize from 'client/utils/bytesToSize';

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer',
    },
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5,
  },
  image: {
    width: 100,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function FilesDropzone({
  className,
  label,
  multiple,
  name,
  onDrop,
  ...rest
}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const handleDrop = useCallback((acceptedFiles) => {
    if (multiple) {
      setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
    } else {
      setFiles(acceptedFiles);
    }
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 3000000, // 3MB
    multiple,
    onDrop: handleDrop,
  });

  useEffect(() => {
    onDrop(files, name);
  }, [files]);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        mt={3}
        mb={1}
      >
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {label}
        </Typography>
      </Box>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive,
        })}
        {...getRootProps()}
      >
        <input name={name} {...getInputProps()} />
        <div>
          <CloudUploadIcon
            className={classes.image}
            fontSize="large"
          />
        </div>
        <div>
          <Typography
            gutterBottom
            variant="h3"
          >
            Select files
          </Typography>
          <Box mt={1}>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Drop files here or click
              {' '}
              <Link underline="always">browse</Link>
              {' '}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem
                  divider={i < files.length - 1}
                  key={i}
                >
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button
              onClick={handleRemoveAll}
              size="small"
            >
              Remove all
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="contained"
            >
              Upload files
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
};

FilesDropzone.defaultProps = {
  className: '',
  label: 'Upload',
  multiple: false,
  name: '',
};

export default FilesDropzone;
