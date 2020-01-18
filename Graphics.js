"use strict";
class Graphics {
    constructor(symbolicBoard) {
        this.symbolicBoard = symbolicBoard;
        this.divsBoard = setBoardSize(symbolicBoard);
        this.messages = [];
    }
    renderPieces() {
        let allImages = document.querySelectorAll("img"); 
        for (var i = 0; i < allImages.length; i++) 
            allImages[i].parentElement.removeChild(allImages[i]);
        for (let k = 0; k < this.symbolicBoard.length; k++) {
            for (let l = 0; l < this.symbolicBoard.length; l++) {
                if (this.symbolicBoard[k][l] != null) 
                    this.divsBoard[k][l].appendChild(this.symbolicBoard[k][l].img);
            }
        }
    }
    renderDivsBoard() {
        document.querySelector("body").style.visibility = "visible";
        let isWhite = true;
        for (let k = 0; k < this.symbolicBoard.length; k++) {
            insertElementToDOM("body", document.createElement("br"));
            for (let l = 0; l < this.symbolicBoard.length; l++) {
                this.divsBoard[k][l] = document.createElement("div");
                isWhite = l != 0 ? !isWhite : isWhite;
                this.divsBoard[k][l].id = isWhite ? "white" : "black";
                this.divsBoard[k][l].setAttribute("x", l);
                this.divsBoard[k][l].setAttribute("y", k);
                insertElementToDOM("body", this.divsBoard[k][l]);
            }
        }
    }
    renderMovingMouseDown(currentImg, mouseMoveEvent) {
        currentImg.style.position = "absolute";
        document.querySelector("html").appendChild(currentImg);
        currentImg.style.left = mouseMoveEvent.clientX - currentImg.width / 2 + 'px';
        currentImg.style.top = mouseMoveEvent.clientY - currentImg.height / 2 + 'px';
    }
    printMessages(messages) {
        for (let i = 0; i < messages.length; i++)
            alert(messages[i]);
        messages = [];
    }
    pushMessages(msg) {
        this.messages.push(msg);
    }
}