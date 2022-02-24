import query from "../queries/get-current-user.query";

export default (_, { user }, { cache }) => {
  const previousState = cache.readQuery({ query });

  const data = {
    localState: {
      ...previousState.localState,
      currentUser: user
    }
  };

  cache.writeQuery({
    query,
    data
  });

  return true;
};
