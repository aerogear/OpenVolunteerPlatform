FROM ubuntu:20.04

ENV SERVERLESS_URL=http://open-volunteer-platform-ovp.apps.helios.intlyqe.com/graphql
RUN apt-get update && apt-get -y install wget
RUN wget https://github.com/chirino/graphql-gw/releases/download/0.2.0/graphql-gw_0.2.0_linux_64bit-x86.tar.gz
RUN tar -xf graphql-gw_0.2.0_linux_64bit-x86.tar.gz && mv graphql-gw gw && rm README.md && rm LICENSE && rm graphql-gw_0.2.0_linux_64bit-x86.tar.gz

ADD . .

EXPOSE 8080

CMD ["./gw" , "serve" , "--production"]