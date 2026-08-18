'use client';

import Input from "@/components/input";
import AddBtn from "@/components/addBtn";
import {apiCall} from "@/script";
import {useEffect, useState} from "react";

interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default function Home() {

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
    console.log(newTodoName);
    setAdding(true);
    try {
      const created = await apiCall({
        id: "jisu",
        method: "POST",
        url: "items",
        body: { name: newTodoName },
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

        <div className="flex flex-row w-full justify-between px-6">
          <Input value={newTodoName} onChange={(e) => setNewTodoName(e.target.value)} />
          <AddBtn fn={handleAddTodo} disabled={adding}/>
        </div>

        <div className="flex flex-col items-start justify-between py-6 px-6 md:flex-row sm:items-start">
          <div className="flex flex-col w-full items-start text-center sm:w-full md:w-full lg:w-1/2">
            <div>
              <h4>TO DO</h4>
            </div>
            {loading ? "로딩중..." : todoItems.map((item) => <div key={item.id}>{item.name}</div>)}
          </div>

          <div className="flex flex-col w-full items-start text-center sm:w-full md:w-full lg:w-1/2">
            <h4>DONE</h4>
            {loading ? "로딩중..." : doneItems.map((item) => <div key={item.id}>{item.name}</div>)}
          </div>
        </div>

      </main>
    </div>
  );
}
