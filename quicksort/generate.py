import random

numbers = list(range(1_000_000))
random.shuffle(numbers)
with open("numbers.txt", "w") as f:
    for n in numbers:
        f.write(f"{n}\n")
