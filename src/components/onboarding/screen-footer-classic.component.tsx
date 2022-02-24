import React from "react";

import * as PropTypes from "prop-types";

import { View, Item, connectStyle, Text, Left, Right } from "native-base";
import { STYLE_NAME } from "./screen-footer-classic.component.style";
import { withLocalization } from "../hoc";

interface ScreenFooterClassicProps {
  onSkipButtonClick: () => void;
  onNextButtonClick: () => void;
  enabled: boolean;
  style: any;
  t: any;
}

@withLocalization
class ScreenFooterClassic extends React.PureComponent<
  ScreenFooterClassicProps
> {
  static propTypes = {
    onSkipButtonClick: PropTypes.func.isRequired,
    onNextButtonClick: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired
  };

  onNextButtonClickIntl = () => {
    const { onNextButtonClick, enabled } = this.props;
    if (enabled) {
      onNextButtonClick();
    }
  };

  render() {
    const { onSkipButtonClick, style, enabled, t } = this.props;

    const nextButtonStyle = { ...style.nextButton };

    if (!enabled) {
      nextButtonStyle.color = "#6F6F6F";
    }

    return (
      <View style={style.container}>
        <Item style={style.innerContainer}>
          <Left>
            <Text style={style.skipButton} onPress={onSkipButtonClick}>
              {t("GENERIC:CANCEL")}
            </Text>
          </Left>
          <Right>
            <Text style={nextButtonStyle} onPress={this.onNextButtonClickIntl}>
              {t("GENERIC:OKAY")}
            </Text>
          </Right>
        </Item>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ScreenFooterClassic);
