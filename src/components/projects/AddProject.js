// PACKAGE IMPORTS
import React, { useContext, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Controls from "../controls/Controls";
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { v4 as uuidv4 } from 'uuid';
// FILE IMPORTS
import SearchItem from '../SearchItem';
import Popup from "../Popup";
import ProjectsContext from '../../context/projects-context';
import ProjectForm from './ProjectForm';

const AddProject = (props) => {
  const { projectsDispatch } = useContext(ProjectsContext);
  const { initialProjectData } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const addProject = (project) => {
    projectsDispatch({ type: 'ADD_PROJECT', project });
    project.id = uuidv4();
    setOpenPopup(false);
    setOpenSnack(true);
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };


  return (
    <div>
      <Toolbar className="table-header">
        <SearchItem />
        <Tooltip title="Add new project" arrow>
          <Controls.Button
            text="Add Project"
            color="primary"
            size="large"
            className="add-btn"
            startIcon={<AddCircleOutlineIcon/>}
            onClick={() => { setOpenPopup(true); }}
          />
        </Tooltip>
      </Toolbar>

      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleSnackClose}>
        <Alert open={openSnack} onClose={handleSnackClose} severity="success">
          Project Successfully Added!
        </Alert>
      </Snackbar>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProjectForm
          initialProjectData={initialProjectData}
          addProject={addProject}
        />

      </Popup>
    </div>
  )
}

export default AddProject
