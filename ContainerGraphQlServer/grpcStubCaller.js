/**
* Listensfor GraphQl requests and calls corresponding gRPC functions.
*/

function GrpcStubCaller(serverHost, serverPort, pathToProtoFile) {
	var protoParser = require("./protoParserNew.js");
	var grpc = require('grpc');
	var protoDoc = protoParser(pathToProtoFile);

	this.callGrpcMethod = function(serviceName, methodName, methodParameters, callback){
		console.log("# Call gRPC method");
		console.log("* Service name: " + serviceName);
		console.log("* Method name: " + methodName);
		console.log("* Params: ");
		console.log(methodParameters);
		// GET RPC STUB CODE (CLIEN CODE)
		var protoDescriptor = grpc.load(pathToProtoFile);

		// CALL RPC STUB CODE (CLIENT CODE)
		// Get proto function which matches to desired method name
		var protoService;
		var protoFunction;
		protoDoc.services.forEach(function(each){
			if (each.name === serviceName) {
				protoService = each;
			}
		});
		protoService.functions.forEach(function(each){
			if (each.name === methodName) {
				protoFunction = each;
			}
		});

		// Get the stub object
		var package = protoDoc.package.split('.');
		var protoDescriptorTemp = protoDescriptor;
		package.forEach(function(val){
			protoDescriptorTemp = protoDescriptorTemp[val];
		});
		if (protoDoc.package != ''){
			var stub = new protoDescriptorTemp[protoService.name](serverHost + ":" + serverPort, grpc.credentials.createInsecure());
		} else{
			var stub = new protoDescriptor[protoService.name](serverHost + ":" + serverPort, grpc.credentials.createInsecure());
		}
		
		// get definition of the parameters from proto file
		var inputType = protoDoc.getMessageByName(protoFunction.inputType);
		// validation not necessary since graphql provides a type system
		//validateParameters(methodParameters, inputType);

		var response;
		var onEnd = function(){
			console.log("* Call finished - Response received: ");
			console.log(response);
			callback(response);
		};

		if (protoFunction.outputStreamed){
			// Call streamed service method
			var call = stub[protoFunction.name](methodParameters);
			response = [];

			call.on('data', function(data){
				response.push(data);
			});
			call.on('end', function(){
				onEnd();
			});
			call.on('status', function(status){
			});
		} else {
			// Call normal service
			stub[protoFunction.name](methodParameters, function(err, result){
				response = result;
				onEnd();
			});
		}
	};
	var validateParameters  = function(methodParameters	, protoTypeDef){

		// check for each parameter of the desired method
		for (var paramName in methodParameters) {
    		if (methodParameters.hasOwnProperty(paramName)) {
    			// search for parameter definition in proto file definitions
       			protoTypeDef.parameters.forEach(function(eachParam){
       				if (paramName === eachParam.name){
       					var t = eachParam.type;
       					if ( t === 'double' ||t==='float'||t === 'int32' ||t==='int64'||t==='uint32'||t==='uint64'||
						t==='sint32'||t==='sint64'||t==='fixed32'||t==='fixed64'||t==='sfixed32'||t==='sfixed64'){
							methodParameters[paramName] = parseInt(methodParameters[paramName]);
						} else if (t==='bool'){
							methodParameters[paramName] = Boolean(methodParameters[paramName]);
						} else if (t==='string'){
							methodParameters[paramName] = String(methodParameters[paramName]);
						} else if (t==='bytes'){
						} else {
							//validateParameters(methodParameters[param], );
							var typeDef = protoDoc.getMessageByName(t);
							validateParameters(methodParameters[paramName], typeDef);
						}
       				}
       				
       			});
    		}
		}		

	};
}

module.exports = GrpcStubCaller;

