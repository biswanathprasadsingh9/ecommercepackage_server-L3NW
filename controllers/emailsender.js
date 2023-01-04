exports.emailsendFunction = function(testemail,emailto,locals){
  // console.log(args)
  const nodemailer = require('nodemailer');
  const Email = require('email-templates');

  locals.logo='https://w7.pngwing.com/pngs/361/627/png-transparent-leaf-logo-green-leaves-green-and-teal-leaf-logo-text-maple-leaf-grass.png'
  locals.year='2023';


  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      }
    });
    const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
  });

   email.send({
        template: testemail,
        message: {
          from:process.env.EMAIL_FROM+' '+process.env.EMAIL_USER,
          to:emailto,
        },
        locals: locals
    }).then(response=>{
      console.log('email_send');
      // res.json({
      //   response:true,
      //   message:'send',
      //   res:response
      // })
    });


  return 'success';
};
