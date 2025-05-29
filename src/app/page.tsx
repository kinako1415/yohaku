"use client";
import { Button } from "@/components/elements/Button";
import { InputField } from "@/components/elements/Input";
import Image from "next/image";

export default function Home() {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <p>ホーム画面です</p>
      <Button>sdfadssf</Button>
      <Button variant="outline">sdfadssf</Button>
      <Button disabled>sdfadssf</Button>
      <InputField
        placeholder="input"
        onChange={handleInputChange}
        label="input"
      ></InputField>
      <InputField
        errors="This field is required"
        placeholder="input"
        onChange={handleInputChange}
        label="input"
      ></InputField>
      <InputField
        variant="filled"
        placeholder="input"
        onChange={handleInputChange}
        label="input"
      ></InputField>
    </div>
  );
}
