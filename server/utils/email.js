const pug = require("pug");
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const { Info, Price } = require("../data/info");

module.exports = class Email {
  constructor(user, url = "#") {
    this.to = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.url = url;
    this.from = `${process.env.EMAIL_FROM}`;
    this.data = user;
  }

  async newTransport() {
    if (process.env.NODE_ENV === "production") {
      let info = await Info();
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          //user: process.env.SENDGRID_USERNAME,
          //pass: process.env.SENDGRID_PASSWORD,
          user: "apikey",
          //pass: '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'
          pass: info.sendgridKey,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    let info = await Info();
    let price = await Price();
    const html = pug.renderFile(
      `${__dirname}/../templates/emails/${template}.pug`,
      {
        firstName: this.firstName,
        lastName: this.lastName,
        url: this.url,
        subject,
        info,
        price,
        data: this.data,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.fromString(html),
    };

    let transport = await this.newTransport();
    await transport.sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to PicsFies!");
  }

  async sendConfirmation() {
    await this.send("confirm", "Confirm your email address");
  }

  async sendOrderComplete() {
    await this.send(
      "order_complete",
      "PicsFies: Good News! Your order is complete!"
    );
  }

  async sendPasswordReset() {
    await this.send(
      "password",
      "Your password reset token (valid for only 10 mins)"
    );
  }

  async sendInvoice() {
    await this.send("invoice", "Your order has been placed");
  }
};
