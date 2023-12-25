var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CollectionModel = require('../models/CollectionModel');


router.get('/', async (req, res) => {
   var toys = await ToyModel.find({}).populate('collection');
   res.render('toy/index', { toys });
})

router.get('/add', async (req, res) => {
   var collections = await CollectionModel.find({});
   res.render('toy/add', { collections });
})

router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToyModel.create(toy);
   res.redirect('/toy');
})
router.get('/delete/:id', async (req, res) => {
   await ToyModel.findByIdAndDelete(req.params.id);
   res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   var collections = await CollectionModel.find({});
   res.render('toy/edit', { toy, collections });
})



router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   try {
      await ToyModel.findByIdAndUpdate(id, toy);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/toy');
})


router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") }).populate('collection');
   res.render('toy/index', { toys })
})


module.exports = router;