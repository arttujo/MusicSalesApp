import { useState } from 'react';

const useListHooks = (props) => {
  const [inputs, setInputs] = useState({});
  const handleMenuChange = (text) => {
    setInputs((inputs) => ({
      ...inputs,
      pickedcategory: text,
    }));
  };
  return {
    inputs,
    handleMenuChange,
  };
};
export default useListHooks;
