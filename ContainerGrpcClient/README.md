# gRPC Client

* a standalone gRPC client for the service specified in main.proto (corresponds to the server located in /ContainerGrpcServer)
* build docker container with ```docker build .```
* run docker container with ```docker run -p 50001:50001 <imageId>```
* to connect to a running gRPC server, you have to set at least the environment variable GRPC_SERVER_HOST in the Dockerfile
* use the bash script ```runWithoutContainer.sh``` to run the client without docker
