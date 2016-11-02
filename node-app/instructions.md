# Docker build command

docker build -t mencywoo/simple-node .

# Docker run command

docker run -d -p 9000:8080 -v /Users/mency/Git/Kubernetes/containers/node-app/webapp/config/:/opt/webapp/config:ro -e NODE_ENV=production mencywoo/simple-node
