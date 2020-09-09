#include "utils.h"
#include <fstream>

std::vector<int> ReadNumbers(const std::string& file_name){
    std::ifstream is(file_name);
    std::vector<int> arr;
    for (int n = 0; is >> n; ) {
        arr.push_back(n);
    }
    return arr;
}

void WriteAnswer(const std::vector<int>& arr, const std::string& file_name){
    std::ofstream os(file_name);
    for (const auto& n: arr){
        os << n << std::endl;
    }
}

void swap(std::vector<int>& arr, const int& i, const int& j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
