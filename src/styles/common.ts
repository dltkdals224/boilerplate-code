// 자주 사용되는 레이아웃 패턴들
export const layouts = {
  // Flex 레이아웃들
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexStart: "flex items-center justify-start",
  flexEnd: "flex items-center justify-end",
  flexCol: "flex flex-col",
  flexColCenter: "flex flex-col items-center justify-center",

  // Grid 레이아웃들
  gridCols2: "grid grid-cols-2 gap-4",
  gridCols3: "grid grid-cols-3 gap-4",
  gridCols4: "grid grid-cols-4 gap-4",
  gridResponsive: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",

  // 컨테이너
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-16 px-4",
} as const;

// 텍스트 스타일들
export const typography = {
  h1: "text-4xl font-bold text-gray-900",
  h2: "text-3xl font-semibold text-gray-900",
  h3: "text-2xl font-semibold text-gray-900",
  h4: "text-xl font-medium text-gray-900",
  body: "text-base text-gray-700",
  small: "text-sm text-gray-600",
  caption: "text-xs text-gray-500",
  link: "text-blue-500 hover:text-blue-700 underline",
} as const;

// 카드/박스 스타일들
export const cards = {
  base: "bg-white rounded-lg shadow border border-gray-200",
  hover:
    "bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow",
  elevated: "bg-white rounded-lg shadow-lg",
  flat: "bg-gray-50 rounded-lg border border-gray-200",
} as const;

// Form 관련 스타일들
export const forms = {
  label: "block text-sm font-medium text-gray-700 mb-1",
  input:
    "w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  inputError:
    "w-full px-3 py-2 border border-red-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500",
  errorMessage: "text-red-500 text-sm mt-1",
  helperText: "text-gray-500 text-sm mt-1",
} as const;

// 상태별 색상들
export const states = {
  success: "text-green-600 bg-green-50 border-green-200",
  error: "text-red-600 bg-red-50 border-red-200",
  warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
} as const;

// 애니메이션들
export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  bounce: "animate-bounce",
  spin: "animate-spin",
  pulse: "animate-pulse",
  transition: "transition-all duration-200 ease-in-out",
  hoverScale: "transform hover:scale-105 transition-transform duration-200",
} as const;
