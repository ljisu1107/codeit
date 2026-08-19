const apiUrl:string = process.env.NEXT_PUBLIC_TODO_LIST_API_URL || "https://assignment-todolist-api.vercel.app/api";

interface apiCallProps {
  method: "GET" | "POST" | "PUT" | "DELETE"| "PATCH" | null;
  id: string;
  url: string | null | undefined;
  page?: number;
  pageSize?: number;
  body?: Record<string, unknown>;
}

// api call 함수
export async function apiCall({method,id,url,body,page,pageSize}:apiCallProps){
  const meth = !!method ? method : "GET";
  const urls:string = !!url ? url : "";
  const pageInfo = !!page && !!pageSize ? `?page=${page}&pageSize=${pageSize}`: '';
  const makeUrl = `${apiUrl}/${encodeURIComponent(id)}/${urls}${pageInfo}`;

  try{
    const res = await fetch(makeUrl, {
      method: meth,
      headers: meth !== "GET" ? { "Content-Type": "application/json" } : undefined,
      body: meth !== "GET" && body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json();

  }catch (err) {
    console.error("apiCall failed:", e);
    throw err; // 호출한 쪽에서 catch 해서 UI 처리할 수 있게 다시 던짐
  }
}

// 이미지 업로드 api
export async function imageUpload({formData,tenantId}){
  try {
    const res = await fetch(apiUrl+"/"+tenantId+"/images/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();

  }catch (err) {
    console.error("imageUpload failed:", err);
    throw err; // 호출한 쪽에서 catch 해서 UI 처리할 수 있게 다시 던짐

  }
}