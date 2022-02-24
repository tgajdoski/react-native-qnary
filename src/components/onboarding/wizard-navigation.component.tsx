import React from "react";

import * as PropTypes from "prop-types";

import { View, Item, connectStyle, Text, Left, Right, Body } from "native-base";
import { STYLE_NAME } from "./wizard-navigation.component.style";
import { withLocalization } from "../hoc";
import renderIf from "render-if";

interface WizardNavigationProps {
  onSkipButtonClick: () => void;
  onNextButtonClick: () => void;
  step: number;
  steps: number;
  enabled: boolean;
  style: any;
  t: any;
}

@withLocalization
class WizardNavigation extends React.PureComponent<WizardNavigationProps> {
  static propTypes = {
    onSkipButtonClick: PropTypes.func.isRequired,
    onNextButtonClick: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    steps: PropTypes.number.isRequired,
    enabled: PropTypes.bool.isRequired
  };

  onNextButtonClickIntl = () => {
    const { onNextButtonClick, enabled } = this.props;
    if (enabled) {
      onNextButtonClick();
    }
  };

  render() {
    const { onSkipButtonClick, step, steps, style, enabled, t } = this.props;

    const nextButtonStyle = { ...style.nextButton };

    if (!enabled) {
      nextButtonStyle.color = "#6F6F6F";
    }

    return (
      <View style={style.container}>
        <Item style={style.innerContainer}>
          <Left>
            <Text style={style.skipButton} onPress={onSkipButtonClick}>
              {t("GENERIC:SKIP")}
            </Text>
          </Left>
          <Body>
            <View style={style.bodyContainer}>
              <Text style={style.step}>{step}</Text>
              <Text style={style.steps}>/</Text>
              <Text style={style.steps}>{steps}</Text>
            </View>
          </Body>
          <Right>
            <Text style={nextButtonStyle} onPress={this.onNextButtonClickIntl}>
              {renderIf(step !== steps)(t("GENERIC:CONTINUE"))}
              {renderIf(step === steps)(t("GENERIC:FINISH"))}
            </Text>
          </Right>
        </Item>
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(WizardNavigation);
