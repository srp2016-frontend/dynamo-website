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
    private selected : Person[];
    public time : TimeManager;

    constructor(people : Person[])
    {
        this.people = people;
        this.selected = [];
    }

    draw(ctx : CanvasRenderingContext2D) : void
    {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = 2;
        for(let person of this.people)
        {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "blue"
            ctx.globalAlpha = 0.25;

            if(this.selected.indexOf(person) != -1 || this.selected.length === 0)
                ctx.globalAlpha = 1.0;

            ctx.arc(person.x, person.y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(person.x, person.y);
            for(let i = 1; i < 10; i++)
            {
                let previous = this.time.getPersonInPast(person, i)
                ctx.lineTo(previous.x, previous.y)
            }
            ctx.stroke()
        }
    }

    update(next : State, ticks : number, maxTicks : number) : void
    {
        for(let person of this.people)
        {
            let equivalent = next.getPersonByName(person.fName + " " + person.lName);
            person.x = this.scaleByTime(person.x, equivalent.x, ticks, maxTicks);
            person.y = this.scaleByTime(person.y, equivalent.y, ticks, maxTicks);
        }
    }

    scaleByTime(current : number, goal : number, ticks : number, maxTicks : number) : number
    {
        return current + (goal - current) / (maxTicks - ticks)
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

    updateSelected() : void
    {
        for(let i = 0; i < this.people.length; i++)
        {
            for(let j = 0; j < this.selected.length; j++)
            {
                let person = this.people[i];
                let selection = this.selected[j];
                if(selection.lName === person.lName && selection.fName === person.fName && selection.age === person.age)
                    this.selected[j] = person;
            }
        }
    }

    setSelection(selection : Person) : void
    {
        if(selection)
        {
            this.selected.length = 1;
            this.selected[0] = selection;
        }
        else
            this.selected.length = 0;
    }

    setDisplay(display : Person) : void
    {
        if(display)
        {
            $("#sidebar").empty();
            $("#sidebar").append("<b>First Name: </b>", display.fName, "<br>");
            $("#sidebar").append("<b>Last Name:  </b>", display.lName, "<br>");
            $("#sidebar").append("<b>Age: </b>", display.age, "<br>");
        }
        else
            $("#sidebar").empty();
    }

    hasSelection() : boolean 
    {
        return this.selected.length > 0
    }

    copySelection(other : State) : void
    {
        this.selected.length = other.selected.length;
        for(let i = 0; i < this.selected.length; i++)
            this.selected[i] = other.selected[i];
    }
}
