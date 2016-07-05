///<reference path='node.d.ts'/>
///<reference path='jquery.d.ts'/>
var Person = (function () {
    function Person(x, y, fName, lName, age) {
        this.x = x;
        this.y = y;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
    }
    return Person;
}());
var radius = 6;
var radiusSquared = radius * radius;
var State = (function () {
    function State(people) {
        this.people = people;
        this.selected = null;
    }
    State.prototype.draw = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.globalAlpha = 0.25;
            if (person == this.selected || this.selected == null)
                ctx.globalAlpha = 1.0;
            ctx.arc(person.x, person.y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    };
    State.prototype.update = function (next, ticks, maxTicks) {
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            var equivalent = next.getPersonByName(person.fName + " " + person.lName);
            person.x = this.scaleByTime(person.x, equivalent.x, ticks, maxTicks);
            person.y = this.scaleByTime(person.y, equivalent.y, ticks, maxTicks);
        }
    };
    State.prototype.scaleByTime = function (current, goal, ticks, maxTicks) {
        return current + (goal - current) / (maxTicks - ticks);
    };
    State.prototype.getPersonAt = function (x, y) {
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            var dstX = x - person.x;
            var dstY = y - person.y;
            if (Math.pow(dstX, 2) + Math.pow(dstY, 2) <= radiusSquared)
                return person;
        }
        return null;
    };
    State.prototype.getPersonByName = function (name) {
        for (var _i = 0, _a = this.people; _i < _a.length; _i++) {
            var person = _a[_i];
            if (person.fName + " " + person.lName === name) {
                return person;
            }
        }
        return null;
    };
    State.prototype.updateSelected = function () {
        for (var i = 0; i < this.people.length; i = i + 1) {
            if ((this.selected != null) && (this.selected.lName == this.people[i].lName && this.selected.fName == this.people[i].fName && this.selected.age == this.people[i].age))
                this.selected = this.people[i];
        }
    };
    State.prototype.setSelection = function (selection) {
        this.selected = selection;
        this.setDisplay(selection);
    };
    State.prototype.setDisplay = function (display) {
        if (display) {
            $("#sidebar").empty();
            $("#sidebar").append("<b>First Name: </b>", display.fName, "<br>");
            $("#sidebar").append("<b>Last Name:  </b>", display.lName, "<br>");
            $("#sidebar").append("<b>Age: </b>", display.age, "<br>");
        }
        else
            $("#sidebar").empty();
    };
    return State;
}());
///<reference path='plotting.ts'/>
/**
Bridge between the frontend and backend applications

Handles AJAX requests and caches the results
*/
var Bridge = (function () {
    function Bridge() {
        this.messageCache = [JSON.stringify([new Person(30, 30, "Brian", "Doe", 30), new Person(80, 100, "Brian", "DeLeonardis", 18)]),
            JSON.stringify([new Person(50, 50, "Brian", "Doe", 30), new Person(110, 100, "Brian", "DeLeonardis", 18)]),
            JSON.stringify([new Person(50, 80, "Brian", "Doe", 30), new Person(140, 100, "Brian", "DeLeonardis", 18)]),
            JSON.stringify([new Person(35, 75, "Brian", "Doe", 30), new Person(200, 100, "Brian", "DeLeonardis", 18)]),
            JSON.stringify([new Person(50, 50, "Brian", "Doe", 30), new Person(400, 100, "Brian", "DeLeonardis", 18)])];
    }
    /**
    * Takes a message from the cache or the server and makes it into a State object
    * Asynchronous because it may make an AJAX request
    */
    Bridge.prototype.tick = function (state, action) {
        if (action === void 0) { action = null; }
        this.doWithMessage(function (message) {
            state.people = JSON.parse(message);
            state.updateSelected();
            if (action)
                action();
        });
    };
    Bridge.prototype.doWithMessage = function (callback) {
        if (this.messageCache.length > 0) {
            callback(this.messageCache.shift());
        }
        else {
        }
    };
    return Bridge;
}());
///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
///<reference path='events.ts'/>
var maxTicks = 100;
var TimeManager = (function () {
    function TimeManager(bridge, ctx, state, next, pause) {
        this.bridge = bridge;
        this.frames = [];
        this.frames.push([new Person(10, 10, "Brian", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)]);
        this.ticks = 0;
        this.paused = false;
        this.ctx = ctx;
        this.currentFrame = 0;
        this.state = state;
        this.queued = next;
        this.next = new State(this.state.people);
        this.isCurrent = true;
        this.pauseButton = pause;
    }
    TimeManager.prototype.getFrame = function (index) {
        return JSON.parse(JSON.stringify(this.frames[index]));
    };
    TimeManager.prototype.updateFrame = function () {
        if (!this.paused) {
            if (this.isCurrent) {
                this.ticks += 1;
                this.queued.selected = this.state.selected;
                if (this.ticks == 100) {
                    this.bridge.tick(this.queued);
                    this.frames.push(JSON.parse(JSON.stringify(this.state.people)));
                    this.ticks = 0;
                }
                this.state.update(this.queued, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            }
            else {
                this.ticks += 1;
                this.next.selected = this.state.selected;
                if (this.ticks == 100) {
                    this.moveStateForward();
                }
                this.state.update(this.next, this.ticks, maxTicks);
                this.state.draw(this.ctx);
            }
        }
    };
    TimeManager.prototype.setStateToCurrent = function () {
        this.ticks = 0;
        this.currentFrame = this.frames.length - 1;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        this.isCurrent = true;
    };
    TimeManager.prototype.moveStateBack = function () {
        if (this.currentFrame == 0)
            return;
        this.ticks = 0;
        this.currentFrame--;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if (this.currentFrame < this.frames.length - 1) {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if (!this.paused)
            pause(this.pauseButton);
    };
    TimeManager.prototype.moveStateForward = function () {
        var _this = this;
        if (this.currentFrame == this.frames.length - 1)
            return;
        this.ticks = 0;
        this.currentFrame++;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if (this.currentFrame < this.frames.length - 1) {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
            this.isCurrent = false;
            if (!this.paused)
                pause(this.pauseButton);
        }
        else {
            this.isCurrent = true;
            this.bridge.tick(this.queued, function () { return _this.frames.push(_this.state.people); });
        }
    };
    TimeManager.prototype.setStateToFirst = function () {
        this.currentFrame = 0;
        this.ticks = 0;
        this.state.people = this.getFrame(this.currentFrame);
        this.state.updateSelected();
        if (this.currentFrame < this.frames.length - 1) {
            this.next.people = this.getFrame(this.currentFrame + 1);
            this.next.updateSelected();
        }
        this.isCurrent = false;
        if (!this.paused)
            pause(this.pauseButton);
    };
    return TimeManager;
}());
///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
///<reference path='time.ts'/>
var canvas = $('#position-feed')[0];
var ctx = canvas.getContext('2d');
var state = new State([new Person(10, 10, "Brian", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)]);
var bridge = new Bridge();
var next = new State(state.people);
var timeManager = new TimeManager(bridge, ctx, state, next, $("#pause")[0]);
canvas.onmousedown = function (e) {
    state.setSelection(state.getPersonAt(e.offsetX, e.offsetY));
    state.draw(ctx);
};
function pause(button) {
    var pause = button.innerHTML === "Pause";
    button.innerHTML = pause ? "Resume" : "Pause";
    timeManager.paused = pause;
}
//TODO: HOOK UP NEW BUTTONS
$("#back-to-start").click(function (e) {
    timeManager.setStateToFirst();
    state.draw(ctx);
});
$("#back-one").click(function (e) {
    timeManager.moveStateBack();
    state.draw(ctx);
});
$("#forward-one").click(function (e) {
    timeManager.moveStateForward();
    state.draw(ctx);
});
$("#forward-to-now").click(function (e) {
    timeManager.setStateToCurrent();
    state.draw(ctx);
});
$('#pause').click(function (e) {
    pause(this);
});
canvas.onmousemove = function (e) {
    if (!state.selected) {
        state.setDisplay(state.getPersonAt(e.offsetX, e.offsetY));
        state.draw(ctx);
    }
};
var input = $('#searchbar')[0];
function search() {
    state.setSelection(state.getPersonByName(input.value));
    $("#not-found").css("visibility", state.selected ? "hidden" : "visible");
    state.draw(ctx);
}
function setSearchItems(items) {
    var results = $("#search-results");
    if (items.length == 0) {
        results.html("");
        results.css("border", "0px");
    }
    else if (items.length == 1) {
        results.html("");
        results.css("border", "0px");
        input.value = items[0];
        search();
    }
    else {
        results.html("");
        for (var i = 0; i < items.length; i++) {
            var r = $('<input type="button" class = "poss" onclick="autocomplete_button_onclick(this)" value="' + items[i] + '"/>');
            results.append(r);
            //results.append(items[i]);
            results.append("<br>");
        }
        results.css("border", "1px solid #A5ACB2");
    }
}
function pSearch(check) {
    if (check.length < 3)
        return [];
    var possible = [];
    for (var i = 0; i < state.people.length; i++) {
        var name = state.people[i].fName + " " + state.people[i].lName;
        if (name.indexOf(check) >= 0) {
            possible.push(name);
        }
    }
    return possible;
}
$('#searchbutton').click(function (e) {
    search();
});
function autocomplete_button_onclick(button) {
    var results = $("#search-results");
    results.html("");
    results.css("border", "0px");
    input.value = button.value;
    search();
}
$('#searchbar').on("input", function (e) {
    var str = input.value;
    setSearchItems(pSearch(str));
});
$("#searchbar").keypress(function (e) {
    if (e.keyCode === 13) {
        search();
    }
});
state.draw(ctx);
setInterval(function () {
    timeManager.updateFrame();
}, 10);
