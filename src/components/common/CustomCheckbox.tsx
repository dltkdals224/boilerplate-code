import { InputHTMLAttributes } from "react";
import { cn } from "../../utilities/tailwindMerge";

interface CustomCheckboxProps {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
}

const formStyles = {
  label: "block text-sm font-medium text-gray-700 text-left",
  errorMessage: "text-red-500 text-sm text-left",
};

const CustomCheckbox = (
  props: InputHTMLAttributes<HTMLInputElement> & CustomCheckboxProps
) => {
  const { label, errorMessage, isRequired, ...inputProps } = props;

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div
        className={cn(
          "flex items-center gap-2 p-2 border rounded-md",
          errorMessage ? "border-red-500" : "border-transparent"
        )}
      >
        <input
          type="checkbox"
          className={cn(
            "w-4 h-4 rounded border-gray-400 text-blue-600 focus:ring-blue-500",
            errorMessage && "border-red-500"
          )}
          {...inputProps}
        />
        {label && (
          <label className={formStyles.label}>
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>
      <p className={`${formStyles.errorMessage} h-5`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
};

export default CustomCheckbox;
