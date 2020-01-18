"use strict";
class GameManagement {
    constructor() {
        this.boardManagement = new BoardManagement();
        this.graphics = new Graphics(this.boardManagement.symbolicBoard);
        this.checkersLogic = new CheckersLogic(this.boardManagement.symbolicBoard, this.graphics);
    }

    play() {

        let addEventMouseDownToImg = (img) => {
            img.addEventListener("mousedown", (e) => {
                e.preventDefault();
                mouseDown = true;
                currentImg = img;
                cureentDiv = currentImg.parentNode;
            });
        }

        let addEventsToNewPics = () => {
            imgs = document.querySelectorAll("img");
            for (let i = 0; i < imgs.length; i++) {
                if (imgs[i].classList != "event") {
                    cureentDiv = imgs[i].parentNode;
                    currentImg = imgs[i];
                    addEventMouseDownToImg(imgs[i]);
                    addEventMouseUpImg(imgs[i]);
                    imgs[i].classList = "event";
                }
            }
        }

        let addEventMouseUpImg = (img) => {
            img.addEventListener("mouseup", (e) => {
                e.preventDefault();
                mouseDown = false;
                let elements, from, to;
                try {
                    elements = getAllElementsFromPoint(e.clientX, e.clientY);
                    from = { x: parseInt(cureentDiv.getAttribute("x")), y: parseInt(cureentDiv.getAttribute("y")) };
                    to = { x: elements[1].getAttribute("x"), y: elements[1].getAttribute("y") };
                } catch (ex) {
                    console.log(ex);
                    return;
                }
                currentImg.removeAttribute('style');

                if (elements[1] != null) {
                    let legalMoveState = this.checkersLogic.isMoveTotalLegal(from, to);
                    if (legalMoveState.is) {
                        this.boardManagement.makeMove(from, to, legalMoveState);
                        this.checkersLogic.checkAndUpadateMiddleSequenceState(legalMoveState, to)
                        if (!legalMoveState.inMiddleSequence.is) {
                            this.checkersLogic.isBlackTurn = !this.checkersLogic.isBlackTurn;
                            this.boardManagement.updateKingsIfNecessary(to);
                        }
                    }

                    this.graphics.printMessages(legalMoveState.message);
                }

                this.graphics.renderPieces();
                addEventsToNewPics();
                handleEndGame(this.checkersLogic);
            });
        }

        document.onmousemove = (mouseMoveEvent) => {
            mouseMoveEvent.preventDefault();
            if (mouseDown)
                this.graphics.renderMovingMouseDown(currentImg, mouseMoveEvent);
        }

        this.graphics.renderDivsBoard();
        this.graphics.renderPieces();
        let imgs = document.querySelectorAll("img");
        let currentImg, cureentDiv, mouseDown = false;
        addEventsToNewPics();
    }
}



let handleEndGame = (checkersLogic) => {
    let endGameState = checkersLogic.getEndGameState();
    if (endGameState.win) {
        alert(endGameState.isBlack ? "Black WON!!" : "Red WON!!!");
        window.location.reload(false);
        return;
    } else if (endGameState.draw) {
        alert("DRAW!!!");
        window.location.reload(false);
        return;
    }
}