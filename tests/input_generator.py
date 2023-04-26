import random

tasks = 500000
input_ = ""

for i in range(tasks):
  input_ += f"{random.randint(1, 1000)},"

input_ = input_[:-1]

with open(f"{tasks}.txt", 'w') as f:
    f.write(input_)