CPPFLAGS = -Wall -I../../include
default:
	echo No

all: build_cpp build_cpp_opt

build_cpp:
	g++ -o run_cpp_bubblesort bubblesort.cpp utils.cpp $(CPPFLAGS)

build_cpp_opt:
	g++ -o run_cpp_bubblesort_opt bubblesort.cpp utils.cpp $(CPPFLAGS) -O2

run_cpp: cpp
	./run_cpp_bubblesort
