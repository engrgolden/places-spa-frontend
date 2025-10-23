import Button from "../../../shared/components/UIElements/Button";
import { useRef } from "react";
import { InputProps } from "../form";
import { useState } from "react";

export const ImageUpload: React.FC<InputProps> = ({
  field,
  handleInputChange,
  handleBlur,
}) => {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const pickedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const pickedFile = e.target.files[0];
      handleInputChange(field, pickedFile);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPreviewUrl(fileReader.result);
        } else {
          setPreviewUrl("");
        }
      };
      fileReader.readAsDataURL(pickedFile);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  return (
    <div className="mt-4 mx-auto" key={field}>
      <div>
        <label htmlFor=""></label>
        <input
          className="hidden"
          id={field}
          name={field}
          value=""
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 border my-4">
          {previewUrl && (
            <img
              className="w-full h-full object-cover"
              src={previewUrl}
              alt="Preview"
            />
          )}
        </div>
        <Button
          text={previewUrl ? "CHANGE IMAGE" : "PICK IMAGE"}
          type="button"
          onClick={pickImageHandler}
          customStyle="text-white"
          onBlur={() => handleBlur(field)}
        />
      </div>
    </div>
  );
};
