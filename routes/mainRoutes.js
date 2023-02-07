const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

// router
//     .route('/top-5-cheap')
//     .get(categoriesController.aliasTopTour, categoriesController.getCategories);

router
    .route('/')
    .get(categoriesController.getCategories)
    .post(categoriesController.createCategoryItem);
router
    .route('/:id')
    .get(categoriesController.getCategory)
    .patch(categoriesController.updateTour)
    .delete(categoriesController.deleteTour);

module.exports = router;