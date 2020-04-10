def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]


def quicksort(arr, lo, hi):
    if lo < hi:
        mid = partition(arr, lo, hi)
        quicksort(arr, lo, mid - 1)
        quicksort(arr, mid + 1, hi)


def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j, e in enumerate(arr[lo:hi], start=lo):
        if e <= pivot:
            i += 1
            swap(arr, i, j)
    i += 1
    swap(arr, i, hi)
    return i


def quicksort2(arr, lo, hi):
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
        quicksort2(arr, lo, lo + len(subs))
        quicksort2(arr, lo + len(subs) + len(pivs), hi)


def read_numbers(file_path="numbers.txt"):
    a = []
    with open(file_path) as f:
        for line in f:
            try:
                a.append(int(line.strip()))
            except ValueError:
                break
    return a


def write_answer(arr, file_path="answer.txt"):
    with open(file_path, "w") as f:
        for n in arr:
            f.write(f"{n}\n")


if __name__ == "__main__":
    a = read_numbers()
    quicksort(a, 0, len(a) - 1)
    write_answer(a)
