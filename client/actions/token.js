// Action to store token into state.
export const storeToken = token => (
  {
    type: 'STORE_TOKEN',
    payload: token,
  }
);

// Action to store token into state.
export const deleteToken = () => (
  {
    type: 'DELETE_TOKEN',
  }
);
