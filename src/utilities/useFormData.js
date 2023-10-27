import { useState } from 'react';

export const useFormData = (validator = null, values = {}) => {
  const [state, setState] = useState(() => ({ values }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
    evt.target.setCustomValidity(error);
    
    const values = {...state.values, [id]: value};
    const errors = {...state.errors, [id]: error};
    const hasError = Object.values(errors).some(x => x !== '');
    setState(hasError ? { values, errors } : { values });
  };

  return [state, change];
};
// state concludes
// values: an object containing the form field values
// errors: an object containing any form field error messages; this key is absent if there are no errors
// Both objects use the IDs of the form fields as keys.

