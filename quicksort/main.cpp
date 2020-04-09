#include <iostream>

void swap(int*, int, int);
void quicksort(int*, int, int);
int partition(int*, int, int);
void printArray(int*, int);

int main() {
    int a[] = {1, 9, 7, 5, 5, 6};
    int length = sizeof(a) / sizeof(*a);
    printArray(a, length);
    quicksort(a, 0, 5);
    printArray(a, length);
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
    for (int j=lo; j < hi; j++) {
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
