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
    selected : Person;

    constructor(people : Person[])
    {
        this.people = people;
        this.selected = null;
    }

    draw(ctx : CanvasRenderingContext2D) : void
    {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "red";
        for(let person of this.people)
        {
            ctx.beginPath();
            ctx.fillStyle = (person == this.selected) ? "blue" : "red";
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

let canvas = <HTMLCanvasElement>$('#position-feed')[0];
let ctx = canvas.getContext('2d');
let state = new State([new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)])
canvas.onmousedown = (e : MouseEvent) => {
    state.selected = state.getPersonAt(e.offsetX, e.offsetY);
    if(state.selected) {
        handle_hover_person(state.selected);
    } else {
        $("#sidebar").empty();
    }
    state.draw(ctx);
}
canvas.onmousemove = (e : MouseEvent) => {
    if(!state.selected) {
        let result = state.getPersonAt(e.offsetX, e.offsetY);
        if(result) {
            handle_hover_person(result)
        } else {
            $("#sidebar").empty();
        }
        state.draw(ctx);
    }
}
state.draw(canvas.getContext('2d'))
