(function (angular) {
  angular.module('app')
    .controller('MainController', ['$scope', 'canvasService', MainController]);

  function MainController($scope, canvasService) {
    $scope.buttons = {};
    buttonsOff();
    $scope.colorButtons = {};
    btnBordersOff();

    $scope.selectButton = function (e) {
      canvasService.initScope($scope.buttons, $scope.colorButtons);
      var btnObj;
      if (e.target.tagName == "BUTTON")
        btnObj = e.target;
      else
        btnObj = e.target.parentElement;

      if ($scope.buttons[btnObj.id] == "grey") {
        $scope.buttons[btnObj.id] = "white";
      }
      else {
        buttonsOff();
        turnMovableOff();
        $scope.buttons[btnObj.id] = "grey";
      }
    };

    function buttonsOff() {
      $scope.buttons["square"] = "white";
      $scope.buttons["triangle"] = "white";
      $scope.buttons["rectangle"] = "white";
      $scope.buttons["circle"] = "white";
      $scope.buttons["pencil"] = "white";
      $scope.buttons["resizecircle"] = "white";
      $scope.buttons["move"] = "white";
    }

    function btnBordersOff() {
      $scope.colorButtons["white"] = "off";
      $scope.colorButtons["red"] = "off";
      $scope.colorButtons["yellow"] = "off";
      $scope.colorButtons["green"] = "off";
      $scope.colorButtons["blue"] = "off";
      $scope.colorButtons["black"] = "off";
    }

    $scope.colorButton = function (e) {
      var colorButton = e.target;

      if ($scope.colorButtons[colorButton.id] === "on")
        $scope.colorButtons[colorButton.id] = "off";
      else {
        btnBordersOff();
        $scope.colorButtons[colorButton.id] = "2px solid black";
      }
    };

    $scope.moveButton = function (e) {
      var btnObj;
      if (e.target.tagName == "BUTTON")
        btnObj = e.target;
      else
        btnObj = e.target.parentElement;

      if ($scope.buttons[btnObj.id] === 'grey') {
        $scope.buttons[btnObj.id] = 'white';
        turnMovableOff();
      }
      else {
        buttonsOff();
        $scope.buttons[btnObj.id] = "grey";
        turnMovableOn();
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
          shapes.push(oldcircle);
          oldcircle = undefined;
        }
      }
    };

    $scope.delete = function () {
      shapes = [];
      layer.destroy();
    };
  }
})(angular);