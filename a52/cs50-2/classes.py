# classes.py
#heres a way to explicitly create a new type called point
#
class Point: #im defining a new class of thing
	def __init__(self, x, y): #init function, 
	#when i create a new point what information do i need
	#i need "self" which is just going to be a variable that represents the point itself
	#then a need and x value and a y value
		self.x = x #way of saying self is that name, refering to the point object ive just created
		#the dot says i want to access a particular attribute of the self.. its x
		#in particular i want to set the x value to the x value thats being passed in in the function
		#namely in the example below the x will be 3... y will be 5

		self.y = y

p = Point(3, 5)
print(p.x)
print(p.y)
print(p)