from utils import read_numbers, write_answer


if __name__ == "__main__":
    a = read_numbers()

    for i in range(len(a) - 1):
        for j in range(len(a) - 1, i, -1):
            if a[j] < a[j - 1]:
                a[j], a[j - 1] = a[j - 1], a[j]

    write_answer(a)
