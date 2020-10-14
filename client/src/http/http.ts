type URL = "GET" | "POST" | "DELETE" | "PUT"

const http = async (
  url: string,
  method: URL = "GET",
  data?: Object,
  headers?: { [key: string]: string }
): Promise<any> => {
  headers = { ...headers, "Content-type": "Application/json" }
  if (method === "GET") {
    try {
      return await fetch("http://localhost:3000/api" + url + data, {
        method,
        headers,
      })
    } catch (e) {
      throw new Error("Something went wrong")
    }
  }
  try {
    return await fetch("http://localhost:3000/api" + url, {
      method,
      headers,
      body: JSON.stringify({ data }),
    })
  } catch (e) {
    throw new Error("Something went wrong")
  }
}

export default http
