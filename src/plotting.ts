///<reference path='node.d.ts'/>
///<reference path='jquery.d.ts'/>
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
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.25;
            
            if(person == this.selected || this.selected == null)
                ctx.globalAlpha = 1.0;
                
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

    getPersonByName(name : string) : Person
    {
        for(let person of this.people)
        {
            if(person.fName + " " + person.lName === name)
            {
                return person;
            }
        }
        return null;
    }
    

   
}
