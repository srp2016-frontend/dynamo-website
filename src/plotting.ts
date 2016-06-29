///<reference path='node.d.ts'/>
///<reference path='jquery.d.ts'/>
function plot_points(ctx : CanvasRenderingContext2D, point_list : Tag[]) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    for(var i = 0; i < point_list.length; i++) {
        var point = point_list[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}
class Tag {
    x : number;
    y : number;
    age : number;
    fName : string;
    lName : string;
    constructor(x : number, y : number, fName: string = "John", lName : string = "Doe", age : number = 18) {
        this.x = x;
        this.y = y;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
    }
}
var canvas = <HTMLCanvasElement>$('#position-feed')[0];
plot_points(canvas.getContext('2d'), [new Tag(10, 10), new Tag(50, 32)])
