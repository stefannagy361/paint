(function (angular) {
  angular.module('app')
    .controller('MainController', MainController);

  function MainController($scope) {
    $scope.button = {
      btnClass: "btn btn-default"
    };
    $scope.circles = 0;
    $scope.triangles = 0;
    $scope.squares = 0;
    $scope.rectangles = 0;
    $scope.buttons = ['triangle', 'circle', 'rectangle', 'square', 'pencil', 'resizecircle', 'move'];
    $scope.colorButtons = ['white', 'red', 'yellow', 'green', 'blue', 'black'];

    $scope.selectButton = function (e) {
      var btnObj;
      if (e.target.tagName == "BUTTON")
        btnObj = e.target;
      else
        btnObj = e.target.parentElement;

      if (btnObj.style.background == "grey")
        btnObj.style = background = "#fff";
      else {
        $scope.buttons.forEach(function (button) {
          document.getElementById(button).style.background = "#fff";
        });
        turnMovableOff();
        btnObj.style.background = "grey";
      }
    };

    $scope.colorButton = function (e) {
      var colorButton = e.target;

      if(colorButton.style.border === "2px solid black")
        colorButton.style.border = "1px solid #ccc";
      else {
        $scope.colorButtons.forEach(function (colbtn) {
          document.getElementById(colbtn).style.border = "1px solid #ccc";
        });
        colorButton.style.border = "2px solid black";
      }
    };

    $scope.moveButton = function (e) {
      var btnObj;
      if (e.target.tagName == "BUTTON")
        btnObj = e.target;
      else
        btnObj = e.target.parentElement;

      if (btnObj.style.background === 'grey') {
        btnObj.style.background = '#fff';
        turnMovableOff();
      }
      else {
        $scope.buttons.forEach(function (button) {
          document.getElementById(button).style.background = "#fff";
        });
        btnObj.style.background = 'grey';
        turnMovableOn();
      }
    };

    $scope.mousePos = function (e) {
      var clickX = e.pageX - document.getElementById("ShapeContainer").offsetLeft;
      var clickY = e.pageY - document.getElementById("ShapeContainer").offsetTop;

      draw(clickX, clickY);
    };

    $scope.triangle = new Triangle();
    $scope.circle = new Circle();
    $scope.rectangle = new Rectangle();
    $scope.square = new Square();

    var stage = new Konva.Stage({
      container: angular.element('#ShapeContainer'),
      width: 700,
      height: 650
    });
    var layer = new Konva.Layer();
    var corners = 0;

    function draw(clickX, clickY) {
      if (document.getElementById("triangle").style.background == "grey") {
        if (corners < 2) {
          $scope.triangle.draw(clickX, clickY, stage, layer);
          corners++;
        }
        else {
          layer.add($scope.triangle.draw(clickX, clickY, stage, layer));
          stage.add(layer);
          corners = 0;
          $scope.triangles++;
        }
      }
      else
        if (document.getElementById("circle").style.background == "grey") {
          layer.add($scope.circle.draw(clickX, clickY, stage, layer));
          stage.add(layer);
          $scope.circles++;
        }
        else
          if (document.getElementById("rectangle").style.background == "grey") {
            layer.add($scope.rectangle.draw(clickX, clickY, stage, layer));
            stage.add(layer);
            $scope.rectangles++;
          }
          else
            if (document.getElementById("square").style.background == "grey") {
              layer.add($scope.square.draw(clickX, clickY, stage, layer));
              stage.add(layer);
              $scope.squares++;
            }
    };
    var oldPos = {};
    var down = false;
    var firstPos = {};
    $scope.mouseDown = function (e) {
      down = true;
      oldPos.x = e.pageX - document.getElementById("ShapeContainer").offsetLeft;
      oldPos.y = e.pageY - document.getElementById("ShapeContainer").offsetTop;
      firstPos.x = oldPos.x;
      firstPos.y = oldPos.y;
    };

    $scope.mouseMove = function (e) {
      var posX = e.pageX - document.getElementById("ShapeContainer").offsetLeft;
      var posY = e.pageY - document.getElementById("ShapeContainer").offsetTop;
      toDraw(posX, posY, down, oldPos, firstPos, stage, layer);
    };

    $scope.mouseUp = function () {
      down = false;
      if (document.getElementById("resizecircle").style.background === "grey") {
        if (oldcircle) {
          $scope.circles++;
          shapes.push(oldcircle);
          oldcircle = undefined;
        }
      }
    };

    $scope.delete = function () {
      shapes = [];
      layer.destroy();
      $scope.circles = 0;
      $scope.squares = 0;
      $scope.triangles = 0;
      $scope.rectangles = 0;
    };
  }
})(angular);