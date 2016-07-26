/// <reference path='state.ts'/>
/// <reference path='communication.ts'/>
/// <reference path='time.ts'/>
/// <reference path="click_events.ts" />
/// <reference path="search.ts" />
/// <reference path="menu.ts" />

function main() {
    let canvas = <HTMLCanvasElement>$('#position-feed')[0];
    let ctx = canvas.getContext('2d');
    let state = new State([])
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
    setMenuEvents();
}
main();