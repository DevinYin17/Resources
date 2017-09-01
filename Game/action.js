var $point = $('.point');
var $player = $('.player');
var mapArray = [];
var mapLength = 20;
var palyStepIndex = 0;
var palyStepOldIndex = 0;

// width/height: 50, margin: 10
// 50 + 10 = 60
var baseX = 60;
var baseY = 60;

function initMap() {
  mapArray = [];

  for (i = 0; i < mapLength; i++) {
    var location = {};
    if (i < 5) {
      location.x = i;
      location.y = 0;

    } else if (i < 10) {
      location.x = 4;
      location.y = i - 4;

    } else if (i < 15) {
      location.x = 14 - i;
      location.y = 6;

    } else {
      location.x = 0;
      location.y = 20 - i;
    }

    location.x = baseX / 2 + location.x * baseX;
    location.y = baseY / 2 + location.y * baseY;
    mapArray.push(location);
  }
}

function play() {
  var point = parseInt(Math.random() * 6 + 1);
  if ($point && $point.length) {
    $point.text(point);
  }

  moveHandle(point);
}

function moveHandle(point) {
  palyStepOldIndex = palyStepIndex;
  palyStepIndex = (palyStepIndex + point) % mapLength;

  var i = palyStepOldIndex + 1;
  var timer = setInterval(function() {
    if (i < palyStepOldIndex + point + 1) {
      $player.css('left', mapArray[i % mapLength].x + 'px');
      $player.css('top', mapArray[i % mapLength].y + 'px');
      i++;
    } else {
      timer = clearInterval(timer);
    }
  }, 100);
}

function move(target, current, direction) {
  if (target !== current) {
    $player.css(direction, target + 'px');
  }
}

initMap();
