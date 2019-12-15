import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from "../reducers/filterReducer";

const Filter = ({filterValue, setFilterValue}) => {
  const handleChange = event => {
    setFilterValue(event.target.value);
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filterValue} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filterValue: state.filter.filterValue
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterValue: (filter) => {dispatch(setFilter(filter))} 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);