/**
 * Javascript file for parsing any main.proto file (located at /api/main.proto) and creating objects for defined functions
 */

 function getProtoFunctions(pathToProtoFile) {
        
    // load .proto file
	var fileSystem = require('fs');
	var protoFile = fileSystem.readFileSync(pathToProtoFile).toString().split("\n");
	
	// parse line by line
	var protoDoc = {
		package: "",
		messages: [],
		services: []
	};

	var commentRegex = new RegExp('^\\s*//');
	var closeRegex = new RegExp('^\\s*}');
	var packageRegex = new RegExp('^\\s*package\\s+(\\S*);')
	var messageStartRegex = new RegExp('^message\\s(\\S*)\\s*{');
	var messageFound = false;
	var message;
	var enumStartRegex = new RegExp('^\\s*enum\\s(\\S+)');
	var enumValueRegex = new RegExp('^\\s*(\\S+)\\s*=.+');
	var enumFound = false;
	var enumi;
	var parameterRegex = new RegExp('^\\s*(\\w+)\\s+(\\w+)\\s*=\\s*(\\d+)');
	var parameterRepeatedRegex =  new RegExp('^\\s*repeated\\s+(\\w+)\\s+(\\w+)\\s*=\\s*(\\d+)');
	var parameter;
	var serviceStartRegex = new RegExp('^\\s*service\\s+(\\w+)\\s+{');
	var serviceFound = false;
	var service;
	var functionRegex = new RegExp('^\\s*rpc\\s+(\\w+)\\((\\w+)\\)\\s+returns\\s+\\((\\w+)\\).*'); 
	var functionOutputStreamedRegex = new RegExp('^\\s*rpc\\s+(\\w+)\\((\\w+)\\)\\s+returns\\s+\\((stream\\s+\\w+)\\).*');
	var functionInputStreamedRegex = new RegExp('^\\s*rpc\\s+(\\w+)\\((stream\\s+\\w+)\\)\\s+returns\\s+\\((\\w+)\\).*'); 
	var functionStreamedRegex = new RegExp('^\\s*rpc\\s+(\\w+)\\((stream\\s+\\w+)\\)\\s+returns\\s+\\((stream\\s+\\w+)\\).*'); 

	console.log("=== PARSE PROTOFILE ===");
    protoFile.forEach(function(line){

    	if (commentRegex.exec(line)){
    		// if line is comment do nothing
    	} else if (closeRegex.exec(line)){
			// element definition finished
			if (enumFound){
				enumFound = false;
			} else {
				messageFound = false;	
				serviceFound = false;
			}
    	} else if (messageFound){
    		// check for enum
    		var enumMatch = enumStartRegex.exec(line);
    		if (enumMatch){
    			enumFound = true;
    			enumi = {
    				name: enumMatch[1],
    				values: []
    			}
    			console.log("* Enum: " + enumi.name);
    			message.enums.push(enumi);
    		} else if (enumFound){
    			// parse enum values
    			var enumValueMatch = enumValueRegex.exec(line);
    			if (enumValueMatch){
    				enumi.values.push({
    					name: enumValueMatch[1]
    				});
    				console.log("* Enum value: " + enumValueMatch[1]);
    			}
    		}
    		// parse normal parameter
    		var parameterMatch = parameterRegex.exec(line);
    		if (parameterMatch){
    			parameter = {
    				name: parameterMatch[2],
    				type: parameterMatch[1],
    				isRepeated: false
    			};
    			console.log("* Parameter: " + parameter.name);
    			message.parameters.push(parameter);
    		}
    		// parse repeated parameter
    		var parameterRepeatedMatch = parameterRepeatedRegex.exec(line);
    		if (parameterRepeatedMatch){
    			parameter = {
    				name: parameterRepeatedMatch[2],
    				type: parameterRepeatedMatch[1],
    				isRepeated: true
    			};
    			console.log("* Repeated parameter: " + parameter.name);
    			message.parameters.push(parameter);
    		} 
    	} else if (serviceFound){
    		// check for normal functions
    		var functionMatch = functionRegex.exec(line);
    		if (functionMatch){
    			functioni = {
    				name: functionMatch[1],
    				inputType: functionMatch[2],
    				inputStreamed: false,
    				outputType: functionMatch[3],
    				outputStreamed: false
    			}
    			console.log("* Function: " + functioni.name);
    			service.functions.push(functioni);
    		}
    		// check for function with streamed output
    		var functionMatch = functionOutputStreamedRegex.exec(line);
    		if (functionMatch){
    			functioni = {
    				name: functionMatch[1],
    				inputType: functionMatch[2],
    				inputStreamed: false,
    				outputType: functionMatch[3],
    				outputStreamed: true
    			}
    			console.log("* Function streamed output: " + functioni.name);
    			service.functions.push(functioni);
    		}
    		// check for function with streamed input
    		var functionMatch = functionInputStreamedRegex.exec(line);
    		if (functionMatch){
    			functioni = {
    				name: functionMatch[1],
    				inputType: functionMatch[2],
    				inputStreamed: true,
    				outputType: functionMatch[3],
    				outputStreamed: false
    			}
    			console.log("* Function streamed input: " + functioni.name);
    			service.functions.push(functioni);
    		}
    		// check for function with streamed input and output
    		var functionMatch = functionStreamedRegex.exec(line);
    		if (functionMatch){
    			functioni = {
    				name: functionMatch[1],
    				inputType: functionMatch[2],
    				inputStreamed: true,
    				outputType: functionMatch[3],
    				outputStreamed: true
    			}
    			console.log("* Function streamed: " + functioni.name);
    			service.functions.push(functioni);
    		}
    	} else {
    		// check package definition
    		var packageMatch = packageRegex.exec(line);
    		if (packageMatch){
    			console.log("* Package: " + packageMatch[1]);
    			protoDoc.package = packageMatch[1];
    		}
    		// search for message
	    	var messageMatch = messageStartRegex.exec(line);
	    	if (messageMatch){
	    		messageFound = true;
	    		message = {
	    			name: messageMatch[1],
	    			parameters: [],
	    			enums: []
	    		};
	    		console.log("* Message: " + message.name);
	    		protoDoc.messages.push(message);
	    	} 
	    	// search for service
	    	var serviceMatch = serviceStartRegex.exec(line);
	    	if (serviceMatch){
	    		serviceFound = true;
	    		service= {
	    			name: serviceMatch[1],
	    			functions: []
	    		};
	    		console.log("* Service: " + service.name);
	    		protoDoc.services.push(service);
	    	}
   		 }

    	
    });
	console.log("=======================");

	// some convenient methods 
    protoDoc.getMessageByName = function(messageName){
    	var result;
    	protoDoc.messages.forEach(function(each){
    		if (each.name === messageName){
    			result = each;
    		}
    	});
    	return result;
    }

	return protoDoc;
}


module.exports = getProtoFunctions;
