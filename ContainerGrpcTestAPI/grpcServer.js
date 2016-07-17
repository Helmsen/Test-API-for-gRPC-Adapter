var grpc = require('grpc');

var PORT = "50001";
var pathToProtoFile = "/api/main.proto";

if (process.env.API_PROTO_PATH != null) {
    pathToProtoFile = process.env.API_PROTO_PATH;
}
if (process.env.GRPC_SERVER_PORT != null) {
  PORT = process.env.GRPC_SERVER_PORT;
}
console.log('* Path to protofile: ' + pathToProtoFile);

var protoDescriptor = grpc.load(pathToProtoFile);
var testApi = protoDescriptor.fapra.teamsaltstack.testapi;

function processDouble(call, callback){
	console.log("");
	console.log("# Method: processDouble()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 100.111);
}

function processFloat(call, callback){
	console.log("");
	console.log("# Method: processFloat()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 200.222);
}

function processInt32(call, callback){
	console.log("");
	console.log("# Method: processInt32()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 100);
}

function processInt64(call, callback){
	console.log("");
	console.log("# Method: processInt64()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 200);
}

function processUint32(call, callback){
	console.log("");
	console.log("# Method: processUint32()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 300);
}

function processUint64(call, callback){
	console.log("");
	console.log("# Method: processUint64()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 400);
}

function processSint32(call, callback){
	console.log("");
	console.log("# Method: processSint32()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 500);
}

function processSint64(call, callback){
	console.log("");
	console.log("# Method: processSint64()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 600);
}

function processFixed32(call, callback){
	console.log("");
	console.log("# Method: processFixed32()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 700);
}

function processFixed64(call, callback){
	console.log("");
	console.log("# Method: processFixed64()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 800);
}

function processSfixed32(call, callback){
	console.log("");
	console.log("# Method: processSfixed32()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 900);
}

function processSfixed64(call, callback){
	console.log("");
	console.log("# Method: processSfixed64()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, 1000);
}

function processBool(call, callback){
	console.log("");
	console.log("# Method: processBool()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, true);
}

function processString(call, callback){
	console.log("");
	console.log("# Method: processString()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, "OUTPUT");
}

function processBytes(call, callback){
	console.log("");
	console.log("# Method: processBytes()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, "UTF16 ENCODED STRING");
}

function processEnum(call, callback){
	console.log("");
	console.log("# Method: processEnum()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, "VALUE_RESPONSE");
}

function processObject(call, callback){
	console.log("");
	console.log("# Method: processObject()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, {
		object: {
			val: "RESPONSE"
		}
	});
}

function processRepeated(call, callback){
	console.log("");
	console.log("# Method: processRepeated()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, { repeatedMessageObject: [{
			object: {
				val: "RESPONSE OBJECT A"
			}
		}, {
			object: {
				val: "RESPONSE OBJECT B"
			}
		}]
	});
}

function processAll(call, callback){
	console.log("");
	console.log("# Method: processAll()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, {
		a: 9.9,
		b: 9.9,
		c: 111,
		d: 222,
		e: 333,
		f: 444,
		g: 555,
		h: 666,
		i: 777,
		j: 888,
		k: 999,
		l: 1010,
		m: true,
		n: "RESPONSE ALL",
		o: "ANSWER UTF-16 ENCODED STRING",
		p:  "VALUE_RESPONSE",
		q: {
			object: {
				val: "RESPONSE OBJECT MODIFED"
			}
		},
		r: [{
			object: {
				val: "OBJECT 1 MODIFED"
			}
		}, {
			object: {
				val: "OBJECT 2 MODIFIED"
			}
		}]
	});
	}

function processStreamedInput(call, callback){
	console.log("");
	console.log("# Method: processStreamedInput()");
	console.log("* Param:");
	console.log(call.request);
	call.on('data', function(data){
		console.log("");
		console.log("# Method: processStreamedInput()");
		console.log("* Data received:");
		console.log(data);
	});
	call.on('status', function(status){
	});
	call.on('end', function(){
		callback(null, {
			object: {
				val: "OBJECT MODIFIED"
			}
		});
		console.log("");
		console.log("# Method: processStreamedInput()");
		console.log("* Stream closed");
	});
}

function processStreamedOutput(call){
	console.log("");
	console.log("# Method: processStreamedOutput()");
	console.log("* Param:");
	console.log(call.request);
	console.log("");
	console.log("# Method: processStreamedOutput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 1 MODIFIED"
		}
	});
	console.log("");
	console.log("# Method: processStreamedOutput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 2 MODIFIED"
		}
	});
	console.log("");
	console.log("# Method: processStreamedOutput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 3 MODIFIED"
		}
	});
	console.log("");
	console.log("# Method: processStreamedOutput()");
	console.log("* Stream finished ");
	call.end();
}

function processStreamedInputOutput(call, callback){
	call.on('data', function(data){
		console.log("");
		console.log("# Method: processStreamedInputOutput()");
		console.log("* Data received:");
		console.log(data);
	});
	call.on('status', function(status){
	});
	call.on('end', function(){
		console.log("");
		console.log("# Method: processStreamedInputOutput()");
		console.log("* Sending object... ");
		call.write({
			object: {
				val: "OBJECT 1 MODIFIED"
			}
		});
		console.log("");
		console.log("# Method: processStreamedInputOutput()");
		console.log("* Sending object... ");
		call.write({
			object: {
				val: "OBJECT 2 MODIFIED"
			}
		});
		console.log("");
		console.log("# Method: processStreamedInputOutput()");
		console.log("* Sending object... ");
		call.write({
			object: {
				val: "OBJECT 3 MODIFIED"
			}
		});
		console.log("");
		console.log("# Method: processStreamedInputOutput()");
		console.log("* Stream finished ");
		call.end();
	});
}

function processNested(call, callback){
	console.log("");
	console.log("# Method: processNested()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, {
		val: {
			innerVal: "RESPONSE"
		}
	});
}

function processNestedExternal(call, callback){
	console.log("");
	console.log("# Method: processNestedExternal()");
	console.log("* Param:");
	console.log(call.request);
	callback(null, {
		val: {
			innerVal: "RESPONSE"
		}
	});
}

function getServer() {
  var server = new grpc.Server();
  server.addProtoService(testApi.TestService.service, {
  	processDouble: processDouble,
  	processFloat: processFloat,
  	processInt32: processInt32,
  	processInt64: processInt64,
  	processUint32: processUint32,
  	processUint64: processUint64,
  	processSint32: processSint32,
  	processSint64: processSint64,
  	processFixed32: processFixed32,
  	processFixed64: processFixed64,
  	processSfixed32: processSfixed32,
  	processSfixed64: processSfixed64,
  	processBool: processBool,
  	processString: processString,
  	processBytes: processBytes,
  	processEnum: processEnum,
  	processObject: processObject,
  	processRepeated: processRepeated,
  	processAll: processAll,
  	processStreamedInput: processStreamedInput,
  	processStreamedOutput: processStreamedOutput,
  	processStreamedInputOutput: processStreamedInputOutput,
    processNested: processNested,
    processNestedExternal: processNestedExternal
  });
  return server;
}
var testServer = getServer();
testServer.bind('0.0.0.0:' + PORT, grpc.ServerCredentials.createInsecure());
console.log("");
console.log("# SERVER STARTED");
console.log("* Listening on port " + PORT);
testServer.start();
