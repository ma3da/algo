import os
import subprocess
import time


ANSWER_FP = os.path.join(os.path.dirname(__file__), "answer.txt")


def to_run(folder_path=None):
    if folder_path is None:
        folder_path = os.path.dirname(os.path.abspath(__file__))
    candidates = [os.path.abspath(file_name) for file_name
                  in os.listdir(folder_path) if file_name.startswith("run_")]
    cmds = []
    for candidate in candidates:
        if os.path.splitext(candidate)[1] == ".py":
            cmds.append(f"python3 {candidate}")
        elif os.path.splitext(candidate)[1] == "":  # run_xxx assumed executable
            cmds.append(f"{candidate}")

    return map(str.split, cmds)


def check_answer(file_path=ANSWER_FP):
    if not os.path.exists(file_path):
        raise FileNotFoundError("No answer file")
    with open(file_path) as f:
        for line, sol in zip(f, range(1000000)):
            if int(line) != sol:
                return False
    return True


def clean_answer(file_path=ANSWER_FP):
    try:
        if os.path.exists(file_path):
            print("deleting answer file")
            os.remove(file_path)
        else:
            print("no answer file to delete")
    except Exception as e:
        print(f"deletion failed: {e}")


for cmd in to_run():
    print(f">>> {cmd}")
    try:
        start = time.perf_counter()
        subprocess.run(cmd)
        t = time.perf_counter() - start
        print(f"time: {t:.2f}s")

        print("answer is correct" if check_answer() else "/!\\ answer is wrong /!\\")
    except Exception as e:
        print(f"Execution failed: {e}")
    finally:
        clean_answer()
        print()
