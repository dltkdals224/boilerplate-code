import { InputHTMLAttributes } from "react";
import { cn } from "../../utilities/tailwindMerge";

const inputStyles = {
  base: "flex w-full rounded-md border bg-transparent transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    default: "border-gray-400 focus-visible:ring-blue-500",
    error: "border-red-500 focus-visible:ring-red-500",
    success: "border-green-500 focus-visible:ring-green-500",
  },
  sizes: {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3",
    lg: "h-12 px-4 text-lg",
  },
};

const formStyles = {
  label: "block text-sm font-medium text-gray-700 text-left",
  errorMessage: "text-red-500 text-sm text-left",
};

interface CustomInputProps {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  variant?: keyof typeof inputStyles.variants;
  size?: keyof typeof inputStyles.sizes;
}

const CustomInput = (
  props: InputHTMLAttributes<HTMLInputElement> & CustomInputProps
) => {
  const {
    className,
    label,
    errorMessage,
    isRequired,
    variant = "default",
    size = "md",
    ...inputProps
  } = props;

  // error가 있으면 variant를 error로 자동 설정
  const inputVariant = errorMessage ? "error" : variant;

  return (
    <div className="flex flex-col gap-0.5 w-full">
      {label && (
        <label className={formStyles.label}>
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={cn(
          inputStyles.base,
          inputStyles.variants[inputVariant],
          inputStyles.sizes[size],
          className
        )}
        {...inputProps}
      />
      <p className={`${formStyles.errorMessage} h-5`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
};

export default CustomInput;
