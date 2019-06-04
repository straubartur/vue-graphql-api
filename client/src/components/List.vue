<template>
    <div>
        <h3>{{title}}</h3>
        <p>{{owner}}</p>
        <button @click="removeElementList(id)">Remove</button>
    </div>
</template>

<script>
export default {
    props: ["title", "owner", "id"],
    methods: {
        removeElementList(id) {
            this.$emit('myEvent', id)
        }
    },
}
</script>>