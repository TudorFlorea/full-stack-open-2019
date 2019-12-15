import React from 'react';

import {setFilter} from "../reducers/filterReducer";

const Filter = ({store}) => {
  const handleChange = event => {
    store.dispatch((setFilter(event.target.value)))
  }
  const style = {
    marginBottom: 10
  }

  const filterValue = store.getState().filter.filterValue;

  return (
    <div style={style}>
      filter <input value={filterValue} onChange={handleChange} />
    </div>
  )
}

export default Filter