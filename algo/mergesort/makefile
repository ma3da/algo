CPPFLAGS = -Wall -I../../include

default:
	echo No

all: build_cpp build_cpp_opt

build_cpp:
	g++ -o run_cpp_mergesort mergesort.cpp utils.cpp $(CPPFLAGS)

build_cpp_opt:
	g++ -o run_cpp_mergesort_opt mergesort.cpp utils.cpp $(CPPFLAGS) -O2

run_cpp: build_cpp
	./run_mergesort_cpp
