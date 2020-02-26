
set -e 

echo "Creating branch. "
echo "This command will reset your master branch and remove generated files"

read choice

git checkout master
git reset --hard origin/master
rm -Rf ./client/graphql
rm -Rf ./server/resolvers
rm -Rf ./server/schema
git add --all
git commit -m"Walktrough cleanup"
git push origin +walkthrough

echo "Successfully created branch"