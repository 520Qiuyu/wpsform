async function request<T>(method: string, url: string, data?: unknown) {
  const option: RequestInit = {
    method,
  };
  if (data) {
    option.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    option.body = JSON.stringify(data);
  }
  const res = await fetch(url, option);
  const json: T = await res.json();
  return json;
}

export function get<T>(url: string) {
  return request<T>("GET", url);
}

export function post<T>(url: string, data?: unknown) {
  return request<T>("POST", url, data);
}
