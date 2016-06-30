///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
///<reference path='time.ts'/>
let canvas = <HTMLCanvasElement>$('#position-feed')[0];
let ctx = canvas.getContext('2d');
let state = new State([new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)])
let bridge = new Bridge();
let timeManager = new TimeManager(bridge, ctx)
let next = new State(state.people)
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

$("#slide").on("input", function(e : Event){
    if(!timeManager.paused) {
        pause(<HTMLButtonElement>$('#pause')[0])
    }
    timeManager.setStateToTick(state, Math.floor(this.value * timeManager.getCurrentTotalTick()))
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
function search() {
    state.setSelection(state.getPersonByName(input.value))
    $("#not-found").css("visibility", state.selected ? "hidden" : "visible")
    state.draw(ctx);
}
$('#searchbutton').click(function (e : Event)
{
    search();
})

$("#searchbar").keypress( (e : KeyboardEvent) =>
{
    if(e.keyCode === 13)
    {
        search();
    }
});
state.draw(ctx);
setInterval(() => {
    timeManager.updateFrame(state, next);
}, 10);
