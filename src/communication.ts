///<reference path='plotting.ts'/>
/**
Bridge between the frontend and backend applications

Handles AJAX requests and caches the results
*/
class Bridge
{
    private messageCache : string[];

    constructor()
    {
        this.messageCache = [JSON.stringify([new Person(30, 30, "Brian", "Doe", 30), new Person(80, 100, "Brian", "DeLeonardis", 18)]),
                             JSON.stringify([new Person(50, 50, "Brian", "Doe", 30), new Person(110, 100, "Brian", "DeLeonardis", 18)]),
                             JSON.stringify([new Person(50, 80, "Brian", "Doe", 30), new Person(140, 100, "Brian", "DeLeonardis", 18)]),
                             JSON.stringify([new Person(35, 75, "Brian", "Doe", 30), new Person(200, 100, "Brian", "DeLeonardis", 18)]),
                             JSON.stringify([new Person(50, 50, "Brian", "Doe", 30), new Person(400, 100, "Brian", "DeLeonardis", 18)])]
    }

    /**
    * Takes a message from the cache or the server and makes it into a State object
    * Asynchronous because it may make an AJAX request
    */
    tick(state : State, action : () => void = null)
    {
        this.doWithMessage((message : string) =>
        {
            state.people = <Person[]>JSON.parse(message);
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
            //TODO: AJAX requests
        }
    }
}
