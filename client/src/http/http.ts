type URL = "GET" | "POST" | "DELETE" | "PUT"

const API_URL = process.env.API_URL

const http = async (
  url: string,
  method: URL = "GET",
  data?: Object,
  headers?: { [key: string]: string }
): Promise<Response> => {
  headers = { ...headers, "Content-type": "Application/json" }
  if (method === "GET") {
    try {
      return await fetch(API_URL + url + data, {
        method,
        headers,
      })
    } catch (e) {
      throw new Error("Something went wrong")
    }
  }
  try {
    return await fetch(API_URL + url, {
      method,
      headers,
      body: JSON.stringify({ data }),
    })
  } catch (e) {
    throw new Error("Something went wrong")
  }
}

export default http
