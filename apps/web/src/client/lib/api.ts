type SuccessResponse<T> = {
  status: "success";
  message: string;
  data: T;
};

type ErrorResponse = {
  status: "error";
  message: string;
  errors?: { field: string; message: string }[];
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

interface FetchRequestOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, string | number>;
}

export async function fetchApi<T>(
  url: string,
  options: FetchRequestOptions,
): Promise<ApiResponse<T>> {
  const { body, method = "GET", headers, ...rest } = options;

  const response = await fetch(url, {
    ...rest,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    return data as ErrorResponse;
  }

  return data as SuccessResponse<T>;
}
