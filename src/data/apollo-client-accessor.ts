let client: any = null;

function setClient(apolloClient: any) {
  client = apolloClient;
}

function getClient() {
  return client;
}

export default {
  setClient,
  getClient
};
