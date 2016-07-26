/// <reference path="state.ts" />
/// <reference path="jquery.d.ts" />

function setSearchEvents(state : State, ctx : CanvasRenderingContext2D) : (string) => string[]
{
    let input = <HTMLInputElement>$('#searchbar')[0];
    let count = 0;
    let items : string[] = [];
    function search()
    {
        for (let item of items)
            if(input.value == item)     
                state.setSelection(state.getPersonByName(input.value))
        console.log("search")
    }
    
    function searchAll() : void
    {
        let people : Item[] = [];
        for(let item of items)
            people.push(state.getPersonByName(item))
        state.setSelections(people)
        $("#not-found").css("visibility", state.hasSelection() ? "hidden" : "visible")
        state.draw(ctx);
    }

    function setSearchItems(is : string[]) : void
    {
        let results = $("#search-results");
        results.empty()
        items = is;
        if(items.length == 0)
        {
            results.html("")
            results.css("border", "0px");
        } 
        else
        {
            results.html("");
            for(let i = 0; i < items.length; i++)
            {
                if(i == count)
                {
                    let r= $('<input type="button" class = "sel" value="' + items[i] + '"/>');
                    let button = <HTMLButtonElement>r[0];
                    r.click((e : MouseEvent) => 
                    {
                        count = 0;
                        let results = $("#search-results")
                        results.html("");
                        results.css("border", "0px");
                        input.value = button.value;
                        search();
                    })
                    results.append(r);
                    results.append("<br>");
                }
                else
                {
                   let r= $('<input type="button" class = "poss" value="' + items[i] + '"/>');
                    let button = <HTMLButtonElement>r[0];
                    r.click((e : MouseEvent) => 
                    {
                        count = 0;
                        let results = $("#search-results")
                        results.html("");
                        results.css("border", "0px");
                        input.value = button.value;
                        search();
                    })
                    results.append(r);
                    results.append("<br>");
                }
            } 
            results.css("border", "1px solid #A5ACB2");
        }
        search();
    }



    function pSearch(check : string) : string[]
    {
        if(check.length < 1)
            return [];
        var possible = [];
        for(let i = 0; i < state.people.length; i++)
        {
            var name = state.people[i].id;
            if(name.toLowerCase().indexOf(check.toLowerCase()) >= 0)
            {
                possible.push(name);
            }
        }
        return possible;
    }

    $('#searchbutton').click(function (e : Event)
    {
        input.value = items[count];
        search();
    })

    $('#searchbar').on("input", (e : Event) =>
    {
        var str = input.value;
        setSearchItems(pSearch(str));
        if(str.length === 0)
            $("#not-found").css("visibility", "hidden")
    });

    $("#searchbar:input").bind( 'keyup change click', (ev : Event) =>
    {
        let e = <KeyboardEvent>ev;
        let results = $("#search-results");
        if(e.keyCode === 13)
        {
            $("#searchbar").val(items[count]);
            count = 0;
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
            
            setSearchItems(items)
        }
    });
    return pSearch;
}
