/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tabs,
  Tab,
  makeStyles,
} from '@material-ui/core';
import Header from './Header';
import Overview from './Overview';
import IDContext from './IDContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const tabs = [
  { value: 'overview', label: 'Overview' },
];

function ProjectDetailsView({ id }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('overview');
  const [project, setProject] = useState({
    title: 'some title',
    author: 'author yang',
    tags: ['tag', 'ta2'],
    members: [],
  });

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  // const getProject = useCallback(() => {
  // }, []);

  // if (!project) {
  //   return null;
  // }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Header project={project} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          <IDContext.Provider value={id}>
            {
              currentTab === 'overview'
              && <Overview id={id} project={project} />
            }
          </IDContext.Provider>
        </Box>
      </Container>
    </div>

  );
}

export default ProjectDetailsView;
