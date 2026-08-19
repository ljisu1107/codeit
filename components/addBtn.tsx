import Image from "next/image";

interface fnProps {
  fn?: Function | null;
  disabled: boolean;
}

export default function AddBtn({fn,disabled}:fnProps){

  return (
    <div className="flex w-auto items-center justify-center margin-[0 auto] ml-4 ">
      <div
        className="flex w-full max-w-3xl flex-col items-center justify-between sm:items-start margin-[0 auto] py-4 ">
        <button className={"btn shadow bg-(--state-200) flex flex-row break-keep w-max cursor-pointer"} onClick={() => fn && fn()} disabled={disabled}>
          <Image
            className="h-max[40px] w-max-[40px] mr-0 sm:mr-2"
            src="/plus.svg"
            alt="plus"
            width={20}
            height={20}
            priority
          />
          <span className={"hidden sm:hidden md:inline lg:inline"}>추가하기</span>
        </button>
      </div>
    </div>
  );
};
