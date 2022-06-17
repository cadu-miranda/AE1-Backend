import * as nodemailer from "nodemailer";
import MailConfig from "../config/MailConfig";

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string
  ) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  sendEmail() {
    const mailOptions = {
      from: MailConfig.user,
      to: this.to,
      subject: this.subject,
      html: this.message,
    };

    const transporter = nodemailer.createTransport({
      host: MailConfig.host,
      port: MailConfig.port,
      secure: true,
      auth: {
        user: MailConfig.user,
        pass: MailConfig.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log(`E-mail sent: ${info.response}`);
    });
  }
}

export default new Mail();
