const Reading = require("../models/Reading");
const User = require("../models/User");
const Card = require("../models/Card")

module.exports = {
  getReadings: async (req,res)=>{
    console.log(req.user)
    try{
      const readings = await Reading.find({user: new RegExp(`^${req.user.username}$`,'i')})
      res.render('dashboard.ejs', {readings: readings, user: req.user})
      // res.render('dashboard.ejs')
      console.log('readings:', readings)
    }catch(err){
        console.log(err)
    }
  },
  // saveReading: (req, res) => {
  //   res.render('saveReading.ejs')
  // }
};