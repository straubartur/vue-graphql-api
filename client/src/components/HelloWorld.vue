<template>
  <div>
    <h4 v-if='loading'>Loading...... </h4>
      {{ loading}}
      <label for="title">title</label>
      <input v-model="title" id="title">
      <label for="title">owner</label>
      <input v-model="owner" id="title">
      <button @click="createList">Create Element</button>      
      <app-list
        v-for="post in allPosts"
        @myEvent="removeElement($event)"
        :title="post.title"
        :owner="post.owner"
        :id="post.id"
        :key="post.id"
      >
      </app-list>
    </div>
</template>

<script>
import ALL_POST_QUERY from '../graphqlQueries/ALL_POSTS_QUERY.js'
import gql from 'graphql-tag';
import List from "./List.vue";
export default {
  name: 'HelloWorld',
  components: {
    'app-list': List
  },
  data() {
    return {
      loading: "",
      title: "",
      owner: "",
      allPosts: [],
    };
  },
  methods: {
    removeElement(id) {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: String!) {
          removeElementFromList(id: $id) {
            id
          }
        }`,
        variables: {
          id: id,
        },
        update: (store, { data: { removeElementFromList } }) => {
          // Read the data from our cache for this ALL_POST_QUERY.
          const { id } = removeElementFromList
          const data = store.readQuery({ query: ALL_POST_QUERY })
          
          const newCache = data.allPosts.filter(list => list.id !== id)
          data.allPosts = newCache
          store.writeQuery({ query: ALL_POST_QUERY, data })
        },
        }).catch(error => console.log("error", error))
    },
    createList() {
      this.$apollo.mutate({
        mutation: gql`mutation ($title: String!) {
          createPost(title: $title) {
            id
            title
            owner
          }
        }`,
        variables: {
          title: this.title,
        },
        update: (store, { data: createList2 }) => {
          // Read the data from our cache for this ALL_POST_QUERY.
          const data = store.readQuery({ query: ALL_POST_QUERY })
          const { createPost } = createList2
          data.allPosts.push(createPost)
          store.writeQuery({ query: ALL_POST_QUERY, data })
        },
        })
    }
  },
  apollo: {
    allPosts: {
      query: ALL_POST_QUERY
    }
  }
};
</script>

<style scoped>

</style>
