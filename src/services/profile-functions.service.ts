class ProfileFunctionsService {
  getAvatar = conn => {
    const getUserAvatar = conn => {
      let userAvatar = "";

      if (conn.avatar && typeof conn.avatar === "string") {
        userAvatar = conn.avatar;
      } else if (conn.photo && conn.photo.url) {
        userAvatar = conn.photo.url;
      } else if (conn.raw) {
        if (conn.raw.pictureUrl) {
          userAvatar = conn.raw.pictureUrl;
        } else if (conn.raw.profile_image_url) {
          userAvatar = conn.raw.profile_image_url;
        }
      }

      if (userAvatar.indexOf("https://pbs.twimg.com") !== -1) {
        userAvatar = userAvatar.replace("_normal", "_bigger");
      }

      return userAvatar;
    };

    if (!!conn && !!conn.profile) {
      return getUserAvatar(conn.profile);
    }
    return "";
  };

  getFullName = conn => {
    function linkedin(conn) {
      return (conn.profile || {}).name || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin,
      googleplus: linkedin,
      twitter: linkedin,
      facebook: linkedin,
      instagram: linkedin,
      tumblr: def,
      youtube: linkedin
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getDisplayName = conn => {
    function linkedin(conn) {
      return (conn.profile || {}).name || (conn.profile || {}).username || "";
    }

    function twitter(conn) {
      const name = conn.profile.alias || conn.profile.username;
      if (!name) {
        return "";
      }

      return `@${name}`;
    }
    function instagram(conn) {
      return conn.profile.alias || conn.profile.username || "";
    }
    const f = {
      linkedin,
      googleplus: linkedin,
      twitter,
      facebook: linkedin,
      instagram,
      tumblr: instagram,
      youtube: linkedin
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getID = conn => {
    function linkedin(conn) {
      return (conn.profile || {}).id || "";
    }
    function twitter(conn) {
      return conn.profile.id || "";
    }
    function instagram(conn) {
      return conn.profile.alias || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin,
      googleplus: linkedin,
      twitter,
      facebook: linkedin,
      instagram,
      tumblr: instagram,
      youtube: linkedin
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getPublicUrl = conn => {
    function googleplus(conn) {
      return conn.profile.raw.url || "";
    }
    function facebook(conn) {
      return conn.profile.raw.link || "";
    }
    function instagram(conn) {
      return conn.profile.raw.data.website || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin: def,
      googleplus,
      twitter: googleplus,
      facebook,
      instagram,
      tumblr: def,
      youtube: googleplus
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getBio = conn => {
    function linkedin(conn) {
      return conn.profile.bio || "";
    }
    function googleplus(conn) {
      return conn.profile.raw.aboutMe || "";
    }
    function twitter(conn) {
      return conn.profile.raw.description || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin,
      googleplus,
      twitter,
      facebook: def,
      instagram: linkedin,
      tumblr: def,
      youtube: googleplus
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getPrimaryWebsite = conn => {
    function googleplus(conn) {
      return conn.profile.raw.url || "";
    }
    function twitter(conn) {
      return conn.profile.raw.entities.url.urls[0].expanded_url || "";
    }
    function facebook(conn) {
      return conn.profile.raw.link || "";
    }
    function instagram(conn) {
      return conn.profile.raw.data.website || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin: def,
      googleplus,
      twitter,
      facebook,
      instagram,
      tumblr: def,
      youtube: googleplus
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getHeaderImage = conn => {
    function twitter(conn) {
      return conn.profile.raw.profile_banner_url || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin: def,
      googleplus: def,
      twitter,
      facebook: def,
      instagram: def,
      tumblr: def,
      youtube: def
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getFollowers = conn => {
    function twitter(conn) {
      return conn.profile.followers || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin: def,
      googleplus: def,
      twitter,
      facebook: def,
      instagram: def,
      tumblr: def,
      youtube: def
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getFollowing = conn => {
    function twitter(conn) {
      return conn.profile.followers || "";
    }
    function def() {
      return "";
    }
    const f = {
      linkedin: def,
      googleplus: def,
      twitter,
      facebook: def,
      instagram: def,
      tumblr: def,
      youtube: def
    };
    if (conn && conn.source) {
      if (f[conn.source]) {
        return f[conn.source](conn);
      }
      return conn.source;
    }
    return "";
  };

  getSearchable = () => true;

  getTweetsPublic = conn => {
    if (conn && conn.source === "twitter") {
      return conn.profile.raw.protected;
    }

    return true;
  };

  anyName = conn =>
    this.getDisplayName(conn) || this.getFullName(conn) || this.getID(conn);
}

const profileFunctionsService = new ProfileFunctionsService();
export default profileFunctionsService;
