import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  return [value, setValue, onChange];
};

export default useInput;
