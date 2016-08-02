///<reference path='state.ts'/>
///<reference path='communication.ts'/>
/// <reference path="alert.ts" />

const maxTicks = 10;
function pause(time : TimeManager) : void
{
    $("#play").css("display", "initial");
    $("#pause").css("display", "none");
    time.paused = true;
}
function play(time : TimeManager) : void
{
    $("#pause").css("display", "initial");
    $("#play").css("display", "none");
    time.paused = false;
}
class TimeManager
{
    private frames : Item[][];
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
        this.next = new State(this.state.items);
        this.isCurrent = true;
        this.pauseButton = pause;
        this.setupEvents();
    }

    private getFrame(index : number) : Item[]
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
                if(this.state.items.length > 0)
                    this.queued.copySelection(this.state);
                else
                    this.state.items = JSON.parse(JSON.stringify(this.queued.items));
                if(this.ticks == maxTicks)
                {
                    this.bridge.tick(this.queued, this.frames.length);
                    if(this.state.items.length > 0)
                        this.frames.push(JSON.parse(JSON.stringify(this.state.items)));
                    this.ticks = 0;
                }
                this.state.update(this.queued, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            } else
            {
                this.ticks += 1;
                this.next.copySelection(this.state);
                if(this.ticks == maxTicks)
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
        this.state.items = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        this.isCurrent = true;
    }

    moveStateBack() : void 
    {
        if(this.currentFrame == 0) return;
        this.ticks = 0;
        this.currentFrame --;
        this.state.items = this.getFrame(this.currentFrame)
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            this.next.items = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if(!this.paused)
            pause(this);
    }

    moveStateForward() : void
    {
        if(this.currentFrame == this.frames.length - 1) return;
        this.ticks = 0;
        this.currentFrame ++;
        this.state.items = this.getFrame(this.currentFrame)
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            this.next.items = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
            this.isCurrent = false;
            if(!this.paused)
                pause(this);
        } else 
        {
            this.isCurrent = true;
            this.bridge.tick(this.queued, this.frames.length, () => this.frames.push(this.state.items));
        }
    }

    setStateToFirst() : void
    {
        this.currentFrame = 0;
        this.ticks = 0;
        this.state.items = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if(this.currentFrame < this.frames.length - 1)
        {
            this.next.items = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if(!this.paused)
            pause(this);
    }

    getItemInPast(item : Item, timeBack : number) : Item
    {
        if(this.frames.length > 0)
        {
            let cFrame = this.currentFrame;
            if(this.isCurrent)
                cFrame = this.frames.length - 1;
            let frame = Math.max(cFrame - timeBack, 0)
            let temp = new State(this.frames[frame])
            return temp.getItemByID(item.id)
        } 
        else
        {
            return item;
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
            pause(timeManager);
        });
        $('#play').click(function (e : Event)
        {
            play(timeManager);
        });
    }
}
