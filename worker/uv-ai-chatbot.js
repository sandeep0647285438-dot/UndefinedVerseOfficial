
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "UVI",
        status: "online"
      });
    }

    return Response.json({
      ok: true,
      service: "UVI",
      message: "Worker is running. Chat endpoint is not configured yet."
    });
  }
};
