from quicksort import quicksort
from utils import read_numbers_array, write_answer


if __name__ == "__main__":
    a = read_numbers_array()
    quicksort(a, 0, len(a) - 1)
    write_answer(a)
