#include <vector>
#include <fstream>
#include <limits>
void MergeSort(std::vector<int>& a, int p, int r);
void Merge(std::vector<int>& a, int p, int q, int r);
std::vector<int> ReadNumbers(const std::string&);
void WriteAnswer(const std::vector<int>&, const std::string&);

int INF = std::numeric_limits<int>::max(); // hm...

int main() {
    auto a = ReadNumbers("numbers.txt");
    MergeSort(a, 0, a.size() - 1);
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
