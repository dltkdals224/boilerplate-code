import { InputHTMLAttributes, useRef, useState, useEffect } from "react";
import { cn } from "../../utilities/tailwindMerge";
import CustomSVG from "./CustomSVG";

interface CustomFileProps {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  hasPreview?: boolean;
}

const CustomFile = (
  props: InputHTMLAttributes<HTMLInputElement> & CustomFileProps
) => {
  const {
    className,
    label,
    errorMessage,
    isRequired,
    hasPreview,
    onChange,
    name,
    ...inputProps
  } = props;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file && hasPreview) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }

    if (onChange) onChange(e);
  };

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label className={formStyles.label}>
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      {hasPreview && (
        <div className="w-32 h-32 mb-2 border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-3 p-2 border rounded-md cursor-pointer hover:border-gray-300 transition-colors",
          errorMessage ? "border-red-500" : "border-gray-400",
          className,
          hasPreview && "w-32"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <CustomSVG
          name="image"
          size="md"
          color={errorMessage ? "#ef4444" : "#6b7280"}
          className="flex-shrink-0"
        />

        <span
          className={cn(
            "text-sm flex-1 truncate",
            selectedFile ? "text-blue-600 font-medium" : "text-gray-500"
          )}
        >
          {selectedFile ? selectedFile.name : "선택된 파일 없음"}
        </span>
      </div>

      {/* 실제 file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        name={name}
        onChange={handleFileChange}
        {...inputProps}
      />

      <p className={`${formStyles.errorMessage} h-5`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
};

export default CustomFile;

const formStyles = {
  label: "block text-sm font-medium text-gray-700 text-left",
  errorMessage: "text-red-500 text-sm text-left",
};
