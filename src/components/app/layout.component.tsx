import React, { Component } from "react";
import {
  View,
  Drawer,
  Container,
  Body,
  Text,
  Header,
  Left,
  Right,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./layout.component.style";

import * as PropTypes from "prop-types";
import { Sidebar } from ".";
import ImageButton from "./image-button.component";

interface LayoutProps {
  title: string;
  hasTabs?: boolean;
  headerLeft?: () => JSX.Element | null;
  headerRight?: () => JSX.Element | null;
  children: Element[];
}

class Layout extends Component<LayoutProps> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hasTabs: PropTypes.bool,
    children: PropTypes.node,
    headerLeft: PropTypes.func,
    headerRight: PropTypes.func
  };

  constructor(props: LayoutProps) {
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
    const { title, hasTabs, children, style } = this.props;
    const renderDrawerContent = () => {
      const { isOpen } = this.state;
      if (isOpen) {
        return <Sidebar closeDrawer={this.closeDrawer} />;
      }
      return <View />;
    };

    const renderHeaderLeftContent = () => {
      const { headerLeft } = this.props;
      if (headerLeft !== null && headerLeft != undefined) {
        return headerLeft();
      }
      return (
        <ImageButton
          image={require("../../../assets/icons/more.png")}
          width={23}
          height={23}
          onPress={this.openDrawer}
        />
      );
    };

    const renderHeaderRightContent = () => {
      const { headerRight } = this.props;
      if (headerRight !== null && headerRight != undefined) {
        return headerRight();
      }
      return null;
    };

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        type="displace"
        content={renderDrawerContent()}
        onOpen={this.openDrawer}
        onClose={this.closeDrawer}
        panOpenMask={0.8}
      >
        <Container>
          <Header hasTabs={!!hasTabs} style={style.header}>
            <Left style={style.left}>{renderHeaderLeftContent()}</Left>
            <Body style={style.body}>
              <View style={style.headerInner}>
                <Text style={style.headerText}>{title}</Text>
              </View>
            </Body>
            <Right style={style.right}>{renderHeaderRightContent()}</Right>
          </Header>
          {children}
        </Container>
      </Drawer>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Layout);
