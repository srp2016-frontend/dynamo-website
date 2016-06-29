///<reference path='node.d.ts'/>
///<reference path='jquery.d.ts'/>
///<reference path='hover.ts'/>
class Person
{
    x : number;
    y : number;
    age : number;
    fName : string;
    lName : string;

    constructor(x : number, y : number, fName: string, lName : string, age : number)
    {
        this.x = x;
        this.y = y;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
    }
}

const radius = 6;
const radiusSquared = radius * radius;

class State
{
    people : Person[];
    constructor(people : Person[])
    {
        this.people = people;
    }

    draw(ctx : CanvasRenderingContext2D) : void
    {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "red";
        for(let person of this.people)
        {
            ctx.beginPath();
            ctx.arc(person.x, person.y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    getPersonAt(x : number, y : number) : Person
    {
        for(let person of this.people)
        {
            let dstX = x - person.x;
            let dstY = y - person.y;
            if(dstX ** 2 + dstY ** 2 <= radiusSquared)
                return person;
        }
        return null;
    }
}

var canvas = <HTMLCanvasElement>$('#position-feed')[0];
let state = new State([new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)])
canvas.onmousedown = function (e : MouseEvent) {
    let result = state.getPersonAt(e.offsetX, e.offsetY);
    if(result) {
        handle_hover_person(result)
    }
}
state.draw(canvas.getContext('2d'))
