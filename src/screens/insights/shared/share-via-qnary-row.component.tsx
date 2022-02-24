import React from "react";

import PropTypes from "prop-types";

import { View, connectStyle } from "native-base";
import { STYLE_NAME } from "./share-via-qnary-row.component.style";

import { InsightShare, ShareViaQnaryModal } from ".";
import { organizationUserConnections } from "../../../services";
import NetworkIcon from "../../optimize/components/network-icon.component";
import { TouchableOpacity } from "react-native";

class ShareViaQnaryRow extends React.PureComponent {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    connections: PropTypes.array.isRequired,
    content: PropTypes.string.isRequired
  };

  state = {
    qnaryShare: {},
    modalVisible: false
  };

  shareViaQnary = (connection: any, content: string) => {
    const qnaryShare = {
      connection,
      content
    };
    this.setState({ qnaryShare }, () => {
      this.setState({ modalVisible: true });
    });
  };

  render() {
    const { insight, connections, content, style } = this.props;
    const { modalVisible, qnaryShare } = this.state;
    const filtered = organizationUserConnections.isPublishAvailable(
      connections
    );
    return (
      <View style={style.container}>
        {filtered.map(connection => {
          const { id, source } = connection;
          return (
            <View key={id} style={style.item}>
              <TouchableOpacity
                onPress={this.shareViaQnary.bind(this, connection, content)}
              >
                <NetworkIcon source={source} width={24} height={24} />
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={style.insightShare}>
          <InsightShare insight={insight} />
        </View>
        <ShareViaQnaryModal isVisible={modalVisible} qnaryShare={qnaryShare} />
      </View>
    );
  }
}

export default connectStyle(STYLE_NAME, {})(ShareViaQnaryRow);
