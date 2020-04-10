#include <iostream>
#include <fstream>

void swap(int*, int, int);
void quicksort(int*, int, int);
int partition(int*, int, int);
void printArray(int*, int);
void ReadNumbers(int*, std::string);
void WriteAnswer(int*, int, std::string);

int main() {
    int length = 1000000;
    int a[1000000] = {0};
    ReadNumbers(a, "numbers.txt");
    quicksort(a, 0, length - 1);
    WriteAnswer(a, length, "answer.txt");
}

void ReadNumbers(int* arr, std::string file_name){
    std::ifstream is(file_name);
    int i = 0, n = 0;
    while (is >> n) {
        arr[i] = n;
        i++;
    }
}

void WriteAnswer(int* arr, int length, std::string file_name){
    std::ofstream os(file_name);
    for (int i = 0; i < length; i++){
        os << arr[i] << std::endl;
    }
}

void quicksort(int* arr, int lo, int hi) {
    if (lo < hi) {
        int mid = partition(arr, lo, hi);
        quicksort(arr, lo, mid - 1);
        quicksort(arr, mid + 1, hi);
    }
}

int partition(int* arr, int lo, int hi) {
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

void swap(int* arr, int i, int j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

void printArray(int* arr, int length){
    int i = 0;
    for (; i < length - 1; i++) {
        std::cout << arr[i] << ", ";
    }
    std::cout << arr[i] << std::endl;
}
