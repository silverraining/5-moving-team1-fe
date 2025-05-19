import Image from "next/image";

interface CheckBoxProps {
  selected: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

export const CheckBoxField = ({
  selected,
  onChange,
  size = "md",
}: CheckBoxProps) => {
  const options = [
    "소형이사 (원룸, 투룸, 20평대 미만)",
    "가정이사 (쓰리룸, 20평대 이상)",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: size === "md" ? "560px" : "280px",
              height: size === "md" ? "84px" : "52px",
              padding: "10px 16px",
              border: "1px solid",
              borderRadius: "16px",
              borderColor: isSelected ? "#1B92FF" : "#E6E6E6",
              backgroundColor: isSelected ? "#F5FAFF" : "transparent",
              color: "#000",
              cursor: "pointer",
              fontSize: size === "md" ? "18px" : "14px",
              lineHeight: size === "md" ? "26px" : "24px",
            }}
          >
            <Image
              src={
                isSelected
                  ? "/Images/check-box/Property 1=active, Property 2=md, sort=round.svg"
                  : "/Images/check-box/Property 1=default, Property 2=md, sort=round.svg"
              }
              alt="선택 상태"
              width={size === "md" ? 36 : 24}
              height={size === "md" ? 36 : 24}
            />
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
};
