"use client";
import { useState } from "react";
import { InputField } from "../elements/Input";
import { InputArea } from "../elements/InputArea";

export const InputExamples = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputAreaValue, setInputAreaValue] = useState("");
  const [longTextValue, setLongTextValue] = useState("");

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Input Components Examples</h2>

      <div style={{ marginBottom: "32px" }}>
        <h3>Regular Input</h3>
        <InputField
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label="Name"
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>InputArea Component</h3>
        <InputArea
          placeholder="Enter your feedback"
          value={inputAreaValue}
          onChange={(e) => setInputAreaValue(e.target.value)}
          label="Feedback"
          rows={4}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>InputArea with Character Count</h3>
        <InputArea
          placeholder="Enter your comment (max 200 characters)"
          value={longTextValue}
          onChange={(e) => setLongTextValue(e.target.value)}
          label="Comment"
          maxLength={200}
          showCharCount={true}
          rows={5}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>Password Input</h3>
        <InputField
          type="password"
          placeholder="Enter your password"
          isPassword
          label="Password"
          onChange={() => {}}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>Small InputArea</h3>
        <InputArea
          size="sm"
          placeholder="Small textarea"
          label="Small"
          onChange={() => {}}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>Large InputArea</h3>
        <InputArea
          size="lg"
          placeholder="Large textarea"
          label="Large"
          rows={6}
          onChange={() => {}}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>InputArea with Error</h3>
        <InputArea
          placeholder="This field has an error"
          label="Error Example"
          errors="This field is required"
          onChange={() => {}}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>Disabled InputArea</h3>
        <InputArea
          placeholder="This field is disabled"
          label="Disabled"
          disabled={true}
          value="Cannot edit this text"
          onChange={() => {}}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>InputArea Variants</h3>
        <div style={{ marginBottom: "16px" }}>
          <InputArea
            placeholder="Default variant"
            label="Default"
            onChange={() => {}}
          />
        </div>
        <div>
          <InputArea
            placeholder="Filled variant"
            label="Filled"
            variant="filled"
            onChange={() => {}}
          />
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3>InputArea Height Options</h3>
        <div style={{ marginBottom: "16px" }}>
          <InputArea
            placeholder="Fixed height 100px with scroll"
            label="Fixed Height"
            fixedHeight={100}
            onChange={() => {}}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <InputArea
            placeholder="Fixed height 200px with scroll"
            label="Fixed Height (Large)"
            fixedHeight={200}
            onChange={() => {}}
          />
        </div>
        <div>
          <InputArea
            placeholder="Full screen height"
            label="Full Height"
            fullHeight={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
