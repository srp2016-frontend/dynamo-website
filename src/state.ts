///<reference path='jquery.d.ts'/>
/// <reference path="time.ts" />
/// <reference path="alert.ts" />
/// <reference path="type.ts" />

let mouseX = 0;
let mouseY = 0;

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

const radius = 11;
const radiusSquared = radius * radius;
const canvas = <HTMLCanvasElement>$("#position-feed")[0]
class State
{
    items : Item[];
    private selected : Item[];
    private missing : Item[];
    private bkg : HTMLImageElement;
    public pSearch : (string) => string[];
    public time : TimeManager;
    private flags : {[key:string] : HTMLImageElement;}
    private pics : {[key:string] : HTMLImageElement;}
    
    
    constructor(items : Item[])
    {
        this.items = items;
        this.selected = [];
        this.missing = [];
		if(type !== "Shooter")
	        this.bkg = <HTMLImageElement>$("#map-background")[0]
        this.flags = {}
        this.flags['Canada'] = <HTMLImageElement>$("#Canada")[0]
        this.flags['Argentina'] = <HTMLImageElement>$("#Argentina")[0]
        this.flags['Australia'] = <HTMLImageElement>$("#Australia")[0]
        this.flags['Austria'] = <HTMLImageElement>$("#Austria")[0]
        this.flags['Barbados'] = <HTMLImageElement>$("#Barbados")[0]
        this.flags['Czech Republic'] = <HTMLImageElement>$("#Czech-Republic")[0]
        this.flags['Great Britain'] = <HTMLImageElement>$("#Great-Britain")[0]
        this.flags['New Zealand'] = <HTMLImageElement>$("#New-Zealand")[0]
        this.flags['Switzerland'] = <HTMLImageElement>$("#Switzerland")[0]
        this.flags['Police'] = <HTMLImageElement>$("#Police")[0]
        this.flags['Medical'] = <HTMLImageElement>$("#Medical")[0]
        this.flags['Fire'] = <HTMLImageElement>$("#Fire")[0]
        
        this.pics = {}
        this.pics['Brandon Guglielmo'] = <HTMLImageElement>$("#Brandon")[0]
        this.pics['Brian DeLeonardis'] = <HTMLImageElement>$("#Brian")[0]
        this.pics['Ryan Goldstein'] = <HTMLImageElement>$("#Ryan")[0]
        this.pics['Jack Dates'] = <HTMLImageElement>$("#Jack")[0]
        this.pics['Kevin Destefano'] = <HTMLImageElement>$("#Kevin")[0]
        this.pics['Matthew Kumar'] = <HTMLImageElement>$("#Matt")[0]
        this.pics['Simon Whitfield'] = <HTMLImageElement>$("#Whitfield")[0]
        this.pics['Bevan Dockerty'] = <HTMLImageElement>$("#Docherty")[0]
        this.pics['Alistair Brownlee'] = <HTMLImageElement>$("#Brownlee")[0]
        this.pics['Nicola Spirig'] = <HTMLImageElement>$("#Spirig")[0]
        this.pics['Emma Snowsill'] = <HTMLImageElement>$("#Snowsill")[0]
        this.pics['Kate Allen'] = <HTMLImageElement>$("#Allen")[0]
        this.pics['Luciano Taccone'] = <HTMLImageElement>$("#Taccone")[0]
        this.pics['Jonathan Brownlee'] = <HTMLImageElement>$("#JBrownlee")[0]
        this.pics['Andrea Hewitt'] = <HTMLImageElement>$("#Hewitt")[0]
    }

    draw(ctx : CanvasRenderingContext2D) : void
    {
		let width = 750;
		let height = 600;
		let offX = 0;
		let offY = 0;
		let offX2 = width;
		let offY2 = height;
		let stage = Cookies.get("pick-stage")
		if (stage === "Swim")
		{
			offX = 430
			offY = 265
			offX2 = 750
			offY2 = 520
		}
		else if (stage === "Bike")
		{
			offX2 = 630
		}
		else if (stage === "Run")
		{
			offX = 390
			offX2 = 590
		}
		
		ctx.drawImage(this.bkg, offX, offY, offX2 - offX, offY2 - offY, 0, 0, width, height)
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 2;
		
        for(let item of this.items)
        {
            if(this.selected.indexOf(item) != -1 || this.selected.length === 0)
                ctx.globalAlpha = 1.0;
            else
                ctx.globalAlpha = 0.5;
			
			let tx = (item.x - offX) * (width / (offX2 - offX))
			let ty = (item.y - offY) * (height / (offY2 - offY))
			tx = Math.floor(tx)
			ty = Math.floor(ty)
			if (tx < 0 || tx > width || ty < 0 || ty > height)
				continue
			
			
            if(Cookies.get("pick-icon") === "Pic")
                ctx.drawImage(this.pics[item.id], tx - 15, ty - 17)
            else if(Cookies.get("pick-icon") === "Aff")
                ctx.drawImage(this.flags[item.affiliation], tx - 6, ty - 6)
            else
            {
                ctx.beginPath();
                ctx.fillStyle = "#000000";
                ctx.arc(tx, ty, 6, 0, 2*Math.PI);
                ctx.stroke();
                ctx.fill();
            }
            
            if(type === "Shooter")
            {
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                for(let i = 1; i < 10; i++)
                {
                    let previous = this.time.getItemInPast(item, i)
                    ctx.lineTo(previous.x, previous.y)
                }
                ctx.stroke()
            }
        }    
        let zoomCanvas = <HTMLCanvasElement>$("#zoom")[0]
        let zCtx = zoomCanvas.getContext('2d')
        let x = mouseX - 62
        x = x > 0 ? (x + 125 < 746 ? x : 746 - 125) : 0
        let y = mouseY - 62
        y = y > 0 ? (y + 125 < 596 ? y : 596 - 125) : 0
        zCtx.drawImage(canvas, x, y, 125, 125, 0, 0, 250, 250)

    }

    update(next : State, ticks : number, maxTicks : number) : void
    {
        for(let i = 0; i < this.items.length; i++)
        {
			let item = this.items[i]
            item.x = Math.floor(item.x);
            item.y = Math.floor(item.y);
            let equivalent = next.getItemByID(item.id);
            let missingIndex = this.missingIndex(item);
            if (equivalent) {
                item.x = this.scaleByTime(item.x, Math.floor(equivalent.x), ticks, maxTicks);
                item.y = this.scaleByTime(item.y, Math.floor(equivalent.y), ticks, maxTicks); //X: 600.104 Y: 450.01062
              
                if(missingIndex !== -1) {
                    this.missing.splice(missingIndex)
                }
            } else {
                 if(missingIndex === -1) {
                    if(item.x === 434 && item.y === 509)
                    {
                        generate_alert(item.type + " " + item.id + " has finished the race.")
                    }
                    else{
                        generate_alert(item.type + " " + item.id + " has left the sensor field.")
                    }
					this.missing.push(item)
					this.items.splice(i)
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
         
            var r= $('<button type="button" class = "' + classID + '" value = "' + name + '">' + name + "</button>");  //' <img src="' + state.flags[state.getItemByID(name).affiliation].src + '
            
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
