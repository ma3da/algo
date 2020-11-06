CPPFLAGS = -Wall -I../../include

default:
	echo No

all: build_cpp build_cpp_opt

build_cpp:
	g++ -o run_cpp_count_inversions count_inversions.cpp utils.cpp $(CPPFLAGS)

build_cpp_opt:
	g++ -o run_cpp_count_inversions_opt count_inversions.cpp utils.cpp $(CPPFLAGS) -O2
