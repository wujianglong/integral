#! /bin/bash

if [[ $1 != "stg" && $1 != "pro" ]]; then
  echo ">>> Please input [stg | pro]"
  exit 1;
fi

name=my-exchange-h5-$1

echo ">>> Building new image"
docker build -t $name -f Dockerfile .

echo ">>> Stopping old container"
docker stop $name

echo ">>> Removing old container"
docker rm -f $name

echo ">>> Running new container"
docker run --name $name -e ENV=$1 \
--dns=100.100.2.136 --dns=100.100.2.138 \
--dns=223.5.5.5 --restart=always \
-p 9000:8080 -d $name

echo ">>> Removing exited container"
docker ps -a | grep Exited | awk '{ print $1 }' | while read -r id ; do
  docker rm $id
done

echo ">>> Cleaning up images"
docker images | grep "<none>" | awk '{ print $3 }' | while read -r id ; do
  docker rmi $id
done
