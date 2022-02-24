const apn = require('apn');

const options = {
  token: {
    key: './AuthKey_56W8W8H5NX.p8',
    keyId: '56W8W8H5NX',
    teamId: 'VQX33AM4NA',
  },
  production: false,
};
const apnProvider = new apn.Provider(options);

const deviceToken = '13c8f5a83667611657075874005804519490db770018e735414b953209359411';
const note = new apn.Notification();

note.alert = 'This is only a test. IST WORLKING WELL';
note.payload = { messageFrom: 'Qnary System' };
note.topic = 'com.qnary.react.native';  // The topic is usually the bundle identifier of your application.

apnProvider.send(note, deviceToken)
  .then((result) => {
    console.log(JSON.stringify(result));

  });
