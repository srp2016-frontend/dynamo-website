///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
///<reference path='events.ts'/>
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
    private pauseButton : HTMLButtonElement;
    public paused : boolean;

    constructor(bridge : Bridge, ctx : CanvasRenderingContext2D, state : State, next : State, pause : HTMLButtonElement) {
        this.bridge = bridge;
        this.frames = [];
        this.ticks = 0;
        this.paused = false;
        this.ctx = ctx;
        this.currentFrame = 0;
        this.state = state;
        this.queued = next;
        this.next = new State(this.state.people);
        this.isCurrent = true;
        this.pauseButton = pause;
    }

    private getFrame(index : number) : Person[]
    {
        return JSON.parse(JSON.stringify(this.frames[index]))
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
                    this.bridge.tick(this.queued);
                    this.frames.push(JSON.parse(JSON.stringify(this.state.people)));
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
        this.currentFrame = this.frames.length - 1;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        this.isCurrent = true;
    }

    moveStateBack() : void 
    {
        if(this.currentFrame == 0) return;
        this.ticks = 0;
        this.currentFrame --;
        this.state.people = this.getFrame(this.currentFrame)
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if(!this.paused)
            pause(this.pauseButton);
    }

    moveStateForward() : void
    {
        if(this.currentFrame == this.frames.length - 1) return;
        this.ticks = 0;
        this.currentFrame ++;
        this.state.people = this.getFrame(this.currentFrame)
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
            this.isCurrent = false;
            if(!this.paused)
                pause(this.pauseButton);
        } else 
        {
            this.isCurrent = true;
            this.bridge.tick(this.queued, () => this.frames.push(this.state.people));
        }
    }

    setStateToFirst() : void
    {
        this.currentFrame = 0;
        this.ticks = 0;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if(!this.paused)
            pause(this.pauseButton);
    }

    getPersonInPast(person : Person, timeBack : number) : Person
    {
        if(this.frames.length > 0)
        {
            let frame = Math.max(this.currentFrame - timeBack, 0)
            let temp = new State(this.frames[frame])
            return temp.getPersonByName(person.fName + " " + person.lName)
        } 
        else
        {
            return person;
        }
    }
}
