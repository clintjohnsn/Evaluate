#!/bin/sh

cd ~/Evaluate
git remote update

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")
CHECK="unassigned"
if [ $LOCAL = $REMOTE ]; then
    echo "Up-to-date"
    CHECK="up-to-date"
elif [ $LOCAL = $BASE ]; then
    echo "Need to pull"
    CHECK="lag"
elif [ $REMOTE = $BASE ]; then
    echo "Need to push"
    CHECK="ahead"
else
    echo "Diverged"
fi

if [ "$CHECK" = "lag" ]; then
    echo "check was assigned to lag"
    echo "need pulling"
    git pull
    npm install
    npm restart
    
fi
if [ "$CHECK" = "up-to-date" ]; then
    echo "Check was assigned to up-to-date"
fi

##echo "ooh shiz der som problem"

