<template>
  <div>
    <h4 v-if='loading'>Loading...... </h4>
    <label for="title">title</label>
    <input v-model="title" id="title">
    <label for="title">owner</label>
    <input v-model="owner" id="title">
    <button @click="createList">Create Element</button>      
    <app-post
      v-for="post in allPosts"
      @myEvent="removeElement($event)"
      :title="post.title"
      :owner="post.owner"
      :id="post.id"
      :key="post.id"
    >
    </app-post>
  </div>
</template>

<script>
  import ALL_POST_QUERY from '../graphqlQueries/ALL_POSTS_QUERY.js'
  import gql from 'graphql-tag';
  import PostItem from "./List.vue";
  export default {
    name: 'PostList',
    components: {
      'app-post': PostItem
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
          mutation: gql`mutation ($title: String!, $owner: String!) {
            createPost(title: $title, owner: $owner) {
              id
              title
              owner
            }
          }`,
          variables: {
            title: this.title,
            owner: this.owner
          },
          update: (store, { data: createList2 }) => {
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
        query: ALL_POST_QUERY,
      }
    }
  };
</script>

<style scoped>

</style>
