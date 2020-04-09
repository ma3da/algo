import random


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
        quicksort(arr, lo + len(subs) + len(pivs) + 1, hi)


if __name__ == "__main__":
    a = list(range(10))
    random.shuffle(a)
    print(a)
    quicksort(a, 0, len(a) - 1)
    print(a)
