import collections
from utils import read_numbers


if __name__ == "__main__":
    input_fp = input()
    output_fp = input()
    a = read_numbers(input_fp)
    n = len(a)
    c = 0
    for i in range(n):
        for j in range(i+1, n):
            if a[i] > a[j]:
                c += 1
    with open(output_fp, "w") as f:
        f.write(str(c))
