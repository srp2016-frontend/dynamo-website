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
    tick(state : State, action : () => void = null)
    {
        this.doWithMessage((message : string) =>
        {
            state.people = <Person[]>eval(message);
            state.updateSelected()
            if(action)
                action();
        })
    }

    private doWithMessage(callback : (string) => void) : void
    {
        if(this.messageCache.length > 0)
        {
            callback(this.messageCache.shift());
        }
        else
        {
            let x : any = $.ajax({url : "index.html", method: "POST", context:document.body, data : "next"})
            x.success(function(data) { console.log(data); callback(data); } )
        }
    }
}
