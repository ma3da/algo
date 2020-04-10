import os
import subprocess
import time

to_run = (
    "python3 main.py",
    "./cpp"
)

answer_file_path = "answer.txt"


def check_answer(file_path=answer_file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError("No answer file")
    with open(file_path) as f:
        for line, sol in zip(f, range(1000000)):
            if int(line) != sol:
                return False
    return True


def clean_answer(file_path=answer_file_path):
    try:
        if os.path.exists(file_path):
            print("deleting answer file")
            os.remove(answer_file_path)
        else:
            print("no answer file to delete")
    except Exception as e:
        print(f"deletion failed: {e}")


for cmd in to_run:
    print(f">>> {cmd}")
    try:
        start = time.perf_counter()
        subprocess.run(cmd.split())
        t = time.perf_counter() - start
        print(f"time: {t:.2f}s")

        print("answer is correct" if check_answer() else "/!\\ answer is wrong /!\\")
    except Exception as e:
        print(f"Execution failed: {e}")
    finally:
        clean_answer()
        print()
