import re
 
with open("input.txt", "r", encoding="utf-8") as f:
    inp = f.read()
 
numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
 
 
def get_all_substrings(s):
    a = []
    for n1 in range(len(s)):
        for n2 in range(len(s)+1):
            if n1 < n2 and s[n1:n2] in numbers:
                a.append(s[n1:n2])
    return a
 
asd = 0

i = 0
for line in inp.split("\n"):
    substrings = get_all_substrings(line)
    #if len(substrings) < 2:
    #    print(i+1)
    #    raise ValueError("asd")
    if len(substrings[0]) == 1:
        n1 = substrings[0]
    else:
        n1 = str(numbers.index(substrings[0]))
 
    if len(substrings[-1]) == 1:
        n2 = substrings[-1]
    else:
        n2 = str(numbers.index(substrings[-1]))
    asd += int(n1 + n2)
    i += 1
 
print(asd)
# 55666


