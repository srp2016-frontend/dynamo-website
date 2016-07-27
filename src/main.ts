/// <reference path='state.ts'/>
/// <reference path='communication.ts'/>
/// <reference path='time.ts'/>
/// <reference path="click_events.ts" />
/// <reference path="search.ts" />
/// <reference path="menu.ts" />

function main() {
    let canvas = <HTMLCanvasElement>$('#position-feed')[0];
    let ctx = canvas.getContext('2d');
    let state = new State([new Item(40, 40, 'Brian DeLeonardis', 18, 'Bhutan', 'Athlete'),new Item(40, 80, 'Jack Dates', 18, 'Tajikistan', 'Athlete'),new Item(40, 120, 'Anthony Fasano', 18, 'Equatorial Guinea', 'Athlete'),new Item(40, 160, 'Anthony Hamill', 18, 'Bermuda', 'Athlete'),new Item(40, 200, 'Brandon Guglielmo', 18, 'The Bahamas', 'Athlete'),new Item(40, 240, 'Chase Moran', 18, 'Italy', 'Athlete'),new Item(40, 280, 'Daniel Collins', 18, 'Dominica', 'Athlete'),new Item(40, 320, 'Kevin DeStefano', 18, 'Saint Kitts and Nevis', 'Athlete'),new Item(40, 360, 'Matthew Kumar', 18, 'Palau', 'Athlete'),new Item(40, 400, 'Ryan Goldstein', 18, 'Cambodia', 'Athlete'),new Item(40, 440, 'Tina Lu', 18, 'Cayman Islands', 'Athlete'),])
    let bridge = new Bridge();
    let items : string[];
    let count = 0;
    let next = new State(state.items)
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