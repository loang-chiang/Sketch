document.addEventListener('DOMContentLoaded', function() {
    create_grid();

    // when user clicks PAINT div
    document.querySelector("#paint").onclick = function() {
        // automatically sets the other tool to false and changes styling
        eraserTool = false;
        document.querySelector("#erase").style.backgroundColor = "white";

        if (paintTool === true) {
            console.log("PAINTING");
            paintTool = false;
            this.style.backgroundColor = "white";
        }
        else {
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


    // when user clicks ERASE div
    document.querySelector("#erase").onclick = function() {
        // automatically sets the other tool to false and changes styling
        paintTool = false; 
        document.querySelector("#paint").style.backgroundColor = "white";

        if (eraserTool === true) {
            console.log("ERASING");
            eraserTool = false;
            this.style.backgroundColor = "white";
        }
        else {
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


    // when user clicks NEW PAGE div
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
    // variable to know if user is currently painting
    let isPainting = false; 

    // disable painting when mouse is up
    window.onmouseup = () => {
        isPainting = false;
    }

    // if paint tool is in use
    let paintTool = false;

    // if eraser tool is in use
    let eraserTool = false;


// creates 64 x 64 grid
function create_grid() {
    console.log("Calling create_grid function");

    const cont = document.querySelector("#cont");
    let col = 1;
    let row = 1;
    let i = 1;
    while (i != 64*64+1) {
        let sqr = document.createElement('div');
        cont.appendChild(sqr);
        sqr.classList.add('sqr')

        // saves the row and column of the square
        sqr.dataset.col = col;
        sqr.dataset.row = row;

        if (i % 64 === 0) {
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
        if (paintTool === true || eraserTool === true) {
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
                    else if (size === "big") {  // colors a 5x5 radius of squares
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
                isPainting = true;
                paintingFunc();
            }
            sqr.onmouseover = function() {
                if (isPainting) {
                    paintingFunc();
                } 
            }
        }
        else {
            sqr.onmousedown = null;
            sqr.onmouseover = null;
        }
    })
}


// resets canvas
function blank() {
    console.log("Calling blank function");

    document.querySelectorAll(".sqr").forEach(sqr => {
        sqr.style.backgroundColor = "white";
    })
}