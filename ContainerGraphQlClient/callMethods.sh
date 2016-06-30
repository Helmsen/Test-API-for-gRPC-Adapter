#!/bin/bash

printInfo(){
  printf "\n \n"
  echo "# Call $1"
  echo "* Response: "
}

HOST=$1
PORT=$2

getApiDesc(){
  printInfo "API Description"
  out=$(curl ${HOST}:${PORT}/graphql/api/md)
  echo "$out" > ~/Downloads/tmp.md
}

processDouble(){
  printInfo "processDouble()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processDouble(service:\"TestService\", input:{val:1.1}){requestId}}")
  requestId=$( echo "$out" | grep "requestId")
  requestId="$( sed 's/.*requestId\": \"\(.*\)\"/\1/' <<< $requestId)"

  printInfo "processDoubleStatus() #1"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processDoubleStatus(input: {requestId: \"${requestId}\"}){status, result{val}}}"

#  printInfo "processDoubleStatus() #2"
#  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processDoubleStatus(input: {requestId: \"${requestId}\"}){status, result{val}}}"
}

processFloat(){
  printInfo "processFloat"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processFloat(service:\"TestService\", input:{val:2.2}){result}}")
  requestId=$( echo "$out" | grep "requestId")
  requestId="$( sed 's/.*requestId\": \"\(.*\)\"/\1/' <<< $requestId)"

  printInfo "processFloatStatus() #1"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processFloatStatus(input: {requestId: \"${requestId}\"}){status, result{val}}}"

}

processBytes(){
  printInfo "processBytes()"
  out=$(curl ${HOST}:${PORT}/graphql -v -XPOST -H "Content-Type:application/graphql" --data "{processBytes(service:\"TestService\", input:{val: {host:\"127.0.0.1\", port:\"21\", user:\"wilhelm\", password: \"9279a9279A!\", filePath: \"/home/wilhelm/Downloads/FAPRA/DOWN/fapraAws.pem\", format:\"utf-8\" __typeFlagBytes__:true}}){requestId}}")
  requestId=$( echo "$out" | grep "requestId")
  requestId="$( sed 's/.*requestId\": \"\(.*\)\"/\1/' <<< $requestId)"
  printf "\n"
  echo "Request id: $requestId"

  sleep 5

  printInfo "processBytesStatus() #1"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processBytesStatus(input: {requestId: \"${requestId}\"}){status, result{val}}}"
}

processEnum(){
  printInfo "processEnum()"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processEnum(service:\"TestService\", input:{enum:\"VALUE_REQUEST\"}){requestId}}"
}

processObject(){
  printInfo "processObject()"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processObject(service:\"TestService\", input:{object:{val:\"STRING1\"}}){requestId}}"
}

processRepeated(){
  printInfo "processRepeated()"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processRepeated(service:\"TestService\", input:{repeatedMessageObject:[{object:{val:\"STRING1\"}},{object:{val:\"STRING2\"}}]}){requestId}}"
}

processStreamedInput(){
  printInfo "processStreamedInput()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInput(service:\"TestService\", input:[{object:{val:\"INPUT1\"}},{object:{val:\"INPUT2\"}}]){requestId}}")
  requestId=$( echo "$out" | grep "requestId")
  requestId="$( sed 's/.*requestId\": \"\(.*\)\"/\1/' <<< $requestId)"

  sleep 2
  printInfo "processStreamedInputStreamSend()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputStreamSend(requestId: \"${requestId}\",input:[{object:{val:\"INPUT1\"}},{object:{val:\"INPUT2\"}}]){requestId}}")

  sleep 2
  printInfo "processStreamedInputStreamEnd()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputStreamEnd(requestId: \"${requestId}\"){requestId}}")

  printInfo "processStreamedInputStatus() #1"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"
}

processStreamedOutput(){
  printInfo "processStreamedOutput()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedOutput(service:\"TestService\", input:{object:{val:\"INPUT\"}}){requestId}}")
  requestId=$( echo "$out" | grep "requestId")
  requestId="$( sed 's/.*requestId\": \"\(.*\)\"/\1/' <<< $requestId)"

  printInfo "processStreamedOutputStatus() #1"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"

  printInfo "processStreamedOutputStatus() #2"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"

  printInfo "processStreamedOutputStatus() #3"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"

  printInfo "processStreamedOutputStatus() #4"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"
}

processStreamedInputOutput(){
  printInfo "processStreamedInputOutput()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutput(service:\"TestService\", input:[{object:{val:\"INPUT1\"}},{object:{val:\"INPUT2\"}}]){requestId}}")
  requestId=$( echo "$out" | grep "requestId")
  requestId="$( sed 's/.*requestId\": \"\(.*\)\"/\1/' <<< $requestId)"

  sleep 2
  printInfo "processStreamedInputOutputStreamSend()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutputStreamSend(requestId: \"${requestId}\",input:[{object:{val:\"INPUT3\"}},{object:{val:\"INPUT4\"}}]){requestId}}")

  printInfo "processStreamedInputOutputStreamEnd()"
  out=$(curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutputStreamEnd(requestId: \"${requestId}\"){requestId}}")

  printInfo "processStreamedInputOutputStatus() #1"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"

  printInfo "processStreamedInputOutputStatus() #2"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"

  printInfo "processStreamedInputOutputStatus() #3"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"

  printInfo "processStreamedInputOutputStatus() #4"
  curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedInputOutputStatus(input: {requestId: \"${requestId}\"}){status, result{object{val}}}}"
}


processDouble
#processFloat
#processEnum
#processObject
#processRepeated
processStreamedInput
#processStreamedOutput
#processStreamedInputOutput
#processBytes  #<--- you have to provide an url to a file on a ftp server to test this method
#getApiDesc
