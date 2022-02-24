import query from "../queries/get-user-token.query";

export default (_, { token }, { cache }) => {
  const previousState = cache.readQuery({ query });

  const data = {
    localState: {
      ...previousState.localState,
      token
    }
  };

  cache.writeQuery({
    query,
    data
  });

  return true;
};
