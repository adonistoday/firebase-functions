const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  const email=request.email;
  response.send("Hello from Firebase!", email);
});

// const admin = require("firebase-admin");

// admin.initializeApp();

// exports.sendPasswordResetEmail =
// functions.https.onCall(async (data, context) => {
//   try {
//     const email = data.email;

//     if (!email) {
//       throw new Error("Email is required.");
//     }

//     await admin.auth().sendPasswordResetEmail(email);

//  return {success: true, message: "Password reset email sent successfully."};
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new functions.https.HttpsError("internal",
//         "Error sending password reset email.");
//   }
// });
