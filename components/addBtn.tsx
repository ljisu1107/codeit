interface fnProps {
  fn?: Function | null;
  disabled: boolean;
}

export default function AddBtn({fn,disabled}:fnProps){

  return (
    <div className="flex w-full items-center justify-center margin-[0 auto]">
      <div
        className="flex w-full max-w-3xl flex-col items-center justify-between sm:items-start margin-[0 auto] py-4 ">
        <button className={"btn "} onClick={()=>fn()}>
          추가하기
        </button>
      </div>
    </div>
  );
};
