import numpy as np


def read_numbers(file_path="numbers.txt"):
    a = np.array([])
    with open(file_path) as f:
        for line in f:
            try:
                np.concatenate([a, np.array([int(line.strip())])])
            except ValueError:
                break
    return a
