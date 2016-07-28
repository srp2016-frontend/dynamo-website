///<reference path='state.ts'/>
/**
Bridge between the frontend and backend applications

Handles AJAX requests and caches the results
*/
class Bridge
{
    private messageCache : string[];

    constructor()
    {
        this.messageCache = [];
    }

    /**
    * Takes a message from the cache or the server and makes it into a State object
    * Asynchronous because it may make an AJAX request
    */
    tick(state : State, frame : number, action : () => void = null)
    {
        this.doWithMessage(frame, (message : string) =>
        {
            let value = <Item[]>eval(message);
            if(value) {
                state.items = value;
                for(let item of state.items)
                {
                    item.x = parseInt("" + item.x) + 20;
                    item.y = parseInt("" + item.y) - 10;
                    console.log(item)
                }
                state.updateSelected()
                if(action)
                    action();
            }
        })
    }

    private doWithMessage(frame : number, callback : (string) => void) : void
    {
        if(this.messageCache.length > 0)
        {
            callback(this.messageCache.shift());
        }
        else
        {
            let x : any = $.ajax({url : "index.html", method: "POST", context:document.body, data : "" + frame})
            x.success((data : string) => { callback(data); } )
        }
    }
}
