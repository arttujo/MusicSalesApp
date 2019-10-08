import { useState, useContext } from 'react';
import mediaAPI from './ApiHooks';
import { AsyncStorage, Alert } from 'react-native';
const useSingleHooks = props => {
  const [inputs, setInputs] = useState({});

  const handleCommentChange = text => {
    setInputs(inputs => ({
      ...inputs,
      comment: text
    }));
  };

  const clearForm = () => {
    setInputs('');
    console.log('inputs Cleared!');
  };

  const handleComment = async fileId => {
    const { addComment, getComments } = mediaAPI();

    addComment(fileId, inputs.comment).then(json => {
      clearForm();

      alert(json.message);
    });
  };

  return {
    inputs,
    clearForm,
    handleComment,
    handleCommentChange
  };
};

export default useSingleHooks;
