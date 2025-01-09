// setup() is called once at page-load
function setup() {
    let canvas = createCanvas(1440,600); // make an HTML canvas element width x height pixels
    // Center the canvas
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

let prevMinute;
// draw() is called 60 times per second
function draw() {
    background(240);

    // Print minute if it changed
    let currentMinute = minute();
    if (prevMinute !== currentMinute) {
        console.log('Current minute:', currentMinute);
        prevMinute = currentMinute;
    }
    
    // Get current time
    let hr = hour() % 12 || 12; // 12-hour format
    let min = minute();
    let sec = second();
    
    // Constants for sizing
    let circleRadius = 100;
    let dotMaxRadius = circleRadius * 0.9;
    let dotMinRadius = circleRadius * 0.25;
    let dotSize = 2;
    let horizontalSpacing = 210;  // Space between circles horizontally
    let verticalSpacing = 220;    // Space between rows
    
    // Calculate starting position for grid
    let startX = width/2 - (horizontalSpacing * 2.5);  // Center horizontally
    let startY = height/2 - verticalSpacing/2;         // Center vertically
    
    // Draw each hour circle
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 6; col++) { // 2 rows, 6 columns
            let hourNum = row * 6 + col + 1; 
            let x = startX + col * horizontalSpacing;
            let y = startY + row * verticalSpacing;
            
            push();
            translate(x, y);
                
            // Draw dots for each minute
            for (let m = 0; m < 60; m++) {
                let minAngle = map(m, 0, 60, -PI/2, 3*PI/2);
                
                // Draw dots for each second
                for (let s = 0; s < 60; s++) {
                    // Calculate position along the radial line
                    let radius = lerp(dotMaxRadius, dotMinRadius, s/59);
                    let dotX = cos(minAngle) * radius;
                    let dotY = sin(minAngle) * radius;
                    
                    // Fill dot if time is past
                    let isDotFilled = false;
                    if (hourNum < hr || (hourNum === hr && (m < min || (m === min && s < sec)))) {
                        isDotFilled = true;
                    }
                    
                    // Draw dot
                    noStroke();
                    if (isDotFilled) {
                        fill(106, 90, 205, 200);
                    } else {
                        fill(106, 90, 205, 30);
                    }
                    
                    circle(dotX, dotY, dotSize);
                }
            }        
            pop();
        }
    }
}