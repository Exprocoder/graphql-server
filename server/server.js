var express = require('express');
var mongoose = require("mongoose");
var express_graphql = require('express-graphql');
var schema = require("./graphql/schema");
var app = express();

mongoose.connect("mongodb://test:test12@ds247330.mlab.com:47330/library");
mongoose.connection.once("open", () => console.log("connected to database"));

app.use("/graphql", express_graphql({
    schema: schema,
    graphiql: true,
}));

app.listen(4000, () => console.log("Graphql server is running on 4000 port"));