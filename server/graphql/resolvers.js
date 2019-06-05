let posts = [
    {
        id: "1",
        title: "Teste teste dassadasd",
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
        title: "react>vue",
        owner: "John Doe",
        user:{
            id: "3"
        },
    },
]

module.exports = {
    User: {
        id: (root, args, { req, res}) => {
            return root.id
        },
        firstName: () => "Artur"
    },
    Query: {
        allPosts(root, args, context) {
            
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
        createPost(root, args, context) {
            const newPost = {
                id: String(Math.round(Math.random()*1000000)),
                title: args.title,
                user: {
                    id: args.userId
                }
            }
            posts.push(newPost)
            return newPost
        },
        removeElementFromList(root, args, context) {
            const newList = posts.filter(post => post.id !== args.id)
            posts = newList
            return {
                id: args.id
            }
        },
    }
}