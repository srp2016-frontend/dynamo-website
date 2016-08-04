var old_event = $("#submit").attr("onclick");
$("#submit").click(function(e) {
    var cookies = JSON.parse(document.cookie)
    cookies.form = {}
    var forms = $("form")
    for(var i = 0; i < forms.length; i++) {
        var form = forms[i];
        for(var j = 0; j < form.children.length; j++) {
            if(form.children[j]) {
                var split = form.action.split("/")
                cookies.form[split[split.length - 1]] = form.children[j].value;
            }
        }
    }
    document.cookie = JSON.stringify(cookies)
    old_event(e);
});
