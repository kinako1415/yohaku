"use client";

import { InputField } from "@/components/elements/Input";
import { InputArea } from "@/components/elements/InputArea";
import React, { useState } from "react";

type inputProps = {
  placeholder: string;
  isArea?: boolean;
};

export const SettingInput: React.FC<inputProps> = (props) => {
  const { placeholder, isArea } = props;
  const [, setInputValue] = useState("");

  const maxLength = 50;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      {isArea ? (
        <InputArea
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          size="sm"
        />
      ) : (
        <InputField
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
