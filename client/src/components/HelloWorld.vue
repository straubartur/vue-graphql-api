<template>
  <div>
    <h4 v-if='loading'>Loading...... </h4>
      <div v-for='list in allList' :key='list.id'>
          <h3>{{list.title}}</h3>
          <p>{{list.content}}</p>
      </div>
      <button @click="createList">Create List</button>
    </div>
</template>

<script>
import ALL_POST_QUERY from '../graphqlQueries/ALL_POSTS_QUERY.js'
import gql from 'graphql-tag';

export default {
  name: 'HelloWorld',
  data() {
    return {
      loading: false,
      allList: [],
    };
  },
  methods: {
    createList() {
      
      this.$apollo.mutate({
        mutation: gql`mutation ($title: String!, $owner: String!) {
          createList(title: $title, owner: $owner ) {
            id
            title
            owner
          }
        }`,
        variables: {
          title: "teste",
          owner: "eu"
        },
        update: (store, { data: createList2 }) => {
          // Read the data from our cache for this ALL_POST_QUERY.
          const data = store.readQuery({ query: ALL_POST_QUERY })
          const { createList } = createList2
          data.allList.push(createList)
          store.writeQuery({ query: ALL_POST_QUERY, data })
        },
        })
    }
  },
  apollo: {
    allList: {
      query: ALL_POST_QUERY
    }
  }
};
</script>

<style scoped>

</style>
