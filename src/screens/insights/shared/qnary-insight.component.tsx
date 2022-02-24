import React from "react";

import PropTypes from "prop-types";

import _ from "lodash";

import componentMap from "./qnary-insight-component-map.component";

import { logger } from "../../../services";

class QnaryInsight extends React.Component {
  static propTypes = {
    insight: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    connections: PropTypes.array.isRequired
  };
  getComponent = insight => {
    const component = componentMap[insight.__typename];

    if (component === undefined) {
      logger.log(
        "component was not found for key with: ",
        insight.id,
        insight.__typename
      );
      return undefined;
    }

    return component;
  };

  render = () => {
    const { insight, profile, connections } = this.props;

    if (insight.id === undefined) {
      return null;
    }

    const InsightComponent = this.getComponent(insight);

    if (InsightComponent === undefined) {
      return null;
    }

    return (
      <InsightComponent
        insight={insight}
        profile={profile}
        connections={connections}
      />
    );
  };
}

export default QnaryInsight;
