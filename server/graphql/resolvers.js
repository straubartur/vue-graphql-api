let posts = [
    {
        id: "1",
        title: "nodezim <3",
        owner: "John Doe",
        user:{
            id: "1"
        },
    },
    {
        id: "2",
        title: "Mano do ceu, graphql é massa",
        owner: "John Fernando",
        user:{
            id: "2"
        },
    },
    {
        id: "3",
        title: "vue é massa",
        owner: "John Doe",
        user:{
            id: "1"
        },
    },
]
const users = [
    {
        id: "1",
        name: "Artur Straub",
        lastName: "Straub",
        age: 24,
        firstName: "Artur"
    },
    {
        id: "2",
        name: "Artur Muniz",
        lastName: "Muniz",
        age: 22,
        firstName: "Artur"
    }
]

module.exports = {
    User: {
        id: (root, args, context) => {
            const user = users.find(user => {
                if(user.id === root.id) {
                    return user
                }
            })
            return user.id
        },
        name: (root, args, context) => {
            const user = users.find(user => {
                if(user.id === root.id) {
                    return user
                }
            })
            return user.name
        },
        lastName: (root, args, context) => {
            const user = users.find(user => {
                if(user.id === root.id) {
                    return user
                }
            })
            return user.lastName
        },
        firstName: (root, args, context) => {
            const user = users.find(user => {
                if(user.id === root.id) {
                    return user
                }
            })
            return user.lastName
        },
        age: (root, args, context) => {
            const user = users.find(user => {
                if(user.id === root.id) {
                    return user
                }
            })
            return user.age
        },
    },
    Query: {
        allPosts() {
            return posts
        },
        Post(root, args, context) {
            const post = posts.find(post => {
                if(post.id === args.id) {
                    return post
                }
            })
            return post
        }
    },
    Mutation: {
        createPost(_, args) {
            const newPost = {
                id: String(Math.round(Math.random()*1000000)),
                title: args.title,
                owner: args.owner,
                user: {
                    id: args.userId
                }
            }

            posts.push(newPost)
            return newPost
        },
        removeElementFromList(_, args) {
            const newList = posts.filter(post => post.id !== args.id)
            posts = newList
            return {
                id: args.id
            }
        },
    }
}