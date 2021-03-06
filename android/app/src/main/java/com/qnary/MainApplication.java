package com.qnary.qnary.dev;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import io.fabric.sdk.android.Fabric;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.amazonaws.amplify.pushnotification.RNPushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new VectorIconsPackage(),
          new SplashScreenReactPackage(), new RNSharePackage(), new LinearGradientPackage(), new RNDeviceInfo(),
          new CookieManagerPackage(), new RNPushNotificationPackage(), new RNFirebasePackage(),
          new RNFirebaseAuthPackage(), new RNFirebaseCrashlyticsPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
