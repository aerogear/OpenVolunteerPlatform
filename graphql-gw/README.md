## Serverless based on graphql gw

wget https://github.com/chirino/graphql-gw/releases/download/0.2.0/graphql-gw_0.2.0_linux_64bit-x86.tar.gz

CMD needs to be named gw.

for Mac use: https://github.com/chirino/graphql-gw/releases

Update your schema to OVP:
SERVERLESS_URL=http://127.0.0.1:4000/graphql ./gw serve 

Remove directives from the top:
```
directive @cacheControl(maxAge:Int, scope:CacheControlScope) on 
"Exposes a URL that specifies the behaviour of this scalar."
directive @specifiedBy(  
  "The URL that specifies the behaviour of this scalar."
  url:String!
) on 
enum CacheControlScope {
  PRIVATE
  PUBLIC
}
```

Start server

SERVERLESS_URL=http://127.0.0.1:4000/graphql ./gw serve --production

For config reference see: https://github.com/chirino/graphql-gw/blob/master/docs/config.md


## Build docker container

docker build -t graphql/ovp-gateway