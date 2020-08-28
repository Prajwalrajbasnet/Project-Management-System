const config = {
  BASE_URL: 'http://localhost:5263/api', //or any other API URI
  endpoints: {
    auth: '/auth',
    users: '/users',
    projects: '/projects',
    tasks: '/tasks',
    comments: '/comments',
  },
  LOCAL_STORAGE_KEY: 'pms',
};
export default config;
