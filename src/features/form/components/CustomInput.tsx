import React from "react";
import { InputProps } from "../form";
import { ImageUpload } from "./ImageUpload";

const CustomInput: React.FC<InputProps> = ({
  field,
  fieldState,
  handleInputChange,
  handleBlur,
}) => {
  const isImage = field === "image";
  const isTextArea = fieldState.fieldType === "textarea";
  return (
    <div className="mt-4" key={field}>
      <label htmlFor={field} className="font-black text-lg capitalize">
        {field}:
      </label>
      {isTextArea ? (
        <textarea
          id={field}
          name={field}
          value={typeof fieldState.value === "string" ? fieldState.value : ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          className="w-full p-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-700 resize-none"
        />
      ) : isImage ? (
        <ImageUpload
          field={field}
          fieldState={fieldState}
          handleInputChange={handleInputChange}
          handleBlur={handleBlur}
        />
      ) : (
        <input
          id={field}
          name={field}
          type={fieldState.inputType || "text"}
          value={typeof fieldState.value === "string" ? fieldState.value : ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          className="w-full p-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
        />
      )}
      {fieldState.isClicked && !fieldState.isValid && (
        <ul className="text-xs text-red-500">
          {fieldState.errorMessages.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomInput;
