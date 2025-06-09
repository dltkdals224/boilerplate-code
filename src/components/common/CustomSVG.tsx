import React, { useState, useEffect } from "react";

// SVG 파일명 타입 정의
type SVGName = "image" | "vite";

// SVG 사이즈 프리셋
type SVGSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

// 사이즈 매핑
const SIZE_MAP: Record<Exclude<SVGSize, number>, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

interface CustomSVGProps {
  name: SVGName;
  size?: SVGSize;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const CustomSVG: React.FC<CustomSVGProps> = ({
  name,
  size = "md",
  color = "currentColor",
  className = "",
  onClick,
}) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const sizeValue = typeof size === "number" ? size : SIZE_MAP[size];

  useEffect(() => {
    const loadSVG = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`/assets/${name}.svg`);

        if (!response.ok) {
          throw new Error(`SVG 파일을 찾을 수 없습니다: ${name}.svg`);
        }

        let svgText = await response.text();

        svgText = svgText
          .replace(/fill="[^"]*"/g, `fill="${color}"`)
          .replace(/stroke="[^"]*"/g, `stroke="${color}"`);

        setSvgContent(svgText);
      } catch (err) {
        setError(err instanceof Error ? err.message : "SVG 로드 실패");
        console.error("SVG 로드 에러:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSVG();
  }, [name, color]);

  if (isLoading) {
    return (
      <div
        className={`inline-block animate-pulse bg-gray-200 rounded ${className}`}
        style={{ width: sizeValue, height: sizeValue }}
      />
    );
  }

  if (error) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded ${className}`}
        style={{ width: sizeValue, height: sizeValue }}
        title={error}
      >
        ?
      </div>
    );
  }

  return (
    <div
      className={`inline-block ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ width: sizeValue, height: sizeValue }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default CustomSVG;
