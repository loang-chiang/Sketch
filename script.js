document.addEventListener('DOMContentLoaded', function() {
    create_canvas();

    // when user clicks PAINT button
    document.querySelector("#paint").onclick = function() {
        // automatically sets the other tool to false and changes its styling
        eraserTool = false;
        document.querySelector("#erase").style.backgroundColor = "white";

        if (paintTool === true) {  // turns off paintTool
            paintTool = false;
            this.style.backgroundColor = "white";
        }
        else {  // turns on paintTool
            paintTool = true;
            this.style.backgroundColor = "#fff0e4";
        }
        let color = document.querySelector("#color-select").value;
        let size = document.querySelector("#paint-size-select").value;
        paint(color, size);
    }

    let elements = document.querySelectorAll("#color-select, #paint-size-select");
    elements.forEach(function(element) {

        // prevents that switching colors or sizes will call the div onclick function
        element.onclick = function(event) {
            event.stopPropagation();
        }

        // when user changes color or size of brush
        element.onchange = function() {
            let color = document.querySelector("#color-select").value; 
            let size = document.querySelector("#paint-size-select").value; 
            paint(color, size);
        }
    });


    // when user clicks ERASE button
    document.querySelector("#erase").onclick = function() {
        // automatically sets the other tool to false and changes its styling
        paintTool = false; 
        document.querySelector("#paint").style.backgroundColor = "white";

        if (eraserTool === true) {  // turns off eraserTool
            eraserTool = false;
            this.style.backgroundColor = "white";
        }
        else {  // turns on eraserTool
            eraserTool = true;
            this.style.backgroundColor = "#fff0e4";
        }
        let size = document.querySelector("#eraser-size-select").value; 
        paint("white", size);
    }

    // prevents that switching sizes will call the div onclick function
    let eraserSize = document.querySelector("#eraser-size-select");
    eraserSize.onclick = function(event) {
        event.stopPropagation();
    }
    eraserSize.onchange = function() {
        let size = eraserSize.value;
        paint("white", size);
    }


    // when user clicks NEW PAGE button
    document.querySelector("#blank").onclick = function() {
        // automatically both tools to false and changes styling
        paintTool = false; 
        eraserTool = false;
        paint(null, null); // calls the function null to get rid of eventListeners

        document.querySelector("#paint").style.backgroundColor = "white";
        document.querySelector("#erase").style.backgroundColor = "white";

        // changes div color to gray then back to white after half a second
        this.style.backgroundColor = "#fff0e4";
        setTimeout(() => {
            this.style.backgroundColor = "white";
        }, 500);

        blank();
    }
});


// variables
    // variable to know if user is currently painting or erasing
    let isPaintingOrErasing = false; 

    // disable painting or erasing when mouse is up
    window.onmouseup = () => {
        isPaintingOrErasing = false;
    }

    // if paint tool is in use
    let paintTool = false;

    // if eraser tool is in use
    let eraserTool = false;


// creates 64x64 canvas
function create_canvas() {
    console.log("Calling create_canvas function");

    const cont = document.querySelector("#cont");
    let col = 1;
    let row = 1;
    let i = 1;
    while (i != 64*64+1) {
        let sqr = document.createElement('div');
        cont.appendChild(sqr);
        sqr.classList.add('sqr')

        // saves the row and column of each square
        sqr.dataset.col = col;
        sqr.dataset.row = row;

        if (i % 64 === 0) {  // restarts columns and adds to rows when in a new row
            col = 0;
            row++;
        }

        col++;
        i++;
    }
}


function paint(color, size) {
    console.log(`Calling paint function with ${color} color`);

    document.querySelectorAll(".sqr").forEach(sqr => {
        if (paintTool === true || eraserTool === true) {  // if the user is currently using either the paint or eraser tool
            let paintingFunc = function() {
                sqr.style.backgroundColor = color;

                let col = parseInt(sqr.dataset.col);
                let row = parseInt(sqr.dataset.row);

                if (size !== "small") {  // colors more squares than just the one being clicked
                    let squares = [];
                    let coordinates = [];

                    if (size === "medium") {  // colors a 3x3 radius of squares
                        coordinates = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
                    }
                    else if (size === "large") {  // colors a 5x5 radius of squares
                        coordinates = [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], 
                                        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
                                        [-2, 0], [-1, 0], [1, 0], [2, 0],
                                        [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1],
                                        [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]]
                    }
                    
                    for (let coordinate of coordinates) {
                        let square = document.querySelector(`[data-col='${col+coordinate[0]}'][data-row='${row+coordinate[1]}']`);
                        if (square !== null) {
                            squares.push(square);
                        }
                    }

                    for (let square of squares) {
                        square.style.backgroundColor = color;
                    }
                }
            }
            sqr.onmousedown = function() {
                isPaintingOrErasing = true;
                paintingFunc();
            }
            sqr.onmouseover = function() {  // allows the user to keep painting squares when clicking down on their mouse
                if (isPaintingOrErasing) {
                    paintingFunc();
                } 
            }
        }
        else {  // user can't paint nor erase if the button hasn't been pressed
            sqr.onmousedown = null;
            sqr.onmouseover = null;
        }
    })
}


// resets canvas
function blank() {
    console.log("Calling blank function");

    // resets the color of all squares to white
    document.querySelectorAll(".sqr").forEach(sqr => {
        sqr.style.backgroundColor = "white";
    })
}