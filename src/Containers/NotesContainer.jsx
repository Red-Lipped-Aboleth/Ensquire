import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actions from '../actions/actions';

const NotesContainer = (props) => {
  const getNotes = useSelector((state) => state.characterSheet.additionalNotes);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('id');
    const propertyObject = {};
    propertyObject[propertyName] = event.target.value;
    console.log('value', event.target.value);
    dispatch(actions.updateNotes(propertyObject));
  };

  return (
    <section className="Notes" id="Notes">
      <textarea
        id="notes"
        defaultValue={getNotes}
        onChange={handleChange}
        rows="10"
      />
    </section>
  );
};

export default NotesContainer;
