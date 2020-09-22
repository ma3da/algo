#!/usr/bin/env python3

import random
import tqdm
import argparse

file_path = "numbers.txt"

ARGUMENTS = {
    "size": {"nargs": "?", "default": 1000, "type": int}
}

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    for name, kwargs in ARGUMENTS.items():
        parser.add_argument(name, **kwargs)
    args = parser.parse_args()

    numbers = list(range(args.size))
    random.shuffle(numbers)
    with open(file_path, "w") as f:
        for n in tqdm.tqdm(numbers):
            f.write(f"{n}\n")
    print(f"wrote {file_path}, with {args.size} elements")
