#a set is a collection of items where no item shows up twice
s = set()
s.add(1)
s.add(2)
s.add(3)
s.add(4)
s.add(2)
s.add(3)
print(s)
#will only print out 1, 2, 3, 4 because theres already a 2 and 3 by the time it gets to the end
