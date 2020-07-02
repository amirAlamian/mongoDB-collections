const express = require('express');
const router = express.Router();
const Worker = require("../models/workers")
const bodyParser = require('body-parser');
const path=require("path");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(bodyParser.urlencoded({
  'extended': 'true'
}));
router.use(bodyParser.json());
router.use(bodyParser.json({//body-parser
  type: 'application/vnd.api+json'
}));





router.use(express.static("public"))

router.get("/index",function(req,res){
  res.sendFile(path.join(__dirname,"../public/index2.html"))
})



router.post("/addUser", function (req, res) {//adding company
  console.log(req.body);
  
  const NEW_WORKER = new Worker({// creating data
    name: req.body.name,
    lastname: req.body.lastname,
    nationalCode: req.body.nationalCode,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    companyId:req.body.companyId,
    IsChief:req.body.IsChief
  })


  NEW_WORKER.save(function (err, data) {// saving data
    if (err) res.send("something went wrong");
    else res.json(data);
  })
})



router.get("/getAllUsers", function (req, res) { //get all users req
  Worker.find({}, function (err, data) {
    if(err) res.send("something went wrong while sending data");
    else{
      res.json(data)
    }
  })
})



router.put("/updateUser/:userId", function (req, res) { //get all users req
  Worker.findByIdAndUpdate({_id:req.params.userId},req.body,{new:true}, function (err, data) {
    if(err) res.send("something went wrong while updating");
    else{
      res.json(data)
    }
  })
})




router.delete("/deleteUser/:userId", function (req, res) { //get all users req
  Worker.findByIdAndRemove({_id:req.params.userId}, function (err, data) {
    if(err){
      return res.send("something went wrong while deleting");
    }
    else{
      res.json(data);
    }
  })
})



module.exports = router;
