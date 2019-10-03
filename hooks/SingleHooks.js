import { useState, useContext } from "react";
import mediaAPI from "./ApiHooks";

const useSingleHooks = props => {
  const [inputs, setInputs] = useState({});

  const handleCommentChange = text => {
    setInputs(inputs => ({
      ...inputs,
      comment: text
    }));
  };

  const clearForm = () => {
    setInputs(null);
    console.log("inputs Cleared!");
  };

  const handleComment = async (fileId) => {
    const { addComment } = mediaAPI();

    addComment(fileId, inputs.comment);
  };



  return {
    inputs,
    clearForm,
    handleComment,
    handleCommentChange
  };
};

export default useSingleHooks;
