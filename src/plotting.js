function plot_points(ctx, point_list) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    for(var i = 0; i < point_list.length; i++) {
        var point = point_list[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}
function Point (x, y) {
    this.x = x;
    this.y = y;
}
canvas = $('#position-feed')[0];
plot_points(canvas.getContext('2d'), [new Point(10, 10), new Point(50, 32)])
