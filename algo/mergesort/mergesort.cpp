#include "utils.h"
#include <fstream>
#include <limits>
void MergeSort(std::vector<int>& a, int p, int r);
void Merge(std::vector<int>& a, int p, int q, int r);

int INF = std::numeric_limits<int>::max(); // hm...

int main() {
    std::string input_fp, output_fp;
    std::cin >> input_fp >> output_fp;
    auto a = ReadNumbers(input_fp);
    MergeSort(a, 0, a.size() - 1);
    WriteAnswer(a, output_fp);
}

void MergeSort(std::vector<int>& a, int p, int r) {
    if (p < r) {
        int q = (int)((p + r) / 2);
        MergeSort(a, p, q);
        MergeSort(a, q+1, r);
        Merge(a, p, q, r);
    }
}

void Merge(std::vector<int>& a, int p, int q, int r) {
    std::vector<int> l(q - p + 1); 
    std::vector<int> m(r - q); 
    for (int i=0; i<q-p+1; ++i) {
        l[i] = a[p + i];
    }
    l.push_back(INF);
    for (int i=0; i<r-q; ++i) {
        m[i] = a[q + 1 + i];
    }
    m.push_back(INF);
    int i = 0, j = 0;
    for (int k=p; k<=r; ++k) {
        if (l[i] <= m[j]) {
            a[k] = l[i];
            ++i;
        } else {
            a[k] = m[j];
            ++j;
        }
    }
}
