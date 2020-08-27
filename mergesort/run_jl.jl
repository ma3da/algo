function mergesort(a, p, r)
    if p < r
        q = Int(floor((p + r) / 2))
        mergesort(a, p, q)
        mergesort(a, q+1, r)
        merge(a, p, q, r)
    end
end

function merge(a, p, q, r)
    l = [a[p:q]; Inf]
    m = [a[q+1:r]; Inf]
    i = j = 1
    for k = p:r
        if l[i] <= m[j]
            a[k] = l[i]
            i += 1
        else
            a[k] = m[j]
            j += 1
        end
    end
end

f = open("numbers.txt")
a = [parse(Int, s) for s in  readlines(f)]
close(f)

mergesort(a, 1, length(a))

open("answer.txt", "w") do f
    for n in a
        write(f, "$n\n")
    end
end
