#include "utils.h"

void quicksort(std::vector<int>&, const int&, const int&);
int partition(std::vector<int>&, const int&, const int&);

int main() {
    std::string input_fp, output_fp;
    std::cin >> input_fp >> output_fp;
    auto a = ReadNumbers(input_fp);
    quicksort(a, 0, a.size() - 1);
    WriteAnswer(a, output_fp);
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
