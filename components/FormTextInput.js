import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'native-base';
import PropTypes from 'prop-types';


const FormTextInput = (props) => {
  const {style, ...otherProps} = props;
  return (
    <Input
      style={[styles.textInput, style]}
      {...otherProps}
    />

  );
};


const styles = StyleSheet.create({
  textInput: {}
});

FormTextInput.propTypes = {
  style: PropTypes.object
};

export default FormTextInput;
