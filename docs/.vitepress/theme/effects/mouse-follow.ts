//@ts-ignore
export function mouseFollow(containerEl, innerEl) {
  // Init
  var container = containerEl,
      inner = innerEl;

  // Mouse
  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event: any) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e: any) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")";
    }
  };

  // Track the mouse position relative to the center of the container.
  mouse.setOrigin(container);

  //----------------------------------------------------

  var counter = 0;
  var refreshRate = 10;
  var isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
  };

  //----------------------------------------------------

  var onMouseEnterHandler = function(event: any) {
    update(event);
  };

  var onMouseLeaveHandler = function() {
    inner.style = "";
  };

  var onMouseMoveHandler = function(event: any) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  //----------------------------------------------------

  var update = function(event: any) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner.offsetHeight / 2).toFixed(2),
      (mouse.x / inner.offsetWidth / 2).toFixed(2)
    );
  };

  var updateTransformStyle = function(x: any, y: any) {
    var style = "rotateX(" + x * 40 + "deg) rotateY(" + y * 40 + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTranform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
  };

  //--------------------------------------------------------

  container.onmousemove = onMouseMoveHandler;
  container.onmouseleave = onMouseLeaveHandler;
  container.onmouseenter = onMouseEnterHandler;
}