import React, { useState, FormEvent } from "react";
import { FormProps, FormDatas, FieldData } from "../form";
import validate from "../formUtils";
import Button from "../../../shared/components/UIElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import CustomInput from "./CustomInput";

const Form: React.FC<FormProps> = ({
  initialForm,
  submitAction,
  submitText,
}) => {
  const [formState, setFormState] = useState<FormDatas>(initialForm);

  const handleInputChange = (
    field: string,
    value: string | File,
    isClicked: boolean = true
  ) => {
    const validators = (formState[field] as FieldData).validators || [];
    const { isValid, errorMessages } = validate(value, validators);

    setFormState((prevState) => {
      const updatedField: FieldData = {
        ...(prevState[field] as FieldData),
        value,
        isValid,
        isClicked,
        errorMessages,
      };

      const isFormValid = Object.keys(prevState).reduce(
        (isValidAccumulator, key) => {
          if (key === "isValid") return isValidAccumulator;
          const fieldvalidity =
            key === field ? isValid : (prevState[key] as FieldData).isValid;
          return isValidAccumulator && fieldvalidity;
        },
        true
      );
      return {
        ...prevState,
        [field]: updatedField,
        isValid: isFormValid,
      };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = Object.keys(formState).reduce((data, key) => {
      if (key !== "isValid") {
        const value = (formState[key] as FieldData).value;
        data[key] = value ?? "";
      }
      return data;
    }, {} as Record<string, string | File>);
    submitAction(formData);
  };

  const handleBlur = (field: string) => {
    const fieldState = formState[field] as FieldData;
    handleInputChange(field, fieldState.value ?? "");
  };

  return (
    <form onSubmit={handleSubmit} className="w-11/12 m-auto my-8">
      <Card classNames="p-4 ">
        {Object.keys(formState).map((field) => {
          if (field === "isValid") return null;

          const fieldState = formState[field] as FieldData;

          return (
            <CustomInput
              key={field}
              field={field}
              fieldState={fieldState}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
            />
          );
        })}
        <Button
          type="submit"
          disabled={!formState.isValid}
          customStyle="w-fit font-bold mt-8 mx-2 text-white disabled:bg-gray-500 disabled:text-gray-600 uppercase"
          text={submitText}
        />
      </Card>
    </form>
  );
};

export default Form;
