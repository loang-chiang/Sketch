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
            this.style.backgroundColor = "gray";
        }
        let color = document.querySelector("select").value;
        paint(color);
    }

    // prevents that switching colors will call the div onclick function
    document.querySelector("select").onclick = function(event) {
        event.stopPropagation();
    }

    document.querySelector("select").onchange = function() {
        let color = this.value;
        paint(color);
    }

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
            this.style.backgroundColor = "gray";
        }
        paint("white");
    }

    // when user clicks NEW PAGE div
    document.querySelector("#blank").onclick = function() {
        // automatically both tools to false and changes styling
        paintTool = false; 
        eraserTool = false;
        document.querySelector("#paint").style.backgroundColor = "white";
        document.querySelector("#erase").style.backgroundColor = "white";

        // changes div color to gray then back to white after half a second
        this.style.backgroundColor = "gray";
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
    let i = 1;
    while (i != 64*64+1) {
        let sqr = document.createElement('div');
        cont.appendChild(sqr);
        sqr.classList.add('sqr')
        i++;
    }
}


function paint(color) {
    console.log(`Calling paint function with ${color} color`);
    console.log(paintTool);

    document.querySelectorAll(".sqr").forEach(sqr => {
        if (paintTool === true || eraserTool === true) {

            let mousedownFunction = function() {
                isPainting = true;
                this.style.backgroundColor = color;
            };

            let mouseoverFunction = function() {
                if (isPainting) {
                    this.style.backgroundColor = color;
                }
            };

            sqr.onmousedown = mousedownFunction;
            sqr.onmouseover = mouseoverFunction;
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