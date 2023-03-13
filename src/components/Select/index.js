import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const Select = props => {

  const customStyles = {
    option: (styles) => ({
      ...styles,
      padding: 10,
      ':active': {
        ...styles[':active'],
        backgroundColor: '#248eee'
      }
    }),
    control: (styles) => ({
      ...styles,
      minHeight: 'calc(1.5em + 0.75rem + 2px) !important',
      height: 'calc(1.5em + 0.75rem + 2px) !important',
      border: '1px solid #e4e7ea',
      ':hover': {
        borderColor: '#9ed4ee',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 163, 234, 0.6)'
      }
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#5c6873',
      top: '42%'
    }),
    menuList: (styles) => ({
      ...styles,
      overflowWrap: 'break-word',
      backgroundColor: '#fff',
      ':hover': {
        backgroundColor: '#fff'
      }
    }),
    indicatorSeparator: () => ({})
  };


  const [optionSelected, setOptionSelected] = useState(null);

  let options = null;


  if (props.valueField && props.labelField) {
    options = props.listOption.map(data => {
      return { value: data[props.valueField], label: data[props.labelField] };
    });
  } else {
    options = [...props.listOption];
  }

  if (props.isHasNullValue) {
    options.unshift({ value: null, label: '' });
  }

  let defaultValue = null;

  if (props.value) {
    defaultValue = options.filter(option => option.value === props.value)[0];
  } else {
    defaultValue = props.value !== null ? optionSelected : options[0];
  }


  const onChange = (event) => {
    setOptionSelected({ ...event });
    props.onChange(event);
  };


  return <ReactSelect value={ defaultValue }
                      onChange={ onChange }
                      isSearchable={ false }
                      options={ options }
                      styles={ customStyles }
                      className="select"
                      placeholder={ '' }/>;
};

Select.propTypes = {
  valueField: PropTypes.string,
  labelField: PropTypes.string,
  value: PropTypes.any,
  listOption: PropTypes.array,
  isHasNullValue: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
};

Select.defaultProps = {
  isHasNullValue: false
};

export default Select;
