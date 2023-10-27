//import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from "../../src/utilities/useFormData"
import React from "react";
import {useParams, useNavigate } from 'react-router-dom';




const validateUserData = (key, val) => {
  switch (key) {
    case 'title': 
      return /(^\w\w)/.test(val) ? '' : 'must be least two character';
    case 'meets':
        return  /^[MTWTFSS]+ \d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(val)||val==='' ? '' : 'it should be like MWF 10:00-10:50';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate("/")}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={true} onClick={() => submit()}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

export const UserEditor = () => {
  //const [update, result] = useDbUpdate(`/users/${user.id}`);
  const { course } = useParams();
  const [title, meets] = course.split('&&');

  console.log(course)
  const [state, change] = useFormData(validateUserData, {
    title: title,
    meets: meets
  });
  const submit = (evt) => {
    evt.preventDefault();
    // if (!state.errors) {
    //   update(state.values);
    // }
  };

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="title" state={state} change={change} />
      <InputField name="meets" text="meets" state={state} change={change} />
      <ButtonBar message= "submit"/>
    </form>
  )
};

//export default UserEditor;
//{result?.message}