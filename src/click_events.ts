/// <reference path="state.ts" />

function setClickEvents(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, state : State) 
{
    canvas.onmousedown = (e : MouseEvent) =>
    {
        if(e.shiftKey)
            state.addSelection(state.getPersonAt(e.offsetX, e.offsetY));
        else
            state.setSelection(state.getPersonAt(e.offsetX, e.offsetY));
        state.draw(ctx);
    }

    canvas.onmousemove = function(e : MouseEvent)
    {
        if(!state.hasSelection())
        {
            state.setDisplay(state.getPersonAt(e.offsetX, e.offsetY))
            state.draw(ctx);
        }
    }
}