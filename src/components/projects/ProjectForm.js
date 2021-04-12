// PACKAGE IMPORTS
import React from 'react';
import { Grid } from '@material-ui/core';
// FILE IMPORTS
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "./useProjectForm";
import { devList, pmList } from '../../utils/selectOptions';

export default function ProjectForm(props) {

  const { addProject, initialProjectData } = props;

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
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialProjectData, true, validate);


  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      addProject(values)
    }
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
              text="Submit"
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
