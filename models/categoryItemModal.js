const mongoose = require('mongoose');

const categoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'a category item must have a name'],
        unique: true
    },
    image: {
        type: String,
        required: [true , 'a category item must have a image'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const CategoryItem = mongoose.model('category item', categoryItemSchema);

module.exports = CategoryItem;