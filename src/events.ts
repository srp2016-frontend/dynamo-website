///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
///<reference path='time.ts'/>
let canvas = <HTMLCanvasElement>$('#position-feed')[0];
let ctx = canvas.getContext('2d');
let state = new State([new Person(40, 40, 'Brian', 'DeLeonardis', 18),new Person(40, 80, 'Jack', 'Dates', 18),new Person(40, 120, 'Anthony', 'Fasano', 18),new Person(40, 160, 'Anthony', 'Hamill', 18),new Person(40, 200, 'Brandon', 'Guglielmo', 18),new Person(40, 240, 'Chase', 'Moran', 18),new Person(40, 280, 'Daniel', 'Collins', 18),new Person(40, 320, 'Kevin', 'DeStefano', 18),new Person(40, 360, 'Matthew', 'Kumar', 18),new Person(40, 400, 'Ryan', 'Goldstein', 18),new Person(40, 440, 'Tina', 'Lu', 18),])
let bridge = new Bridge();
let items : string[];
let count = 0;
let next = new State(state.people)
let timeManager = new TimeManager(bridge, ctx, state, next, <HTMLButtonElement>$("#pause")[0])
state.time = timeManager;
canvas.onmousedown = (e : MouseEvent) =>
{
    state.setSelection(state.getPersonAt(e.offsetX, e.offsetY));
    state.draw(ctx);
}

function pause(button : HTMLButtonElement) {
    let pause = button.innerHTML === "Pause"
    button.innerHTML = pause ? "Resume" : "Pause"
    timeManager.paused = pause;
}
$("#back-to-start").click(function(e : Event){
    timeManager.setStateToFirst()
    state.draw(ctx)
})

$("#back-one").click(function(e : Event){
    timeManager.moveStateBack();
    state.draw(ctx)
})

$("#forward-one").click(function(e : Event){
    timeManager.moveStateForward();
    state.draw(ctx)
})

$("#forward-to-now").click(function(e : Event){
    timeManager.setStateToCurrent();
    state.draw(ctx)
})

$('#pause').click(function(e : Event)
{
    pause(this);
});

canvas.onmousemove = function(e : MouseEvent)
{
    if(!state.selected)
    {
        state.setDisplay(state.getPersonAt(e.offsetX, e.offsetY))
        state.draw(ctx);
    }
}

let input = <HTMLInputElement>$('#searchbar')[0];
function search()
{
    state.setSelection(state.getPersonByName(input.value))
    $("#not-found").css("visibility", state.selected ? "hidden" : "visible")
    state.draw(ctx);
}

function setSearchItems(is : string[]) : void
{
    let results = $("#search-results");
    items = is;
    if(items.length == 0)
    {
        results.html("")
        results.css("border", "0px");
    } 
    /*else if(items.length == 1) 
    {
        input.value = items[0];
        input.hover = true;
    } */
    else
    {
        count = 0;
        results.html("");
        for(let i = 0; i < items.length; i++)
        {
            if(i == count)
            {
                var r= $('<input type="button" class = "sel" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                results.append(r);
                results.append("<br>");
            }
            else
            {
                var r= $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                results.append(r);
                results.append("<br>");
            }
        } 
        results.css("border", "1px solid #A5ACB2");
    }
}



function pSearch(check : string) : string[]
{
    if(check.length < 1)
        return [];
    var possible = [];
    for(let i = 0; i < state.people.length; i++)
    {
        var name = state.people[i].fName + " " + state.people[i].lName;
        if(name.indexOf(check) >= 0)
        {
            possible.push(name);
        }
    }
    return possible;
}

$('#searchbutton').click(function (e : Event)
{
    search();
})

function getRoster()
{
    let names : string[];
    let results = $('#rSidebar');
       
    names = pSearch(" ");
       
    for(let i = 0; i < names.length; i++)
    {
        console.log(names[i]);
        var r= $('<input type="button" onclick="selectName(this)" class = "possNames" value ="' + names[i] + '"/>');
        results.append(r);  
        results.append("<br>");
    }
}

function selectName(button : HTMLButtonElement)
{
    state.setSelection(state.getPersonByName(button.value));
}

function autocomplete_button_onclick(button : HTMLButtonElement)
{
    let results = $("#search-results")
    results.html("");
    results.css("border", "0px");
    input.value =  button.value;
    search();
}

$('#searchbar').on("input", (e : Event) =>
{
    var str = input.value;
    setSearchItems(pSearch(str));
});

$("#searchbar:input").bind( 'keyup change click', (ev : Event) =>
{
    let e = <KeyboardEvent>ev;
    let results = $("#search-results");
    if(e.keyCode === 13)
    {
        $("#searchbar").val(items[count]);
        search();
        results.html("");
    }
    else if(e.keyCode === 38 || e.keyCode === 40)
    {    
        if(e.keyCode === 38 && count > 0)
            count--;        
        else if(e.keyCode === 40 && count < items.length - 1)
            count++;
            
        results.html("");
        
        for(let i = 0; i < items.length; i++)
        {
            if(i == count)
            {
                var r= $('<input type="button" class = "sel" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                results.append(r);
                results.append("<br>");
            }
            else
            {
                var r= $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                results.append(r);
                results.append("<br>");
            }
        }    
    }
});
state.draw(ctx);
setInterval(() => {
    timeManager.updateFrame();
}, 10);

getRoster();
