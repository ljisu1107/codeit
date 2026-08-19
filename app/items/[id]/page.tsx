"use client"
import { useRouter } from "next/navigation";
import {apiCall} from "@/script";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Image from "next/image";

interface TodoDetails {
  isCompleted?: boolean,
  imageUrl: string,
  memo: string ,
  name: string,
  tenantId?: string | null | undefined,
  id?: string
}

export default function Page() {
  const router = useRouter(); // 라우터 최상단에 선언

  const params = useParams<{ id: string }>() // 상세 id
  const [loading, setLoading] = useState(true); // 로딩
  const [fixed, setFixed ] = useState(false); // 수정 여부

  const [todoDetails, setTodoDetails] = useState<TodoDetails>({
    isCompleted: false,
    imageUrl: "",
    memo: "" ,
    name: "",
    tenantId: "",
    id: ""
  }); //할일 목록 상세

  // 할일 상세 목록 불러오기
  async function fetchTodoDetails() {
    try {
      const data = await apiCall({
        id: "jisu",
        method: "GET",
        url: 'items/' + params.id,
      });
      console.log(data);
      setLoading(true);
      setTodoDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 할 일 수정하기
  async function handleFixedTodo() {
    if (!todoDetails.name.trim()) return; // 제목 빈 값 방지
    try {
      //서버에서 응답을 요청한 값만 보내기
      const created = await apiCall({
        id: "jisu",
        method: "PATCH",
        url: "items/"+params.id,
        body: {
          name: todoDetails.name,
          memo: todoDetails.memo,
          imageUrl: todoDetails.imageUrl || "",
          isCompleted: todoDetails.isCompleted,
        },
      });

      setTodoDetails((prev) => {
        return {...prev,...created}
      });

      router.replace("/");

    } catch (err) {
      console.error("할 일 수정하기 실패:", err);
      alert("할 일 수정에 실패했어요. 다시 시도해주세요.");
    } finally {
      setFixed(false);
    }
  }

  //반영
  useEffect(() => {
    fetchTodoDetails();
  }, []);


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      <main className="flex flex-col flex-1 w-full max-w-7xl items-start py-6 px-14 bg-white">

        <button className="w-full flex text-center items-center justify-center mb-8 h-14 none-checked">
          <span className={"border-2 w-8 h-8 rounded-[30px] block mr-4 bg-[#FEFCE8]"}></span>
          <input
            type="text"
            value={todoDetails.name}
            className={"h-full outline-0"}
            onChange={(e) =>
              setTodoDetails((prev:TodoDetails)=> {
                return {...prev, name: e.target.value}
              })
            }
          />
        </button>

        <div className="flex flex-col w-full items-start justify-between md:flex-row sm:items-start">
          <div className="flex flex-col w-full text-center justify-center items-center sm:w-full md:w-full lg:w-2/7 border-dashed border-4 border-(--state-200) bg-[#F8FAFC] h-75 rounded-4xl">
            <Image
              className="h-max[40px] w-max-[40px]"
              src="/img.svg"
              alt="img"
              width={40}
              height={40}
              priority
            />

          </div>
          <div className="flex flex-col w-full items-start text-center sm:w-full md:w-full lg:w-5/7 p-0 md:pl-6">
            <textarea
              name="memo"
              id="memo"
              className={"w-full outline-none bg-[url(/memo.svg)] h-75 resize-none"}
              value={todoDetails.memo === null ? "" : todoDetails.memo}
              onChange={(e) => {
                setTodoDetails((prev:TodoDetails)=> {
                  return {...prev,memo:e.target.value}
                });
                return e;
              }}
            />
          </div>
        </div>

        <div className="flex flex-row p-2 w-full items-center justify-end mb-8 h-14">
          <button
            className={"btn-style shadow flex-row flex mr-4 bg(--state-200) cursor-pointer"}
            onClick={handleFixedTodo}
          >
            <Image
              src="/check_dark.svg"
              alt="check dark"
              width={20}
              height={20}
              className=" mr-2"
              priority
            />
            수정완료
          </button>
          <button className={"btn-style shadow flex-row flex bg-(--color-rose-500) text-white cursor-pointer"}>
            <Image
              src="/X.svg"
              alt="delete"
              width={20}
              height={20}
              className=" mr-2"
              priority
            />
            삭제하기
          </button>
        </div>
      </main>
    </div>
  );
}
