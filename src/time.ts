const maxTicks = 100;
class TimeManager
{
    private frames : Person[][];
    private ticks : number;
    private bridge : Bridge;
    private ctx : CanvasRenderingContext2D;
    public paused : boolean;

    constructor(bridge : Bridge, ctx : CanvasRenderingContext2D) {
        this.bridge = bridge;
        this.frames = [];
        this.ticks = 0;
        this.paused = false;
        this.ctx = ctx;
    }

    updateFrame(state : State, next : State)
    {
        if(!this.paused)
        {
            this.ticks += 1;
            next.selected = state.selected;
            if(this.ticks == 100)
            {
                this.bridge.tick(next);
                this.ticks = 0;
            }
            state.update(next, this.ticks, maxTicks);
            state.draw(ctx);
        }
    }

    setStateToCurrent(state : State, next : State) : void
    {
        state.update(next, this.ticks, maxTicks)
    }

    setStateToTick(state : State, ticks : number) : void
    {
        let frameIndex = Math.floor(ticks / maxTicks)
        let currentFrame = this.frames[frameIndex]
        state.people = currentFrame
        if(frameIndex < this.frames.length - 1)
        {
            let nextFrame = this.frames[frameIndex + 1]
            let targetState = new State(nextFrame)
            state.update(targetState, ticks % maxTicks, maxTicks)
        }
        state.updateSelected()
    }
}
