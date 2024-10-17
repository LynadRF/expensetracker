export default async function requestAPI(method: "GET" | "POST" | "DELETE" | "PATCH", path: string, data?: object) {
    const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:3001";
    try {
        switch (method) {
            case "GET":
                return await fetch(apiUrl + path);
            case "POST":
            case "DELETE":
            case "PATCH":
                return await fetch(apiUrl + path, {
                    method: method,
                    credentials: "include",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
        }
    } catch {
        return null;
    }
}
