const oAuthIOService = {
  SETTINGS: {
    google_plus: {
      authorize: {
        approval_prompt: "force"
      }
    },
    youtube: {
      authorize: {
        approval_prompt: "force"
      }
    },
    twitter: {
      authorize: {
        approval_prompt: "force",
        force_login: true
      }
    },
    // tslint:disable-next-line:max-line-length
    // https://www.linkedin.com/oauth/v2/authorization?scope=r_basicprofile+rw_organization&state=199435fef19aed06800b1dd39548d5c4&client_id=77n2cwdsyvrgyf&redirect_uri=https%3A%2F%2Fbuffer.com%2Foauth%2Flinkedin%2Freconnect&response_type=code
    // tslint:disable-next-line:max-line-length
    // https://www.linkedin.com/oauth/v2/authorization?scope=r_basicprofile rw_organization&state=199435fef19aed06800b1dd39548d5c4&client_id=77n2cwdsyvrgyf&redirect_uri=https://buffer.com/oauth/linkedin/reconnect&response_type=code
    linkedin2: {
      authorize: {
        approval_prompt: "force",
        force_login: true,
        prompt: "login",
        reauthenticate: true
      }
    },
    facebook: {
      authorize: {
        approval_prompt: "force",
        force_login: true,
        prompt: "login",
        reauthenticate: true
      }
    }
  },

  // oauthio service
  sourceToProviderMap: (source: string) => {
    switch (source) {
      case "googleplus":
        return "google_plus";
      case "linkedin":
        return "linkedin2";
      default:
        return source;
    }
  }
};

export default oAuthIOService;
