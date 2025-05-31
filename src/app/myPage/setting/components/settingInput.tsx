"use client";

import { InputField } from "@/components/elements/Input";
import React, { useState } from "react";

type inputProps = {
  placeholder: string;
};

export const SettingInput: React.FC<inputProps> = (props) => {
  const { placeholder } = props;
  const [, setInputValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <InputField
        onChange={handleChange}
        placeholder={placeholder}
        type="textarea"
      />
    </div>
  );
};
