# Team SaltStack: gRPC Test Api and Adapter
This project contains
 * two gRPC servers which implements a subset of the protobuf specs
 * corresponding gRPC clients (standalone)
 * a generic adapter for gRPC servers
 * a client for a specific GraphQl adapter instance

These components are packed in docker containers and can be configured within the corresponding docker-compose.yml files.
Also bash scripts are provided, to run the components without docker.
All containers are preconfigured, but at least the ip of other containers must be set in order to communicate with them. 

Check if the gRPC server are working without tha adapter:
1. start ContainerGrpcServerFullSpec/ ContainerGrpcServerSupportedSpec
2. start ContainerGrpcClientFullSpec/ ContainerGrpcClientSupportedSpec

Run gRPC server, the corresponding adapter and the adapters client:
1. start ContainerGrpcServerSupportedSpec
2. start ContainerGraphQlServer
3. start ContainerGraphQlClient

## ContainerGrpcServerSupportedSpec
This container provides a nodejs implementation of the given gRPC service. The implemented methods are supported by the current adapter version (ContainerGraphQlServer).

## ContainerGrpcServerFullSpec
This container provides a nodejs implementation of the given gRPC service. The implemented methods are not yet supported by the current adapter version (ContainerGraphQlServer). But the adapter will support the whole scope of the used protobuf specs soon.

## ContainerGrpcClientSupportedSpec
This container provides a standalone nodejs client to interact with the gRPC server located in ContainerGrpcServerSupportedSpec.

## ContainerGrpcClientFullSpec
This container provides a standalone nodejs client to interact with the gRPC server located in ContainerGrpcServerFullSpec.

## ContainerGraphQlServer
This container provides a generic adapter for the gRPC server located in ContainerGrpcServerSupportedSpec.

## ContainerGraphQlClient
This container provides a bash script, which calls the methods provided by the gRPC adapter.
