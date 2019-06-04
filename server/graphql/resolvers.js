const list = [
    {
        id: "1",
        title: "Teste teste dassadasd",
        owner: "John Doe"
    },
    {
        id: "2",
        title: "Mano do ceu, graphql é massa",
        owner: "John Fernando"
    },
    {
        id: "3",
        title: "react>vue",
        owner: "John Doe"
    },
]

module.exports = {
    Query: {
        allList(root, args, context) {
            return list
        },
        listById(root, args, context) {
            const listItem = list.find(item => {
                if(item.id === args.id) {
                    return item
                }
                throw new Error('item not found')
            })
        }
    },
    Mutation: {
        createList(root, args, context) {
            const newPost = {
                id: String(Math.random()*1000),
                title: args.title,
                owner: args.owner
            }
            console.log(newPost)
            list.push(newPost)
            return newPost
        }
    }
}