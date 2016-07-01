# gRPC Server

* implements the service specified in main.proto
* build docker container with ```docker build .```
* run docker container with ```docker run -p 50001:50001 <imageId>```
* use the bash script ```runWithoutContainer.sh``` to run the server without docker
* this server implements a all features of the protobuf and gRPC specifications, which our adapter can handle
* we try to support all protobuf and gRPC features - so if we implement new features, we will add them here

## Protobuf and gRPC Features
Implemented Features:
* comments
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
