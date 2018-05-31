var express = require('express');
var express_graphql = require('express-graphql');
var {
    buildSchema
} = require('graphql');
var people = require("./data/people");
var schema = buildSchema(`
    type Query {
        person(id: Int!): Person
        people(surname: String): [Person]
    }

    type Mutation {
        updatePersonName(id: Int!, name: String!): Person
    }

    type Person {
        id: Int
        name: String
        surname: String
        phone: String
        age: String
    }
`);

var root = {
    person: (args) => people.data.find(person => person.id === args.id),
    people: (args) => people.data.filter(person => person.surname === args.surname),
    updatePersonName: (args) => {
        var {
            id,
            name
        } = args;
        var person = people.data.find(person => person.id == id);
        person.name = name;
        return person;
    }
}

var app = express();

app.use("/graphql", express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log("Graphql server is running on 4000 port"));
console.log(people.data);