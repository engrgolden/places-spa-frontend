export interface Validator {
  type: string;
  customiser?: number;
}

export interface FieldData {
  value: string | File | null;
  isValid: boolean;
  isClicked: boolean;
  validators: Validator[];
  errorMessages: string[];
  fieldType: "input" | "textarea";
  inputType?: string;
}

export interface FormDatas {
  [key: string]: FieldData | boolean;
  isValid: boolean;
}

export interface FormProps {
  initialForm: FormDatas;
  submitAction: (formData: Record<string, string | File>) => void;
  submitText: string;
}

export interface InputProps {
  field: string;
  fieldState: FieldData;
  handleInputChange: (
    field: string,
    value: string | File,
    isClicked?: boolean
  ) => void;
  handleBlur: (field: string) => void;
}
