def mergesort(a, p, r):
    if p < r:
        q = (p + r) // 2
        mergesort(a, p, q)
        mergesort(a, q+1, r)
        merge(a, p, q, r)


def merge(a, p, q, r):
    l = a[p: q+1] + [float("inf")]
    m = a[q+1: r+1] + [float("inf")]
    i = j = 0
    for k in range(p, r+1):
        if l[i] <= m[j]:
            a[k] = l[i]
            i += 1
        else:
            a[k] = m[j]
            j += 1
