import collections
from utils import read_numbers


def count_merge(ns, lo=0, hi=None):
    if hi is None:
        hi = len(ns) - 1
    ctotal = 0
    if hi > lo:
        mid = lo + (hi - lo) // 2
        nl, cl = count_merge(ns, lo, mid)
        nr, cr = count_merge(ns, mid+1, hi)
        r = l = 0
        q = collections.deque()
        _c = 0
        while l < nl and r < nr:
            if ns[lo + l] <= ns[mid+1 + r]:
                q.append(ns[lo + l])
                l += 1
                ctotal += _c
            else:
                q.append(ns[mid+1 + r])
                r += 1
                _c += 1
        if r < nr:
            while r < nr:
                q.append(ns[mid+1 + r])
                r += 1
        else:
            while l < nl:
                q.append(ns[lo + l])
                l += 1
                ctotal += _c
        ctotal += cl + cr
        for i, n in enumerate(q):
            ns[lo + i] = n
    return hi - lo + 1, ctotal


if __name__ == "__main__":
    input_fp = input()
    output_fp = input()
    a = read_numbers(input_fp)
    _, c = count_merge(a)
    with open(output_fp, "w") as f:
        f.write(str(c))
