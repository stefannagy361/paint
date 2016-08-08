function Shape() {
  this.color = "white";
}

function Triangle(){
  this.x1 = null;
  this.y1 = null;
  this.x2 = null;
  this.y2 = null;
  this.x3 = null;
  this.y3 = null;
}

var cornerCount = 0;
Triangle.prototype.DrawTriangle = function (x, y, context) {
  if (cornerCount == 0) {
    this.x1 = x;
    this.y1 = y;
    console.log("(" + this.x1 + ", " + this.y1 + ")");
    context.arc(x, y, 0.1, 0, 2 * Math.PI);
    cornerCount++;
    firstx = x;
    firsty = y;
    oldx = x;
    oldy = y;
  }
  else if (cornerCount == 1) {
    this.x2 = x;
    this.y2 = y;
    console.log("(" + this.x1 + ", " + this.y1 + ")");
    context.arc(x, y, 0.1, 0, 2 * Math.PI);
    context.moveTo(this.x1, this.y1);
    context.lineTo(x, y);
    cornerCount++;
  }
  else if (cornerCount == 2) {
    this.x3 = x;
    this.y3 = y;
    cornerCount = 0;
    context.moveTo(this.x2, this.y2);
    context.lineTo(x, y);
    context.moveTo(x, y);
    context.lineTo(this.x1, this.y1);
    cornerCount = 0;
  }
}