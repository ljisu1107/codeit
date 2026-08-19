interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // 추가
}

export default function Input({ value, onChange, onKeyDown }: InputProps)  {
  return (
    <div className="flex w-full items-center justify-center margin-[0 auto]">
      <input
        type="text"
        name="doitText"
        id="doitText"
        placeholder="할 일을 입력해주세요"
        className={"bg-[var(--state-100)] p-0 m-0 w-full outline-0 shadow"}
        onChange={onChange}
        onKeyDown={onKeyDown} // 실제 input에 연결
        value={value}
      />
    </div>
  );
};
