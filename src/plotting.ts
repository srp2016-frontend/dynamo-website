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
            ctx.arc(person.x, person.y, 6, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function hover_event_handler(e : MouseEvent) {
    console.log(e);
}

var canvas = <HTMLCanvasElement>$('#position-feed')[0];
let state = new State([new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)])
state.draw(canvas.getContext('2d'))
