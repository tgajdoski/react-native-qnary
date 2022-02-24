1.sudo npm install

#IOS

cd ios

pod install

open ios/qnary.xcworkspace

Build & Run

#Known issues

Xcode 10: Build input file double-conversion cannot be found #21168

https://github.com/facebook/react-native/issues/21168

cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../

#Android Signed APK
https://facebook.github.io/react-native/docs/signed-apk-android

add new .env file in the root and add this content
API_URL=https://dev.api.qnary.com/
ENVIRONMENT=dev
PRIVACY_POLICY_URL=https://www.iubenda.com/privacy-policy/7833995
OAuthIO_PUBLIC_URL="2XVZsn3JX6-IaI1Kq1XfApL_lXM"

add new .env.production file in the root and add this content
API_URL=http://ec2-18-217-250-79.us-east-2.compute.amazonaws.com:41960/
ENVIRONMENT=production
PRIVACY_POLICY_URL=https://www.iubenda.com/privacy-policy/7833995
OAuthIO_PUBLIC_URL="2XVZsn3JX6-IaI1Kq1XfApL_lXM"
