'use client';

import Input from "@/components/input";
import AddBtn from "@/components/addBtn";
import {apiCall} from "@/script";
import {SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import CheckListItem from "@/components/checkListItem";

interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default function Page() {

  const [loading, setLoading] = useState(true); // 로딩

  const [todos, setTodos] = useState<Todo[]>([]); //할일 목록

  const [newTodoName, setNewTodoName] = useState(""); // 새로운 할일 이름
  const [adding, setAdding] = useState(false); // 할일 추가 여부

  // 할일 목록 불러오기
  async function fetchTodos() {
    try {
      const data = await apiCall({
        id: "jisu",
        method: "GET",
        url: 'items',
        page: 1,
        pageSize: 10
      });
      console.log(data);
      setLoading(true);
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 할 일 추가하기
  async function handleAddTodo() {
    if (!newTodoName.trim()) return; // 빈 값 방지
    setAdding(true);
    try {
      const created = await apiCall({
        id: "jisu",
        method: "POST",
        url: "items",
        body: {name: newTodoName},
      });
      setTodos((prev) => [...prev, created]); // 새로 받은 값을 목록에 추가
      setNewTodoName(""); // 입력창 초기화
    } catch (err) {
      console.error("할 일 추가 실패:", err);
      alert("할 일 추가에 실패했어요. 다시 시도해주세요.");
    } finally {
      setAdding(false);
    }
  }


  // 반영
  useEffect(() => {
    fetchTodos();
  }, []);

  const todoItems = todos.filter((t) => !t.isCompleted); // 할일 목록
  const doneItems = todos.filter((t) => t.isCompleted); // 완료한 할일 목록

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-col flex-1 w-full max-w-7xl ">

        <div className="flex flex-row w-full justify-start px-6">
          <Input
            value={newTodoName}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNewTodoName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                handleAddTodo();
              }
            }}
          />
          <AddBtn fn={handleAddTodo} disabled={adding}/>
        </div>

        <div className="flex flex-col items-start justify-between py-6 px-6 md:flex-row sm:items-start">
          <div className="flex flex-col w-full items-start text-center sm:w-full md:w-full lg:w-1/2 mb-8 mr-0 sm:mr-0 md:mr-4 lg:mr-4">
            <div>
              <h4 className={"mb-4"}>
                <Image
                  className="h-max[10px] w-max-[40px]"
                  style={{width: '100%', height: 'auto'}}
                  src="/todo.svg"
                  alt="todo"
                  width={100}
                  height={100}
                  priority
                />
              </h4>
            </div>
            {
              loading ?
                "로딩중..."
                :
                todoItems.length === 0 ?
                  <div className={"flex flex-col w-full items-center justify-center"}>
                    <Image
                      className="h-max[240px] w-max-[240px]"
                      src="/todo_large.svg"
                      alt="todo"
                      width={240}
                      height={240}
                      priority
                    />
                    <p className={"text-(--state-400)"}>
                      할 일이 없어요.<br />
                      TODO를 새롭게 추가해주세요!
                    </p>
                  </div>
                  :
                  todoItems.map((item) =>
                    <CheckListItem key={item.id} id={item.id} name={item.name} isChecked={item.isCompleted}/>
                  )
            }
          </div>

          <div className="flex flex-col w-full items-start text-center sm:w-full md:w-full lg:w-1/2 ml-0 sm:ml-0 md:ml-4 lg:ml-4">
            <h4 className={"mb-4"}>
              <Image
                className="h-max[10px] w-max-[40px]"
                src="/done.svg"
                alt="done"
                width={100}
                height={100}
                style={{width: '100%', height: 'auto'}}
                priority
              />
            </h4>
            {
              loading ?
                "로딩중..."
                :
                doneItems.length === 0 ?
                  <div className={"flex flex-col w-full items-center justify-center"}>
                    <Image
                      className="h-max[240px] w-max-[240px]"
                      src="/done_large.svg"
                      alt="done"
                      width={240}
                      height={240}
                      priority
                    />
                    <p className={"text-(--state-400)"}>
                      아직 다 한 일이 없어요.<br/>
                      해야 할 일을 체크해보세요!
                    </p>
                  </div>
                  :
                  doneItems.map((item) =>
                    <CheckListItem key={item.id}  id={item.id} name={item.name} isChecked={item.isCompleted} />
                  )
            }
          </div>
        </div>

      </main>
    </div>
  );
}
