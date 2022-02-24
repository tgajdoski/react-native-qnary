import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.ApprovalListItem.Component";

export const generateStyle = (variables = variable) => ({
  listItem: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
    backgroundColor: "#FBFBFB",
    borderBottomWidth: 0
  },
  card: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: "#fff",
    borderLeftColor: "#EFEFEF",
    borderLeftWidth: 0.5,
    borderRightColor: "#EFEFEF",
    borderRightWidth: 0.5,
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 0.5
  },
  cardHeader: {
    borderLeftColor: "#FFF",
    borderLeftWidth: 5,
    paddingTop: 20,
    paddingBottom: 20
  },
  cardBody: {
    paddingLeft: 20,
    paddingRight: 20
  },
  cardBodyContent: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    borderTopColor: "#EFEFEF",
    borderTopWidth: 0.5,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 0.5
  },
  cardFooter: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  cardFooterContent: {
    width: "100%"
  },
  footer_item: { borderBottomWidth: 0 },
  footer_left: { flex: 0.8 },
  footer_right: { flex: 0.2 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
