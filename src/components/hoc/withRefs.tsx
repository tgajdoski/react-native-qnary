import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

function withRefs(WrappedComponent) {
  class HOC extends React.Component {
    async componentDidMount() {
      const { onRef } = this.props;
      if (onRef !== null) {
        onRef(this.instance);
      }
    }

    componentWillUnmount() {
      const { onRef } = this.props; // eslint-disable-line
      if (onRef !== null) {
        onRef(undefined);
      }
    }

    render() {
      return (
        <WrappedComponent
          ref={ref => {
            this.instance = ref;
          }}
          {...this.props}
        />
      );
    }
  }

  hoistNonReactStatics(HOC, WrappedComponent);
  return HOC;
}

export default withRefs;
