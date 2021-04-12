// PACKAGE IMPORTS
import React, { useState, useContext, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
// FILE IMPORTS
import Popup from "../Popup";
import useTable from "../useTable";
import FiltersContext from '../../context/filters-context';
import ProjectsContext from '../../context/projects-context';
import visibleProjects from '../../utils/visibleProjects';
import EditProject from './EditProject'
import { dateTimeOptions } from '../../utils/currentDateTime';

const headCells = [
  { id: 'projectName', label: 'Project Name' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'projectManager', label:'PM' },
  { id: 'dev', label:'Dev' },
  { id: 'lastModified', label: 'Last Modified' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

const ProjectsList = (props) => {
  const { projects, projectsDispatch } = useContext(ProjectsContext);
  const { initialProjectData } = props;
  const { filters } = useContext(FiltersContext);
  const [projClicked, setProjClicked] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [openEditSnack, setOpenEditSnack] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const filteredProjects = visibleProjects(projects, filters);
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(projects, headCells);

  const handleClickDelete = () => {
    projectsDispatch({ type: "REMOVE_PROJECT", id: projClicked })
    setOpenSnack(true);
    setOpenDialog(false);
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleEditSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEditSnack(false);
  };

  const handleDeleteProject = (projectID) => {
    setOpenDialog(true);
    setProjClicked(projectID);
  }


  // save data to localStorage
  useEffect(() => {
    localStorage.setItem('project-list', JSON.stringify(projects));
  }, [projects]);

  // get project data from local storage
  useEffect(() => {
    let savedProjects = localStorage.getItem('project-list');
    if (savedProjects) {
      //setProjects(JSON.parse(savedProjects))
      //projectsDispatch({ type: 'ADD_PROJECT'});
    }
  }, [])


  return (
    <div className="table">
      <TblContainer>
        <TblHead className="table-head" />
        <TableBody>
          {recordsAfterPagingAndSorting(filteredProjects).map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.projectName}</TableCell>
              <TableCell>{item.dueDate.toLocaleString('en-US', dateTimeOptions)}</TableCell>
              <TableCell>{item.projectManager}</TableCell>
              <TableCell>{item.dev}</TableCell>
              <TableCell>{item.lastModified}</TableCell>
              <TableCell>

                  <Button
                    className="action-btn"
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => { setOpenPopup(true); setProjClicked(item) }}
                  >
                    <EditIcon />
                  </Button>


                  <Button
                    className={"button"}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => handleDeleteProject(item.id)}
                  >
                    <DeleteIcon />
                  </Button>
            
              </TableCell>
            </TableRow>
          )
          )
          }
        </TableBody>
      </TblContainer>
      <TblPagination />

      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleSnackClose}>
        <Alert open={openSnack} onClose={handleSnackClose} severity="success">
          Project Successfully Deleted!
        </Alert>
      </Snackbar>
      <Snackbar open={openEditSnack} autoHideDuration={3000} onClose={handleEditSnackClose}>
        <Alert open={openEditSnack} onClose={handleEditSnackClose} severity="success">
          Project Successfully Edited!
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleClickDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditProject
          initialProjectData={initialProjectData}
          projClicked={projClicked}
          setOpenPopup={setOpenPopup}
          setOpenEditSnack={setOpenEditSnack}/>
      </Popup>
    </div>
  )
}

export default ProjectsList
