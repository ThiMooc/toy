var express = require('express');
var router = express.Router();
var CollectionModel = require('../models/CollectionModel');
var ToyModel = require('../models/ToyModel');

router.get('/', async (req, res) => {
   var collections = await CollectionModel.find({});
   res.render('collection/index', { collections });
})

router.get('/add', (req, res) => {
   res.render('collection/add');
})

router.post('/add', async (req, res) => {
   var collection = req.body;
   await CollectionModel.create(collection);
   res.redirect('/collection');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var toys = await ToyModel.find({ collection : id }).populate('collection');
   res.render('collection/detail', { toys })
})
router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   var collection = await CollectionModel.findById(id);
   await CollectionModel.deleteOne(collection);
   res.redirect('/collection');
})

router.get('/deleteall', async (req, res) => {
   await CollectionModel.deleteMany();
   console.log('Delete all collection succeed !');
   res.redirect('/collection');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var collection = await CollectionModel.findById(id);
   res.render('collection/edit', { collection });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var collection = req.body;
   try {
      await CollectionModel.findByIdAndUpdate(id, collection);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/collection');
})
module.exports = router;