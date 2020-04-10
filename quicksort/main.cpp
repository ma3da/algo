#include <iostream>
#include <fstream>
#include <vector>

void swap(std::vector<int>&, const int&, const int&);
void quicksort(std::vector<int>&, const int&, const int&);
int partition(std::vector<int>&, const int&, const int&);
std::vector<int> ReadNumbers(const std::string&);
void WriteAnswer(const std::vector<int>&, const std::string&);

int main() {
    auto a = ReadNumbers("numbers.txt");
    quicksort(a, 0, a.size() - 1);
    WriteAnswer(a, "answer.txt");
}

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

void quicksort(std::vector<int>& arr, const int& lo, const int& hi) {
    if (lo < hi) {
        int mid = partition(arr, lo, hi);
        quicksort(arr, lo, mid - 1);
        quicksort(arr, mid + 1, hi);
    }
}

int partition(std::vector<int>& arr, const int& lo, const int& hi) {
    int x = arr[hi];
    int i  = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= x) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, ++i, hi);
    return i;
}

void swap(std::vector<int>& arr, const int& i, const int& j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
