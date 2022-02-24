import variable from "../../../../native-base-theme/variables/platform";

export const STYLE_NAME = "Qnary.App.TwitterTweet.Component";

export const generateStyle = (variables = variable) => ({
  header: { flexDirection: "row", paddingRight: 20 },
  actorImage: {
    flex: 1,
    height: 50,
    width: 50,
    borderRadius: 5
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  content: { marginTop: 10 },
  imageContainer: { marginTop: 10 },
  tweetImage: {
    flex: 1,
    width: "100%",
    height: 200
  },
  object: { marginTop: 10 },
  date: { flex: 1, flexDirection: "row" },
  text: { color: "#434343", fontSize: 15, lineHeight: 20 }
});

export const styleRule = (variables = variable) => ({
  [STYLE_NAME]: generateStyle(variables)
});
