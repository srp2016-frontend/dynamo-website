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
    }
}