const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");

const app = express();

const contactsRouter = require('./app/routes/contact.route');
app.use("/api/contacts", contactsRouter);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the contact book application." });
});

// Xử lý 404 response
app.use((req, res, next) => {
    // Mã sẽ chạy khi không có route nào khớp với yêu cầu
    // Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// Định nghĩa middleware xử lý lỗi sau cùng, sau các app.use() và các lời gọi routes khác
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn mã xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;
