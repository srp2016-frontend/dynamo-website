///<reference path='jquery.d.ts'/>
/// <reference path="time.ts" />
/// <reference path="alert.ts" />

class Item
{
    x : number;
    y : number;
    age : number;
    id : string;
    affiliation : string;
    type : string;

    constructor(x : number, y : number, id : string, age : number, affiliation : string, type : string)
    {
        this.x = x;
        this.y = y;
        this.id = id;
        this.age = age;
        this.affiliation = affiliation;
        this.type = type;
    }
}

const radius = 6;
const radiusSquared = radius * radius;

class State
{
    items : Item[];
    private selected : Item[];
    private missing : Item[];
    private bkg : HTMLImageElement;
    public pSearch : (string) => string[];
    public time : TimeManager;

    constructor(items : Item[])
    {
        this.items = items;
        this.selected = [];
        this.missing = [];
        this.bkg = <HTMLImageElement>$("#map-background")[0]
    }

    draw(ctx : CanvasRenderingContext2D) : void
    {
        ctx.drawImage(this.bkg, 0, 0)
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 2;
        for(let item of this.items)
        {
            item.x = Math.floor(item.x);
            item.y = Math.floor(item.y);
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.strokeStyle = "blue"
            ctx.globalAlpha = 0.25;

            if(this.selected.indexOf(item) != -1 || this.selected.length === 0)
                ctx.globalAlpha = 1.0;

            ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(item.x, item.y);
            for(let i = 1; i < 10; i++)
            {
                let previous = this.time.getItemInPast(item, i)
                ctx.lineTo(previous.x, previous.y)
            }
            ctx.stroke()
        }
    }

    update(next : State, ticks : number, maxTicks : number) : void
    {
        for(let item of this.items)
        {
            item.x = Math.floor(item.x);
            item.y = Math.floor(item.y);
            let equivalent = next.getItemByID(item.id);
            let missingIndex = this.missingIndex(item);
            if (equivalent) {
                item.x = this.scaleByTime(item.x, Math.floor(equivalent.x), ticks, maxTicks);
                item.y = this.scaleByTime(item.y, Math.floor(equivalent.y), ticks, maxTicks);
                if(missingIndex !== -1) {
                    this.missing.splice(missingIndex)
                }
            } else {
                 if(missingIndex === -1) {
                    generate_alert(item.type + " " + item.id + " has left the sensor field.")
                    this.missing.push(item)
                }

            }
        }
    }

    missingIndex(item : Item) : number 
    {
        let index = 0;
        while(index < this.missing.length && item.id !== this.missing[index].id) index++;
        return (index < this.missing.length) ? index : -1;
    }

    scaleByTime(current : number, goal : number, ticks : number, maxTicks : number) : number
    {
        return current + (goal - current) / (maxTicks - ticks)
    }

    getItemAt(x : number, y : number) : Item
    {
        for(let item of this.items)
        {
            let dstX = x - item.x;
            let dstY = y - item.y;
            if(dstX ** 2 + dstY ** 2 <= radiusSquared)
                return item;
        }
        return null;
    }

    getItemByID(name : string) : Item
    {
        for(let item of this.items)
        {
            if(item.id === name)
            {
                return item;
            }
        }
        return null;
    }

    updateSelected() : void
    {
        for(let i = 0; i < this.items.length; i++)
        {
            for(let j = 0; j < this.selected.length; j++)
            {
                let item = this.items[i];
                let selection = this.selected[j];
                if(selection.id == item.id && selection.age === item.age)
                    this.selected[j] = item;
            }
        }
    }

    setSelection(selection : Item) : void
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

    setSelections(selection : Item[]) : void
    {
        this.selected.length = selection.length;
        for(let i = 0; i < selection.length; i++)
            this.selected[i] = selection[i];
    }

    addSelection(selection : Item) : void
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

    setDisplay(display : Item) : void
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
        for(let item of this.selected)
            this.appendToDisplay(item);
        this.getRoster();
    }

    private appendToDisplay(item : Item) : void
    {
        $("#sidebar").append("<b>ID: </b>", item.id, "<br>");
        $("#sidebar").append("<b>Age: </b>", item.age, "<br>");
        $("#sidebar").append("<b>Affiliation: </b>", item.affiliation, "<br>");
        $("#sidebar").append("<b>Type: </b>", item.type, "<br>");
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
            let classID = "manifest-name"
            if(state.selected.length > 0 && state.selected.indexOf(state.getItemByID(name)) == -1)
                classID += "-deselected"
            var r= $('<input type="button" class = "' + classID + '" value ="' + name + '"/>');
            r.click(function(e : MouseEvent) {
                let item = state.getItemByID(r.val());
                if(e.shiftKey) 
                    state.addSelection(item)
                else
                    state.setSelection(item);
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
