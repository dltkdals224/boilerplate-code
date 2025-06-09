import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthApi } from "../apis";

import {
  formatKoreanHandler,
  formatPhoneNumberHandler,
} from "../utilities/input";

import CustomInput from "../components/common/CustomInput";
import CustomFile from "../components/common/CustomFile";

export default function SignUp() {
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const FORM_SCHEME = z
    .object({
      name: z
        .string()
        .min(2, "이름을 입력해주세요")
        .regex(/^[가-힣\s]*$/, {
          message: "완전한 문자를 입력해주세요",
        }),
      nickname: z
        .string()
        .min(2, "별명을 입력해주세요")
        .regex(/^[가-힣a-zA-Z0-9]+$/, {
          message: "완전한 한글 혹은 영문만을 입력해주세요",
        }),
      profileImage: z
        .instanceof(File, {
          message: "프로필 사진을 선택해주세요",
        })
        .refine(
          (file) => file.type === "image/png" || file.type === "image/jpeg",
          {
            message: "jpg, png 파일만 업로드 가능합니다.",
          }
        )
        .refine((file) => file.size <= 1024 * 1024 * 5, {
          message: "5MB 이하의 파일만 업로드 가능합니다.",
        }),
      email: z
        .string()
        .min(1, "이메일을 입력해주세요")
        .email("올바른 이메일을 입력해주세요"),
      phone: z
        .string()
        .min(13, "전화번호를 입력해주세요")
        .regex(/^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/, {
          message: "올바른 전화번호를 입력해주세요",
        }),
      password: z
        .string()
        .min(8, "8자 이상의 비밀번호를 입력해주세요")
        .max(16, "16자 이하의 비밀번호를 입력해주세요")
        .regex(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
          {
            message: "영문, 숫자, 특수문자를 포함하여 8-16자로 입력해주세요",
          }
        ),
      passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    })
    .superRefine((data, ctx) => {
      // password와 passwordConfirm이 일치성 판단
      if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호가 일치하지 않습니다",
          path: ["passwordConfirm"],
        });
      }

      // nickname 중복확인 체크
      if (!isNicknameVerified) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "중복 확인을 해주세요",
          path: ["nickname"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof FORM_SCHEME>>({
    resolver: zodResolver(FORM_SCHEME),
    mode: "onChange",
    criteriaMode: "firstError",
  });

  // ! mock api
  const handleVerifyNickname = async (nickname: string) => {
    const response = await AuthApi.verifyNickname(nickname);

    if (response.success && /^[가-힣a-zA-Z0-9]+$/.test(nickname)) {
      setIsNicknameVerified(true);
      setError("nickname", {
        message: "",
      });
    } else {
      setIsNicknameVerified(false);
      setError("nickname", {
        message: "사용 불가능한 별명입니다.",
      });
    }
  };

  const onSubmit = (data: z.infer<typeof FORM_SCHEME>) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full bg-gray-100 p-4">
      <form
        className="flex flex-col gap-1 w-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInput
          label="이름"
          placeholder="이름"
          maxLength={10}
          isRequired
          {...register("name", {
            onChange: formatKoreanHandler("name", setValue),
          })}
          errorMessage={errors.name?.message}
        />
        <div className="flex justify-center items-center gap-1">
          <CustomInput
            label="별명"
            placeholder="별명"
            maxLength={10}
            isRequired
            {...register("nickname", {
              onChange: () => {
                setIsNicknameVerified(false);
              },
            })}
            disabled={isNicknameVerified}
            errorMessage={errors.nickname?.message}
          />
          {isNicknameVerified ? (
            <button
              className="w-30 h-10 rounded-md px-4 py-2 text-sm whitespace-nowrap cursor-pointer border border-gray-300"
              type="button"
              onClick={() => setIsNicknameVerified(false)}
            >
              초기화
            </button>
          ) : (
            <button
              className="w-30 h-10 bg-blue-500 text-white rounded-md px-4 py-2 text-sm whitespace-nowrap cursor-pointer"
              type="button"
              onClick={() => handleVerifyNickname(getValues("nickname"))}
            >
              중복 확인
            </button>
          )}
        </div>
        <CustomFile
          label="프로필 사진"
          isRequired
          hasPreview
          accept="image/*"
          name="profileImage"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file) {
              setValue("profileImage", file, { shouldValidate: true });
              clearErrors("profileImage");
            } else {
              // 파일 선택 취소 시 폼 값 초기화하고 에러 다시 표시
              setValue("profileImage", null as unknown as File);
              setError("profileImage", {
                message: "프로필 사진을 선택해주세요",
              });
            }
          }}
          errorMessage={errors.profileImage?.message}
        />
        <CustomInput
          label="이메일"
          placeholder="이메일"
          maxLength={20}
          isRequired
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <CustomInput
          label="전화번호"
          placeholder="전화번호"
          maxLength={13}
          isRequired
          {...register("phone", {
            onChange: (e) => {
              e.target.value = formatPhoneNumberHandler(e.target.value);
            },
          })}
          errorMessage={errors.phone?.message}
        />
        <CustomInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          maxLength={20}
          isRequired
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <CustomInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          maxLength={20}
          isRequired
          {...register("passwordConfirm")}
          errorMessage={errors.passwordConfirm?.message}
        />
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
