const admin = require("firebase-admin");
const serviceAccount = require("./snippetsmasterauth-firebase-adminsdk-fbsvc-22382ef7d9.json"); // Update path

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = admin;
