window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d"); // initialize built-in obj that holds all canvas properties and drawing methods
  // set canvas size, both element size and surface size (because remember HTMLCanvas has these TWO different sizes), to the same value
  canvas.width = 1280;
  canvas.height = 720;

  // Defining these canvas properties here outside the class because this class will only run once on the initial page load. We can't always do that if we have multiple objects of different fill styles and stroke colours. In that case we would have to define these properties inside the draw method and switch between them again and again (depending on the object we are drawing). The problem with that is that the method will be called 60 times per second and change in canvas state like this could get performance expensive. Hence its a good idea to structure in a way where we change the canvas state as little as possible.
  // default fill color is black
  ctx.fillStyle = "white";
  // default stroke color is black and line width is 1
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";

  // JS classes are hoisted, but they are not initialized until the line of code is reached. So we can't use them before they aretttr defined.
  // very good idea would be to split our JavaScript into individual modules and Import and Export our classes between files to keep our code organized. But using JS modules would require us to run this code through a local server (npm jhamela), i.e. It wouldn't run the code by simply opening HTML file in the browser anymore😬

  class Player {
    //player needs to know thw when it moves outside, i.e, height and width. So we give Player access to the entire game class and all its properites and methods by passing it a reference to Game class as an argument
    constructor(game) {
      // we are not creating copy of game object when we create player. Object sin JS are REFERENCE DATA TYPES. It just points to the place in memory where the object is stored.
      this.game = game;

      //position and hitbox
      // since the character images can have different shapes and sizes, we need to define the hitbox of the character. Hitbox is the area of the character that can be hit by other objects in the game. We can define the hitbox by defining the x and y coordinates of a the center of a circular shadow below the character. The radius of the circle is the radius of the hitbox.
      // We need to have different X and Y property for character image and hitbox. While naming take care which value is the position of the Collision Hitbox Box and which is the position of the image(Sprite Sheet).
      // Hitboxes are circular to make it easy to push and slide characters along each other
      // Lets keep the starting position of the character in the middle of the canvas
      // we can move the player around by changing the values of collisionX and collisionY properties
      this.collisionX = this.game.width * 0.5;
      this.collisionY = this.game.height * 0.5;
      this.collisionRadius = 30; // radius of the hitbox
    }

    // draw() requires context as an argument to specify which canvas we want to draw on
    draw(context) {
      // draw player and animate it
      // draw a circle in canvas
      // take context
      context.beginPath(); // tells js we want to start drawing a new shape AND we want to close previous shape if there are any
      context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2
      ); // draw a circle (x_centre, y_centre, radius, start_angle in radians, end_angle)
      // we are filling and stroking the path defined by the arc() method
      // now we want the fill to be white but we want it to be slightly transparent
      // canvas has a globalAlpha property to set the opacity of the shapes we are drawing. The problem is once we set Global Alpha to a different value everything drawn after that will be semi-transparent. We want transparency to only apply to the fill colour of Player Collision Hitbox Circle.
      // To limit certain canvas settings only to a specific draw calls we wrap the drawing code between 'save()' and 'restore()' built-in canvas methods.

      context.save(); // save() method creates a snapshot of the current canvas state, including fillStyle, lineWidth, opacity (globalAlpha) as well as transformations and scaling
      // now we can do any changes to the canvas state we want
      context.globalAlpha = 0.5;
      // the will call will get affected by the changed opacity
      context.fill(); // to fill the shape with color
      context.restore(); // restore() method restores the canvas state to the state it was in when the associated save() method was called. So the opacity will be reset to 1 again
      // hence stroke() will be drawn with full opacity
      context.stroke(); // to draw the outline of the shape

      // Therefore, save( ) and restore() methods allow us to apply specific drawing settings only to selected shapes, without affecting the rest of our canvas drawings.
    }
  }
  class Game {
    constructor(canvas) {
      //convert canvas into a class property
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      // We want to create player when game starts. So we create a new instance of player here.
      // order in which we define classes matters as JS file is read line by line from top to bottom. Hence it is important to define Player class before Game class
      this.player = new Player(this);

      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };

      // event listeners
      // call back function on event listener auto generates an event object that contains all kind of infomration about the event that just happened. We can access this event object by passing it as an argument to the callback function.
      // we can also add the event listener just to the canvas element itself rather than the entire browser window object.
      //   window.addEventListener("mousedown", function (event) {
      canvas.addEventListener("mousedown", function (event) {
        // console.log(event.target); // tells which HTML element was clicked
        // console.log(event); // contains a lot of information about the event, i.e, mouseclick, e.g. X and Y coordinates of the mouse click, which mouse button was pressed, etc.
        // take the coordinates of the click and save them as properties on the main game object. From here we will be able to access them from our player object as well. Hence we create the new game property, i.e. this.mouse
        // console.log(event.x, event.y);
        // the problem is that these coordinates are from the top left of the window. We need to convert them to the coordinates of the canvas. We can do this by using offsetX, it will give us horizontal coordinate of the click on the target node. In our case the target node the of the click is canvas element.
        console.log(event.offsetX, event.offsetY);
      });
    }

    // draw the player on canvas using the Player method draw()
    // this method will draw and update all the objects in the game
    render(context) {
      this.player.draw(context);
    }
  }

  // animation loop to draw and update again and again-> creates an illusion of movement
  const game = new Game(canvas);
  game.render(ctx);
  console.log(game);
});
