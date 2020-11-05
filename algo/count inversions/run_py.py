import bisect
from utils import read_numbers


def count_inversions(ns):
    c = 0
    done = []
    for k in ns:
        i = bisect.bisect(done, k)
        c += k - i
        if i < len(done):
            done.insert(i, k)
        else:
            done.append(k)
    return c


if __name__ == "__main__":
    input_fp = input()
    output_fp = input()
    a = read_numbers(input_fp)
    c = count_inversions(a)
    with open(output_fp, "w") as f:
        f.write(c)
