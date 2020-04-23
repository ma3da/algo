#include <vector>
#include "utils.h"

void quicksort(std::vector<int>&, const int&, const int&);
int partition(std::vector<int>&, const int&, const int&);

int main() {
    auto a = ReadNumbers("numbers.txt");
    quicksort(a, 0, a.size() - 1);
    WriteAnswer(a, "answer.txt");
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
