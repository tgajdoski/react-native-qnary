class SocialNetworkOrderService {
  socialNetworkOrder = [
    "twitter",
    "linkedin",
    "facebook",
    "googleplus",
    "instagram",
    "tumblr",
    "youtube"
  ];

  supported = [
    ["twitter", "Twitter"],
    ["linkedin", "LinkedIn"],
    ["facebook", "Facebook"],
    ["instagram", "Instagram"]
    // ["googleplus", "Google+"],
    // ["tumblr", "Tumblr"],
    // ["youtube", "YouTube"]
  ];

  unsupported = [
    ["aboutme", "about.me"],
    ["angellist", "angelList"],
    ["behance", "Behance"],
    ["crunchbase", "Crunchbase"],
    ["flickr", "Flickr"],
    ["klout", "Klout"],
    ["pinterest", "Pinterest"],
    ["quora", "Quora"],
    ["slideshare", "Slideshare"],
    ["soundcloud", "SoundCloud"],
    ["vimeo", "Vimeo"],
    ["wordpress", "Wordpress"],
    ["blog", "Blog"]
  ];

  getName = (arr, source) => {
    const l = arr.length;
    for (let i = 0; i < l; i += 1) {
      if (arr[i][0] === source) {
        return arr[i][1];
      }
    }
    return "";
  };

  getName = (source: string) => {
    // eslint-disable-line
    return (
      this.getName(this.supported, source) ||
      this.getName(this.unsupported, source) ||
      source
    );
  };

  orderArray = (arr, el) => {
    const { socialNetworkOrder } = this;
    arr.sort((a, b) => {
      const indA =
        socialNetworkOrder.indexOf(a[el]) !== -1
          ? socialNetworkOrder.indexOf(a[el])
          : socialNetworkOrder.length;
      const indB =
        socialNetworkOrder.indexOf(b[el]) !== -1
          ? socialNetworkOrder.indexOf(b[el])
          : socialNetworkOrder.length;
      if (indA < indB) {
        return -1;
      }
      if (indA > indB) {
        return 1;
      }
      return 0;
    });
    return arr;
  };

  orderObject = (obj, el) => {
    const arr = [];
    for (const key in obj) {
      arr.push(obj[key]);
    }
    return this.orderArray(arr, el);
  };
}

const socialNetworkOrderService = new SocialNetworkOrderService();
export default socialNetworkOrderService;
