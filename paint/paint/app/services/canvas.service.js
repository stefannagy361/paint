(function (angular) {
  angular.module('app')
    .service('canvasService', canvasService);

  function canvasService() {
    var self = this;
    self.scope = {};
    self.stage = {};
    self.layer = {};
    self.buttons = {};
    self.colorButtons = {};
    self.init = init;
    self.initScope = initScope;
    self.mousePos = mousePos;
    function init(scope) {
      self.scope = scope;
      self.stage = new Konva.Stage({
        container: 'ShapeContainer',
        width: 700,
        height: 650
      });
      self.layer = new Konva.Layer();
    }

    function initScope(buttons, colorButtons) {
      self.buttons = buttons;
      self.colorButtons = colorButtons;
    }

    function mousePos(e) {
      var clickX = e.pageX - 15;
      var clickY = e.pageY - 113;
      draw(clickX, clickY);
    }

    var triangle = new Triangle();
    var circle = new Circle();
    var rectangle = new Rectangle();
    var square = new Square();

    var corners = 0;
    function draw(clickX, clickY) {
      if (self.buttons["triangle"] == "grey") {
        if (corners < 2) {
          triangle.draw(clickX, clickY, self.stage, self.layer);
          corners++;
        }
        else {
          self.layer.add(triangle.draw(clickX, clickY, self.stage, self.layer));
          self.stage.add(self.layer);
          corners = 0;
        }
      }
      else
        if (self.buttons["circle"] == "grey") {
          self.layer.add(circle.draw(clickX, clickY, self.stage, self.layer));
          self.stage.add(self.layer);
        }
        else
          if (self.buttons["rectangle"] == "grey") {
            self.layer.add(rectangle.draw(clickX, clickY, self.stage, self.layer));
            self.stage.add(self.layer);
          }
          else
            if (self.buttons["square"] == "grey") {
              self.layer.add(square.draw(clickX, clickY, self.stage, self.layer));
              self.stage.add(self.layer);
            }
    };
  }
})(angular);