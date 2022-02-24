import React, { Component } from "react";

import Deffered from "es6-deferred";

import { WebView } from "react-native";

import Modal from "react-native-modal";

import CookieManager from "react-native-cookies";

import sha1 from "./sha1";

import { Button } from "../../../components/onboarding";

class OAuthIO extends Component {
  deffered = null;

  state = {
    modalVisible: false,
    oAuthSettings: null,
    source: ""
  };

  getRedirectUrl = oAuthSettings => {
    const { provider, opts, publicUrl, callbackUrl } = oAuthSettings;

    if (typeof callbackUrl !== "string") {
      throw new Error("You must specify a callbackUrl");
    }

    if (!opts.state) {
      opts.state = sha1.create_hash();
      opts.state_type = "client";
    }

    const key = publicUrl;

    const redirectUri = encodeURIComponent(callbackUrl);
    let url = `https://oauth.io/auth/${provider}?k=${key}`;
    url += `&redirect_uri=${redirectUri}`;
    if (opts) {
      url += `&opts=${encodeURIComponent(JSON.stringify(opts))}`;
    }

    return url;
  };

  getMe = result => {
    const tokens = result.data;
    const {
      oAuthSettings: { publicUrl }
    } = this.state;

    const url = `https://oauth.io/auth/${result.provider}/me`;
    let oauthio = `k=${publicUrl}`;

    if (tokens.oauth_token && tokens.oauth_token_secret) {
      oauthio += "&oauthv=1";
    }

    for (k in tokens) {
      // eslint-disable-line
      oauthio += `&${encodeURIComponent(k)}=${encodeURIComponent(tokens[k])}`; // eslint-disable-line
    }

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        oauthio
      }
    }).then(response => response.json());
  };

  openPopup = settings => {
    this.deffered = new Deffered();
    this.setState({ oAuthSettings: settings });
    this.clearCookies();
    this.setModalVisible(true);
    return this.deffered.promise;
  };

  onShouldStartLoadWithRequest = event => {
    const self = this;
    // console.log('onShouldStartLoadWithRequest', event); // eslint-disable-line
    let isOAuthUrl = false;
    if (event.url.indexOf("#oauthio") !== -1) {
      isOAuthUrl = true;
    }

    if (isOAuthUrl) {
      const regExp = /\{([^)]+)\}/g;
      const matches = regExp.exec(decodeURIComponent(event.url));
      const result = JSON.parse(matches[0]);

      // console.log("oauthio=", result); // eslint-disable-line

      if (result !== null) {
        if (result.status === "error") {
          this.deffered.reject(result);
          self.setModalVisible(false);
        } else {
          // console.log("getMe", result);

          this.getMe(result).then(me => {
            // console.log("me", me);
            self.deffered.resolve({
              result,
              me: me.data
            });
            self.setModalVisible(false);
          });
        }
      } else {
        this.deffered.reject({ status: "error", message: "canceled" });
        self.setModalVisible(false);
      }
      return false;
    }
    return true;
  };

  clearCookies = () => {
    CookieManager.clearAll();
  };

  onModalShow = () => {
    const { oAuthSettings } = this.state;
    this.setState({ source: this.getRedirectUrl(oAuthSettings) });
  };

  onCloseButtonClick = () => {
    if (this.deffered !== null) {
      this.deffered.reject({ status: "error", message: "canceled" });
    }
    this.setModalVisible(false);
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible
    });
  };

  render() {
    const { modalVisible, source } = this.state;
    return (
      <Modal
        transparent={true}
        animationType="slide"
        isVisible={modalVisible === true}
        onModalShow={this.onModalShow}
      >
        <WebView
          ref={w => {
            this.webview = w;
          }}
          source={{ uri: source }}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          startInLoadingState={false}
          scrollEnabled={true}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        />
        <Button title="Close" onPress={this.onCloseButtonClick} />
      </Modal>
    );
  }
}

export default OAuthIO;
