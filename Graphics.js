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
        let gameDiv = document.createElement("div"),
            gameBoardDiv = document.createElement("div"),
            panelDiv = document.createElement("div");
        let header = document.createElement("h1");
        header.innerText = "CHECKERS";
        gameDiv.appendChild(header);

        let newGameBtn = document.createElement("button");
        newGameBtn.id = "newGame";
        newGameBtn.addEventListener("click",() => {
            window.location.reload(false);
            return;
        });
        newGameBtn.innerText="NEW GAME";
        panelDiv.appendChild(newGameBtn);
            
        let header2 = document.createElement("h1");
        header2.id = "messages";
        header2.innerText = "asdfasdfasfda";
        panelDiv.appendChild(header2);

        gameDiv.id = "game", gameBoardDiv.id = "gameBoard", panelDiv.id = "panel";
        insertElementToDOM("body", gameDiv);
        gameDiv.appendChild(gameBoardDiv);
        gameDiv.appendChild(panelDiv);
        //insertElementToDOM("body", gameBoardDiv);
        for (let k = 0; k < this.symbolicBoard.length; k++) {
            gameBoardDiv.appendChild(document.createElement("br"));
            for (let l = 0; l < this.symbolicBoard.length; l++) {
                this.divsBoard[k][l] = document.createElement("div");
                isWhite = l != 0 ? !isWhite : isWhite;
                this.divsBoard[k][l].classList = isWhite ? "white" : "black";
                this.divsBoard[k][l].setAttribute("x", l);
                this.divsBoard[k][l].setAttribute("y", k);
                gameBoardDiv.appendChild(this.divsBoard[k][l]);
            }
        }
    }
    renderMovingMouseDown(currentImg, mouseMoveEvent) {
        currentImg.style.position = "absolute";
        currentImg.style.height = "7.65vh";
        currentImg.style.width = "3.825vw";
        document.querySelector("html").appendChild(currentImg);
        currentImg.style.left = mouseMoveEvent.clientX - currentImg.width / 2 + 'px';
        currentImg.style.top = mouseMoveEvent.clientY - currentImg.height / 2 + 'px';
    }
    printMessages(messages) {
        for (let i = 0; i < messages.length; i++)
            document.getElementsByClassName("messages").innerText = messages[i];
        messages = [];
    }
    pushMessages(msg) {
        this.messages.push(msg);
    }
}