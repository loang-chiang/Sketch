document.addEventListener('DOMContentLoaded', function() {
    create_grid();

    document.querySelector("select").onchange = function() {
        paint(this.value);
    }

});

// variable to know if user is currently painting
let isPainting = false; 

// disable painting when mouse is up
window.onmouseup = () => {
    isPainting = false;
}


function create_grid() {
    // creates 64 x 64 grid
    const cont = document.querySelector("#cont");
    let i = 1;
    while (i != 64*64+1) {
        let sqr = document.createElement('div');
        cont.appendChild(sqr);
        if (i % 64 === 0) {
            sqr.classList.add('sqr-64');
            console.log("64 sqr");
        }
        else {
            sqr.classList.add('sqr');
        }
        console.log("new sqr");
        i++;
    }
}


function paint(color) {
    document.querySelectorAll(".sqr").forEach(sqr => {
        sqr.onmousedown = () => {
            isPainting = true;
            sqr.style.backgroundColor = color;
        }
        sqr.onmouseover = () => {
            if (isPainting) {
                sqr.style.backgroundColor = color;
            }
        }
    })
}