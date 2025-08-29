const { pool } = require("../config/db");
const { formatDateTimeVN } = require("../helpers/formatDateTimeVN");

class HomeController {
  // [GET] /
  async index(req, res) {
    // Lấy 10 bản ghi environment_data mới nhất ban đầu
    const result = await pool.query(
      "SELECT * FROM environment_data ORDER BY timestamp DESC LIMIT 10"
    );

    res.render("home", {
      title: "Trang chủ",
      envData: result.rows
    });
  }

  // [GET] /:slug (nếu bạn muốn dùng)
  show(req, res) {
    res.send(`Bạn đang xem slug: ${req.params.slug}`);
  }
}

module.exports = new HomeController();
