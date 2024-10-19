export default async function requestAPI(
    method: "GET" | "POST" | "DELETE" | "PATCH",
    path: string,
    data?: object
): Promise<Response> {
    const apiUrl: string = import.meta.env.API_URL || "http://localhost:3001/api";
    try {
        switch (method) {
            case "GET":
                return await fetch(apiUrl + path, {
                    method: method,
                    credentials: "include",
                });
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
        return new Response(JSON.stringify({ error: "Error fetching" }), {
            status: 500,
            statusText: "Internal Server Error",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
