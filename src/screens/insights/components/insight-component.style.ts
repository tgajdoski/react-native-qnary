import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.InsightComponent.Component";

export const generateStyle = (variables = variable) => ({
  marginTop5: {
    marginTop: 5
  },
  marginTop10: {
    marginTop: 10
  },
  text: {
    color: "#434343",
    fontSize: 15,
    lineHeight: 20
  },
  italicText: {
    color: "#434343",
    fontStyle: "italic",
    fontSize: 12,
    lineHeight: 15
  },
  networkName: { color: "#0277bd" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  stream_buzzsumo_rule_01: {
    objectImage: {
      flex: 1,
      width: "100%",
      height: 200
    },
    totalShares: {
      flex: 1,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center"
    }
  },
  stream_superfeedr_rule_02: {
    standardLinkThumbnail: {
      flex: 1,
      width: "100%",
      height: 200
    }
  },
  rank: {
    rankContainer: {
      marginTop: 10,
      alignItems: "flex-start",
      justifyContent: "center"
    },
    networkNameContainer: {
      marginRight: 10,
      justifyContent: "center"
    },
    rankContainerInner: {
      padding: 5,
      backgroundColor: "#F39C12"
    },
    rank: {
      color: "#fff",
      fontSize: 10
    }
  }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
