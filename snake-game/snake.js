var draw = function(snakeToDraw,apple){
  var drawableSnake = {color:"purple", pixels: snakeToDraw};
  var drawApple = {color: "green", pixels: [apple]};
  var drawableObjects = [drawableSnake, drawApple];
  CHUNK.draw(drawableObjects);
}
var moveSegment = function(segment){
  var segmentDirection = segment.direction;
  switch (segmentDirection) {
    case "down": return {top: segment.top+1, left: segment.left};
      break;
      case "up": return {top: segment.top-1, left: segment.left};
      break;
      case "left": return {top: segment.top, left: segment.left-1};
        break;
        case "right": return {top: segment.top, left: segment.left+1};
          break;
    default: return segment;

  }
}
var segmentFurtherForwardThan = function(index, snake){
  return snake[index-1] || snake[index];
}
    /*console.log(snake)
    console.log(snake[index-1] === undefined)
    if(snake[index-1] === "undefined"){
      return snake[index];
    }
    else {
      return snake[index-1];
    }
    //return snake[index-1];
  }*/
/*  if(segment.direction === "down"){
    return {top: segment.top+1, left: segment.left};
  } else if (segment.direction === "up") {
    return {top: segment.top-1, left: segment.left};
  } else if (segment.direction === "left") {
    return {top: segment.top, left: segment.left-1};
  } else if (segment.direction === "right") {
    return {top: segment.top, left: segment.left+1};
  }
  return segment;
}*/
var moveSnake = function(snake){
  return snake.map(function(oldSegment, segmentIndex){
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFurtherForwardThan(segmentIndex,snake).direction;
    return newSegment;
  });
}
var growSnake = function(snake){
  var /*indexOfLastSegment*/ tipOfTailIndex = snake.length - 1;
  var /*lastSegment*/ tipOfTail = snake[tipOfTailIndex];
  snake.push({top: tipOfTail.top, left: tipOfTail.left});
  return snake;
}
var ate = function(snake, otherThing){
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}
  //var oldSegment = snake[0];
  /*var newSnake = [];
  snake.map(function(oldSegment){
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = oldSegment.direction;
    newSnake.push(newSegment);
  });
  return newSnake;*/
  /*
  var newSegment = moveSegment(oldSegment);
  newSegment.direction = oldSegment.direction;
  var newSnake = [newSegment];
  return newSnake;
}*/
var advanceGame = function(){
  var newSnake = moveSnake(snake);
//  snake = moveSnake(snake);
if(ate(newSnake,snake)){
  CHUNK.endGame();
  CHUNK.flashMessage("Whoops! You ate yourself");
}
if(ate(newSnake,[apple])){
  newSnake = growSnake(newSnake);
  apple = CHUNK.randomLocation();
}
if (ate(newSnake,CHUNK.gameBoundaries())) {
  CHUNK.endGame();
  CHUNK.flashMessage("Whoops! you hit a wall");
}
snake = newSnake;
draw(snake,apple);
}
/*
  if(CHUNK.detectCollisionBetween(snake,CHUNK.gameBoundaries())){
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops!!! you hit a wall!!");
  }
  if(CHUNK.detectCollisionBetween([apple],snake)){
    snake = growSnake(snake);
    apple = CHUNK.randomLocation();
  }
  draw(snake, apple);
}*/
var changeDirection = function(direction){
  snake[0].direction = direction;
}
var apple = CHUNK.randomLocation();
var snake = [{top: 1, left: 0, direction: "down"},{top:0, left: 0, direction: "down"}];
CHUNK.executeNTimesPerSecond(advanceGame,3);
CHUNK.onArrowKey(changeDirection);
//snake = moveSnake(snake);
//var snake2 = [{top: 5, left: 0}];//this represents a hashmap with top and left pixels as keys.
//drawSnake(snake);
//snakeDraw(snake2);
/*var wall = [{top: 0, left: 10}];
var drawableSnake = {color:"purple", pixels: snake};//represents a hashmap with color and pixels as keys and here pixel represents the previous key-value of hashmap snake
var drawbaleWall = {color: "green", pixels: wall};
var drawbaleObjects = [drawableSnake,drawbaleWall];//array drawbaleObjects carries list of objects to draw
CHUNK.draw(drawbaleObjects);//drawing as per the objects given by drawbaleObjects
*/
