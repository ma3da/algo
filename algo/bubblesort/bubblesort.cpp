#include "utils.h"

int main() {
    std::string input_fp, output_fp;
    std::cin >> input_fp >> output_fp;
    auto a = ReadNumbers(input_fp);
    for (ulong i = 0; i < a.size() - 1; ++i) {
        for (ulong j = a.size() - 1; j > i; --j) {
            if (a[j] < a[j - 1]) {
                swap(a, j, j - 1);
            }
        }
    }
    WriteAnswer(a, output_fp); 
}
