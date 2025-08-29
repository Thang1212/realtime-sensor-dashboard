// const adminRouter = require('./admin')
const homeRouter = require('./home')

function route(app) {
    // app.use('/admin', adminRouter);

    app.use('/', homeRouter);
}

module.exports = route

/** 
const express = require('express')
const router = express.Router();
const Tour = require('../models/Tour');

class TourController {
    // GET: /coduythang/listTour
    async listTour(req, res, next) {
        try {
            const tours = await Tour.find();
            res.status(200).json(tours);
        } catch (err) {
            res.status(500).json({ error: 'Không thể lấy danh sách tour', detail: err.message });
        }
    }

    // POST: /coduythang/addTour
    async addTour(req, res, next) {
        try {
            const { name, description, duration, price } = req.body;
    
            if (!name || !description || !duration || !price) {
                return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin tour' });
            }
    
            // Lấy tourId lớn nhất hiện tại
            const lastTour = await Tour.findOne().sort({ tourId: -1 });
            const newTourId = lastTour ? lastTour.tourId + 1 : 1;
    
            const newTour = new Tour({
                tourId: newTourId,
                name,
                description,
                duration,
                price
            });
    
            const savedTour = await newTour.save();
            res.status(201).json(savedTour);
        } catch (err) {
            res.status(400).json({ error: 'Lỗi khi thêm tour mới', detail: err.message });
        }
    }
    
    // PUT: /coduythang/updateTour/:id
    async updateTour(req, res, next) {
        try {
            const { id } = req.params;
            const updatedTour = await Tour.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedTour) {
                return res.status(404).json({ error: 'Tour không tồn tại' });
            }
            res.status(200).json(updatedTour);
        } catch (err) {
            res.status(400).json({ error: 'Lỗi cập nhật tour, thiếu tham số', detail: err.message });
        }
    }
    
    // GET: /coduythang/searchTours/price?min=2000000&max=4000000
    async searchTour(req, res, next) {
        try {
            const min = parseInt(req.query.min) || 0;
            const max = parseInt(req.query.max) || Number.MAX_SAFE_INTEGER;

            const tours = await Tour.find({
                price: { $gte: min, $lte: max },
            });

            res.status(200).json(tours);
        } catch (err) {
            res.status(400).json({ error: 'Lỗi khi tìm tour theo giá, thiếu tham số', detail: err.message });
        }
    }
}

const tourController = new TourController();

// router.use('/:slug', tourController.index);
// localhost:8000/coduythang/listTour
router.get('/coduythang/listTour', tourController.listTour);
router.post('/coduythang/addTour', tourController.addTour);
router.put('/coduythang/updateTour/:id', tourController.updateTour);
router.get('/coduythang/searchTours/price', tourController.searchTour);

function tourRoutes(app) {
    app.use('/', router);
}

module.exports = tourRoutes; 
*/