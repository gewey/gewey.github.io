def square(x):
    return x * x

#if i only want this code to execute when the functions2.py file is run
#not when it is imported
#gotta dunder name main, mayne
def main():
	for i in range(10):
		print("{} squared is {}".format(i, square(i)))
    	#.format is like the f"" feature fills in in order
    	#slightly older way to do it
    	#newer versions do u se the f""
    	#turns out the f is a fancy f
		print(f"{i} squared is {square(i)}")

#bit of special syntax
#"if i am currently running this file, then run the main function"
if __name__ == "__main__":
	main()