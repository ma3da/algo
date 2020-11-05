from quicksort import quicksort
from utils import read_numbers_array, write_answer


if __name__ == "__main__":
    input_fp = input()
    output_fp = input()
    a = read_numbers_array(input_fp)
    quicksort(a, 0, len(a) - 1)
    write_answer(a, output_fp)
