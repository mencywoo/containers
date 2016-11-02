# Docker run

docker run -d -p 8080:5000  -e CONFIG=/etc/app.conf  -v ~/Git/Kubernetes/containers/mysql-docker.cfg:/etc/app.conf   mencywoo/mysql-flask  python app.py
