default:
	echo No

all: build_cpp build_ocaml

build_cpp:
	g++ -o run_quicksort_cpp main.cpp -Wall

run_cpp: cpp
	./run_quicksort_cpp

build_ocaml:
	ocamlc -o run_ocaml quicksort.ml

run_ocaml: ocaml
	./run_ocaml
