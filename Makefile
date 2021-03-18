nginx-build:
	docker build -f Dockerfile.nginx -t pocket-nginx .

nginx: nginx-build
	docker run --rm --name pocket-nginx-container -p 8080:8080 pocket-nginx
