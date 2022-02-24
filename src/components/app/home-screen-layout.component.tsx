import React, { ReactNode } from "react";
import { connectStyle, Drawer, Container, View } from "native-base";
import { STYLE_NAME } from "./home-screen-layout.component.style";
import * as PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

import { Sidebar } from ".";
import ImageButton from "./image-button.component";
import { KeyboardAwareContent } from "../custom";

interface HomeScreenLayoutProps {
  children: ReactNode;
  gradiendColors: string[];
  footerContent: ReactNode;
  fixedFooter?: boolean;
}

class HomeScreenLayout extends React.PureComponent<HomeScreenLayoutProps> {
  static propTypes = {
    children: PropTypes.node,
    gradiendColors: PropTypes.array,
    footerContent: PropTypes.node,
    fixedFooter: PropTypes.bool
  };

  constructor(props: HomeScreenLayoutProps) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  drawer: any = null;

  state = {
    isOpen: false
  };

  closeDrawer() {
    if (this.drawer && this.drawer._root !== null) {
      this.drawer._root.close();
      this.setState({ isOpen: false });
    }
  }

  openDrawer() {
    this.drawer._root.open();
    this.setState({ isOpen: true });
  }

  render() {
    const { children, gradiendColors, style } = this.props;

    const renderDrawerContent = () => {
      const { isOpen } = this.state;
      if (isOpen) {
        return <Sidebar closeDrawer={this.closeDrawer} />;
      }
      return <View />;
    };

    let gradiendColorsDefault = ["#00D2FF", "#3A7BD5"];
    if (gradiendColors !== undefined) {
      gradiendColorsDefault = gradiendColors;
    }

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        type="displace"
        content={renderDrawerContent()}
        onOpen={this.openDrawer}
        onClose={this.closeDrawer}
      >
        <Container style={style.container}>
          <LinearGradient
            style={style.background}
            colors={gradiendColorsDefault}
          >
            <KeyboardAwareContent
              contentContainerStyle={style.contentContainer}
            >
              <View style={style.headerContainer}>
                <ImageButton
                  image={require("../../../assets/icons/more.png")}
                  width={23}
                  height={23}
                  onPress={this.openDrawer}
                />
              </View>
              <View style={style.contentContainerInner}>{children}</View>
            </KeyboardAwareContent>
          </LinearGradient>
        </Container>
      </Drawer>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(HomeScreenLayout);
