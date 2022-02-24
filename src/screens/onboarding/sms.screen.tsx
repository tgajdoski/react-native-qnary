import React from "react";
import { Image } from "react-native";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./sms.screen.style";

import PropTypes from "prop-types";
import PhoneInput from "react-native-phone-input";
import DeviceInfo from "react-native-device-info";

import {
  Layout3,
  WizardNavigation,
  ScreenFooterClassic,
  ScreenTitle,
  ScreenDescription
} from "../../components/onboarding";
import { currentUserAccessor, withLocalization } from "../../components/hoc";
import { CountryPicker } from "../../components/app";

import { logger, navigationService } from "../../services";
import { userManager, dataService } from "../../data";

interface SmsScreenProps {
  currentUser: any;
  t: any;
  style: any;
}

@currentUserAccessor
@withLocalization
class SmsScreen extends React.Component<
  SmsScreenProps,
  {
    pickerData: any;
    validPhone: any;
  }
> {
  static propTypes = {
    t: PropTypes.func,
    currentUser: PropTypes.object
  };
  static navigationOptions = {
    header: null
  };

  myCountryPicker: any = null;
  phone: any = null;
  nextScreen = "DigitalFootprintScreen";

  constructor(props: SmsScreenProps) {
    super(props);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);

    this.state = {
      pickerData: null,
      validPhone: false
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  onNumberChange = () => {
    const self = this;
    setTimeout(() => {
      self.setState({ validPhone: self.phone.isValidNumber() });
    }, 1);
  };

  onNextButtonClick = async () => {
    try {
      const phoneNumber = this.phone.getValue();
      const iso2 = this.phone.getISOCode();
      const dialCode = this.phone.getCountryCode();

      const sms = {
        phonenumber: phoneNumber,
        formatedNumber: this.getFormattedNumber(phoneNumber),
        countrycode: iso2,
        intlprefix: dialCode
      };

      const { currentUser } = this.props;

      const model = DeviceInfo.getModel();
      const uniqueId = DeviceInfo.getUniqueID();
      const platform = DeviceInfo.getSystemName();
      const version = DeviceInfo.getSystemVersion();
      const manufacturer = DeviceInfo.getManufacturer();
      const serialnum = DeviceInfo.getSerialNumber();

      const notification = {
        app: "qnary",
        token: uniqueId,
        platform: platform.toLowerCase(),
        uid: currentUser.uid,
        status: 1,
        sms: {},
        device: {}
      };

      const device = {
        id: uniqueId, // + deviceId,
        available: true,
        cordova: "react-native",
        isVirtual: false,
        manufacturer,
        model,
        platform,
        serial: serialnum,
        uuid: uniqueId,
        version
      };

      notification.sms = sms;
      notification.device = device;

      logger.log("NOTIF SMS ", notification);

      try {
        const notifResponse = await dataService.createSMS(
          notification,
          currentUser.oid
        );

        userManager.refresh().then(() => {
          if (this.isBoarding()) {
            this.completeOnboarding();
          } else {
            this.navigateToNextScreen();
          }
        });
      } catch (error) {
        logger.log("ERROR", error);
      }
    } catch (err) {
      logger.log(err);
    }
  };

  onSkipButtonClick = async () => {
    this.completeOnboarding();
  };

  getFormattedNumber = (phoneNumber: string) =>
    phoneNumber
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "");

  completeOnboarding = () => {
    const {
      currentUser: { oid, uid }
    } = this.props;

    dataService.completeOnboarding(oid, uid).then(
      () => {
        this.navigateToNextScreen();
      },
      (err: any) => {
        logger.error(err);
        this.navigateToNextScreen();
      }
    );
  };

  selectCountry = (country: any) => {
    this.phone.selectCountry(country.iso2);
    this.setState({ validPhone: this.phone.isValidNumber() });
  };

  updatePhoneInputRef = (ref: any) => {
    this.phone = ref;
  };

  updateCountryPickerRef = (ref: any) => {
    this.myCountryPicker = ref;
  };

  isBoarding = () => {
    const { navigation } = this.props;
    const onboarding = navigation.getParam("onboarding", undefined);
    return onboarding;
  };

  navigateToNextScreen = () => {
    if (this.isBoarding()) {
      navigationService.navigate(this.nextScreen, {
        onboarding: true
      });
    } else {
      navigationService.navigate("SettingsScreen", {});
    }
  };

  render() {
    const { t, style } = this.props;
    const { pickerData, validPhone } = this.state;

    const renderFooter = () => {
      return this.isBoarding() ? (
        <WizardNavigation
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          step={3}
          steps={4}
          enabled={validPhone}
        />
      ) : (
        <ScreenFooterClassic
          onSkipButtonClick={this.onSkipButtonClick}
          onNextButtonClick={this.onNextButtonClick}
          enabled={validPhone}
        />
      );
    };
    return (
      <Layout3
        gradiendColors={["#5A92CD", "#5A92CD"]}
        footerContent={renderFooter()}
      >
        <View style={style.container}>
          <View style={style.headerContainer}>
            <Image
              source={require("../../../assets/images/onboarding/sms.png")}
            />
            <View style={style.screenTitleContainer}>
              <ScreenTitle color={"#fff"} title={t("SMS:MESSAGE_SMS")} />
            </View>
            <View style={style.screenDescriptionContainer}>
              <ScreenDescription
                color={"#FFF"}
                description={t("SMS:NOTE_SMS")}
              />
            </View>
          </View>
          <View style={style.contentContainer}>
            <View style={style.inputWrapper}>
              <PhoneInput
                style={style.input}
                ref={this.updatePhoneInputRef}
                onPressFlag={this.onPressFlag}
                onChangePhoneNumber={this.onNumberChange}
                flagStyle={style.inputFlagStyle}
                textStyle={style.inputTextStyle}
              />
              <CountryPicker
                ref={this.updateCountryPickerRef}
                data={pickerData}
                onChange={this.selectCountry}
                cancelText={t("GENERIC:CANCEL")}
              />
            </View>
          </View>
        </View>
      </Layout3>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(SmsScreen);
