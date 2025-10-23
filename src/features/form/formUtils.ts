const validator = (value: string | File, type: string, customiser = 0) => {
  let validity = { isValid: false, errorText: "" };
  switch (type) {
    case "REQUIRED":
      validity = {
        isValid:
          typeof value === "string" && value.trim().length > 0 ? true : false,
        errorText: "must have a value",
      };
      break;
    case "REQUIREDFILE":
      validity = {
        isValid: value === "" ? false : true,
        errorText: "must choose a file",
      };
      break;
    case "MAXSIZEFILE":
      validity = {
        isValid: typeof value !== "string" && value.size < customiser,
        errorText: "file size must be less than 500kb",
      };
      break;
    case "MINCHARS":
      validity = {
        isValid: typeof value === "string" && value.trim().length >= customiser,
        errorText: `must contain at least ${customiser} characters`,
      };
      break;
    case "MAXCHARS":
      validity = {
        isValid: typeof value === "string" && value.trim().length <= customiser,
        errorText: `must contain at most ${customiser} characters`,
      };
      break;
    case "MINVALUE":
      validity = {
        isValid: Number(value) >= customiser,
        errorText: `must be greater than ${customiser}`,
      };
      break;
    case "MAXVALUE":
      validity = {
        isValid: Number(value) <= customiser,
        errorText: `must be less than ${customiser}`,
      };
      break;
    case "EMAIL":
      validity = {
        isValid:
          typeof value === "string" &&
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        errorText: "must be a valid email address",
      };
      break;
    case "NONE":
      validity = {
        isValid: true,
        errorText: "",
      };
      break;

    default:
      validity = { isValid: false, errorText: "" };
      break;
  }
  return validity;
};

const validate = (
  value: string | File,
  validators: { type: string; customiser?: number }[]
) => {
  const failedValidators = validators
    .map((validatorData) =>
      validator(
        value,
        validatorData.type,
        validatorData.customiser && validatorData.customiser
      )
    )
    .filter((validatorResult) => !validatorResult.isValid);

  const isValid = failedValidators.length ? false : true;
  const errorMessages = failedValidators.length
    ? failedValidators.map((failedValidator) => failedValidator.errorText)
    : [];

  return { isValid, errorMessages };
};

export default validate;
