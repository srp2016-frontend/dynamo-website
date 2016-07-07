/// <reference path="state.ts" />
/// <reference path="jquery.d.ts" />

function setSearchEvents(state : State, ctx : CanvasRenderingContext2D) : (string) => string[]
{
    let input = <HTMLInputElement>$('#searchbar')[0];
    let count = 0;
    let items : string[] = [];
    function search() : void
    {
        let people : Person[] = [];
        for(let item of items)
            people.push(state.getPersonByName(item))
        state.setSelections(people)
        $("#not-found").css("visibility", state.hasSelection() ? "hidden" : "visible")
        state.draw(ctx);
    }

    function setSearchItems(is : string[]) : void
    {
        let results = $("#search-results");
        items = is;
        if(items.length == 0)
        {
            results.html("")
            results.css("border", "0px");
        } 
        /*else if(items.length == 1) 
        {
            input.value = items[0];
            input.hover = true;
        } */
        else
        {
            count = 0;
            results.html("");
            for(let i = 0; i < items.length; i++)
            {
                if(i == count)
                {
                    var r= $('<input type="button" class = "sel" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
                else
                {
                    var r= $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
            } 
            results.css("border", "1px solid #A5ACB2");
        }
    }



    function pSearch(check : string) : string[]
    {
        if(check.length < 1)
            return [];
        var possible = [];
        for(let i = 0; i < state.people.length; i++)
        {
            var name = state.people[i].fName + " " + state.people[i].lName;
            if(name.toLowerCase().indexOf(check.toLowerCase()) >= 0)
            {
                possible.push(name);
            }
        }
        return possible;
    }

    $('#searchbutton').click(function (e : Event)
    {
        search();
    })

    function autocomplete_button_onclick(button : HTMLButtonElement)
    {
        let results = $("#search-results")
        results.html("");
        results.css("border", "0px");
        input.value =  button.value;
        search();
    }

    $('#searchbar').on("input", (e : Event) =>
    {
        var str = input.value;
        setSearchItems(pSearch(str));
    });

    $("#searchbar:input").bind( 'keyup change click', (ev : Event) =>
    {
        let e = <KeyboardEvent>ev;
        let results = $("#search-results");
        if(e.keyCode === 13)
        {
            $("#searchbar").val(items[count]);
            search();
            results.html("");
        }
        else if(e.keyCode === 38 || e.keyCode === 40)
        {    
            if(e.keyCode === 38 && count > 0)
                count--;        
            else if(e.keyCode === 40 && count < items.length - 1)
                count++;
                
            results.html("");
            
            for(let i = 0; i < items.length; i++)
            {
                if(i == count)
                {
                    var r= $('<input type="button" class = "sel" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
                else
                {
                    var r= $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
                    results.append(r);
                    results.append("<br>");
                }
            }    
        }
    });
    return pSearch;
}
