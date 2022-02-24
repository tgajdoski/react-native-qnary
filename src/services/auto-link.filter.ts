import Twitter from "twitter-text";

const autoLinkFilter = {
  autoLink: (text: string, source: string, options?: any) => {
    const autoLinkOptions = {
      ...(options || {}),
      targetBlank: true
    };

    if (source === "twitter") {
      return Twitter.autoLink(text, autoLinkOptions);
    }

    const links = Twitter.extractUrlsWithIndices(text);
    return Twitter.autoLinkEntities(text, links, autoLinkOptions);
  }
};

export default autoLinkFilter;
