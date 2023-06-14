const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codemaster9428@gmail.com",
    pass: "gaveycocpblhikdg",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    const mailOptions = {
      from: "kiru Natarajan <codemaster9428@gmail.com>",
      to: dest,
      subject: "Reset your Password!", // email subject
      html: `
        <a href="https://maiinn.xyz/reset-password.html?email=${dest}">
        Please reset your password</a>
      `, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Email sent!");
    });
  });
});

exports.updatePassword = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const {email, newPassword} = req.query;
    admin.auth().getUserByEmail(email)
        .then((userRecord) => {
          admin.auth().updateUser(userRecord.uid, {password: newPassword})
              .then(() => {
                // Update successful
                return res.send("Password updated successfully.");
              })
              .catch((error) => {
                // An error occurred while updating the password
                return res.send(error.toString());
              });
          // return res.send(userRecord.uid);
        })
        .catch((error) => {
        // User not found or error occurred
          return res.send(error.toString());
        });
  });
});


