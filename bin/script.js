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
            $("#sidebar").append("<b>Last Name:  </b>", display, "<br>");
            $("#sidebar").append("<b>Age: </b>", display, "<br>");
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
        this.messageCache = [JSON.stringify([new Person(30, 30, "John", "Doe", 30), new Person(80, 100, "Brian", "DeLeonardis", 18)]),
            JSON.stringify([new Person(50, 50, "John", "Doe", 30), new Person(110, 100, "Brian", "DeLeonardis", 18)])];
    }
    /**
    * Takes a message from the cache or the server and makes it into a State object
    * Asynchronous because it may make an AJAX request
    */
    Bridge.prototype.tick = function (state) {
        this.doWithMessage(function (message) {
            state.people = JSON.parse(message);
            state.updateSelected();
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
var maxTicks = 100;
var TimeManager = (function () {
    function TimeManager(bridge, ctx) {
        this.bridge = bridge;
        this.frames = [];
        this.frames.push([new Person(-30, -30, "John", "Doe", 30), new Person(-10, 100, "Brian", "DeLeonardis", 18)]);
        this.frames.push([new Person(-10, -10, "John", "Doe", 30), new Person(20, 100, "Brian", "DeLeonardis", 18)]);
        this.ticks = 0;
        this.paused = false;
        this.ctx = ctx;
    }
    TimeManager.prototype.updateFrame = function (state, next) {
        if (!this.paused) {
            this.ticks += 1;
            next.selected = state.selected;
            if (this.ticks == 100) {
                this.bridge.tick(next);
                if (state.people !== next.people) {
                    this.frames.push(state.people);
                    console.log("Pushed frame");
                }
                this.ticks = 0;
            }
            state.update(next, this.ticks, maxTicks);
            state.draw(ctx);
        }
    };
    TimeManager.prototype.setStateToCurrent = function (state, next) {
        state.update(next, this.ticks, maxTicks);
    };
    TimeManager.prototype.setStateToTick = function (state, ticks) {
        var frameIndex = Math.floor(ticks / maxTicks);
        var currentFrame = this.frames[frameIndex];
        console.log(currentFrame);
        state.people = currentFrame;
        if (frameIndex < this.frames.length - 1) {
            var nextFrame = this.frames[frameIndex + 1];
            var targetState = new State(nextFrame);
            state.update(targetState, ticks % maxTicks, maxTicks);
        }
        //state.updateSelected()
    };
    TimeManager.prototype.getCurrentTotalTick = function () {
        return maxTicks * this.frames.length;
    };
    return TimeManager;
}());
///<reference path='plotting.ts'/>
///<reference path='communication.ts'/>
///<reference path='time.ts'/>
var canvas = $('#position-feed')[0];
var ctx = canvas.getContext('2d');
var state = new State([new Person(10, 10, "John", "Doe", 30), new Person(50, 100, "Brian", "DeLeonardis", 18)]);
var bridge = new Bridge();
var timeManager = new TimeManager(bridge, ctx);
var next = new State(state.people);
canvas.onmousedown = function (e) {
    state.setSelection(state.getPersonAt(e.offsetX, e.offsetY));
    state.draw(ctx);
};
function pause(button) {
    var pause = button.innerHTML === "Pause";
    button.innerHTML = pause ? "Resume" : "Pause";
    timeManager.paused = pause;
}
$("#slide").on("input", function (e) {
    if (!timeManager.paused) {
        pause($('#pause')[0]);
    }
    timeManager.setStateToTick(state, Math.floor(this.value * timeManager.getCurrentTotalTick()));
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
$('#searchbutton').click(function (e) {
    search();
});
$("#searchbar").keypress(function (e) {
    if (e.keyCode === 13) {
        search();
    }
});
state.draw(ctx);
setInterval(function () {
    timeManager.updateFrame(state, next);
}, 10);
