///<reference path='node.d.ts'/>
///<reference path='jquery.d.ts'/>
///<reference path='hover.ts'/>
function plot_people(ctx : CanvasRenderingContext2D, people_list : Person[]) 
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    
    for(var i = 0; i < people_list.length; i++)
    {
        var person = people_list[i];
        ctx.beginPath();
        ctx.arc(person.x, person.y, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}

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

function hover_event_handler(e : MouseEvent) {
    console.log(e);
}

var canvas = <HTMLCanvasElement>$('#position-feed')[0];
plot_people(canvas.getContext('2d'), [new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)])
handle_hover_person(new Person(10, 10, "John", "Doe", 30))