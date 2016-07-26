import random
import math
people = ["Brian DeLeonardis","Jack Dates", "Anthony Fasano", "Anthony Hamill", "Brandon Guglielmo", "Chase Moran", "Daniel Collins", "Kevin DeStefano", "Matthew Kumar", "Ryan Goldstein", "Tina Lu"]
positions = []
for i in range(len(people)):
    positions.append([])
    velocity = random.randrange(25, 45)
    angle = (random.random() - 0.5) / 10
    x = 40
    y = (i + 1) * 40
    for j in range(20):
        positions[i].append((x, y))
        x += math.cos(angle) * velocity
        y += math.sin(angle) * velocity
string = "["
for j in range(20):
    string += "\n\"["
    for i in range(len(people)):
        person = people[i]
        x,y = positions[i][j]
        string += "new Item(" + str(x) + ", " + str(y) + ", '" + people[i] + "', 18),"
    string += "]\","
string += "]"
print(string)
