import React from "react";
import { Image } from "react-native";

import { Footer, FooterTab, Button, connectStyle } from "native-base";
import { STYLE_NAME } from "./bottom-nav.component.style";

import * as PropTypes from "prop-types";

// import BadgePending from "../../screens/approvals/badge-pending.component";

import { navigationService } from "../../services";

interface BottomNavProps {
  active: string;
}

class BottomNav extends React.Component<BottomNavProps> {
  static propTypes = {
    active: PropTypes.string,
    t: PropTypes.func
  };

  isMenuActive = (name: string) => {
    const { active } = this.props;
    return name === active;
  };

  navigateTo = (targetScreen: string) => {
    navigationService.navigate(targetScreen, {});
  };

  render() {
    const { style } = this.props;

    const renderIcon = (path: string) => {
      return <Image resizeMode="contain" source={path} style={style.image} />;
    };

    return (
      <Footer style={style.footer}>
        <FooterTab>
          <Button
            vertical={true}
            onPress={this.navigateTo.bind(this, "HomeScreen")}
            style={style.button}
          >
            {this.isMenuActive("home")
              ? renderIcon(require("../../../assets/icons/home-active.png"))
              : renderIcon(require("../../../assets/icons/home.png"))}
          </Button>
          <Button
            vertical={true}
            onPress={this.navigateTo.bind(this, "ContentScreen")}
            style={style.button}
          >
            {this.isMenuActive("content")
              ? renderIcon(require("../../../assets/icons/content-active.png"))
              : renderIcon(require("../../../assets/icons/content.png"))}
          </Button>
          <Button
            vertical={true}
            onPress={this.navigateTo.bind(this, "FeedScreen")}
            style={style.button}
          >
            {this.isMenuActive("feed")
              ? renderIcon(require("../../../assets/icons/feed-active.png"))
              : renderIcon(require("../../../assets/icons/feed.png"))}
          </Button>
          <Button
            vertical={true}
            onPress={this.navigateTo.bind(this, "ReportScreen")}
            style={style.button}
          >
            {this.isMenuActive("report")
              ? renderIcon(require("../../../assets/icons/report-active.png"))
              : renderIcon(require("../../../assets/icons/report.png"))}
          </Button>
          {/* <Button
            vertical={true}
            onPress={this.navigateTo.bind(this, "SettingsScreen")}
            style={style.button}
          >
            {this.isMenuActive("settings")
              ? renderIcon(require("../../../assets/icons/settings-active.png"))
              : renderIcon(require("../../../assets/icons/settings.png"))}
          </Button> */}
        </FooterTab>
      </Footer>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(BottomNav);
