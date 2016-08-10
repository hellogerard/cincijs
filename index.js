import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import 'isomorphic-fetch';

const networkInterface = createNetworkInterface('http://localhost:3010/graphql');
const client = new ApolloClient({
  networkInterface,
});

client.query({
  query: gql`
    query feedQuery($type: FeedType!) {
      feed(type: $type) {
        id
        repository {
          name
          full_name
          description
          html_url
          stargazers_count
          open_issues_count
          created_at
        }
        commentCount
      }
    }
  `,
  variables: {
    type: 'TOP',
  },
}).then(({ data }) => {
  console.log('got data', JSON.stringify(data, null, 2));
}).catch((error) => {
  console.log('there was an error sending the query', error);
});
