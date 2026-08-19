"use client"
import { useRouter } from "next/navigation";
import {apiCall, imageUpload} from "@/script";
import {useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";
import Image from "next/image";
import CheckBtn from "@/components/checkBtn";

interface TodoDetails {
  isCompleted: boolean,
  imageUrl: string,
  memo: string ,
  name: string,
  tenantId?: string | null | undefined,
  id?: string
}

export default function Page() {
  const router = useRouter(); // 라우터 최상단에 선언
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 ref

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
      setLoading(true);
      setTodoDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 할일 삭제하기
  async function handleDeleteTodo() {
    if (!todoDetails.id && !todoDetails.tenantId) return;
    try{
      if(confirm("정말 할일을 삭제하시겠습니까? 복구가 불가능 합니다.")){
        await apiCall({
          id: "jisu",
          method: "DELETE",
          url: "items/"+params.id,
        });
        router.replace("/");
      }

    }catch  (err) {
      console.error("할 일 삭제하기 실패:", err);
      alert("할 일 삭제에 실패했어요. 다시 시도해주세요.");
    }
  }

  // 이미지 미리보기 반영 및 용량 체크
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 용량은 5MB 이하만 가능합니다.");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setTodoDetails((prev)=>{
      return {...prev,imageUrl:imageUrl};
    });
  }

  //image file upload 함수
  async function handleImageUpload(){
    const formData = new FormData();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    formData.append("image", file);

    try {
      const result = await imageUpload({
        tenantId:todoDetails.tenantId || "",
        formData:formData
      });
      // 기획상 제출 성공 시 목록으로 이동하기로 되어 있어 상태 새로고침이 되기 때문에 (초기화) 상태 반영 X
      return result.url;
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
    }
  }

  // 할 일 수정하기
  async function handleFixedTodo() {
    if (!todoDetails.name.trim()) return; // 제목 빈 값 방지

    try {
      const imageUrl = await handleImageUpload();
      //서버에서 응답을 요청한 값만 보내기
      const created = await apiCall({
        id: "jisu",
        method: "PATCH",
        url: "items/"+params.id,
        body: {
          name: todoDetails.name,
          memo: todoDetails.memo || "",
          imageUrl: !!imageUrl ? imageUrl : todoDetails.imageUrl || "", // 이미지 변경 있을 시 변경된 url로 없으면 api 받아온 값으로
          isCompleted: todoDetails.isCompleted,
        },
      });
      //상태 반영
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

        <div className={`w-full flex text-center items-center justify-center mb-8 h-14 ${todoDetails.isCompleted ? "checked underline!" : "none-checked"}`}>
          <CheckBtn isChecked={todoDetails.isCompleted} setTodoDetails={setTodoDetails} />
          <input
            type="text"
            value={todoDetails.name}
            className={`h-full outline-0`}
            onChange={(e) =>
              setTodoDetails((prev:TodoDetails)=> {
                return {...prev, name: e.target.value}
              })
            }
          />
        </div>

        <div className="flex flex-col w-full items-start justify-between md:flex-row sm:items-start">
          <div className="flex flex-col relative w-full text-center mb-8 justify-center items-center sm:w-full md:w-full lg:w-2/7 border-dashed border-4 border-(--state-200) bg-[#F8FAFC] h-75 rounded-4xl">
            {
              !!todoDetails.imageUrl ?
                <Image src={todoDetails.imageUrl} alt="todo image" fill className="object-cover" />
                :
                <Image
                  className="h-max[40px] w-max-[40px]"
                  src="/img.svg"
                  alt="img"
                  width={40}
                  height={40}
                  priority
                />
            }
            {
              !!todoDetails.imageUrl ?
                <button className={"img-btn opacity-50 bg-(--state-900)! border-2! cursor-pointer"} onClick={() => fileInputRef?.current?.click()}>
                  <Image
                    className="h-max[40px] w-max-[40px]"
                    src="/edit.svg"
                    alt="edit"
                    width={40}
                    height={40}
                    priority
                  />
                </button>
                :
                <button className={"img-btn"} onClick={() => fileInputRef?.current?.click()}>
                  <Image
                    className="h-max[40px] w-max-[40px]"
                    src="/plus_detail.svg"
                    alt="이미지 추가"
                    width={40}
                    height={40}
                    priority
                  />
                </button>
            }

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e)} />
          </div>

          <div className="flex flex-col w-full items-start text-center sm:w-full md:w-full lg:w-5/7 p-0 md:pl-6">
            <textarea
              name="memo"
              id="memo"
              className={"w-full outline-none bg-[url(/memo.svg)] h-75 resize-none p-4"}
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

        <div className="flex flex-row p-2 w-full items-center justify-end mb-8 h-14 mt-4">
          <button
            className={"btn-style shadow flex-row flex mr-4 bg(--state-200) cursor-pointer px-8!"}
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
          <button
            className={"btn-style shadow flex-row flex bg-(--color-rose-500) text-white cursor-pointer px-8!"}
            onClick={handleDeleteTodo}
          >
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
