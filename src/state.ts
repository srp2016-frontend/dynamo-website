///<reference path='node.d.ts'/>
///<reference path='jquery.d.ts'/>
/// <reference path="time.ts" />

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
    public pSearch : (string) => string[];
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
        this.updateDisplay();
    }

    setSelections(selection : Person[]) : void
    {
        this.selected.length = selection.length;
        for(let i = 0; i < selection.length; i++)
            this.selected[i] = selection[i];
    }

    addSelection(selection : Person) : void
    {
        if(selection)
        {
            let index = this.selected.indexOf(selection);
            if(index == -1)
                this.selected.push(selection);
            else 
                this.selected.splice(index, 1)
            this.updateDisplay();
        }
    }

    setDisplay(display : Person) : void
    {
        if(display)
        {
            $("#sidebar").empty();
            this.appendToDisplay(display);
        }
        else
            $("#sidebar").empty();
    }

    private updateDisplay() : void
    {
        $("#sidebar").empty();
        for(let person of this.selected)
            this.appendToDisplay(person);
        this.getRoster();
    }

    private appendToDisplay(person : Person) : void
    {
        $("#sidebar").append("<b>First Name: </b>", person.fName, "<br>");
        $("#sidebar").append("<b>Last Name:  </b>", person.lName, "<br>");
        $("#sidebar").append("<b>Age: </b>", person.age, "<br>");
        $("#sidebar").append("<hr style='width:100%;height:1px;'/>");
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

    getRoster() : void
    {
        let names : string[];
        let results = $('#rSidebar');
        results.empty();
        names = this.pSearch(" ");
        names.sort();
        let state = this;
        function generateButton(name : string) : void 
        {
            let className = "manifest-name"
            if(state.selected.length > 0 && state.selected.indexOf(state.getPersonByName(name)) == -1)
                className += "-deselected"
            var r= $('<input type="button" class = "' + className + '" value ="' + name + '"/>');
            r.click(function(e : MouseEvent) {
                let person = state.getPersonByName(r.val());
                if(e.shiftKey) 
                    state.addSelection(person)
                else
                    state.setSelection(person);
            })
            results.append(r);  
            results.append("<br>");
        }
        for(let i = 0; i < names.length; i++)
        {
           generateButton(names[i])
        }
    }
}
