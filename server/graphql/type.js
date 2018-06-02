const mBook = require("../model/book");
const mAuthor = require("../model/author");
const {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
} = require("graphql");

const IBook = new GraphQLInputObjectType({
    name: "IBook",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        authorID: {
            type: GraphQLID
        }
    })
});

const IAuthor = new GraphQLInputObjectType({
    name: "IAuthor",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    })
});

const Book = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: Author,
            resolve(parent, args) {
                // parentteki author ide göre author collectionundan verileri çek
                return mAuthor.findById(parent.authorID);
            }
        }
    })
});

const Author = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        bookList: {
            type: GraphQLList(Book),
            resolve(parent, args) {
                // parentteki id e göre book collectionundan verileri çek
                return mBook.find({
                    authorID: parent.id
                });
            }
        }
    })
});

const types = {
    Book: Book,
    IBook: IBook,
    Author: Author,
    IAuthor: IAuthor
}

module.exports = types;