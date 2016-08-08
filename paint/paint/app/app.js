(function () {
  var script = document.createElement('script');
  script.src = "app/ShapeDrawer.js"
  document.head.appendChild(script);
  document.getElementById("triangle").addEventListener("click", SelectButton);
  document.getElementById("circle").addEventListener("click", SelectButton);
  document.getElementById("rectangle").addEventListener("click", SelectButton);

  function SelectButton () {
    if (this.style.background === "grey")
      this.style = background = "#fff";
    else {
      document.getElementById("triangle").style.background = "#fff";
      document.getElementById("circle").style.background = "#fff";
      document.getElementById("rectangle").style.background = "#fff";
      this.style.background = "grey";
    }
  };

  var context = document.getElementById("Paint").getContext("2d");
  var triangle = new Triangle();
  document.getElementById("Paint").onclick = function (e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    context.beginPath();
    if (document.getElementById("triangle").style.background == "grey") {
      triangle.DrawTriangle(x, y, context);
    }
    else
      if (document.getElementById("circle").style.background == "grey")
        DrawCircle(x, y, context);
      else
        if (document.getElementById("rectangle").style.background == "grey")
          DrawRectangle(x, y, context);
    context.fill();
    context.stroke();
  };

  function DrawRectangle(x, y, context) {
    context.strokeRect(x, y, 90, 60);
  };

  function DrawCircle(x, y, context) {
    context.arc(x, y, 40, 0, 2 * Math.PI);
  };
})();