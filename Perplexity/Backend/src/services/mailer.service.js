import nodemailer from 'nodemailer';

console.log('EMAIL_USER:', process.env.GOOGLE_USER);
console.log('EMAIL_PASS:', process.env.GOOGLE_PASSWORD);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
         auth: {
       
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      
    }
    }); 
  
    transporter.verify()
    .then(() => { console.log("Email transporter is ready to send emails"); })
    .catch((err) => { console.error("Email transporter verification failed:", err); });
   

    export async function sendEmail({ to, subject, html, text }) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}

