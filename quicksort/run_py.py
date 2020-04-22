from quicksort import quicksort
from utils import read_numbers, write_answer


if __name__ == "__main__":
    a = read_numbers()
    quicksort(a, 0, len(a) - 1)
    write_answer(a)
