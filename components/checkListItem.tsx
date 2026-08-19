import Link from "next/link";
import Image from "next/image";

interface checkListItemProps {
  id:number;
  name:string;
  isChecked:boolean;
}

export default function CheckListItem({id,name,isChecked}: checkListItemProps) {
  return(
    <div className={`${isChecked ? "checked" : "none-checked"} mb-2 w-full text-left flex flex-row`}>
      <button className={"border-2 w-6 rounded-[30px] block mr-4 bg-[#FEFCE8]"}>
        {/*{*/}
        {/*  isChecked?*/}

        {/*<Image*/}
        {/*  className="h-max[16px] w-max-[16px]"*/}
        {/*  src="/done_large.svg"*/}
        {/*  alt="done"*/}
        {/*  width={16}*/}
        {/*  height={16}*/}
        {/*  priority*/}
        {/*/>*/}
        {/*}*/}
      </button>
      <Link href={"/items/"+id}>{name}</Link>
    </div>
  )
}