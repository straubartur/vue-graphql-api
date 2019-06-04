import Vue from 'vue';
import VueApollo from 'vue-apollo';
// importing apolloClient
import apolloClient from './apolloClient';

Vue.use(VueApollo);
// making a provider

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network',
    },
  },
  // Global error handler for all smart queries and subscriptions
  errorHandler(error) {
    console.log('Global error handler')
    console.error(error)
  },
});

export default apolloProvider;

