// imports
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');
var fs = require('fs');
var stub = require("./grpcStubCaller.js");
var protoParser = require("./protoParserNew.js");
var cuid = require('cuid');
var bodyParser = require("body-parser");

// initialize environment variables
var protoPath  ='/api/main.proto';
var grpcIP = 'localhost';
var grpcPort = 5007;
var graphQlPort = 3000;
initializeVariables();


// Get environment variables
function initializeVariables() {

  console.log("# GraphQl Server initialization");
  if (process.argv[2] != undefined){
    graphQlPort = process.argv[2];
  }

  if (process.env.API_PROTO_PATH != null) {
    protoPath = process.env.API_PROTO_PATH;
  }
  console.log('* Path to protofile: ' + protoPath);

  if (process.env.API_HOST != null) {
    grpcIP = process.env.API_HOST;
  }
  console.log('* gRPC container host: ' + grpcIP );

  if (process.env.API_PORT != null) {
    grpcPort = process.env.API_PORT;
  }
  console.log('* gRPC container port: ' + grpcPort);
}



// ====================== DATA TYPE COMPILATION ====================== 
// Compile graph ql types
var protoDoc = protoParser(protoPath);
var compileGraphQlDataTypes = function(dataTypes, typeMode){
  var messageWasSkipped=false;
  protoDoc.messages.forEach(function(eachMessage){
    var typeDef = {};
    var skipMessage = false;  
    console.log("# Message: " + eachMessage.name);
    eachMessage.parameters.forEach(function(eachParameter){
      console.log("* Parameter: " + eachParameter.name);
      console.log("** grpc type: " + eachParameter.type);
      var graphQlType;
      var t = eachParameter.type;
      // check grpc primitive data types
      if ( t === 'int32' ||t==='int64'||t==='uint32'||t==='uint64'||
           t==='sint32'||t==='sint64'||t==='fixed32'||t==='fixed64'||t==='sfixed32'||t==='sfixed64'){
        graphQlType = graphql.GraphQLInt;
      } else if (t === 'double'||t==='float') {
        graphQlType = graphql.GraphQLFloat;
      } else if (t==='bool'){
        graphQlType = graphql.GraphQLBoolean;
      } else if (t==='string'){
        graphQlType = graphql.GraphQLString;
      } else if (t==='bytes'){
        graphQlType = graphql.GraphQLString;
      } else {
        // check previously created incoming message types
        console.log("=> no primitive data type");
        if (dataTypes[t] != undefined){
            graphQlType = dataTypes[t];
        }  else {
          console.log("=> no existing object type");
          // check enums
          var enumFound = false;
          eachMessage.enums.forEach(function(eachEnum){
            if (eachEnum.name === t){
              graphQlType = graphql.GraphQLString;
              enumFound = true;
            }
          });
          if (!enumFound){
            console.log("=> no enum");
            skipMessage = true;
          }
        }
      }
      console.log("** type: " + graphQlType)
      if (graphQlType != undefined){
        // decide wether it is a list or not
        if (eachParameter.isRepeated){
          typeDef[eachParameter.name] = {type: new graphql.GraphQLList(graphQlType)};
        } else {
          typeDef[eachParameter.name] = {type: graphQlType};
        }
      } 
    });
    if (!skipMessage){
      dataTypes[eachMessage.name] = new typeMode({ 
        name: eachMessage.name,
        fields: () => (typeDef)
      });
      // return false;
    } else {
      messageWasSkipped = true;
      // return true;
    }
  });
  return messageWasSkipped;
};

/**
* Compiling data types is an iterative process, because sometimes
* complex types are referenced which are not yet compiled.
*/
console.log("=== PARSE GRAPHQL TYPES ===");
var dataTypesIncoming = {};
var dataTypesOutgoing = {};
while(compileGraphQlDataTypes(dataTypesIncoming, graphql.GraphQLInputObjectType)){
  console.log("---------------------------");
}
//while(compileGraphQlDataTypes(dataTypesOutgoing, graphql.GraphQLObjectType )){
//}
dataTypesOutgoing.response = new graphql.GraphQLObjectType({
  name: 'Response',
  fields: () => ({
    result: { type: graphql.GraphQLString }
  })
});
console.log("===========================");
// console.log(dataTypesIncoming);
// ====================================================


// ====================== SERVER ====================== 
var cache = {};
// Compile method definitions; they contain processing logic: function resolve() is the message processor
console.log("=== Fields ===");
var fieldsIncoming = {};
protoDoc.services.forEach(function(eachService){
  console.log("# Service: " + eachService.name);
  eachService.functions.forEach(function(eachFunction){
    console.log("* Function: " + eachFunction.name);
    console.log("** Incoming type: ");
    console.log(dataTypesIncoming[eachFunction.inputType]);
    fieldsIncoming[eachFunction.name] = {
      type:  dataTypesOutgoing.response, 
      args:{
        service: { type: graphql.GraphQLString },
        input: {type: dataTypesIncoming[eachFunction.inputType]}
      }
    };
    fieldsIncoming[eachFunction.name].resolve = function(_, args, context, _,_) {
      console.log("# Resolve graphql request");
      console.log("* Arguments: ");
      console.log(args);
      var result = {result: "its something"};
      cache[context] = {
        methodName: eachFunction.name,
        serviceName: args.service,
        params: args.input
      };
      console.log("* Resolved and cached data: ");
      console.log(cache[context]);
      return result;
    } 
  });
});
console.log("==============");

//var fieldsOutgoing = {};
//protoDoc.services.forEach(function(eachService){
//  eachService.functions.forEach(function(eachFunction){
//    fieldsOutgoing[eachFunction.name] = {
//      type: dataTypesOutgoing.response,
//      args:{
//        service: { type: graphql.GraphQLString },
//        input: {type: dataTypesIncoming[eachFunction.inputType]}
//      }
//    };
//    fieldsOutgoing[eachFunction.name].resolve = function(_, args, context, _,_) {
//          return context;
//        } 
//  });
//});

var schemaIncoming = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: fieldsIncoming
  })
});

//var schemaOutgoing = new graphql.GraphQLSchema({
//  query: new graphql.GraphQLObjectType({
//    name: 'Query',
//    fields: fieldsOutgoing
//  })
//});


// Start server
//express().use('/graphql', graphqlHTTP({ schema: schema, pretty: true })).listen(graphQlPort);
//console.log('GraphQL server running on http://localhost:' + graphQlPort + '/graphql');
var grpcStubCaller = new stub(grpcIP, grpcPort, protoPath);
var httpServer = express();
var requestId = function requestId(req, res, next) {
  req.requestId = cuid();
  next();
};
httpServer.use(requestId);
httpServer.use(bodyParser.text({ type: 'application/graphql' }));
httpServer.post('/graphql', (req, res) => {
  console.log("### Incoming HTTP Request");
  console.log("* Request headers: ");
  console.log(req.headers)
  console.log("* Request body: ")
  console.log(req.body);
  graphql.graphql(schemaIncoming, req.body, "", req.requestId);
  var requestData = cache[req.requestId];
  grpcStubCaller.callGrpcMethod(requestData.serviceName, requestData.methodName, requestData.params, function(grpcResponse){
    //graphql.graphql(schemaOutgoing, req.body, "", grpcResponse).then(function(graphQlResult){
    //  res.send(JSON.stringify(graphQlResult, null, 2));
    //});
    res.send(JSON.stringify(grpcResponse, null, 2));
  });
}).listen(graphQlPort);
console.log('# GraphQL server listening on http://localhost:' + graphQlPort + '/graphql');



