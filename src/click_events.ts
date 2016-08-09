/// <reference path="state.ts" />

function setClickEvents(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, state : State) 
{
    canvas.onmousedown = (e : MouseEvent) =>
    {
        if(e.shiftKey)
            state.addSelection(state.getItemAt(e.offsetX, e.offsetY));
        else
            state.setSelection(state.getItemAt(e.offsetX, e.offsetY));
        state.draw(ctx);
    }

    canvas.onmousemove = function(e : MouseEvent)
    {
        if(!state.hasSelection())
        {
            state.setDisplay(state.getItemAt(e.offsetX, e.offsetY))
            state.draw(ctx);
        }
        let offset = $(canvas).offset()
        let x = e.pageX - offset.left
        let y = e.pageY - offset.top
        mouseX = x
        mouseY = y
		console.log(x + " " + y)
    }
}