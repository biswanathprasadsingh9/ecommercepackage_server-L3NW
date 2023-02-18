const response = require("express");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var emailsender = require("./emailsender");
var _ = require('lodash');
const imageToBase64 = require('image-to-base64');
var calculateTax = require("./calculateTax");
const { uuid } = require('uuidv4');
var mongoose = require('mongoose');

const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
const UserShippingMethod = require("../models/UserShippingMethod");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const LoginRecord = require("../models/LoginRecord");
const UserShippingAdditionalComments = require("../models/UserShippingAdditionalComments");
const Order = require("../models/Order");
const EmailSendList = require("../models/Order");


const ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINTKEY,
});


// INDEX
const index = (req, res) => {

  emailsender.emailsendFunction('testemail','biswanathprasadsingh9@gmail.com',{name:'John Doe'},'email_user_register',true,false)
  .then(response=>{
    console.log(response)
  })


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

};


const admin_view_all_emails = (req,res) => {
  EmailSendList.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
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
                emailverificationcode:'9856636',
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

                LoginRecord.create({user_id:rdata._id,ipinfo:req.body.ipinfo})
                .then(resa=>{
                  res.json({
                    response:true,
                    data:rdata
                  })
                })

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

        LoginRecord.create({user_id:response._id,ipinfo:req.body.ipinfo})
        .then(resa=>{
          res.json({
            response:true,
            data:response
          })
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


      })
    }else{
      res.json({
        response:false,
        message:'Email exist',
      })
    }
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


            LoginRecord.create({user_id:doc._id,ipinfo:req.body.ipinfo})
            .then(resa=>{
              res.json({
                response:true,
                data:doc,
                message:'Login Success'
              })
            })



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

          console.log(_.omit(doc, ['password']))

          LoginRecord.create({user_id:doc._id,ipinfo:req.body.ipinfo})
          .then(resa=>{
            res.json({
              response:true,
              data:_.omit(doc, ['password']),
              message:'Login Success'
            })
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



const update = (req,res) => {

  console.log(req.body)

  User.findByIdAndUpdate(req.params.id,req.body)
  .then(response=>{

    User.findById(req.params.id).select('-password')
    .then(data=>{
      res.json({
        response:true,
        data
      })
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
  User.findOneAndUpdate({password_reset_code:req.body.code},{$set:{password:hash,password_reset_code:''}})
  .then(respl=>{
    res.json({
      response:true
    })
  })
}

const admin_view_user_details = (req,res) => {
  User.findById(req.params.id,(err,doc)=>{
    if(doc===undefined){
      res.json({
        response:false,
      })
    }else{
      res.json({
        response:true,
        data:doc
      })
    }
    console.log(doc)

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
  LoginRecord.find().populate('user_id',['name'])
    // .select({'user_id.name': 1})
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        datas: response,
      });
    });
}


module.exports = {
  index,admin_view_all_loginrecords,admin_view_all_emails,admin_view_user_details,admin_view_user_login_details,admin_delete_user_details,forgotpassword,register_fromadmin,update_password_web,check_reset_password_code,login_with_google,register,login_with_google,update_profile_picture,update_password,update,login,emailverification,loginadmin,registerfromcart,getusershippingaddress,addaddressfromcart,deleteaddress,updateuseraddress,updatedefauladdress,getusershippingmethodselected,saveusershippingmethodselected,getuserdefaultshippingaddress,getcartinfo,updateshppingadditionalcomments,admin_view_user_cart_details,admin_view_user_order_details,admin_view_user_dashboard_details,admin_view_user_payment_history,login_as_user_step1,login_as_user_step2
};
