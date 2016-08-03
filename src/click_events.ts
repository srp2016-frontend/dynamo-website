/// <reference path="state.ts" />

function setClickEvents(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, state : State) 
{
    canvas.onmousedown = (e : MouseEvent) =>
    {
        if(e.button === 1)
        {
            if(e.shiftKey)
                state.addSelection(state.getItemAt(e.offsetX, e.offsetY));
            else
                state.setSelection(state.getItemAt(e.offsetX, e.offsetY));
            state.draw(ctx);
        }
    }

    canvas.onmousemove = function(e : MouseEvent)
    {
        if(!state.hasSelection())
        {
            state.setDisplay(state.getItemAt(e.offsetX, e.offsetY))
            state.draw(ctx);
        }
        let zoomCanvas = <HTMLCanvasElement>$("#zoom")[0]
        let zCtx = zoomCanvas.getContext('2d')
        let offset = $(canvas).offset()
        let x = e.pageX - offset.left
        let y = e.pageY - offset.top
        zCtx.drawImage(canvas, x - 62, y - 62, 125, 125, 0, 0, 250, 250)
    }
}