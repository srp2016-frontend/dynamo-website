/// <reference path='state.ts'/>
/// <reference path='communication.ts'/>
/// <reference path='time.ts'/>
/// <reference path="click_events.ts" />
/// <reference path="search.ts" />
function main() {
    let canvas = <HTMLCanvasElement>$('#position-feed')[0];
    let ctx = canvas.getContext('2d');
    let state = new State([new Person(40, 40, 'Brian', 'DeLeonardis', 18),new Person(40, 80, 'Jack', 'Dates', 18),new Person(40, 120, 'Anthony', 'Fasano', 18),new Person(40, 160, 'Anthony', 'Hamill', 18),new Person(40, 200, 'Brandon', 'Guglielmo', 18),new Person(40, 240, 'Chase', 'Moran', 18),new Person(40, 280, 'Daniel', 'Collins', 18),new Person(40, 320, 'Kevin', 'DeStefano', 18),new Person(40, 360, 'Matthew', 'Kumar', 18),new Person(40, 400, 'Ryan', 'Goldstein', 18),new Person(40, 440, 'Tina', 'Lu', 18),])
    let bridge = new Bridge();
    let items : string[];
    let count = 0;
    let next = new State(state.people)
    let timeManager = new TimeManager(bridge, ctx, state, next, <HTMLButtonElement>$("#pause")[0])
    state.pSearch = setSearchEvents(state, ctx);
    state.time = timeManager;
    state.draw(ctx);
    setInterval(() => {
        timeManager.updateFrame();
    }, 10);
    setClickEvents(canvas, ctx, state);
    state.getRoster();
}
main();