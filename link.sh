notfound=""
if [ ! -d "$2/packages/lit-html" ]; then
  notfound="$2/packages/lit-html"
elif [ ! -d "$2/packages/lit-element" ]; then
  notfound="$2/packages/lit-element"
elif [ ! -d "$2/packages/updating-element" ]; then
  notfound="$2/packages/updating-element"
elif [ ! -d "$2/packages/lit-ssr" ]; then
  notfound="$2/packages/lit-ssr"
fi
if [ ! -z "$notfound" ]; then
  echo "Usage: link.sh <'dev'|'prod'> <path-to-lit-html-monorepo> "
  echo "Second argument must be the relative path to a lit-html monorepo to link to. Example: 'link.sh prod ../lit-html'"
  exit 1
else
  subfolder=""
  if [ "$1" == "dev" ]; then
    subfolder="/development"
    echo "** Linking to development sources **"
    ln -sf ../package.json $2/packages/lit-html/development/package.json
    ln -sf ../package.json $2/packages/lit-element/development/package.json
    ln -sf ../package.json $2/packages/updating-element/development/package.json
  elif [ "$1" != "prod" ]; then
    echo "Usage: link.sh <'dev'|'prod'> <path-to-lit-html-monorepo> "
    echo "First argument must be either 'dev' or 'prod'"
    exit 1
  fi
  pushd ./node_modules > /dev/null
  rm -rf lit-html lit-element updating-element lit-ssr
  echo "linking ./node_modules/lit-html -> ../$2/packages/lit-html$subfolder"
  ln -s ../$2/packages/lit-html$subfolder lit-html
  echo "linking ./node_modules/lit-element -> ../$2/packages/lit-element$subfolder"
  ln -s ../$2/packages/lit-element$subfolder lit-element
  echo "linking ./node_modules/updating-element -> ../$2/packages/updating-element$subfolder"
  ln -s ../$2/packages/updating-element$subfolder updating-element
  echo "linking ./node_modules/lit-ssr -> ../$2/packages/lit-ssr"
  ln -s ../$2/packages/lit-ssr lit-ssr
  popd > /dev/null
  
  echo "Done."
fi