import React from "react";
import {
  View,
  Content,
  Text,
  List,
  ListItem,
  Icon,
  connectStyle
} from "native-base";
import { STYLE_NAME } from "./sidebar.component.style";

import * as PropTypes from "prop-types";
import renderIf from "render-if";

import BadgePending from "../../screens/approvals/badge-pending.component";
import { PrivacyPolicyDialog } from "../../screens/login";
import { navigationService } from "../../services";
import { withLocalization } from "../hoc";

const menu = {
  groups: [
    {
      name: "group1",
      items: [
        {
          name: "MENU:HOME",
          icon: "home",
          meta: {
            targetScreen: "HomeScreen"
          }
        },
        {
          name: "MENU:CONTENT",
          icon: "copy",
          meta: {
            targetScreen: "ContentScreen"
          }
        },
        {
          name: "MENU:FEED",
          icon: "list",
          meta: {
            targetScreen: "FeedScreen"
          }
        },
        {
          name: "MENU:OPTIMIZE",
          icon: "eye",
          meta: {
            targetScreen: "DigitalFootprintScreen"
          }
        }
      ]
    },
    {
      name: "group2",
      items: [
        {
          name: "MENU:REPORT",
          icon: "bar-chart",
          meta: {
            targetScreen: "ReportScreen"
          }
        }
      ]
    },
    {
      name: "group3",
      items: [
        {
          name: "MENU:PROFILE",
          icon: "user",
          meta: {
            targetScreen: "ProfileScreen"
          }
        },
        {
          name: "MENU:CONTACT_ADMIN",
          icon: "comments-o",
          meta: {
            targetScreen: "ContactAdminScreen"
          }
        },
        {
          name: "MENU:SETTINGS",
          icon: "gear",
          meta: {
            targetScreen: "SettingsScreen"
          }
        }
      ]
    },
    {
      name: "group4",
      items: [
        {
          name: "MENU:LOGOUT",
          icon: "sign-out",
          meta: {
            targetScreen: "LogoutScreen"
          }
        }
      ]
    },
    {
      name: "group5",
      items: [
        {
          name: "MENU:PRIVACY_POLICY",
          icon: "lock",
          meta: {
            targetScreen: null
          }
        }
      ]
    }
  ]
};

interface SidebarProps {
  closeDrawer: () => void;
  t: (key: string) => string;
  style: any;
}

@withLocalization
class Sidebar extends React.Component<SidebarProps> {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired,
    t: PropTypes.func
  };

  state = {
    menu,
    privacyPolicyDialogVisible: false
  };

  closeDrawer: any;

  constructor(props: SidebarProps) {
    super(props);
    this.closeDrawer = props.closeDrawer;
  }

  onMenuItemClick = (item: any) => {
    if (item.meta.targetScreen !== null) {
      navigationService.navigate(item.meta.targetScreen, {});
      if (this.closeDrawer !== null) {
        this.closeDrawer();
      }
    } else if (item.name === "MENU:PRIVACY_POLICY") {
      this.setState({
        privacyPolicyDialogVisible: true
      });
    }
  };

  render() {
    const { t, style } = this.props;
    const { menu, privacyPolicyDialogVisible } = this.state;

    const renderMenuItem = (item: any) => (
      <ListItem
        key={item.name}
        style={style.menuItem}
        button={true}
        onPress={this.onMenuItemClick.bind(this, item)}
      >
        <Icon style={style.menuItemIcon} type="FontAwesome" name={item.icon} />
        <Text style={style.menuItemText}>{t(`${item.name}`)}</Text>
        {renderIf(item.name === "MENU:CONTENT")(
          <BadgePending
            badgeStyle={style.badgeStyle}
            textStyle={style.badgeText}
          />
        )}
      </ListItem>
    );

    const renderMenu = () => {
      const renderBreak = (i: number) => {
        if (i >= menu.groups.length - 1) {
          return null;
        }
        return <View style={style.break} />;
      };
      return menu.groups.map((group, i) => (
        <View key={group.name}>
          <List>{group.items.map(item => renderMenuItem(item))}</List>
          {renderBreak(i)}
        </View>
      ));
    };

    return (
      <Content style={style.container}>
        <View style={style.logoWrapper} />
        {renderMenu()}
        <PrivacyPolicyDialog isVisible={privacyPolicyDialogVisible} />
      </Content>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(Sidebar);
