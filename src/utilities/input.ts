/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormSetValue } from "react-hook-form";

// 한글 전용 입력 핸들러 생성 함수
export const formatKoreanHandler =
  (fieldName: string, setValue: UseFormSetValue<any>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;

    const koreanOnlyValue = currentValue.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
    const notKorean = currentValue !== koreanOnlyValue;

    if (notKorean) {
      setTimeout(() => {
        setValue(fieldName, koreanOnlyValue);
      }, 200);
    } else {
      setValue(fieldName, koreanOnlyValue);
    }
  };

// 전화번호 형식 변환 함수
export const formatPhoneNumberHandler = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, "");
  const limitedNumbers = numbers.slice(0, 11);

  if (limitedNumbers.length <= 3) return limitedNumbers;
  if (limitedNumbers.length <= 7)
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(
    3,
    7
  )}-${limitedNumbers.slice(7)}`;
};
