/// <reference path="jquery.d.ts" />

function setMenuEvents() : void
{
    function bind(input : JQuery, target : JQuery) : void 
    {
        let doEvent = (e : Event) => target.css("display", input.is(":checked") ? "initial" : "none")
        input.change(doEvent)
        doEvent(null)
    }
    bind($("#search-check"), $("#searchbar-container"))
    bind($("#time-check"), $("#time"))
    bind($("#zoom-check"), $("#zoom"))
    bind($("#selection-check"), $("#selection-panel"))
    bind($("#map-check"), $("#position-feed"))
    bind($("#alert-check"), $("#alert-panel"))
    bind($("#manifest-check"), $("#manifest-panel"))
    bind($("#video-check"), $("#video-feed"))
    bind($("#tech-check"), $("#tech-info"))
	
	$("input[value='" + Cookies.get("pick-stage") + "']").prop('checked', true);
	$("input[name=stage-select]").change(function()
	{
		Cookies.set("pick-stage", this.value);
	})
	
	$("input[value='" + Cookies.get("pick-icon") + "']").prop('checked', true);
	$("input[name=icon-select]").change(function()
	{
		Cookies.set("pick-icon", this.value);
	})
}