// PACKAGE IMPORTS
import React, { useReducer } from 'react';
import Paper from '@material-ui/core/Paper';
// FILE IMPORTS
import ProjectsList from './ProjectsList';
import AddProject from './AddProject';
import ProjectsContext from '../../context/projects-context';
import projectsReducer from '../../reducers/projects';
import FiltersContext from '../../context/filters-context';
import filtersReducer from '../../reducers/filter';
import currentDateTime from '../../utils/currentDateTime';


export default function Projects(props) {

  const [projects, projectsDispatch] = useReducer(projectsReducer, []);
  const [filters, filtersDispatch] = useReducer(filtersReducer, { text: '', dev: '', activeProject: '',  });

  const initialProjectData = {
    projectName: '',
    startDate: new Date(),
    launchDate: new Date(),
    devReviewDate: new Date(),
    lastModified: currentDateTime(),
    projectNotes: '',
    load: 0
  }

  return (
    <div>
    <ProjectsContext.Provider value={{ projects, projectsDispatch }}>
      <FiltersContext.Provider value={{ filters, filtersDispatch }}>
        <Paper className="container">
          <AddProject initialProjectData={initialProjectData}/>
          <ProjectsList initialProjectData={initialProjectData} history={props.history} />
        </Paper>
      </FiltersContext.Provider>
    </ProjectsContext.Provider>
    </div>
  )
}
