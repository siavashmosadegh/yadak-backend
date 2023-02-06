const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CategoryItem = require('../../models/categoryItemModal');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => {
        console.log('DB connection successfull');
    });

// READ JSON FILE 
const items = JSON.parse(fs.readFileSync(`${__dirname}/items.json`, 'utf8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await CategoryItem.create(items);
        console.log('data successfully loaded');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try {
        await CategoryItem.deleteMany();
        console.log('data successfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// importData();

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}