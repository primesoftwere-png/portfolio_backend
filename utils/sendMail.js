const nodemailer = require("nodemailer");


const sendMail = async ({ name, email, services, projectDetail }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"Website Inquiry" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVER_MAIL,
      subject: "🚀 New Project Inquiry Received",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background:#f4f6fb; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#667eea,#764ba2); padding:20px 30px; color:#ffffff;">
              <h2 style="margin:0; font-size:22px;">New Project Inquiry</h2>
              <p style="margin:5px 0 0; font-size:14px; opacity:0.9;">
                A new inquiry has been submitted from your website
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <p style="margin:0 0 15px; color:#333; font-size:15px;">
                <strong>Client Details</strong>
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#444;">
                <tr>
                  <td style="padding:10px 0;"><strong>Name:</strong></td>
                  <td style="padding:10px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;"><strong>Email:</strong></td>
                  <td style="padding:10px 0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;"><strong>Services:</strong></td>
                  <td style="padding:10px 0;">${services}</td>
                </tr>
              </table>
              <div style="margin-top:25px;">
                <p style="margin:0 0 8px; font-size:14px; color:#333;"><strong>Project Details</strong></p>
                <div style="background:#f4f6fb; padding:15px; border-radius:6px; color:#555; line-height:1.6;">
                  ${projectDetail}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#f4f6fb; padding:15px 30px; text-align:center; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Your Company Name  
              <br/>
              This email was generated automatically.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("sendMail error:", err);
    throw new Error("Failed to send email: " + err.message);
  }
};

module.exports = sendMail;
