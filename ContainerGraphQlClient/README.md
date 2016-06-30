# Client for the gRPC Adapter

* Client for the GraphQl server in /ContainerGraphQlServer
* build docker container with ```docker build .```
* run docker container with ```docker run <imageId>```
* to connect to a running gaphQl server, you have to set at least the host of the graphQl server in the Dockerfile
* you can specify which methods of the graphQl server shall be called by editing callMethods.sh (method calls are on the bottom of the file)
