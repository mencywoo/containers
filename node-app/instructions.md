
# Docker run command

docker run -d -p 8080:8080 -v /Users/mency/Git/Kubernetes/containers/node-app/config/:/opt/webapp/config:ro -e NODE_ENV=production mencywoo/mency-nodejs
