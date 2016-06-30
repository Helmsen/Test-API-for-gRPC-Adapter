# Generic gRPC Adapter

* adapts a gRPC API and provides the methods as a GraphQL API
* adapts the service specified in ./main.proto
* build docker container with ```docker build .```
* run docker container with ```docker run -p 50002:50002 <imageId>```
* to connect to a running gRPC server, you have to set at least the environment variable API_HOST in the Dockerfile
* use the bash script ```runWithoutContainer.sh``` to run the adapter without docker
