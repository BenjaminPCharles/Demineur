const app = {
    easy: {
        cellX: 8,
        cellY: 10, 
        mine: 10 
    },
    medium: {
        cellX: 14,
        cellY: 18,
        mine: 40
    },
    hard: {
        cellX: 14,
        cellY: 40,
        mine: 90
    },

    startGame(game) {
        this.createCellTable(game);
        this.putMineOnRandomCell(game);
        this.putNumber(game);
        this.handleClick();
    },

    createCellTable(game) {
        const containerEl = document.getElementById('container');
        containerEl.innerHTML = '';
        
        for (let y = 0; y < game.cellY; y++) {
            const row = document.createElement('div');
            row.classList.add('row');
            containerEl.appendChild(row);

            for (let x = 0; x < game.cellX; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell', 'close', `x-${x}-y-${y}`);
                row.appendChild(cell);
            }
        }
    },

    putMineOnRandomCell(game) {
        let minesPlaced = 0;
        const mines = new Set();

        while (minesPlaced < game.mine) {
            let x = Math.floor(Math.random() * game.cellX);
            let y = Math.floor(Math.random() * game.cellY);
            let key = `${x}-${y}`;

            if (!mines.has(key)) {
                mines.add(key);
                document.querySelector(`.x-${x}-y-${y}`).classList.add('mine');
                minesPlaced++;
            }
        }
    },

    putNumber(game) {
        for (let x = 0; x < game.cellX; x++) {
            for (let y = 0; y < game.cellY; y++) {
                const cell = document.querySelector(`.x-${x}-y-${y}`);
                if (cell.classList.contains('mine')) continue;

                let count = 0;
                const neighbors = [
                    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
                    [x - 1, y],               [x + 1, y],
                    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
                ];

                neighbors.forEach(([nx, ny]) => {
                    let neighbor = document.querySelector(`.x-${nx}-y-${ny}`);
                    if (neighbor && neighbor.classList.contains('mine')) count++;
                });

                if (count > 0) cell.textContent = count;
            }
        }
    },

    handleClick() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                if (e.target.classList.contains('flag')) return;
                e.target.classList.remove('close');
                if (e.target.classList.contains('mine')) {
                    e.target.classList.add('boom');
                    app.determinesLooser();
                } else {
                    app.checkWin();
                }
            });

            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (!e.target.classList.contains('close')) return;

                e.target.classList.toggle('flag');
                app.checkWin();
            });
        });
    },

    checkWin() {
        const cells = document.querySelectorAll('.cell');
        let minesFlagged = 0;
        let closedCells = 0;

        cells.forEach(cell => {
            if (cell.classList.contains('mine') && cell.classList.contains('flag')) {
                minesFlagged++;
            }
            if (cell.classList.contains('close')) {
                closedCells++;
            }
        });

        const minesCount = document.querySelectorAll('.mine').length;

        if (minesFlagged === minesCount || closedCells === minesCount) {
            document.getElementById('score').textContent = 'You Win!';
            cells.forEach(cell => cell.classList.remove('close'));
        }
    },

    determinesLooser() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('close', 'flag');
            if (cell.classList.contains('mine')) {
                cell.classList.add('boom');
            }
        });
        document.getElementById('score').textContent = 'You Lose!';
    },

    init() {
        const game = document.getElementById('container');
        const start = document.getElementById('start');
        const selector = document.getElementById('selector');

        game.style.display = 'none';

        start.addEventListener('submit', (e) => {
            e.preventDefault();
            game.style.display = 'flex';
            start.style.display = 'none';

            const difficulty = selector.value;
            this.startGame(this[difficulty]);
        });
    },
};

document.addEventListener('DOMContentLoaded', () => app.init());
