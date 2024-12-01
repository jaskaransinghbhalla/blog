import { Hono } from "hono";

const app = new Hono();

app.post("/api/v1/user/signup", async (c) => {
  const { email, password } = await c.req.json();
  console.log(email, password);
  return c.text("POST /");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("POST /");
});

app.post("/api/v1/user/blog", (c) => {
  return c.text("POST /");
});

app.put("/api/v1/blog", (c) => {
  return c.text("PUT /");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("GET /");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("GET /");
});

export default app;
