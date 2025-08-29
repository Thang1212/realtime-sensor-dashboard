const { Pool } = require('pg');

// Kết nối PostgreSQL
const pool = new Pool({
  host: '127.0.0.1',
  user: 'duythang',       // thay bằng user của bạn
  password: 'mypassword', // thay bằng password của bạn
  database: 'sensor_db',  // DB đã tạo
  port: 5431,             // ⚠️ nếu bạn expose 5431 trong docker-compose
});

// Hàm tạo số ngẫu nhiên
const random = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);

async function insertFakeData() {
  const now = new Date();

  try {
    // Fake temperature_data
    await pool.query(
      `INSERT INTO temperature_data (timestamp, value) VALUES ($1, $2)`,
      [now, random(20, 35)]
    );

    // Fake environment_data
    await pool.query(
      `INSERT INTO environment_data (timestamp, device, temp, hum, pm25, nh3, h2s)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
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

    // Fake pressure_data
    await pool.query(
      `INSERT INTO pressure_data (timestamp, device, current, pressure, unit)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        now,
        'device_1',
        random(0, 5),     // current
        random(950, 1050),// pressure
        'hPa',
      ]
    );

    console.log(`✅ Inserted fake data at ${now.toISOString()}`);
  } catch (err) {
    console.error('❌ Lỗi insert:', err);
  }
}

// Cứ 2 giây insert 1 lần
setInterval(insertFakeData, 2000);
