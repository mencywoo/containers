# Docker build command

docker build -t mencywoo/mency-node .

# Docker run command

docker run -d -p 9000:8080 -v /Users/mency/Git/Kubernetes/containers/node-app/webapp/config/:/opt/webapp/config:ro -e NODE_ENV=production mencywoo/mency-nodejs
