default:
	echo No

all: build_cpp build_cpp_opt build_ocaml

build_cpp:
	g++ -o run_cpp_quicksort main.cpp -Wall

build_cpp_opt:
	g++ -o run_cpp_quicksort_opt main.cpp -Wall -O2

run_cpp: cpp
	./run_cpp_quicksort

build_ocaml:
	ocamlc -o run_ocaml quicksort.ml

run_ocaml: ocaml
	./run_ocaml
