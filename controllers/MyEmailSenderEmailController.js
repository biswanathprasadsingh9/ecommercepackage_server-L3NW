const { response } = require("express");
const { uuid } = require('uuidv4');

const MyEmailSenderEmail = require("../models/MyEmailSenderEmail");
const MyEmailSenderEmailInfo = require("../models/MyEmailSenderEmailInfo");
var validator = require("email-validator");

var nodemailer = require("nodemailer");

//***INDEX***
const index = (req, res) => {
  MyEmailSenderEmail.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        data: response,
      });
    })
    .catch({});
};

const getfiles = (req,res) => {
  MyEmailSenderEmail.find({user_id:req.params.user_id}).sort({_id:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
  .catch({
  })
}

//***EMAILINFO***
const emailinfo = (req, res) => {
  MyEmailSenderEmailInfo.find()
    .sort({ _id: -1 })
    .then((response) => {
      res.json({
        response: true,
        data: response,
      });
    })
    .catch({});
};

//***SENDEMAIL***
const sendemail = async (req, res) => {
  console.log(req.body);

  res.json({
    response: true,
  });

  var tmp = {
    uuid: req.body.uuid,
    total: req.body.exceldata.length,
    email: req.body.email,
    templete: req.body.templete,
    password: req.body.password,
    user_id: req.body.user_id
  };

  MyEmailSenderEmailInfo.create(tmp);
  if (req.body.emailservice === "gmail") {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      auth: {
        user: req.body.email,
        pass: req.body.password,
      },
    });
    //   const email = new Email({
    //   transport: transporter,
    //   send: true,
    //   preview: false,
    // });
  } else {
    var transporter = nodemailer.createTransport({
      // service: 'gmail',
      // service: 'Godaddy',
      host: "smtpout.secureserver.net",
      secure: true,
      port: 465,
      auth: {
        user: req.body.email,
        pass: req.body.password,
      },
    });
  }

  var array = req.body.exceldata;
  // var interval = 3000;
  var interval = 7000;

  array.forEach(async (el, index) => {
    setTimeout(function () {
      var subject = req.body.subject.replace(/#domain#/gi, el[0]);
      var body = req.body.body.replace(/#domain#/gi, el[0]);

      var email_view_count_code = uuid();

      if (validator.validate(el[1])) {
        // =======SEND EMAIL=======

        //for track//
        // var options={
        //   html:body,
        //   id:123,
        //   imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        // }
        // const html = options.html || '';
        // const imageTag =  `<img src='https://d719-106-216-74-216.ngrok-free.app/api/myemailsender_email/emailviewed/62a17665-d7a8-41a0' height="1" width="1">`;
        const imageTag =  "<img src='https://d719-106-216-74-216.ngrok-free.app/api/myemailsender_email/emailviewed/"+email_view_count_code+"' height='1' width='1'>";

        // const imageUrl = 'https://reactnodeecommerce.cloud/file/11';
        //for track//

        var mailOptions = {
          from: req.body.email + " " + req.body.name,
          to: el[1],
          subject: subject,
          html: imageTag + body
          // html: body,
          // html: body,

          // html:
          //   '<p><strong>P.S.&nbsp;To unsubscribe <a href="https://forms.gle/zega9fPNxCykyqAF9" target="_blank">click here</a> I promise you will not hear from us again.</strong></p>',
        };

        try {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);

              var tempData = {
                status: "Failed",
                statusinfo: error,
                uuid: req.body.uuid,
                email_view_count_code:email_view_count_code,
                user_id:req.body.user_id,
                templete: req.body.templete,
                name: req.body.name,
                to: el[1],
                subject: subject,
                body: body,
                email: req.body.email,
                password: req.body.password,
              };
              MyEmailSenderEmail.create(tempData);

              res.json({
                response: false,
                data: error,
              });
            } else {

              var tempData = {
                status: "Success",
                // statusinfo: info.response,
                statusinfo: true,
                uuid: req.body.uuid,
                email_view_count_code:email_view_count_code,
                user_id:req.body.user_id,
                templete: req.body.templete,
                name: req.body.name,
                to: el[1],
                subject: subject,
                body: body,
                email: req.body.email,
                password: req.body.password,
              };
              MyEmailSenderEmail.create(tempData);

              console.log("Email sent: " + info.response);
              res.json({
                response: false,
                // data: error,
              });
            }
          });
        } catch (e) {
          var tempData = {
            status: "Failed",
            statusinfo: "Failed sending",
            uuid: req.body.uuid,
            email_view_count_code:email_view_count_code,
            user_id:req.body.user_id,
            templete: req.body.templete,
            name: req.body.name,
            to: el[1],
            subject: subject,
            body: body,
            email: req.body.email,
            password: req.body.password,
          };
          MyEmailSenderEmail.create(tempData);
        }


        // =======SEND EMAIL=======


      } else {
        var tempData = {
          status: "Failed",
          statusinfo: "Invalid email",
          uuid: req.body.uuid,
          email_view_count_code:email_view_count_code,
          user_id:req.body.user_id,
          templete: req.body.templete,
          name: req.body.name,
          to: el[1],
          subject: subject,
          body: body,
          email: req.body.email,
          password: req.body.password,
        };
        MyEmailSenderEmail.create(tempData);
      }
    }, index * interval);
    // }, index * Math.floor(Math.random() * 10) + 3);


  });
};

//***VIEW SEND EMAIL INFO***
const viewsendemailinfo = async (req, res) => {
  var main = await MyEmailSenderEmailInfo.findOne({ uuid: req.params.uuid });
  var childs = await MyEmailSenderEmail.find({ uuid: req.params.uuid });
  res.json({
    response: true,
    main: main,
    childs: childs,
  });
};



const emailviewed = (req,res) => {
  MyEmailSenderEmail.findOne({email_view_count_code:req.params.email_view_count_code})
  .then(data=>{
    if(data){
      console.log(data);
      // var count=data.email_view_count+1;
      MyEmailSenderEmail.findOneAndUpdate({email_view_count_code:req.params.email_view_count_code},{$set:{email_view_count:data.email_view_count+1}})
      .then(as=>{
        console.log('success');
      })
    }else{
      console.log('not found')
    }
  })
  res.json({
    success:true
  })
}

module.exports = { index, emailinfo, sendemail, viewsendemailinfo,emailviewed,getfiles };
