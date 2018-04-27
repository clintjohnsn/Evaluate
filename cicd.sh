#!/bin/sh

cd ~/Evaluate
git remote update

##CICD and server status monitoring
##1- Restarts the server if git repo has been changed in the next branch
##2- Restarts the server if the server has crashed
##3- Does all this in interval of 1,3, or 5 mins.
##   Currently set to interval of 3 mins

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
    echo "******" >> ~/cicd.log
    echo "Pulled new code" >> ~/cicd.log
    date >> ~/cicd.log 
    killall node
    npm install
    npm start
    
fi
if [ "$CHECK" = "up-to-date" ]; then
    echo "Check was assigned to up-to-date"
    if pgrep -x "node" > /dev/null
    then
        echo "Server Running Fine"
    else
        echo "Server had Stopped"
        echo "Now restarting the server"
        echo "******" >> ~/cicd.log
        echo "Server Crashed, no new pulls" >> ~/cicd.log
        date >> ~/cicd.log
        npm start
    fi
fi

##echo "ooh shiz der som problem"

