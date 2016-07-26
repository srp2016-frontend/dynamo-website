/// <reference path="jquery.d.ts" />

function setMenuEvents() : void
{
    function bind(input : JQuery, target : JQuery) : void 
    {
        let doEvent = (e : Event) => target.css("display", input.is(":checked") ? "inline" : "none")
        input.change(doEvent)
        doEvent(null)
    }
    bind($("#search-check"), $("#searchbar-container"))
    bind($("#time-check"), $("#time"))
    bind($("#selection-check"), $("#selection-panel"))
    bind($("#map-check"), $("#position-feed"))
    bind($("#alert-check"), $("#alert-panel"))
    bind($("#manifest-check"), $("#manifest-panel"))
    bind($("#video-check"), $("#video-feed"))
}