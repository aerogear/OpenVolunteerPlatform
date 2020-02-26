
set -e 

echo "Creating branch. "
echo "This command will reset your master branch and remove generated files"
echo "Press any key or cancel"

read choice

git checkout master
git reset --hard origin/master
rm -Rf ./client/src/graphql
rm -Rf ./server/src/resolvers
rm -Rf ./server/src/schema
git add --all
git commit -m"Walktrough cleanup"
git push origin +walkthrough

echo "Successfully created branch"