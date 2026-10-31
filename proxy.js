
const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({
  target: "http://180.167.106.70:8088",
  changeOrigin: true,
  ws: true
});

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "http://localhost:5500",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    return res.end();
  }

  proxy.web(req, res, {
    target: "http://180.167.106.70:8088"
  });
});

proxy.on("proxyRes", (proxyRes) => {
  proxyRes.headers["access-control-allow-origin"] =
    "http://localhost:5500";
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err.message);

  if (!res.headersSent) {
    res.writeHead(502);
    res.end("Proxy error");
  }
});

server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Proxy: http://127.0.0.1:3000");
});
