const CategoryItem = require('../models/categoryItemModal');

exports.createCategoryItem = async (req, res) => {
    // res.status(200).json({
    //     status: 'sucess'
    // });
    try {
        const newCategoryItem = await CategoryItem.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                item: newCategoryItem
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getCategories = async (req, res) => {
    try {
        // BUILD QUERY
        // 1) Filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // 2) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));

        const query = CategoryItem.find(queryObj);

        console.log(JSON.parse(queryStr));

        // EXECUTE QUERY
        const categories = await query;

        // SEND RESPONSE 
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getCategory = async (req, res) => {
    try {
      const category = await CategoryItem.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          category
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
};

exports.updateTour = async (req, res) => {
    try {
      const tour = await CategoryItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
        status: 'success',
        data: {
          tour
        }
      });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
  
exports.deleteTour = async (req, res) => {
    try {
        await CategoryItem.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};