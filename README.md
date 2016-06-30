# Team SaltStack: gRPC Test Api and Adapter
This project contains four docker containers:
* ContainerGrpcServer: a gRPC server implementation
* ContainerGrpcClient: a gRPC client implementation
* ContainerGraphQlServer: an adapter for the gRPC server which translates the API to graphQl
* ContainerGraphQlClient: a client for the adapter
The containers can be configured within the corresponding Dockerfile.
Also bash scripts are provided, to run the components without docker.
All containers are preconfigured, but at least the ip of other containers
must be set in order to communicate with them (as described in the containers README.md).
