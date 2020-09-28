#include "utils.h"

int main() {
    auto a =  ReadNumbers("numbers.txt");
    for (ulong i = 0; i < a.size() - 1; ++i) {
        for (ulong j = a.size() - 1; j > i; --j) {
            if (a[j] < a[j - 1]) {
                swap(a, j, j - 1);
            }
        }
    }
    WriteAnswer(a, "answer.txt"); 
}
