///<reference path='plotting.ts'/>
///<reference path='hover.ts'/>
let canvas = <HTMLCanvasElement>$('#position-feed')[0];
let ctx = canvas.getContext('2d');
let state = new State([new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)])
canvas.onmousedown = (e : MouseEvent) => {
    state.selected = state.getPersonAt(e.offsetX, e.offsetY);
    if(state.selected) {
        handle_hover_person(state.selected);
    } else {
        $("#sidebar").empty();
    }
    state.draw(ctx);
}
canvas.onmousemove = (e : MouseEvent) => {
    if(!state.selected) {
        let result = state.getPersonAt(e.offsetX, e.offsetY);
        if(result) {
            handle_hover_person(result)
        } else {
            $("#sidebar").empty();
        }
        state.draw(ctx);
    }
}
let input = <HTMLInputElement>$('#searchbar')[0];
input.oninput = (e : Event) => {
    let selected = state.getPersonByName(input.value);
    if(selected) {
        state.selected = selected;
        handle_hover_person(selected);
    } else {
        $("#sidebar").empty();
    }
    state.draw(ctx);
}
state.draw(ctx)
