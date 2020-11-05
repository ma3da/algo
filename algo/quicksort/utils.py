import array


def read_numbers(file_path):
    a = []
    with open(file_path) as f:
        for line in f:
            try:
                a.append(int(line.strip()))
            except ValueError:
                break
    return a


def read_numbers_array(file_path):
    a = array.array("l")
    with open(file_path) as f:
        for line in f:
            try:
                a.append(int(line.strip()))
            except ValueError:
                break
    return a


def read_numbers_bytes(file_path, n=1_000_000):
    a = array.array("l")
    with open(file_path, "rb") as f:
        a.fromfile(f, n)
    return a


def write_answer(arr, file_path):
    with open(file_path, "w") as f:
        for n in arr:
            f.write(f"{n}\n")


def write_answer_bytes(arr, file_path):
    with open(file_path, "wb") as f:
        arr.tofile(f)
