import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

   
   export const registerMail=async(req,res)=>{
    const {username,userEmail,text,subject}=req.body;
    var email={
          service:'gmail',
          auth:{
              user:ENV.EMAIL,
              pass:ENV.PASSWORD
          }
    }
    let transporter=nodemailer.createTransport(email);
    let MailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Mailgen",
            link:'https://mailgen.js'
        }
       })
       let response={
        body:{
            name:username,
            intro:text||"Welcome to my login app.",
            outro:'It is good to see you back.'
        }

       }
    var emailBody=MailGenerator.generate(response);
    let message={
            from:ENV.EMAIL,
            to:userEmail,
            subject:subject || "Signup successful",
            html:emailBody
    }
    //send the mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"Email has been sent to your gmail."})
    })
    .catch(error=>res.status(500).send({error}))
   }