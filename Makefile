all: run

# run the server
run:
	oak src/main.oak

# watch and restart
watch:
	ls src/*.oak | entr -r make
w: watch

# run the autoformatter
fmt:
	oak fmt --changes --fix
f: fmt
