function Box(x, y, width, height, moveable) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.moveable = moveable;
    this.clicked = false;

    this.clickX ;
    this.click;

    this.display = function() {
        noStroke();
        fill('red');
        rect(this.x, this.y, this.width, this.height);
    }

    this.move = function() {
        if(this.moveable && this.clicked) {
                this.x = mouseX + this.clickX;
                this.y = mouseY + this.clickY;
        }
    }

    this.click = function() {
        if(dist(mouseX, mouseY, this.x+this.width/2, this.y+this.height/2) 
            < this.width/2) {
            this.clicked = true;
            this.clickX = this.x - mouseX;
            this.clickY = this.y - mouseY;
    }
    else
        box.clicked=false;
    }
}