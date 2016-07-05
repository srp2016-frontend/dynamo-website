///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
const maxTicks = 100;
class TimeManager
{
    private frames : Person[][];
    private ticks : number;
    private bridge : Bridge;
    private currentFrame : number;
    private ctx : CanvasRenderingContext2D;
    private state : State;
    private next : State;
    private queued : State;
    private isCurrent : boolean;
    public paused : boolean;

    constructor(bridge : Bridge, ctx : CanvasRenderingContext2D, state : State, next : State) {
        this.bridge = bridge;
        this.frames = [];
        this.frames.push([new Person(-30, -30, "Brian", "Doe", 30), new Person(-10, 100, "Brian", "DeLeonardis", 18)]);
        this.frames.push([new Person(-10, -10, "Brian", "Doe", 30), new Person(20, 100, "Brian", "DeLeonardis", 18)]);
        this.ticks = 0;
        this.paused = false;
        this.ctx = ctx;
        this.currentFrame = 0;
        this.state = state;
        this.queued = next;
        this.next = new State(this.state.people);
        this.isCurrent = true;
    }

    updateFrame()
    {
        if(!this.paused)
        {
            if(this.isCurrent)
            {
                this.ticks += 1;
                this.queued.selected = this.state.selected;
                if(this.ticks == 100)
                {
                    this.bridge.tick(this.queued, () => this.frames.push(this.state.people));
                    this.ticks = 0;
                }
                this.state.update(this.queued, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            } else
            {
                this.ticks += 1;
                this.next.selected = this.state.selected;
                if(this.ticks == 100)
                {
                   this.moveStateForward();
                }
                this.state.update(this.next, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            }
        }
    }

    setStateToCurrent() : void
    {
        this.ticks = 0;
        this.currentFrame = frames.length - 1;
        this.state.people = this.frames[this.currentFrame];
        this.state.updateSelected();
        this.isCurrent = true;
    }

    moveStateBack() : void 
    {
        if(this.currentFrame == 0) return;
        this.ticks = 0;
        this.currentFrame --;
        state.people = this.frames[this.currentFrame]
        state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            next.people = this.frames[this.currentFrame + 1];
            next.updateSelected();
        }
        this.isCurrent = false;
    }

    moveStateForward() : void
    {
        if(this.currentFrame == this.frames.length - 1) return;
        this.ticks = 0;
        this.currentFrame ++;
        state.people = this.frames[this.currentFrame]
        state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            next.people = this.frames[this.currentFrame + 1];
            next.updateSelected();
            this.isCurrent = false;
        } else 
        {
            this.isCurrent = true;
        }
    }

    setStateToFirst() : void
    {
        this.currentFrame = 0;
        this.ticks = 0;
        this.state.people = this.frames[this.currentFrame];
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            next.people = this.frames[this.currentFrame + 1];
            next.updateSelected();
        }
        this.isCurrent = false;
    }
}
