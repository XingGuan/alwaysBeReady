//服务端代码示例
const express = require('express');
const {
    graphqlHTTP
} = require('express-graphql');
const {
    buildSchema
} = require('graphql');


let schema = buildSchema(`	
  type Query {	
    hello: String	
  }	
`);
let root = {
    hello: function () {
        return 'Hello world!';
    },
}
const app = express();
app.get('/', function (req, res) {
    res.send("Express is working!");
});
app.listen(4000, function () {
    console.log('Listening on port 4000');
});
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));