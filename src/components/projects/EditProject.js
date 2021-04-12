// PACKAGE IMPORTS
import React, { useContext } from "react";
import { Grid } from '@material-ui/core';
// FILE IMPORTS
import { useForm, Form } from "./useProjectForm";
import Controls from "../controls/Controls";
import currentDateTime from '../../utils/currentDateTime';
import { devList, pmList } from '../../utils/selectOptions';
import ProjectsContext from '../../context/projects-context';


const EditProject = (props) => {

  const { projectsDispatch } = useContext(ProjectsContext);

  const { initialProjectData } = props


  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('projectName' in fieldValues)
      temp.projectName = fieldValues.projectName ? "" : "This field is required."

    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }


  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  } = useForm(props.projClicked, true, validate);



  const editProject = (e, project, updates) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })

    values.lastModified = currentDateTime();

    projectsDispatch({
      type: 'EDIT_PROJECT',
      id: project.id,
      updates,
    })

    props.setOpenPopup(false);
    props.setOpenEditSnack(true);
  }


  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      editProject(e, props.projClicked, values)
    }
  }

  const resetForm = () => {
    setValues(initialProjectData);
    setErrors({})
  }



  return (
    <Form id="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controls.Input
            name="projectName"
            label="Project Name"
            value={values.projectName}
            onChange={handleInputChange}
            error={errors.projectName}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="projectManager"
            label="Project Manager"
            value={values.projectManager}
            options={pmList}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.DatePicker
            name="startDate"
            label="Start Date"
            value={values.startDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="dev"
            label="Developer"
            value={values.dev}
            options={devList}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.DatePicker
            name="dueDate"
            label="Due Date"
            value={values.dueDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="projectNotes"
            label="Project Notes"
            multiline={true}
            rows={6}
            value={values.projectNotes.trim('')}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Controls.Button
              type="submit"
              text="Update"
              color="primary"
            />
            <Controls.Button
              text="Reset"
              color="default"
              onClick={resetForm} />
        </Grid>
      </Grid>
    </Form>
  )
}

export default EditProject;
