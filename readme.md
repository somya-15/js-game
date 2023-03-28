### What are we going to learn?

Game Rules-

1.  Control the blue bull, it's job is to protect the hatching egg from green enemies.
2.  Bull can push the eggs around OR push the enemies away from the egg.

Tech Stack-

1. HTML, CSS and JavaScript
2. Game Physics to make the game objects interact with each other, control FPS of the game, trigger periodic events, apply mouse controls, manage and animate 8-dimensional Sprite Sheets, trigger + animate particles when certain event happens

#### Question. What is a sprite sheet?

A sprite sheet is a single image file that contains multiple smaller images or "sprites" arranged in a grid-like pattern. These individual sprites are usually used in video game development or animation to create animated characters or objects by displaying different parts of the sprite sheet at different times.

Sprite sheets are often used to optimize the performance of video games or animations because they allow for the display of many images without the need for loading each individual image file separately. By organizing multiple sprites into a single image file, developers can reduce the number of requests to the server and load the images more efficiently. Additionally, sprite sheets can reduce memory usage and improve performance on devices with limited resources, such as mobile devices or older computers.

#### Canvas default size

300 x 150 pixels
By setting size with CSS, its element size is set. That would stretch the drawings.

HTMLCanvas has TWO different sizes -> Element size and Drawing Surface Size, that can be set independently. Keeping the both sizes the same prevents distortion.
So size the canvas with JS.

#### Function vs Method?

A function that sits on an object is called a method

####
