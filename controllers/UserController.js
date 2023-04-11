const response = require("express");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var emailsender = require("./emailsender");
var emailsenderAdmin = require("./emailsenderAdmin");
var _ = require('lodash');
const imageToBase64 = require('image-to-base64');
var calculateTax = require("./calculateTax");
var notificationList = require("./notificationList");
const { uuid } = require('uuidv4');
var mongoose = require('mongoose');
const axios = require('axios');

const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
const UserShippingMethod = require("../models/UserShippingMethod");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const LoginRecord = require("../models/LoginRecord");
const UserShippingAdditionalComments = require("../models/UserShippingAdditionalComments");
const Order = require("../models/Order");
const EmailSendList = require("../models/EmailSendList");
const PageVisitRecord = require("../models/PageVisitRecord");
const Notification = require("../models/Notification");
const SettingsAdmin = require("../models/SettingsAdmin");
const MostVisitedProduct = require("../models/MostVisitedProduct");





const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});


// INDEX
const index = (req, res) => {

  // emailsender.emailsendFunction('testemail','biswanathprasadsingh9@gmail.com',{name:'John Doe'},'email_user_register',true,false)
  // .then(response=>{
  //   console.log(response)
  // })

  // emailsender.emailsendFunction('user_send_email_verification_code','biswanathprasadsingh9@gmail.com',{emailverificationcode:'256314'},'email_user_email_verification_code',true,false)
  // .then(response=>{
  //   console.log(response)
  // })



  // User.updateMany({}, { status: true })
  // .then(dqwdqwd=>{
  //   console.log('success')
  // })

  User.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });












  // PASSWORD: sam@gmail.com
  // var entry_datas=[
  //
//
  //   {
  //     name:'Violet Robinson',
  //     email:'violetrobinson@demoemail.com',
  //     password:'$2a$10$PfE9cSzkiDK3aDFHzeUbNeogTkRbx6FZ4Dm220kc7YkkY5bdkCZgW',
  //     type:'User',
  //     created_by:'Demouser',
  //     emailverification:true,
  //
  //     ipinfo: {
  //       ipVersion: 4,
  //       ipAddress: "103.151.128.152",
  //       latitude: 20.23333,
  //       longitude: 85.833328,
  //       countryName: "India",
  //       countryCode: "IN",
  //       timeZone: "+05:30",
  //       zipCode: "752101",
  //       cityName: "Bhubaneshwar",
  //       regionName: "Odisha"
  //     },
  //   },
  //   {
  //     name:'Lester Miles',
  //     email:'lestermiles@demoemail.com',
  //     password:'$2a$10$PfE9cSzkiDK3aDFHzeUbNeogTkRbx6FZ4Dm220kc7YkkY5bdkCZgW',
  //     type:'User',
  //     created_by:'Demouser',
  //     emailverification:true,
  //
  //     ipinfo: {
  //       ipVersion: 4,
  //       ipAddress: "103.151.128.152",
  //       latitude: 20.23333,
  //       longitude: 85.833328,
  //       countryName: "India",
  //       countryCode: "IN",
  //       timeZone: "+05:30",
  //       zipCode: "752101",
  //       cityName: "Bhubaneshwar",
  //       regionName: "Odisha"
  //     },
  //   },
  //   {
  //     name:'Patrick Steeves',
  //     email:'patricksteeves@demoemail.com',
  //     password:'$2a$10$PfE9cSzkiDK3aDFHzeUbNeogTkRbx6FZ4Dm220kc7YkkY5bdkCZgW',
  //     type:'User',
  //     created_by:'Demouser',
  //     emailverification:true,
  //
  //     ipinfo: {
  //       ipVersion: 4,
  //       ipAddress: "103.151.128.152",
  //       latitude: 20.23333,
  //       longitude: 85.833328,
  //       countryName: "India",
  //       countryCode: "IN",
  //       timeZone: "+05:30",
  //       zipCode: "752101",
  //       cityName: "Bhubaneshwar",
  //       regionName: "Odisha"
  //     },
  //   },
  //   {
  //     name:'patricksteeves',
  //     email:'@demoemail.com',
  //     password:'$2a$10$PfE9cSzkiDK3aDFHzeUbNeogTkRbx6FZ4Dm220kc7YkkY5bdkCZgW',
  //     type:'User',
  //     created_by:'Demouser',
  //     emailverification:true,
  //
  //     ipinfo: {
  //       ipVersion: 4,
  //       ipAddress: "103.151.128.152",
  //       latitude: 20.23333,
  //       longitude: 85.833328,
  //       countryName: "India",
  //       countryCode: "IN",
  //       timeZone: "+05:30",
  //       zipCode: "752101",
  //       cityName: "Bhubaneshwar",
  //       regionName: "Odisha"
  //     },
  //   },
  //   {
  //     name:'Tina Chambers',
  //     email:'tinachambers@demoemail.com',
  //     password:'$2a$10$PfE9cSzkiDK3aDFHzeUbNeogTkRbx6FZ4Dm220kc7YkkY5bdkCZgW',
  //     type:'User',
  //     created_by:'Demouser',
  //     emailverification:true,
  //
  //     ipinfo: {
  //       ipVersion: 4,
  //       ipAddress: "103.151.128.152",
  //       latitude: 20.23333,
  //       longitude: 85.833328,
  //       countryName: "India",
  //       countryCode: "IN",
  //       timeZone: "+05:30",
  //       zipCode: "752101",
  //       cityName: "Bhubaneshwar",
  //       regionName: "Odisha"
  //     },
  //   },
  //   {
  //     name:'Kathy Crawford',
  //     email:'kathycrawford@demoemail.com',
  //     password:'$2a$10$PfE9cSzkiDK3aDFHzeUbNeogTkRbx6FZ4Dm220kc7YkkY5bdkCZgW',
  //     type:'User',
  //     created_by:'Demouser',
  //     emailverification:true,
  //
  //     ipinfo: {
  //       ipVersion: 4,
  //       ipAddress: "103.151.128.152",
  //       latitude: 20.23333,
  //       longitude: 85.833328,
  //       countryName: "India",
  //       countryCode: "IN",
  //       timeZone: "+05:30",
  //       zipCode: "752101",
  //       cityName: "Bhubaneshwar",
  //       regionName: "Odisha"
  //     },
  //   },
  //
  //
  // ]
  //
  // User.create(entry_datas)
  // .then(resp=>{
  //   res.json({
  //     response:true
  //   })
  // })

};


const admin_view_all_emails = (req,res) => {
  // EmailSendList.find()
  //   .sort({ _id: -1 })
  //   .then((response) => {
      res.json({
        response: true,
        // datas: response,
      });
    // });
}







const login_with_google = (req,res) => {
  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){

      //image to base 64
      imageToBase64(req.body.picture) // Path to the image
      .then((bs64) =>{

          //uplaod image
          imagekit
          .upload({
            file: bs64,
            fileName: "user_image",
            useUniqueFileName: true,
            folder: "ecom_profile_image",
          })
          .then((response) => {
              console.log(response)
              var tmp_data={
                name:req.body.name,
                email:req.body.email,
                password:'google',
                emailverificationcode:Math.floor(100000 + Math.random() * 900000),
                emailverification:true,
                created_by:'Google',
                ipinfo:req.body.ipinfo,
                image:{
                  fileId:response.fileId,
                  filePath:response.filePath,
                  url:response.url,
                }
              }
              //create user
              User.create(tmp_data)
              .then(rdata=>{

                LoginRecord.create({user_id:rdata._id,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
                .then(resa=>{
                  res.json({
                    response:true,
                    data:rdata
                  })
                })

                Notification.create({user_id:rdata._id,message:'notification_new_user_register',info_id:rdata._id,info_url:`/users/${rdata._id}`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
                .then(resasac=>{
                  console.log('created_notification');
                })

                //send email thank you register email to users
                emailsender.emailsendFunction('user_send_thanks_for_registration',rdata.email,{username:rdata.name.split(' ')[0]},'email_user_thanks_for_register',true,rdata._id)
                .then(response=>{
                  console.log('send email_user_thanks_for_register');
                })

                //send new user register to admin
                emailsenderAdmin.emailsendFunction('admin_new_user_registration',{datalink:`/users/${rdata._id}`,user:rdata,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_to_admin_new_user_registration')
                .then(response=>{
                  console.log('send admin_new_user_registration');
                })


                // //notix
                // const data={
                //   "message":{
                //       "icons":"https://blog.qtonix.com/images/logowhite.png",
                //       "image":blog.thumbnail_image,
                //       "text":blog.description,
                //       "title":blog.title,
                //       "url":"https://blog.qtonix.com/blog/"+blog.url
                //   }
                // };
                //
                // const headers = {
                //   'Authorization-Token': '32f1df27da51736392e9e8f001a4b4f131cedae0e8fe59e4',
                // }
                //
                // axios.post('http://notix.io/api/send?app=10058bb816419c1316dc7a85c5f39a8',data,{headers:headers})
                // .then(ares=>{
                //   console.log('push notification send success')
                // })






              })
          })
          .catch((error) => {
            res.json({
              response:false,
              message:'imagekit_error'
            });
          });



      })
      .catch((error) => {
          res.json({
            response:false,
            message:'failed_to_convert_base64'
          })
      })



    }else{

      User.findOne({email:req.body.email})
      .then(response=>{

        res.json({
          response:true,
          data:response
        })

        LoginRecord.create({user_id:response._id,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
        .then(resa=>{
          console.log(111111111)
        })

        //send email new user login detected
        emailsender.emailsendFunction('user_send_new_login_detected',response.email,{secureuserid:response._id+'9e6cfeexf5d8ccecgt6e6cce7dvc2de8dcece7',username:response.name.split(' ')[0],ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_user_newlogin_detected',true,response._id)
        .then(response=>{
          console.log('send user_send_new_login_detected');
          // console.log(response)
        })


      })

    }
  })

}






//REGISTER
const register = (req,res) => {


  var hash = bcrypt.hashSync(req.body.password, salt);

  var bodydata=req.body;
  bodydata.password=hash;
  bodydata.created_by='user';
  bodydata.emailverificationcode=Math.floor(100000 + Math.random() * 900000),
  // bodydata.emailverification:true,

  // Math.floor(100000 + Math.random() * 900000)

  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      User.create(bodydata)
      .then(response=>{


        LoginRecord.create({user_id:response._id,ipinfo:req.body.ipinfo})
        .then(resa=>{
          res.json({
            response:true,
            data:response,
            message:'user_created'
          })
        })


        Notification.create({user_id:response._id,message:'notification_new_user_register',info_id:response._id,info_url:`/users/${response._id}`})
        .then(resasac=>{
          console.log('created_notification');
        })

        //send email thank you register email to users
        emailsender.emailsendFunction('user_send_thanks_for_registration',response.email,{username:response.name.split(' ')[0]},'email_user_thanks_for_register',true,response._id)
        .then(response=>{
          console.log('send email_user_thanks_for_register');
        })

        //send email verification code email to users
        emailsender.emailsendFunction('user_send_email_verification_code',response.email,{emailverificationcode:response.emailverificationcode},'email_user_email_verification_code',true,response._id)
        .then(response=>{
          console.log('send email_user_email_verification_code');
        })

        //send new user register to admin
        emailsenderAdmin.emailsendFunction('admin_new_user_registration',{datalink:`/users/${response._id}`,user:response,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_to_admin_new_user_registration')
        .then(response=>{
          console.log('send admin_new_user_registration');
        })


      })
    }else{
      res.json({
        response:false,
        message:'Email exist',
      })
    }
  })
}


const send_email_verification_code = (req,res) => {
  User.findById(req.params.user_id)
  .then(response=>{

    emailsender.emailsendFunction('user_send_email_verification_code',response.email,{emailverificationcode:response.emailverificationcode},'email_user_email_verification_code',true,response._id)
    .then(response=>{
      res.json({
        response:true
      })
    }).catch(err=>{
      res.json({
        response:false
      })
    })

  }).catch(err=>{
    res.json({
      response:false
    })
  })
}


const register_fromadmin = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);

  var bodydata=req.body;
  bodydata.password=hash;
  bodydata.emailverification=true;

  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      User.create(bodydata)
      .then(response=>{
        res.json({
          response:true,
          data:response,
          message:'user_created'
        })





      })
    }else{
      res.json({
        response:false,
        message:'Email exist',
      })
    }
  })
}


//ADD ADDRESS FROM CART (unregistrated user)
const registerfromcart = (req,res) => {
  var hash = bcrypt.hashSync('123456', salt);

  var bodydata=req.body;
  bodydata.type='User';
  bodydata.password=hash;
  bodydata.is_default=true;

  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      User.create(bodydata) //create user
      .then(response=>{

        bodydata.user_id=response._id;
        UserAddress.create(bodydata) //add user address
        .then(asw=>{
          res.json({
            response:true,
            data:response,
            message:'user_created'
          })


          Notification.create({user_id:response._id,message:'notification_new_user_register',info_id:response._id,info_url:`/users/${response._id}`})
          .then(resasac=>{
            console.log('created_notification');
          })

          //send email thank you register email to users
          emailsender.emailsendFunction('user_send_thanks_for_registration',response.email,{username:response.name.split(' ')[0]},'email_user_thanks_for_register',true,response._id)
          .then(response=>{
            console.log('send email_user_thanks_for_register');
          })

          //send email verification code email to users
          emailsender.emailsendFunction('user_send_email_verification_code',response.email,{emailverificationcode:response.emailverificationcode},'email_user_email_verification_code',true,response._id)
          .then(response=>{
            console.log('send email_user_email_verification_code');
          })

          //send new user register to admin
          emailsenderAdmin.emailsendFunction('admin_new_user_registration',{datalink:`/users/${response._id}`,user:response,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_to_admin_new_user_registration')
          .then(response=>{
            console.log('send admin_new_user_registration');
          })



        })

      })
    }else{
      res.json({
        response:false,
        message:'Email exist',
      })
    }
  })

}



//ADD ADDRESS FROM CART (registrated user)
const addaddressfromcart = (req,res) => {

  UserAddress.find({user_id:req.body.user_id})
  .then(response=>{
    if(response.length===0){

      var bodydata=req.body;
      bodydata.is_default=true;
      UserAddress.create(bodydata)
      .then(response=>{
        res.json({
            response:true,
        })
      })

    }else{
      UserAddress.create(req.body)
      .then(response=>{
        res.json({
            response:true,
        })
      })
    }
  })




}



//LOGIN ADMIN
const loginadmin = (req,res) => {
  var bodydata=req.body;

  User.findOne({email:bodydata.email},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'Email not found'
      })
    }else{

        var match = bcrypt.compareSync(bodydata.password, doc.password);
        if(match){

          if(doc.type==='Admin'){


            if(doc.status===false){
              res.json({
                response:false,
                message:'User access disabled'
              })
            }else{

              User.findOneAndUpdate({_id:doc._id},{$set:{instant_logout_from_all_device:false}})
              .then(res11=>{

                SettingsAdmin.updateMany({}, {$set: {all_admin_instant_logout: false,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo}})
                .then(res22=>{

                  LoginRecord.create({user_id:doc._id,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
                  .then(resa=>{
                    res.json({
                      response:true,
                      data:doc,
                      message:'Login Success'
                    })
                  })

                })

              })


            }



          }else{
            res.json({
              response:false,
              message:'Please login as Admin'
            })
          }


        }else{
          res.json({
            response:false,
            message:'Wrong password'
          })
        }

    }
  })

}




//LOGIN
const login = (req,res) => {
  var bodydata=req.body;

  User.findOne({email:bodydata.email},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'Email not found'
      })
    }else{

        var match = bcrypt.compareSync(bodydata.password, doc.password);
        if(match){

          res.json({
            response:true,
            data:_.omit(doc, ['password']),
            message:'Login Success'
          })

          LoginRecord.create({user_id:doc._id,ipinfo:req.body.ipinfo})
          .then(resa=>{

          })


          //send email new user login detected
          emailsender.emailsendFunction('user_send_new_login_detected',doc.email,{secureuserid:doc._id+'9e6cfeexf5d8ccecgt6e6cce7dvc2de8dcece7',username:doc.name.split(' ')[0],ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_user_newlogin_detected',true,doc._id)
          .then(response=>{
            console.log('send user_send_new_login_detected');
            console.log(response)
          })


        }else{
          res.json({
            response:false,
            message:'Wrong password'
          })
        }


    }
  })

}


//Email verification
const emailverification = (req,res) => {

  User.findById(req.body._id,(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'User if not found'
      })
    }else{
      if(doc.emailverificationcode===Number(req.body.code)){
        var updData={
          emailverification:true
        }
        User.findByIdAndUpdate(req.body._id,updData,(err1,doc1)=>{
          User.findById(req.body._id,(err2,doc2)=>{
            res.json({
              response:true,
              message:'Success',
              data:doc2
            })
          })
        })
      }else{
        res.json({
          response:false,
          message:'Wrong verification code'
        })
      }
    }
  })
}


//GET ALL SHIPPING ADDRESS UNDER USER ID
const getusershippingaddress = (req,res) => {

    UserAddress.find({user_id:req.params.id})
    .then(datas=>{
      res.json({
        response:true,
        datas
      })
    }).catch((ee)=>{
      res.json({
        response:false
      })
    })




}


//DELETE ADDRESS
const deleteaddress = (req,res) => {
  UserAddress.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

//UPDATE ADDRESS
const updateuseraddress =(req,res) => {
  UserAddress.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

//UPDATE DEFAULT ADDRESS
const updatedefauladdress = (req,res) => {
  UserAddress.find({user_id:req.body.user_id}).distinct('_id')
  .then(ids=>{

    UserAddress.updateMany({_id:{$in:ids}},{$set:{is_default:false}},{multi:true})
    .then(ssu=>{

      UserAddress.findByIdAndUpdate(req.body._id,req.body)
      .then(response=>{
        res.json({
          response:true
        })
      })

    })
  })

}

//GET USER SELECTED SHIPPING ADDRESS
const getuserdefaultshippingaddress = (req,res) => {
  UserAddress.findOne({user_id:req.params.user_id,is_default:true},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
  })
}


//GET USER SELECTED SHIPPING METHOD (shipping amount)
const getusershippingmethodselected = (req,res) => {
  UserShippingMethod.findOne({user_id:req.params.user_id},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
  })
}


//SAVE USER SHIPPING METHOD (shipping amount)
const saveusershippingmethodselected = (req,res) => {

  UserShippingMethod.deleteMany({user_id:req.body.user_id},{multi:true})
  .then(respo=>{
    UserShippingMethod.create(req.body)
    .then(response=>{
      res.json({
        response:true,
        data:req.body
      })
    })
  })

  // UserShippingMethod.findOne({user_id:req.params.user_id},(err,doc)=>{
  //   if(doc===null){
  //     res.json({
  //       response:false
  //     })
  //   }else{
  //     res.json({
  //       response:true,
  //       data:doc
  //     })
  //   }
  // })
}





//GET CAT INFO
const getcartinfo = (req,res) => {
  res.json({
    response:true,
    ss:calculateTax.calculateTaxFunction(1)
  })
}




//GET CATEGORY
const updateshppingadditionalcomments = (req,res) => {
  UserShippingAdditionalComments.update({user_id: req.body.user_id}, req.body, {upsert: true, setDefaultsOnInsert: true})
  .then(response=>{
    res.json({
      response:true
    })
  })
}



const admin_account_information_update = (req,res) => {
  User.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    User.findById(req.body._id).select('-password')
    .then(rdata=>{
      res.json({
        response:true,
        data:rdata
      })
      // Notification.create({user_id:response._id,message:'notification_new_user_register',info_id:response._id,info_url:`/users/${response._id}`})

      Notification.create({user_id:rdata._id,message:'notification_admin_account_information_changed',info_id:rdata._id,info_url:`/settings`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
      .then(resasac=>{
        console.log('notification_admin_account_information_changed');
      })
    })
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}


const admin_theme_update = (req,res) => {
  User.findByIdAndUpdate(req.body._id,req.body)
  .then(response=>{
    User.findById(req.body._id).select('-password')
    .then(rdata=>{
      res.json({
        response:true,
        data:rdata
      })
      // Notification.create({user_id:response._id,message:'notification_new_user_register',info_id:response._id,info_url:`/users/${response._id}`})

      Notification.create({user_id:rdata._id,message:'notification_admin_account_theme_changed',info_id:rdata._id,info_url:`/settings`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
      .then(resasac=>{
        console.log('notification_admin_account_theme_changed');
      })
    })
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}


const update = (req,res) => {

  console.log('req.body.ipinfo',req.body.ipinfo)

  User.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{

    User.findById(req.params.id).select('-password')
    .then(rdata=>{
      res.json({
        response:true,
        data:rdata
      })

      if(req.body.ipinfo && req.body.deviceinfo){
        emailsender.emailsendFunction('user_send_accountinformation_successfully_changed',rdata.email,{username:rdata.name.split(' ')[0],ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_user_thanks_for_register',true,rdata._id)
        .then(response=>{
          console.log('send user_send_accountinformation_successfully_changed');
        })

        Notification.create({user_id:rdata._id,message:'notification_user_account_information_changed',info_id:rdata._id,info_url:`/users/${rdata._id}`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
        .then(resasac=>{
          console.log('notification_user_account_information_changed');
        })
      }


    })


  })
}



const update_password = (req,res) => {



  User.findOne({_id:req.body.id},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'wrong_id'
      })
    }else{
        var match = bcrypt.compareSync(req.body.old_password, doc.password);


        if(match){
          var hash = bcrypt.hashSync(req.body.new_password, salt);
          User.findByIdAndUpdate(req.body.id,{$set:{password:hash}})
          .then(respl=>{
            res.json({
              response:true
            })


            Notification.create({user_id:doc._id,message:'notification_user_password_changed',info_id:doc._id,info_url:`/users/${doc._id}`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
            .then(resasac=>{
              console.log('created_notification');
            })

            //send email thank you register email to users
            emailsender.emailsendFunction('user_send_password_successfully_changed',doc.email,{username:doc.name.split(' ')[0],ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_user_password_changed',true,doc._id)
            .then(responseqwd=>{
              console.log('send user_send_password_successfully_changed');
            })

          })


        }else{
          res.json({
            response:false,
            message:'Old password is not matching'
          })
        }


    }
  })

}






const update_profile_picture = (req,res) => {

    const encoded = req.file.buffer.toString("base64");
    imagekit
    .upload({
      file: encoded,
      fileName: "user_image",
      useUniqueFileName: true,
      folder: "ecom_profile_image",
    })
    .then((response) => {

        var stemp={
          fileId:response.fileId,
          filePath:response.filePath,
          url:response.url,
        }

        User.findByIdAndUpdate(req.body.id,{$set:{image:stemp}})
        .then(resp22=>{
          User.findById(req.body.id).select('-password')
          .then(resp12=>{
            res.json({
              response:true,
              data:resp12
            })
          })

        })
    })
    .catch((error) => {
      res.json({
        response: error,
      });
    });

}


const forgotpassword = (req,res) => {
  User.findOne({email:req.body.email},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
        message:'This email address is not registrated.'
      })
    }else{

      var password_reset_code =uuid()+'-'+uuid()+'-'+uuid();

      var resetlink=process.env.WEBSITE_URL+'/resetpassword?code='+password_reset_code;
      //send email verification code email to users
      emailsender.emailsendFunction('user_send_password_reset_link',doc.email,{username:doc.name.split(' ')[0],resetlink:resetlink},'email_user_password_reset_link',true,response._id)
      .then(response=>{
        console.log('send email_user_email_verification_code');
      })



      User.findByIdAndUpdate(doc._id,{$set:{password_reset_code}})
      .then(rpd=>{
        res.json({
          response:true,
          password_reset_code,
          data:doc
        })
      })


    }
  })
}

const check_reset_password_code = (req,res) => {
  User.findOne({password_reset_code:req.params.code},(err,doc)=>{
    if(doc===null){
      res.json({
        response:false
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
  })
}


const update_password_web = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);


  User.findById(req.body.user_id)
  .then(response=>{


    User.findByIdAndUpdate(response._id,{$set:{password:hash,password_reset_code:'',instant_logout_from_all_device:false}})
    .then(responsqwqwe=>{

      res.json({
        response:true
      })

      Notification.create({user_id:response._id,message:'notification_user_password_changed',info_id:response._id,info_url:`/users/${response._id}`,ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo})
      .then(resasac=>{
        console.log('created_notification');
      })

      //send email thank you register email to users
      emailsender.emailsendFunction('user_send_password_successfully_changed',response.email,{username:response.name.split(' ')[0],ipinfo:req.body.ipinfo,deviceinfo:req.body.deviceinfo},'email_user_password_changed',true,response._id)
      .then(responseqwd=>{
        console.log('send user_send_password_successfully_changed');
      })

    })





  })






}

const admin_view_user_details = (req,res) => {
  User.findById(req.params.id,(err,doc)=>{
    if(doc===null){
      res.json({
        response:false,
      })
    }else{
      if(doc.isAdminSeen){
        res.json({
          response:true,
          data:doc
        })
      }else{
        User.findByIdAndUpdate(req.params.id,{$set:{isAdminSeen:true}})
        .then(d=>{
          res.json({
            response:true,
            data:doc
          })
        })
      }

    }
  })
}

const admin_delete_user_details = (req,res) => {
  User.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const admin_view_user_login_details =(req,res)=> {
  LoginRecord.find({user_id:req.params.user_id})
  .sort({ _id: -1 })
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}

const admin_view_user_cart_details =(req,res)=> {
  Cart.find({user_id:req.params.user_id})
  .sort({ _id: -1 })
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}

const admin_view_user_order_details =(req,res)=> {
  Order.find({user_id:req.params.user_id})
  .sort({ _id: -1 })
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })
}

const admin_view_user_payment_history = async (req,res)=> {
    res.json({
      response:true,

    })
}

const admin_view_user_dashboard_details = async (req,res) => {

  res.json({
    response:true,
    data:{
      total_logins:await LoginRecord.countDocuments({user_id:req.params.user_id}),
      total_cart:await Cart.countDocuments({user_id:req.params.user_id}),
      total_order:await Order.countDocuments({user_id:req.params.user_id}),
      total_buy_amount: await Order.aggregate([ { $match: {user_id:new mongoose.Types.ObjectId(req.params.user_id)} }, { $group: { _id: "$user_id", TotalSum: { $sum: "$amount_total_final" } } } ])
    }

  })

}

const login_as_user_step1 = (req,res) => {

  var uuids=uuid();

  // User.findById(req.params.user_id)
  // .then(response=>{
  //
  // })
  User.findByIdAndUpdate(req.params.user_id,{$set:{uniq_login_id_admin:uuids}})
  .then(response=>{
    res.json({
      response:true,
      uuid:uuids
    })
  })
}

const login_as_user_step2 =(req,res) => {
  User.findOne({uniq_login_id_admin:req.params.uniqid})
  .then(data=>{
    if(data===null){
      res.json({
        response:false
      })
    }else{
      User.findByIdAndUpdate(data._id,{$set:{uniq_login_id_admin:''}})
      .then(response=>{

         User.findById(data._id)
         .then(userdata=>{
           res.json({
             response:true,
             data:userdata
           })
         })

      })
    }
  })
}


const admin_view_all_loginrecords = (req,res) => {
  LoginRecord.find().populate('user_id',['name','email'])
    // .select({'user_id.name': 1})
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
}


const admin_delete_loginrecord = (req,res) => {
  LoginRecord.findByIdAndRemove(req.params.id)
  .then(rsponse=>{
    res.json({
      response:true
    })
  })
  .catch(err=>{
    res.json({
      response:false
    })
  })
}


const admin_view_all_emailrecords = (req,res) => {
  EmailSendList.find()
    .populate('user_id',['_id','name','email'])
    .select({email_to: 1, status:1, email_name:1, email_from:1, email_subject:1, createdAt:1, user_id:1})
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
}

const admin_view_emailrecord = (req,res) => {
  EmailSendList.findById(req.params.id).populate('user_id','name')
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  }).catch(error=>{
    res.json({
      response:false,
      error
    })
  })
}

const admin_delete_emailrecord = (req,res) => {
  EmailSendList.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true,
    })
  }).catch(error=>{
    res.json({
      response:false,
      error
    })
  })
}


const user_page_visit_tracking_store = (req,res) => {

  // console.log(req.body)

  if(req.body.user){


    User.findById(req.body.user_id)
    .then(response=>{

      if(response.status && response.instant_logout_from_all_device===false){
        res.json({
          response:true,
          data:response
        })
      }else if (response.status===false) {
        res.json({
          response:false,
          data:response,
          message:'user_account_blocked'
        })
      }else if (response.instant_logout_from_all_device) {
        res.json({
          response:false,
          data:response,
          message:'logout_now'
        })
      }else{
        res.json({
          response:false,
          data:response,
          message:'logout_now'
        })
      }

      PageVisitRecord.create(req.body)
      .then(response=>{

      })


    }).catch(err=>{
      res.json({
        response:false,
        message:'logout_now'
      })
    })

  }else{
    PageVisitRecord.create(req.body)
    .then(response=>{
      res.json({
        response:true,
      })
    })
  }
}

const admin_all_notifications = (req,res) => {
  Notification.find()
    .sort({ _id: -1 })
    .populate('user_id','name email image.filePath')
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
};


const admin_all_pagevisit_records = (req,res) => {
  PageVisitRecord.find()
    .sort({ _id: -1 })
    .populate('user_id','name email image.filePath')
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
}


const admin_mostviewed_page = (req,res) => {

  PageVisitRecord.aggregate([
    {
      $group: {
        _id: "$page_url",
        count: { $sum: 1 }
      }
    },
      {$sort: {count: -1}}
  ])
  .then(datas=>{
    res.json({
      response:true,
      datas
    })
  })


}


const admin_clearall_pagevisit_records = (req,res) => {
  PageVisitRecord.deleteMany({})
  .then((response) => {
    res.json({
      response: true,
      datas: response,
    });
  });
}

const admin_clearall_loginrecords = (req,res) => {
  LoginRecord.deleteMany({})
  .then((response) => {
    res.json({
      response: true,
      datas: response,
    });
  });
}

const admin_setseen_notifications = (req,res) => {
  Notification.findByIdAndUpdate(req.params.id,{$set:{is_viewed:true}})
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const admin_setseen_notifications_byurl = (req,res) => {
  Notification.findOneAndUpdate({url:req.params.url},{$set:{is_viewed:true}})
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const admin_setseen_notifications_bymessage = (req,res) => {
  console.log(req.params.message)
  Notification.update({message:req.params.message,is_viewed:false}, {$set: { is_viewed: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const admin_setseen_notifications_bymessage_of_user = (req,res) => {
  console.log(req.params.message)
  Notification.update({message:req.params.message,user_id:req.params.user_id,is_viewed:false}, {$set: { is_viewed: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const admin_setseen_notifications_byuserid = (req,res) => {
  Notification.update({user_id:req.params.user_id,is_viewed:false}, {$set: { is_viewed: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const admin_clearall_notifications = (req,res) => {
  Notification.remove({},(err,doc)=>{
    res.json({
      response:true
    })
  })
}

const admin_readall_notifications = (req,res) => {
  Notification.update({is_viewed:false}, {$set: { is_viewed: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const mark_all_seen = (req,res) => {
  User.update({isAdminSeen:false}, {$set: { isAdminSeen: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}

const mark_all_seen_cart = (req,res) => {
  Cart.update({isAdminSeen:false}, {$set: { isAdminSeen: true }}, {multi: true}, (err,doc)=>{
    res.json({
      response:true
    })
  })
}



const admin_delete_notification = (req,res) => {
  Notification.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  }).catch(err=>{
    res.json({
      response:false
    })
  })
}

const admin_all_cart_items = (req,res) => {
  Cart.find()
    .sort({ _id: -1 })
    .populate('user_id','name email image.filePath')
    .populate('product_id','name')
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
}

const admin_delete_items_from_cart = (req,res) => {
  Cart.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const logout_from_alldevice = (req,res) => {
  var user_id=req.params.code.replace("9e6cfeexf5d8ccecgt6e6cce7dvc2de8dcece7", "");
  User.findById(user_id)
  .then(response=>{

    var password_reset_code =uuid()+'-'+uuid()+'-'+uuid();
    var resetlink=process.env.WEBSITE_URL+'/resetpassword?code='+password_reset_code;

    User.findByIdAndUpdate(user_id,{$set:{password_reset_code,instant_logout_from_all_device:true,password:'fnMJk6ZYLCMe91qcdTUZo3lFkaxldk'}})
    .then(rpd=>{
      res.json({
        response:true,
        password_reset_url:'/resetpassword?code='+password_reset_code,
      })
    })


  }).catch(err=>{
    res.json({
      response:false
    })
  })
}


const user_productvisit_store = (req,res) => {
  MostVisitedProduct.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const user_productvisit_list = (req,res) => {
  MostVisitedProduct.find({user_id:req.params.user_id}).populate('product_id',{ _id: 1, name: 1, stock: 1, category: 1, url: 1, type:1,pricedisplay:1, price_lowest: 1, price_heighest: 1, pricemain: 1, review_heighest_star:1, review_total:1,product_labels:1,product_collection:1, images: { $slice: 1 }})
  .then(response=>{
    res.json({
      response:true,
      datas:response,
      // datas:[],
    })
  })
}

const admin_user_all_productvisit_list = (req,res) => {
  MostVisitedProduct.find()
  .populate('product_id',{ _id: 1, name: 1, product_type:1})
  .populate('user_id',{_id:1, name:1, email:1})
  .sort({ _id: -1 })
  .then(response=>{
    res.json({
      response:true,
      datas:response,
      // datas:[],
    })
  })
}

const admin_delete_user_productvisit_list = (req,res) => {
  MostVisitedProduct.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}

const admin_user_all_productvisit_list_clear = (req,res) => {
  MostVisitedProduct.deleteMany({})
  .then((response) => {
    res.json({
      response: true,
      datas: response,
    });
  });
}

module.exports = {
  index,admin_user_all_productvisit_list_clear,admin_delete_user_productvisit_list,admin_user_all_productvisit_list,user_productvisit_list,user_productvisit_store,admin_theme_update,admin_account_information_update,send_email_verification_code,admin_clearall_notifications,admin_readall_notifications,admin_delete_notification,admin_delete_items_from_cart,admin_all_cart_items,admin_clearall_loginrecords,admin_clearall_pagevisit_records,admin_all_pagevisit_records,admin_delete_emailrecord,admin_all_notifications,admin_view_all_emailrecords,admin_view_emailrecord,admin_view_all_loginrecords,admin_view_all_emails,admin_view_user_details,admin_view_user_login_details,admin_delete_user_details,forgotpassword,register_fromadmin,update_password_web,check_reset_password_code,login_with_google,register,login_with_google,update_profile_picture,update_password,update,login,emailverification,admin_setseen_notifications,loginadmin,registerfromcart,getusershippingaddress,addaddressfromcart,deleteaddress,updateuseraddress,user_page_visit_tracking_store,updatedefauladdress,getusershippingmethodselected,saveusershippingmethodselected,getuserdefaultshippingaddress,getcartinfo,admin_mostviewed_page,updateshppingadditionalcomments,mark_all_seen_cart,admin_setseen_notifications_byuserid,mark_all_seen,admin_setseen_notifications_bymessage_of_user,admin_setseen_notifications_bymessage,admin_setseen_notifications_byurl,admin_view_user_cart_details,admin_view_user_order_details,admin_view_user_dashboard_details,admin_view_user_payment_history,logout_from_alldevice,login_as_user_step1,login_as_user_step2,admin_delete_loginrecord
};
