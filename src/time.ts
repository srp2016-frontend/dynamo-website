///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
const maxTicks = 100;
function pause(button : HTMLButtonElement, time : TimeManager) : void
{
    let pause = button.innerHTML === "Pause"
    button.innerHTML = pause ? "Resume" : "Pause"
    time.paused = pause;
}
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
        this.setupEvents();
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
                this.queued.copySelection(this.state);
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
                this.next.copySelection(this.state);
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
            pause(this.pauseButton, this);
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
                pause(this.pauseButton, this);
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
            pause(this.pauseButton, this);
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

    setupEvents() : void
    {
        let timeManager = this;
        let state = this.state;
        let ctx = this.ctx;
         $("#back-to-start").click(function(e : Event){
            timeManager.setStateToFirst()
            state.draw(ctx)
        })
        $("#back-one").click(function(e : Event){
            timeManager.moveStateBack();
            state.draw(ctx)
        })

        $("#forward-one").click(function(e : Event){
            timeManager.moveStateForward();
            state.draw(ctx)
        })

        $("#forward-to-now").click(function(e : Event){
            timeManager.setStateToCurrent();
            state.draw(ctx)
        })

        $('#pause').click(function(e : Event)
        {
            pause(this, timeManager);
        });
    }
}
