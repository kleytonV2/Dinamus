import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse request body for email details
    const body = await req.json();

    console.log(body);

    const { to, subject, text, html } = body;

    // Create the Nodemailer transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // Use 465 for SSL or 587 for TLS
      secure: true, // Use SSL (true for port 465, false for 587)
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (e.g., example@gmail.com)
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to,                           // Receiver email
      subject,                      // Email subject
      text,                         // Plain text body
      html,                         // HTML body (optional)
    };

    console.log("mailOptions: ", JSON.stringify(mailOptions));

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    return new Response(
      JSON.stringify({ message: 'Email sent successfully', info }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send email', error }),
      { status: 500 }
    );
  }
}

// export async function POST(request){
    
//     try {

//         const {subject, message} = await request.json();

//         const transporter = nodemailer.createTransport({
//             service: 'zoho',
//             host: 'smtpro.zoho.in',
//             port: 465,
//             auth:{
//                 user: 'kleyton@hotmail.es',
//                 password: process.env.NEXT_PUBLIC_PASSWORD
//             }
//         });

//         const mailOption = {
//             from: 'kleyton@hotmail.es',
//             to: 'kleyton@hotmail.es',
//             subject: subject,
//             html: `
//             <h3>Oi vander</h3>
//             <li> title: ${subject}</li>
//             <li> message: ${message}</li>
//             `
//         }

//         await transporter.sendMail(mailOption);

//         return NextResponse.json(
//             { message: "Email Sent Successfully" }, 
//             { status: 200 }
//         );

//     } catch (error) {
//         return NextResponse.json(
//             { message: "Failed to Send Email" }, 
//             { status: 500 }
//         );
//     }
// }
