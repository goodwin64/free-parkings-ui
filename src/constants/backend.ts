export const backendEndpoint = (
  process.env.NODE_ENV === 'production'
    ? 'https://free-parkings-api.herokuapp.com'
    : 'http://localhost:8000'
);
