const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const methodOverride = require("method-override");
const http = require("http");
const path = require("path");

const { createServer } = require('node:http');
const { Server } = require("socket.io");

const insertFakeAllData = require("./fakeAllData");

const route = require('./routes')
const db = require('./config/db')

const { formatDateTimeVN } = require("./helpers/formatDateTimeVN"); // đường dẫn tùy cấu trúc của bạn

// .env configuration
dotenv.config();

// Database connection
db.connectDB()

const app = express();
const port = process.env.PORT || 3000;

// Tạo HTTP server từ app Express
const server = createServer(app);
// Gắn Socket.IO vào HTTP server
const io = new Server(server);

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route init 
route(app);

// Xuất io để file khác dùng
// module.exports = { app, server, io };

// Socket.IO
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Xuất io để controller dùng emit
app.set("io", io);

insertFakeAllData(io);

// Helpers
app.locals.formatDateTimeVN = formatDateTimeVN;

// Start server
server.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
