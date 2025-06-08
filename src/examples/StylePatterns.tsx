import { colors, spacing } from "../styles/tokens";
import { layouts, typography, cards } from "../styles/common";
import CustomInput from "../components/common/CustomInput";

const StylePatterns = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className={typography.h1}>Tailwind 스타일 패턴 예시</h1>

      {/* 1. Design Tokens 사용 */}
      <section>
        <h2 className={typography.h2}>1. Design Tokens 패턴</h2>
        <div className={`${layouts.flexBetween} ${spacing.md}`}>
          <div className={`${colors.primary[500]} p-4 rounded`}>
            Primary 500
          </div>
          <div className={`${colors.gray[400]} p-4 rounded`}>Gray 400</div>
          <div className={`${colors.success} p-4 rounded`}>Success</div>
        </div>
      </section>

      {/* 2. Common Styles 사용 */}
      <section>
        <h2 className={typography.h2}>2. Common Styles 패턴</h2>
        <div className={layouts.gridCols3}>
          <div className={cards.base}>
            <div className="p-4">
              <h3 className={typography.h3}>기본 카드</h3>
              <p className={typography.body}>기본 카드 스타일</p>
            </div>
          </div>
          <div className={cards.hover}>
            <div className="p-4">
              <h3 className={typography.h3}>호버 카드</h3>
              <p className={typography.body}>호버 효과가 있는 카드</p>
            </div>
          </div>
          <div className={cards.elevated}>
            <div className="p-4">
              <h3 className={typography.h3}>Elevated 카드</h3>
              <p className={typography.body}>그림자가 강한 카드</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Component Variants 사용 */}
      <section>
        <h2 className={typography.h2}>3. Component Variants 패턴</h2>
        <div className="space-y-4">
          {/* 기본 */}
          <CustomInput
            label="기본 인풋"
            placeholder="variant: default, size: md"
          />

          {/* 작은 크기 */}
          <CustomInput label="작은 인풋" placeholder="size: sm" size="sm" />

          {/* 큰 크기 */}
          <CustomInput label="큰 인풋" placeholder="size: lg" size="lg" />

          {/* 에러 상태 */}
          <CustomInput
            label="에러 인풋"
            placeholder="자동으로 error variant 적용"
            errorMessage="필수 입력 항목입니다"
            isRequired
          />

          {/* 성공 상태 */}
          <CustomInput
            label="성공 인풋"
            placeholder="variant: success"
            variant="success"
          />

          {/* 커스텀 클래스 추가 */}
          <CustomInput
            label="커스텀 스타일"
            placeholder="추가 className으로 커스터마이징"
            className="bg-yellow-50 font-bold"
          />
        </div>
      </section>

      {/* 4. 레이아웃 패턴들 */}
      <section>
        <h2 className={typography.h2}>4. Layout 패턴들</h2>

        <div className="space-y-4">
          <div className={`${layouts.flexBetween} bg-gray-100 p-4 rounded`}>
            <span>Left</span>
            <span>Right</span>
          </div>

          <div className={`${layouts.flexCenter} bg-blue-100 p-8 rounded`}>
            <span>Centered Content</span>
          </div>

          <div className={`${layouts.flexColCenter} bg-green-100 p-8 rounded`}>
            <span>Vertical</span>
            <span>Centered</span>
          </div>
        </div>
      </section>

      {/* 5. 함수형 스타일 조합 */}
      <section>
        <h2 className={typography.h2}>5. 함수형 조합 예시</h2>
        <div className="space-y-2">
          <p className={typography.body}>
            이런 식으로 <span className={typography.link}>링크 스타일</span>도
            쉽게 적용
          </p>
          <p className={typography.small}>작은 텍스트 스타일</p>
          <p className={typography.caption}>캡션 스타일</p>
        </div>
      </section>
    </div>
  );
};

export default StylePatterns;
