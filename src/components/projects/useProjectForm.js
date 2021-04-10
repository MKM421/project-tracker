import React, { useState } from 'react';

export function useForm(initialProjectData, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialProjectData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange)
      validate({ [name]: value })

  }

  const resetForm = () => {
    setValues(initialProjectData);
    setErrors({})
  }


  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }
}

export function Form(props) {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
