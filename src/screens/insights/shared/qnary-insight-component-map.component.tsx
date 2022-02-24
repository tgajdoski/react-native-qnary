import {
  OptimizeResults,
  ScanResults,
  SearchResults,
  SearchLeaveTop10,
  SearchNewTop10,
  SearchReenteredTop10,
  SearchChanged,
  SearchMoved,
  StreamTwitterTwitterTweet,
  StreamSuperfeedrRule02,
  StreamBuzzsumoRule01,
  SocialFollowers,
  SocialEngagementOverall01,
  SocialEngagementContent01,
  SocialEngagementEngagers01,
  SocialEngagementEngagersByEngagement01,
  SocialMilestonesFollowers01
} from "../components";

const componentMap = {
  //  Optimize insights.
  optimizeResults01: OptimizeResults,
  scanResults01: ScanResults,

  //  Search insights.
  searchResults01: SearchResults,
  searchLeaveTop10_01: SearchLeaveTop10,
  searchnewTop10_01: SearchNewTop10,
  searchReenteredTop10_01: SearchReenteredTop10,
  searchChanged01: SearchChanged,
  searchMoved01: SearchMoved,

  //  Stream insights.
  streamSuperFeedRule02: StreamSuperfeedrRule02,
  streamBuzzsumoRule01: StreamBuzzsumoRule01,
  streamTwitterRule01: StreamTwitterTwitterTweet,

  //  Social insights
  socialFollowers01: SocialFollowers,
  engagementOverall01: SocialEngagementOverall01,
  engagementContent01: SocialEngagementContent01,
  engagementEngagers01: SocialEngagementEngagers01,
  engagementEngagersbyInfluence01: SocialEngagementEngagers01,
  engagementEngagersbyEngagement01: SocialEngagementEngagersByEngagement01,
  socialMilestonesFollowers01: SocialMilestonesFollowers01
};

export default componentMap;
