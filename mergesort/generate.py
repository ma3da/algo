import random
import tqdm
import argparse

file_path = "numbers.txt"

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--size", default=1000, type=int)
    args = parser.parse_args()

    numbers = list(range(args.size))
    random.shuffle(numbers)
    with open(file_path, "w") as f:
        for n in tqdm.tqdm(numbers):
            f.write(f"{n}\n")
    print(f"wrote {file_path}, with {args.size} elements")
