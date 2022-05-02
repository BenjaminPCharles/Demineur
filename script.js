const app = {
    easy:{
        cellX: 10,
        cellY: 8,
        mine: 10
    },
    medium:{
        cellX: 18,
        cellY: 14,
        mine: 40
    },
    hard:{
        cellX: 40,
        cellY: 14,
        mine: 90
    },
    createCellTable(game){
        const containerEl = document.getElementById('container');
        //Cree les lignes
        for(let x = 0; x < game.cellX; x++){
           const cellOnX = document.createElement('div');
           containerEl.appendChild(cellOnX)
           //Cree les columns
           for(let y = 0; y < game.cellY; y++){
            const cellOnY = document.createElement('div');
            cellOnY.classList.add('cell');
            cellOnY.classList.add('close');
            cellOnY.classList.add(`x-${x}-y-${y}`);
            cellOnX.appendChild(cellOnY);
           }
        }
    },
    putMineOnRandomCell(game){
        let mine = game.mine;
        //Place les mines
        for(let k = 0; k < mine; k++){
            let mineOnX = Math.floor(Math.random()* game.cellX);
            let mineOnY = Math.floor(Math.random()* game.cellY);
            if(mineOnX === mineOnX && mineOnY === mineOnY){
                mineOnX = Math.floor(Math.random()* game.cellX);
                mineOnY = Math.floor(Math.random()* game.cellY);
            }
            for(let x = 0; x < game.cellX; x++){
                for(let y = 0; y < game.cellY; y++){
                    if(mineOnX === x && mineOnY === y){
                        const putRandomMine = document.querySelector(`.x-${x}-y-${y}`);
                        putRandomMine.classList.add('mine');
                    }
                }
            }
        }
    },
    putNumber(game){
        for(let x = 0; x < game.cellX; x++){
           for(let y = 0; y < game.cellY; y++){
                const cell = document.querySelector(`.x-${x}-y-${y}`)
                //Top
                const aroundMineTop = document.querySelector(`.x-${x}-y-${y-1}`);
                const aroundMineTopRight = document.querySelector(`.x-${x+1}-y-${y-1}`);
                const aroundMineTopLeft = document.querySelector(`.x-${x-1}-y-${y-1}`);
                //Bottom
                const aroundMineBottom = document.querySelector(`.x-${x}-y-${y+1}`);
                const aroundMineBottomRight = document.querySelector(`.x-${x+1}-y-${y+1}`);
                const aroundMineBottomLeft = document.querySelector(`.x-${x-1}-y-${y+1}`);
                //Right
                const aroundMineRight = document.querySelector(`.x-${x+1}-y-${y}`);
                //Left
                const aroundMineLeft = document.querySelector(`.x-${x-1}-y-${y}`);
                if(cell.classList.contains('mine')){
                    //Top
                    if(aroundMineTop && !aroundMineTop.classList.contains('mine')){
                        aroundMineTop.innerHTML ? aroundMineTop.innerHTML ++ : aroundMineTop.innerHTML = 1
                    }
                    if(aroundMineTopRight && !aroundMineTopRight.classList.contains('mine')){
                        aroundMineTopRight.innerHTML ? aroundMineTopRight.innerHTML ++ : aroundMineTopRight.innerHTML = 1
                    }
                    if(aroundMineTopLeft && !aroundMineTopLeft.classList.contains('mine')){
                        aroundMineTopLeft.innerHTML ? aroundMineTopLeft.innerHTML ++ : aroundMineTopLeft.innerHTML = 1
                    }
                    //Bottom
                    if(aroundMineBottom && !aroundMineBottom.classList.contains('mine')){
                        aroundMineBottom.innerHTML ? aroundMineBottom.innerHTML ++ : aroundMineBottom.innerHTML = 1
                    }
                    if(aroundMineBottomRight && !aroundMineBottomRight.classList.contains('mine')){
                        aroundMineBottomRight.innerHTML ? aroundMineBottomRight.innerHTML ++ : aroundMineBottomRight.innerHTML = 1
                    }
                    if(aroundMineBottomLeft && !aroundMineBottomLeft.classList.contains('mine')){
                        aroundMineBottomLeft.innerHTML ? aroundMineBottomLeft.innerHTML ++ : aroundMineBottomLeft.innerHTML = 1
                    }
                    //Right
                    if(aroundMineRight && !aroundMineRight.classList.contains('mine')){
                        aroundMineRight.innerHTML ? aroundMineRight.innerHTML ++ : aroundMineRight.innerHTML = 1
                    }
                    //Left
                    if(aroundMineLeft && !aroundMineLeft.classList.contains('mine')){
                        aroundMineLeft.innerHTML ? aroundMineLeft.innerHTML ++ : aroundMineLeft.innerHTML = 1
                    }
                }
            }
        }
    },
    handleClick(){
        document.querySelectorAll('.cell').forEach(cell => {
            //ouvre la case
            cell.addEventListener('click', (e) =>{
                e.target.classList.remove('close')
                e.target.classList.remove('flag')
                if(e.target.classList.contains('mine')){
                    e.target.classList.add('boom')
                    app.determinesLooser();
                }
            })
            //met un drapeau
            cell.addEventListener('contextmenu', (e) =>{
                e.preventDefault()
                e.target.classList.add('flag')
                if(!e.target.classList.contains('close')){
                    e.target.classList.remove('flag')
                }
                app.determinesWinner()
            })
        })
    },
    determinesWinner(){
        let newFlag = 0;
        let numberOfMine = 0;
        const mines = document.querySelectorAll('.mine')
        mines.forEach(mine => {
            numberOfMine++
            if(mine.classList.contains('flag')){
                newFlag++
            }
        })
        // Nombre de mines dans la NAV DOM
        document.getElementById('mines').innerHTML = `Mines: ${numberOfMine}`;
        if(newFlag === numberOfMine){
            console.log("WINNNER")
            document.getElementById('score').innerHTML = 'You Win'
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('close')
            })
        }
    },
    determinesLooser(){
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('close')
            cell.classList.remove('flag')
            if(cell.classList.contains('mine')){
                cell.classList.add('boom')
                document.getElementById('score').innerHTML = 'You loose';
            }
        })
    },
    // timer(){
    //     let second = 00;
    //     let minute = 00;
    //     setInterval(function() {
    //         second++
    //         if(second >= 60){
    //             minute ++
    //             second = 00
    //         } 
    //         document.getElementById('timer').innerHTML = `Timer: ${minute}min ${second}sec`
    //     }, 1000);
    // },
    startGame(game){
        app.createCellTable(game);
        app.putMineOnRandomCell(game);
        app.putNumber(game);
        // app.timer()
        app.handleClick();
        app.determinesWinner();
    },
    init(){
        const game = document.getElementById('container');
        const start = document.getElementById('start');
        const selector = document.getElementById('selector');
        game.style.display = 'none'
        start.addEventListener('submit', (e) => {
            e.preventDefault();

            switch(selector.options[selector.selectedIndex].value){
                case 'easy':
                    app.startGame(app.easy);
                    break;
                case 'medium':
                    app.startGame(app.medium);
                    break;
                case 'hard':
                    app.startGame(app.hard);
                    break;
            }
            game.style.display = 'flex';
            start.style.display = 'none';
        })
    },
}

document.addEventListener('DOMContentLoaded', app.init);

