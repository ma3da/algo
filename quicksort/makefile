CPPFLAGS = -Wall -I..
default:
	echo No

all: build_cpp build_cpp_opt build_ocaml

build_cpp:
	g++ -o run_cpp_quicksort quicksort.cpp utils.cpp $(CPPFLAGS)

build_cpp_opt:
	g++ -o run_cpp_quicksort_opt quicksort.cpp utils.cpp $(CPPFLAGS) -O2

run_cpp: cpp
	./run_cpp_quicksort

build_ocaml:
	ocamlc -o run_ocaml quicksort.ml

run_ocaml: ocaml
	./run_ocaml
