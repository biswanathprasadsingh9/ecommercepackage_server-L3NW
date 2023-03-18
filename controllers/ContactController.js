const response = require("express");

const Contact = require("../models/Contact");

var emailsender = require("./emailsender");
var emailsenderAdmin = require("./emailsenderAdmin");



const Notification = require("../models/Notification");



// INDEX
const index = (req, res) => {
  Contact.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};

const store = (req, res) => {

  Contact.create(req.body).then((reask) => {
    res.json({
      response: true,
    });


    Notification.create({message:'notification_new_contactus',info_url:`/contactrequest`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
    .then(resasac=>{
      console.log('created notification_new_contactus');
    })

    //send email thank you register email to users
    emailsender.emailsendFunction('user_send_thankyou_for_contactus',reask.email,{nodata:false},'email_thanks_for_contactingus',true,reask._id)
    .then(response=>{
      console.log('send user_send_thankyou_for_contactus');
    })


    //send new contact to admin
    emailsenderAdmin.emailsendFunction('admin_new_user_contactus',{datalink:`/contactrequest`,user:req.body,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_to_admin_new_contact_request')
    .then(response=>{
      console.log('send admin_new_user_contactus');
    })


  });
};


const update = (req,res) => {
  Contact.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const deletefile = (req,res) => {
  Contact.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports = {
  index,
  store,
  update,
  deletefile
};
