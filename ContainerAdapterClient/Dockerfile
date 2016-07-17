FROM ubuntu:14.04

MAINTAINER Wilhelm Stephan, Leon Graser, Dominik Bäßler

# Install packages
# ---------------
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y software-properties-common && \
    apt-get install -y python-software-properties && \
    apt-get install -y curl && \
    apt-get clean

# Folder structure
# ----------------
RUN mkdir -p /fapra

# Files
# -----
COPY callMethods.sh /fapra/callMethods.sh
RUN chmod +x /fapra/callMethods.sh

# SET HOST AND PORT
CMD ["/fapra/callMethods.sh", "ADAPTER_HOST", "ADAPTER_PORT"]
