const { pool } = require("./config/db");

// Hàm tạo số ngẫu nhiên
const random = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);

function insertFakeAllData(io) {
  setInterval(async () => {
    try {
      const now = new Date();

      // Fake temperature_data
      const temperatureResult = await pool.query(
        `INSERT INTO temperature_data (timestamp, value) VALUES ($1, $2)
        RETURNING *`,
        [now, random(20, 35)]
      );

      // Fake pressure_data
      const pressureResult = await pool.query(
        `INSERT INTO pressure_data (timestamp, device, current, pressure, unit)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
          now,
          'device_1',
          random(0, 5),     // current
          random(950, 1050),// pressure
          'hPa',
        ]
      );

      // Fake environment_data
      const environmentResult = await pool.query(
        `INSERT INTO environment_data (timestamp, device, temp, hum, pm25, nh3, h2s)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          now,
          'device_1',
          random(20, 35),  // temp
          random(40, 70),  // hum
          random(5, 50),   // pm2.5
          random(0, 5),    // nh3
          random(0, 2),    // h2s
        ]
      );

      io.emit("new_temperature", temperatureResult.rows[0]);
      io.emit("new_pressure", pressureResult.rows[0]);
      io.emit("new_environment", environmentResult.rows[0]);
      // console.log("Inserted & emitted new environment:", result.rows[0]);
      console.log(`✅ Inserted fake data at ${now.toISOString()}`);
    } catch (err) {
      console.error('❌ Lỗi insert:', err);
    }
  }, 2000);
}

module.exports = insertFakeAllData;
