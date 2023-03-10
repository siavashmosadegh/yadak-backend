const CategoryItem = require('../models/categoryItemModal');

// exports.aliasTopTour = (req, res, next) => {
//     req.query.limit = '5';
//     req.query.sort = '-ratingsAverage,price';
//     req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//     next();
// }

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
        // 1A) Filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = CategoryItem.find(queryObj);

        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
            console.log(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // 3) Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // 4) Pagination
        const page = req.query.page * 1 || 1; // we want to convert the string to a number
        const limit = req.query.limit * 1 || 100; // we want to convert the string to a number
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numCategories = await CategoryItem.countDocuments();
            if (skip >= numCategories) throw new Error('this page does not exist');
        }

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