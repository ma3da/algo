from mergesort import mergesort
from utils import read_numbers, write_answer


if __name__ == "__main__":
    a = read_numbers()
    mergesort(a, 0, len(a) - 1)
    write_answer(a)
