const express = require('express');
const router  = express.Router();
const Dog  = require('../models/dogs');

router.get('/', async(req, res, next) => {

try{
  const foundDogs = await Dog.find({});
  res.render('index.ejs',{
    dogs:foundDogs
  });
} catch (err) {
 //If the await Dog.find() fails this is where the error message will go
 console.log(err);
 next(err);
}
});

router.get('/new', (req, res) => {
  res.render('new.ejs');
});


router.get('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    res.render('show.ejs', {
      dog: foundDog
    });
  });
});

router.get('/:id/edit', async (req, res, next) => {
           try  {
            console.log('hit')
            // install of what we had before
            // this is are database call, so we are "trying"
            // to find a dog, and a successful response, will save a successful
            // response in the foundDog variable, Compare this to the above
            const foundDog = await Dog.findById(req.params.id);

            res.render('edit.ejs', {
              dog: foundDog
            });

          } catch (err){
            // If the await Dog.findById(req.params.id) fails this is where the error message will go
            // This passes the error on too the middleware route
            res.send(err);

          }
});

router.put('/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedDog)=> {
    console.log(updatedDog, ' this is updatedDog');
    res.redirect('/dogs');
  });
});


router.post('/', async(req, res, next) => {
  try{
    const createdDog = await Dog.create(req.body);
    console.log(createdDog,'this is createdDog')
    res.redirect('/dogs');

} catch(err){
  res.send(err)
}
});


router.delete('/:id', async(req, res, next) => {
try{
  const deletedDog = await Dog.findByIdAndRemove(req.params.id);
  res.redirect('/dogs');
}catch (err){
res.send(err)
}
});



module.exports = router;
