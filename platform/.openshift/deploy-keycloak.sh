oc process -f keycloak.yml | oc create -f -
oc get routes | grep 'keycloak' | awk '{ print $2 }'
