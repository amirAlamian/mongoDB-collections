const express = require('express');
const router = express.Router();
const Company = require("../models/company")
const bodyParser = require('body-parser');
const path=require("path")
let x={
  since:"",
  till:""
}


router.use(bodyParser.urlencoded({
  'extended': 'true'
}));
router.use(bodyParser.json());
router.use(bodyParser.json({//body-parser
  type: 'application/vnd.api+json'
}));




router.use(express.static("public"))
router.get("/",function (req, res) {
  res.sendFile(path.join(__dirname,"../public/index.html"))
})




router.post("/addUser", function (req, res) {//adding company
  const NEW_COMPANY = new Company({// creating data
    name: req.body.name,
    registrationCode: req.body.registrationCode,
    city: req.body.city,
    state: req.body.state,
    phoneNumber: req.body.phoneNumber,
    registrationDate: req.body.registrationDate

  })


  NEW_COMPANY.save(function (err, data) {// saving data
    if (err) res.status(500).send("something went wrong while adding a new company");
    else res.json(data);
  })
})




router.get("/getAllUsers", function (req, res) { //get all users req
  Company.find({}, function (err, data) {
    if(err) res.send("something went wrong while sending data");
    else{
      res.json(data)
    }
  })
})



router.put("/updateUser/:userId", function (req, res) { //get all users req
  Company.findByIdAndUpdate({_id:req.params.userId},req.body,{new:true}, function (err, data) {
    if(err) res.send("something went wrong while updating");
    else{
      res.json(data)
    }
  })
})




router.delete("/deleteUser/:userId", function (req, res) { //get all users req
  Company.findByIdAndRemove({_id:req.params.userId}, function (err, data) {
    if(err){
      return res.send("something went wrong while deleting");
    }
    else{
      res.json(data);
    }
  })
})


router.post("/searchByDate", function (req, res) {//searching
    x.since=req.body.since.split("-");
    x.till=req.body.till.split("-");
  Company.find({$and:[{registrationDate:{$gte:x.since[0]}} , {registrationDate:{$lte:x.till[0]}}]},function(err,data){
    if(err){
      return res.send("something went wrong while deleting");
    }
    else{
      res.json(data)
    }
  })
  
})



module.exports = router;
