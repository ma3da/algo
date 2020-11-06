#include "utils.h"
#include <fstream>
#include <algorithm>


long countInversions(std::vector<int>);

int main() {
    std::string input_fp, output_fp;
    std::getline(std::cin, input_fp);
    std::getline(std::cin, output_fp);
    std::vector<int> ns = ReadNumbers(input_fp);
    long c = countInversions(ns); 
    std::ofstream os(output_fp);
    os << c << std::endl;
}

long countInversions(std::vector<int> ns) {
    std::vector<int> sorted;
    long c = 0;
    for (int n: ns) {
        auto i = std::upper_bound(sorted.begin(), sorted.end(), n);
        if (i != sorted.end()) {
            c += sorted.end() - i;
            sorted.insert(i, n);
        } else
            sorted.push_back(n);
    }
    return c;
}
