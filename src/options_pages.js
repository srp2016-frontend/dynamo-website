$("#submit").click(function(e) {
    var forms = $("form")
    for(var i = 0; i < forms.length; i++) {
        var form = forms[i];
        for(var j = 0; j < form.children.length; j++) {
            if(form.children[j].checked) {
                var split = form.action.split("/")
                Cookies.set(split[split.length - 1], form.children[j].value)
				console.log(split)
            }
        }
    }
});
