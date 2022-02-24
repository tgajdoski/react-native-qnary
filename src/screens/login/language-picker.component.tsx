import React, { Component } from "react";

import { View, ActionSheet } from "native-base";

import PropTypes from "prop-types";

import { languages, localizationService } from "../../localization";
import { withLocalization } from "../../components/hoc";

@withLocalization
class LanguagePicker extends Component {
  static propTypes = {
    t: PropTypes.func,
    onRef: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  componentDidMount() {
    const { t, onRef } = this.props;

    onRef(this);

    const options = languages.map(opt => opt.name);

    options.push(t("GENERIC:CANCEL_BUTTON"));

    this.setState({
      options,
      CANCEL_INDEX: options.length - 1
    });
  }

  open = () => {
    const { t } = this.props;
    const { options, CANCEL_INDEX } = this.state;
    ActionSheet.show(
      {
        options,
        cancelButtonIndex: CANCEL_INDEX,
        title: t("LOGIN:SELECT_LANGUAGE")
      },
      selectedIndex => {
        if (selectedIndex === CANCEL_INDEX) {
          return false;
        }
        const selectedLanguage = languages[selectedIndex];
        localizationService.setCurrentLanguage(selectedLanguage);
        return true;
      }
    );
  };

  render() {
    const { children } = this.props;
    return <View>{children}</View>;
  }
}

export default LanguagePicker;
