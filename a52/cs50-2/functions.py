def square(x):
    return x * x

for i in range(10):
    print("{} squared is {}".format(i, square(i)))
    #.format is like the f"" feature fills in in order
    #slightly older way to do it
    #newer versions do u se the f""
    #turns out the f is a fancy f
    print(f"{i} squared is {square(i)}")
    
    