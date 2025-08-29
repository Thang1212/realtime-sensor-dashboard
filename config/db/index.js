const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASS || 'password',
	database: process.env.DB_NAME || 'database_name',
	port: process.env.DB_PORT || 5432,
})

const connectDB = async () => {
	try {
		const client = await pool.connect()
		console.log('✅ Kết nối PostgreSQL thành công!')
		// client.release() // giải phóng connection sau khi test
  } catch (error) {
	console.error('❌ Lỗi kết nối PostgreSQL:', error)
	process.exit(1)
  }
}

module.exports = { connectDB, pool }
