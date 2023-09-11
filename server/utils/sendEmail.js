const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
        const transporter = nodemailer.createTransport({
            service: "outlook",
            port: 465,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.error("email sent successfully");
	} catch (error) {
		console.error("email not sent!");
		console.error(error);
		return error;
	}
};