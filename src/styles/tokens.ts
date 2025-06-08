// 색상 토큰
export const colors = {
  primary: {
    50: "bg-blue-50 text-blue-50 border-blue-50",
    100: "bg-blue-100 text-blue-100 border-blue-100",
    500: "bg-blue-500 text-blue-500 border-blue-500",
    600: "bg-blue-600 text-blue-600 border-blue-600",
    700: "bg-blue-700 text-blue-700 border-blue-700",
  },
  gray: {
    50: "bg-gray-50 text-gray-50 border-gray-50",
    100: "bg-gray-100 text-gray-100 border-gray-100",
    400: "bg-gray-400 text-gray-400 border-gray-400",
    500: "bg-gray-500 text-gray-500 border-gray-500",
    800: "bg-gray-800 text-gray-800 border-gray-800",
  },
  success: "bg-green-500 text-green-500 border-green-500",
  error: "bg-red-500 text-red-500 border-red-500",
  warning: "bg-yellow-500 text-yellow-500 border-yellow-500",
} as const;

// 간격 토큰
export const spacing = {
  xs: "gap-1 p-1 m-1",
  sm: "gap-2 p-2 m-2",
  md: "gap-4 p-4 m-4",
  lg: "gap-6 p-6 m-6",
  xl: "gap-8 p-8 m-8",
} as const;

// 크기 토큰
export const sizes = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
} as const;

// 테두리 토큰
export const borders = {
  none: "border-0",
  sm: "border border-gray-200 rounded",
  md: "border border-gray-400 rounded-md",
  lg: "border-2 border-gray-500 rounded-lg",
} as const;
