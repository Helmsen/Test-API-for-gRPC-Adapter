#!/bin/bash

HOST="192.168.10.21"
PORT=50002

printInfo(){
  printf "\n \n"
  echo "# Call $1"
  echo "* Response: "
}

printInfo "processDouble()"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processDouble(service:\"TestService\", input:{val:1.1}){result}}"

printInfo "processFloat"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processFloat(service:\"TestService\", input:{val:2.2}){result}}"

printInfo "processInt32"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processInt32(service:\"TestService\", input:{val:10}){result}}"

printInfo "processInt64"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processInt64(service:\"TestService\", input:{val:20}){result}}"

printInfo "processUint32"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processUint32(service:\"TestService\", input:{val:30}){result}}"

printInfo "processUint64"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processUint64(service:\"TestService\", input:{val:40}){result}}"

printInfo "processSint32"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processSint32(service:\"TestService\", input:{val:50}){result}}"

printInfo "processSint64"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processSint64(service:\"TestService\", input:{val:60}){result}}"

printInfo "processFixed32"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processFixed32(service:\"TestService\", input:{val:70}){result}}"

printInfo "processFixed64"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processFixed64(service:\"TestService\", input:{val:80}){result}}"

printInfo "processSfixed32"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processSfixed32(service:\"TestService\", input:{val:90}){result}}"

printInfo "processSfixed64"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processSfixed64(service:\"TestService\", input:{val:100}){result}}"

printInfo "processBool"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processBool(service:\"TestService\", input:{val:false}){result}}"

printInfo "processString"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processString(service:\"TestService\", input:{val:\"INPUT\"}){result}}"

printInfo "processBytes"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processBytes(service:\"TestService\", input:{val:\"UTF-8 ENCODED STRING\"}){result}}"

printInfo "processEnum"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processEnum(service:\"TestService\", input:{enum:\"VALUE_REQUEST\"}){result}}"

printInfo "processObject"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processObject(service:\"TestService\", input:{object:{val: \"OBJECT\"}}){result}}"

printInfo "processRepeated"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processRepeated(service:\"TestService\", input:{repeatedMessageObject:[{
  object:{
    val:\"OBJECT 1\"
    }
  },{
  object:{
    val: \"OBJECT 2\"
    }
  }]}){result}}"

printInfo "processAll"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processAll(service:\"TestService\", input:{
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
  n: \"INPUT ALL\",
  o: \"UTF-8 ENCODED STRING\",
  p: \"VALUE_REQUEST\",
  q: {
    object: {
      val: \"OBJECT\"
    }
  },
  r: [{
    object: {
      val: \"OBJECT 1\"
    }
  }, {
    object: {
      val: \"OBJECT 2\"
    }
  }]
}){result}}"

printInfo "processStreamedOutput"
curl ${HOST}:${PORT}/graphql -XPOST -H "Content-Type:application/graphql" --data "{processStreamedOutput(service:\"TestService\", input:{object:{val: \"OBJECT\"}}){result}}"

