# gRPC Test API

* implements the service specified in main.proto
* build docker container with ```docker build <pathToDockerfile>```
* run docker container with ```docker run -p 40031:40031 <imageId>```
* this server implements a all features of the protobuf and gRPC specifications, which our adapter can handle
* we try to support all protobuf and gRPC features - so if we implement new features, we will add them here

## Implemented Protobuf and gRPC Features
* comments (whole line and last part of line)
* all primitive data types like int and string
* enums
* complex data types (messages as message parameter)
* repeated message parameters
* nested messages
* streamed input messages
* streamed output messages
* streamed input and output messages

## Features to implement
* import and import public
* data type any
* oneof
* maps
* package declaration within messages
* options
* extensions
