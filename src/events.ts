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

$("#slide").on("input", function(e : Event){
    console.log(this.value);
})

$('#pause').click(function(e : Event)
{
    let pause = this.innerHTML === "Pause"
    this.innerHTML = pause ? "Resume" : "Pause"
    timeManager.paused = pause;
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
$('#searchbutton').click(function (e : Event)
{
    state.setSelection(state.getPersonByName(input.value))
    state.draw(ctx);
})

$("#searchbar").keypress( (e : KeyboardEvent) =>
{
    if(e.keyCode === 13)
    {
        state.setSelection(state.getPersonByName(input.value));
        state.draw(ctx);
    }
});
state.draw(ctx);
setInterval(() => {
    timeManager.updateFrame(state, next);
}, 10);
