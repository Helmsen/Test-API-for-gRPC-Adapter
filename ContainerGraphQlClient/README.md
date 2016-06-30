# Client for the gRPC Adapter

* Client for the GraphQl server in /ContainerGraphQlServer
* build docker container with ```docker build .```
* run docker container with ```docker run <imageId>```
* to connect to a running gRPC server, you have to set at least the environment variable API_HOST in the Dockerfile
* use the bash script ```runWithoutContainer.sh``` to run the adapter without docker
