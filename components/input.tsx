export default function Input({value,onChange}:{value:string,onChange:Function})  {
  return (
    <div className="flex w-full items-center justify-center margin-[0 auto]">
      <input
        type="text"
        name="doitText"
        id="doitText"
        placeholder="할 일을 입력해주세요"
        className={"bg-[--state100] p-0 m-0 w-full outline-0"}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
};
