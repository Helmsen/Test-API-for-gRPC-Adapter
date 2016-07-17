# Client for the gRPC Adapter

* Client for the gRPC adapter
* build docker container with ```docker build <pathToDockerfile>```
* run docker container with ```docker run <imageId>```
* to connect to a running adapter, you have to set at least the host and port of the adapter in the Dockerfile
* you can specify which methods of the graphQl server shall be called by editing callMethods.sh (method calls are on the bottom of the script)
