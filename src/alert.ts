/// <reference path="jquery.d.ts" />

function generate_alert(message : string) : void
{
    let feed = $("#alerts")
    feed.append("<div>" + message + "</div>")
    let div = feed.children().last()
    let button = div.append("<button>X</button>").children().last()
    button.click((e : Event) => {
        button.parent().remove()
    })
}