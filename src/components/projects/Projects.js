// PACKAGE IMPORTS
import React, { useEffect, useReducer } from 'react';
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

  const [projects, projectsDispatch] = useReducer(projectsReducer, [
    {
      id:0,
      projectName: 'Project-A',
      startDate: new Date(),
      dueDate: new Date(),
      projectManager: 'Laura',
      dev: 'Kim',
      lastModified: currentDateTime(),
      projectNotes: 'Awesome project!',
    },
    {
      id:1,
      projectName: 'Project-B',
      startDate: new Date(),
      dueDate: new Date(),
      projectManager: 'Mike',
      dev: 'Pete',
      lastModified: currentDateTime(),
      projectNotes: 'Getting there!',
    },
    {
      id:2,
      projectName: 'Project-C',
      startDate: new Date(),
      dueDate: new Date(),
      projectManager: 'Allison',
      dev: 'James',
      lastModified: currentDateTime(),
      projectNotes: 'This project rocks!',
    },
    {
      id:3,
      projectName: 'Project-D',
      startDate: new Date(),
      dueDate: new Date(),
      projectManager: 'Laura',
      dev: 'Kim',
      lastModified: currentDateTime(),
      projectNotes: 'Everyone is awesome!',
    }
  ]);
  const [filters, filtersDispatch] = useReducer(filtersReducer, { text: '', dev: '', activeProject: '',  });

  const initialProjectData = {
    projectName: '',
    startDate: new Date(),
    dueDate: new Date(),
    projectManager: '',
    dev: '',
    lastModified: currentDateTime(),
    projectNotes: '',
  }


  // save data to localStorage
  useEffect(() => {
    localStorage.setItem('project-list', JSON.stringify(projects));
  }, [projects]);

  // get project data from local storage
  // useEffect(() => {
  //   let savedProjects = localStorage.getItem('project-list');
  //   if (!projects) {
  //     projectsDispatch({ type: 'POPULATE_PROJECTS', projects });
  //     setProjects(JSON.parse(savedProjects))
  //     let projects = JSON.parse(savedProjects);
  //   }
  // }, [])



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
