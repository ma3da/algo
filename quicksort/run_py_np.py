from quicksort import quicksort
from utils import write_answer
from utilsnp import read_numbers


if __name__ == "__main__":
    a = read_numbers()
    quicksort(a, 0, len(a) - 1)
    write_answer(a)
