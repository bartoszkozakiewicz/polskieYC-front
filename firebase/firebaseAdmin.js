import admin from 'firebase-admin';
const serviceAccount = require('./keys.json');

console.log("Admin apps: ", admin.apps);

if (!admin.apps.length) {
    console.log("Initialize admin app: " , serviceAccount);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
}

export default admin;
