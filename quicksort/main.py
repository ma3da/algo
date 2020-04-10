def quicksort(arr, lo, hi):
    if lo < hi:
        mid = (lo + hi) // 2
        pivot = arr[mid]
        subs, pivs, sups = [], [], []
        for e in arr[lo:hi + 1]:
            if e < pivot:
                subs.append(e)
            elif e == pivot:
                pivs.append(e)
            else:
                sups.append(e)
        arr[lo:hi + 1] = subs + pivs + sups
        quicksort(arr, lo, lo + len(subs))
        quicksort(arr, lo + len(subs) + len(pivs), hi)


def read_numbers(file_path="numbers.txt"):
    a = []
    with open(file_path) as f:
        for line in f:
            try:
                a.append(int(line.strip()))
            except ValueError:
                break
    return a


def check_sorted(a):
    last = -float("inf")
    for e in a:
        if last > e:
            return False
        last = e
    return True


if __name__ == "__main__":
    a = read_numbers()
    print(f"sorting {len(a)} elements")
    quicksort(a, 0, len(a) - 1)
    print(f"sorted: {check_sorted(a)}")
