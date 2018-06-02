const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = require("graphql");
const mBook = require("../model/book");
const mAuthor = require("../model/author");
const types = require("./type");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type: types.Book,
            args: {
                bookID: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return mBook.findById(args.bookID);
            }
        },
        allBook: {
            type: GraphQLList(types.Book),
            resolve(parent, args) {
                return mBook.find();
            }
        },
        author: {
            type: types.Author,
            args: {
                authorID: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return authorList.find(author => author.id == args.authorID);
                console.log(args);
                return mAuthor.findById(args.authorID);
            }
        },
        allAuthor: {
            type: GraphQLList(types.Author),
            resolve(parent, args) {
                return mAuthor.find();
            }
        }

    }
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        book: {
            type: types.Book,
            args: {
                book: {
                    type: GraphQLNonNull(types.IBook)
                }
            },
            async resolve(parent, args) {
                console.log(args);
                const result = await mBook.create(args.book);
                return result;
            }
        },
        author: {
            type: types.Book,
            args: {
                author: {
                    type: GraphQLNonNull(types.IBook)
                }
            },
            async resolve(parent, args) {
                console.log(args);
                var result = await mAuthor.create(args.author);
                return result;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});