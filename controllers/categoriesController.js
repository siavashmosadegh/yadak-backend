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
        // console.log(req.query);
        // BUILD QUERY 
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields','duration'];
        excludeFields.forEach(el => delete queryObj[el]);

        const query = CategoryItem.find(queryObj);

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