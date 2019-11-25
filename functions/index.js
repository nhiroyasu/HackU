const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();
const storage = admin.storage();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send(request.params);
  });
  
  exports.story_room = functions.https.onRequest((request, response) => {
    const sub_domain = 'story_room';
    if (request.params[0] !== "") {
      const param = request.params[0].slice(1);
      db.ref('stories').on('value', snapshot => {
        response.send(createHtml(param));
      });
    } else {
      response.send("params is not finded.");
    }
  });
  
  const createHtml = (story_id) => {
    const SITEURL = 'https://dust-cf800.firebaseapp.com';
    const PAGEURL = `${SITEURL}/story_room/${story_id}`;
    const TITLE = 'DUST';
    const DESCRIPTION = 'DUSTに参加しよう！';
    return `
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>colorinco</title>
      <meta property="og:title" content="${TITLE}">
      <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/dust-cf800.appspot.com/o/AppMaterial%2Fdust_twi.png?alt=media">
      <meta property="og:description" content="${DESCRIPTION}">
      <meta property="og:type" content="article">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${TITLE}">
      <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/dust-cf800.appspot.com/o/AppMaterial%2Fdust_twi.png?alt=media">
      <meta name="twitter:description" content="${DESCRIPTION}">
    </head>
    <body>
      <script type="text/javascript">window.location="${SITEURL}?redirect_to_room=${story_id}";</script>
    </body>
  </html>
  `
  }
  