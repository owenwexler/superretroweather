css:
	@tailwindcss -i ./css/input.css -o ./css/output.css --minify

build:
	@go build -o bin/srweather.exe

run:build
	@bin/srweather.exe

start:run
	@air