(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{111:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return p}));var r=t(1),o=t(6),a=(t(0),t(126)),c={id:"serverfullstack",title:"Node.js server"},i={id:"serverfullstack",title:"Node.js server",description:"# Open Volunteer Full Stack Server",source:"@site/../docs/full_stack_server.md",permalink:"/docs/serverfullstack",editUrl:"https://github.com/aerogear/OpenVolunteerPlatform/edit/master/website/../docs/full_stack_server.md",sidebar:"docs",previous:{title:"Mobile and Admin Apps",permalink:"/docs/clientref"},next:{title:"Data Model",permalink:"/docs/datamodel"}},l=[{value:"Integrations",id:"integrations",children:[]},{value:"Usage",id:"usage",children:[]},{value:"Docker Image",id:"docker-image",children:[{value:"Running together with required services",id:"running-together-with-required-services",children:[]}]}],s={rightToc:l};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"open-volunteer-full-stack-server"},"Open Volunteer Full Stack Server"),Object(a.b)("p",null,"Node.js implementation for GraphQL based API"),Object(a.b)("h2",{id:"integrations"},"Integrations"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Graphback (Apollo GraphQL template)"),Object(a.b)("li",{parentName:"ul"},"Keycloak (Authentication)"),Object(a.b)("li",{parentName:"ul"},"AMQ Online (MQTT)"),Object(a.b)("li",{parentName:"ul"},"MongoDB")),Object(a.b)("h2",{id:"usage"},"Usage"),Object(a.b)("p",null,"This project has been created using Graphback.\nRun the project using the following steps:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Install")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"yarn install\n")),Object(a.b)("ol",{start:2},Object(a.b)("li",{parentName:"ol"},"Start the Mongo database and MQTT client")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"docker-compose up -d\n")),Object(a.b)("ol",{start:3},Object(a.b)("li",{parentName:"ol"},"Start the server")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"yarn start:server\n")),Object(a.b)("h2",{id:"docker-image"},"Docker Image"),Object(a.b)("p",null,"Server comes with docker file that can be used to build ready to use image.\nReference application is actively tracked and pushed to docker registry"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"docker.io/wtrocki/openvolunteer")),Object(a.b)("p",null,"Docker image supports following environment variables:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"## MongoDB connection\nMONGO_USER=user\nMONGO_PASSWORD=password\nMONGO_ADMIN_PASSWORD=password\nMONGO_DATABASE=showcase\nMONGO_HOST=\n\n## MQTT with AMQ\nMQTT_HOST=\nMQTT_PORT=\nMQTT_PASSWORD=\nMQTT_USERNAME=\nMQTT_PROTOCOL= \n\n# Hack to enable keycloak with self signed certs\n# don't do it in production\nNODE_TLS_REJECT_UNAUTHORIZED=0 \n\nBACKUP_DEMO_DATA=true\nUSE_DEMO_DATA=false\n")),Object(a.b)("h3",{id:"running-together-with-required-services"},"Running together with required services"),Object(a.b)("p",null,"Example docker-compose that can be used to launch OpenVolunter application"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-yaml"}),'version: \'3\'\nservices:\n  server:\n        image: wtrocki/openvolunteer\n        environment:\n            - MONGO_USER=user\n            - MONGO_PASSWORD=password\n            - MONGO_ADMIN_PASSWORD=password\n            - MONGO_DATABASE=showcase\n            - MONGO_HOST=mongodb\n            - BACKUP_DEMO_DATA=false\n            - USE_DEMO_DATA=true\n        ports: \n            - 4000:4000    \n  mongodb:\n        image: centos/mongodb-34-centos7\n        container_name: "mongodb"\n        environment:\n          - MONGODB_USER=user\n          - MONGODB_PASSWORD=password\n          - MONGODB_ADMIN_PASSWORD=password\n          - MONGODB_DATABASE=showcase\n        ports:\n            - 27017:27017\n  keycloak:\n    image: jboss/keycloak:3.4.3.Final\n    ports:\n      - "8080:8080"\n    environment:\n      DB_VENDOR: h2\n      KEYCLOAK_USER: admin\n      KEYCLOAK_PASSWORD: admin\n')),Object(a.b)("p",null,"You can save the above configuration\nThe use the following command to start the server ",Object(a.b)("inlineCode",{parentName:"p"},"docker-compose up")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"NOTE: You need to execute ",Object(a.b)("inlineCode",{parentName:"p"},"npm run keycloak:init")," or import realm from ",Object(a.b)("inlineCode",{parentName:"p"},"./integrations/keycloak/realm-export.json")," in your local machine to be able to use docker compose.")))}p.isMDXComponent=!0},126:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return d}));var r=t(0),o=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=o.a.createContext({}),p=function(e){var n=o.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i({},n,{},e)),t},u=function(e){var n=p(e.components);return o.a.createElement(s.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},O=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(t),O=r,d=u["".concat(c,".").concat(O)]||u[O]||b[O]||a;return t?o.a.createElement(d,i({ref:n},s,{components:t})):o.a.createElement(d,i({ref:n},s))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,c=new Array(a);c[0]=O;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var s=2;s<a;s++)c[s]=t[s];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}O.displayName="MDXCreateElement"}}]);