var grpc = require('grpc');

var PORT = "50001";
var HOST = "localhost";
var pathToProtoFile = "/api/main.proto";

if (process.env.API_PROTO_PATH != null) {
    pathToProtoFile = process.env.API_PROTO_PATH;
}
if (process.env.GRPC_SERVER_HOST != null) {
  HOST = process.env.GRPC_SERVER_HOST;
}
if (process.env.GRPC_SERVER_PORT != null) {
  PORT = process.env.GRPC_SERVER_PORT;
}
console.log('* Path to protofile: ' + pathToProtoFile);
console.log('* gRPC server container host: ' + HOST );
console.log('* gRPC server container port: ' + PORT );

var protoDescriptor = grpc.load(pathToProtoFile);
var stub = new protoDescriptor.fapra.teamsaltstack.testapi.TestService(HOST + ":" + PORT, grpc.credentials.createInsecure());

processDouble();
processFloat();
processInt32();
processInt64();
processUint32();
processUint64();
processSint32();
processSint64();
processFixed32();
processFixed64();
processSfixed32();
processSfixed64();
processBool();
processString();
processBytes();
processEnum();
processObject();
processRepeated();
processAll();
processStreamedInput();
processStreamedOutput();
processStreamedInputOutput();
processNested();
processNestedExternal();

// ===============================================================================
function processDouble(){
	var param = {
		val: 1.1
		};
	console.log("");
	console.log("# Method processDouble()");
	console.log("* Request: ");
	console.log(param);
	stub.processDouble(param, function(err, result){
		console.log("");
		console.log("# Method: processDouble()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processFloat(){
	param = {
		val: 2.2
	};
	console.log("");
	console.log("# Method: processFloat()");
	console.log("* Request: ");
	console.log(param);
	stub.processFloat(param, function(err, result){
		console.log("");
		console.log("# Method: processFloat()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processInt32(){
	param = {
		val: 10
	};
	console.log("");
	console.log("# Method: processInt32()");
	console.log("* Request: ");
	console.log(param);
	stub.processInt32(param, function(err, result){
		console.log("");
		console.log("# Method: processInt32()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processInt64(){
	param = {
		val: 20
	};
	console.log("");
	console.log("# Method: processInt64()");
	console.log("* Request: ");
	console.log(param);
	stub.processInt64(param, function(err, result){
		console.log("");
		console.log("# Method: processInt64()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processUint32(){
	param = {
		val: 30
	};
	console.log("");
	console.log("# Method: processUint32()");
	console.log("* Request: ");
	console.log(param);
	stub.processUint32(param, function(err, result){
		console.log("");
		console.log("# Method: processUint32()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processUint64(){
	param = {
		val: 40
	};
	console.log("");
	console.log("# Method: processUint64()");
	console.log("* Request: ");
	console.log(param);
	stub.processUint64(param, function(err, result){
		console.log("");
		console.log("# Method: processUint64()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processSint32(){
	param = {
		val: 50
	};
	console.log("");
	console.log("# Method: processSint32()");
	console.log("* Request: ");
	console.log(param);
	stub.processSint32(param, function(err, result){
		console.log("");
		console.log("# Method: processSint32()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processSint64(){
	param = {
		val: 60
	};
	console.log("");
	console.log("# Method: processSint64()");
	console.log("* Request: ");
	console.log(param);
	stub.processSint64(param, function(err, result){
		console.log("");
		console.log("# Method: processSint64()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processFixed32(){
	param = {
		val: 70
	};
	console.log("");
	console.log("# Method: processFixed32()");
	console.log("* Request: ");
	console.log(param);
	stub.processFixed32(param, function(err, result){
		console.log("");
		console.log("# Method: processFixed32()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processFixed64(){
	param = {
		val: 80
	};
	console.log("");
	console.log("# Method: processFixed64()");
	console.log("* Request: ");
	console.log(param);
	stub.processFixed64(param, function(err, result){
		console.log("");
		console.log("# Method: processFixed64()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processSfixed32(){
	param = {
		val: 90
	};
	console.log("");
	console.log("# Method: processSfixed32()");
	console.log("* Request: ");
	console.log(param);
	stub.processSfixed32(param, function(err, result){
		console.log("");
		console.log("# Method: processSfixed32()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processSfixed64(){
	param = {
		val: 100
	};
	console.log("");
	console.log("# Method: processSfixed64()");
	console.log("* Request: ");
	console.log(param);
	stub.processSfixed64(param, function(err, result){
		console.log("");
		console.log("# Method: processSfixed64()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processBool(){
	param = {
		val: false
	};
	console.log("");
	console.log("# Method: processBool()");
	console.log("* Request: ");
	console.log(param);
	stub.processBool(param, function(err, result){
		console.log("");
		console.log("# Method: processBool()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processString(){
	param = {
		val: "INPUT"
	};
	console.log("");
	console.log("# Method: processString()");
	console.log("* Request: ");
	console.log(param);
	stub.processString(param, function(err, result){
		console.log("");
		console.log("# Method: processString()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processBytes(){
	param = {
		val: "UTF-16 ENCODED STRING"
	};
	console.log("");
	console.log("# Method: processBytes()");
	console.log("* Request: ");
	console.log(param);
	stub.processBytes(param, function(err, result){
		console.log("");
		console.log("# Method: processBytes()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processEnum(){
	param = {
		enum: "VALUE_REQUEST"
	};
	console.log("");
	console.log("# Method: processEnum()");
	console.log("* Request: ");
	console.log(param);
	stub.processEnum(param, function(err, result){
		console.log("");
		console.log("# Method: processEnum()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processObject(){
	param = {
		object: {
			val: "OBJECT"
		}
	};
	console.log("");
	console.log("# Method: processObject()");
	console.log("* Request: ");
	console.log(param);
	stub.processObject(param, function(err, result){
		console.log("");
		console.log("# Method: processObject()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processRepeated(){
	param = {
		repeatedMessageObject: [{
			object: {
				val: "OBJECT 1"
			}
		}, {
			object: {
				val: "OBJECT 2"
			}
		}]
	};
	console.log("");
	console.log("# Method: processRepeated()");
	console.log("* Request: ");
	console.log(param);
	stub.processRepeated(param, function(err, result){
		console.log("");
		console.log("# Method: processRepeated()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processAll(){
	param = {
		a: 1.1,
		b: 2.2,
		c: 1,
		d: 2,
		e: 3,
		f: 4,
		g: 5,
		h: 6,
		i: 7,
		j: 8,
		k: 9,
		l: 10,
		m: false,
		n: "INPUT ALL",
		o: "UTF-16 ENCODED STRING",
		p:  "VALUE_REQUEST",
		q: {
			object: {
				val: "OBJECT"
			}
		},
		r: [{
			object: {
				val: "OBJECT 1"
			}
		}, {
			object: {
				val: "OBJECT 2"
			}
		}]
	};
	console.log("");
	console.log("# Method: processAll()");
	console.log("* Request: ");
	console.log(param);
	stub.processAll(param, function(err, result){
		console.log("");
		console.log("# Method: processAll()");
		console.log("* Result: ");
		console.log(result);
	});
}

// ===============================================================================
function processStreamedInput(){
	var call = stub.processStreamedInput(function(error, stats){
		console.log("");
		console.log("# Method: processStreamedInput()");
		console.log("* Stats: ");
		console.log(stats);
	});
	console.log("# Method: processStreamedInput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 1"
		}
	});
	console.log("# Method: processStreamedInput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 2"
		}
	});
	console.log("# Method: processStreamedInput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 3"
		}
	});
	call.end();
	console.log("# Method: processStreamedInput()");
	console.log("* Stream finished ");
}

// ===============================================================================
function processStreamedOutput(){
	param = {
		object: {
			val: "OBJECT"
		}
	};
	console.log("");
	console.log("# Method: processStreamedOutput()");
	console.log("* Request: ");
	console.log(param);
	var call = stub.processStreamedOutput(param);
	call.on('data', function(data){
		console.log("");
		console.log("# Method: processStreamedOutput()");
		console.log("* Data received:");
		console.log(data);
	});
	call.on('status', function(status){
	});
	call.on('end', function(){
		console.log("");
		console.log("# Method: processStreamedOutput()");
		console.log("* Stream finished");
	});
}
// ===============================================================================
function processStreamedInputOutput(){
	var call = stub.processStreamedInputOutput();
	// Handle stream of server
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
		console.log("* Stream finished");
	});
	// Send own stream to server
	console.log("");
	console.log("# Method: processStreamedInputOutput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 1"
		}
	});
	console.log("");
	console.log("# Method: processStreamedInputOutput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 2"
		}
	});
	console.log("");
	console.log("# Method: processStreamedInputOutput()");
	console.log("* Sending object... ");
	call.write({
		object: {
			val: "OBJECT 3"
		}
	});
	call.end();
	console.log("");
	console.log("# Method: processStreamedInputOutput()");
	console.log("* Stream finished ");
}
// ===============================================================================
function processNested(){
	param = {
		val: {
			innerVal: "OBJECT"
		}
	};
	console.log("");
	console.log("# Method: processNested()");
	console.log("* Request: ");
	console.log(param);
	stub.processNested(param, function(err, result){
		console.log("");
		console.log("# Method: processNested()");
		console.log("* Result: ");
		console.log(result);
	});
}
// ===============================================================================
function processNestedExternal(){
	param = {
		val: {
			innerVal: "OBJECT"
		}
	};
	console.log("");
	console.log("# Method: processNested()");
	console.log("* Request: ");
	console.log(param);
	stub.processNestedExternal(param, function(err, result){
		console.log("");
		console.log("# Method: processNested()");
		console.log("* Result: ");
		console.log(result);
	});
}
