const localizationHelper = {
  networkName: (t: (key: string) => string, network: string) => {
    return t(`DISPLAY_NAMES:${(network || "").toUpperCase()}`);
  }
};

export default localizationHelper;
