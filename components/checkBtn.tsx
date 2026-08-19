import Image from "next/image";

interface CheckedProps {
  isChecked: boolean;
  setTodoDetails:any;
}


export default function CheckBtn({isChecked,setTodoDetails}:CheckedProps) {
  return (
    <button
      className={`border-2 w-8 h-8 rounded-[30px] flex items-center justify-center mr-4 `}
      onClick={() => setTodoDetails((prev: any)=>{
        return {...prev, isCompleted:!isChecked};
      })}
    >
      {
        isChecked ?
          <>
            <Image
              className="h-max[20px] w-max-[20px]"
              src="/check.svg"
              alt="check"
              width={20}
              height={20}
              priority
            />
          </>
          :
          ""
      }
    </button>
  );
}