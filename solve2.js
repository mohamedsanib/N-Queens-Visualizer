const isSafe = (row, col, board, n) => {
    for (let i = 0; i < col; i++) {
      if (board[row][i] === "Q") {
        return false;
      }
    }
  
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") {
        return false;
      }
    }
  
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j] === "Q") {
        return false;
      }
    }
  
    return true;
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const solve = async (col, n, board, ans) => {
    if (col === n) {
      const answers = document.querySelector(".answers");
  
      const chessBoard_s = document.createElement("div");
      chessBoard_s.classList.add("chessBoard-s");
      chessBoard_s.style.gridTemplateRows = `repeat(${n}, 1fr)`
  
      for (let i = 0; i < n; i++) {
        const mdiv_s = document.createElement("div");
  
        for (let j = 0; j < n; j++) {
          const idiv_s = document.createElement("div");
          idiv_s.classList.add("ccs");
          idiv_s.classList.add(`ccs${i}${j}`);
  
          if ((i + j) % 2 === 0) {
            idiv_s.style.background = "#b58864";
          } else {
            idiv_s.style.background = "#f2dab6";
          }
  
          if (board[i][j] === 'Q') {
            idiv_s.innerHTML = '<img class="queen" src="images/chess-queen-solid.svg">';
          }
  
          mdiv_s.appendChild(idiv_s);
        }
  
        mdiv_s.classList.add("cs");
        mdiv_s.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
        chessBoard_s.appendChild(mdiv_s);
      }

      ans.push([...board.map((row) => row.join(""))]);

      const soln = document.querySelector('.solution');
      soln.innerHTML = `Solution : ${ans.length}`;

      answers.appendChild(chessBoard_s);
      await delay(2000); // Delay for 2 seconds after displaying the current board state
      return;
    }
  
    for (let row = 0; row < n; row++) {
      if (isSafe(row, col, board, n)) {
        const idiv = document.querySelector(`.c${row}${col}`);
        board[row][col] = "Q";
        idiv.innerHTML = '<img class="queen" src="images/chess-queen-solid.svg">';
  
        await delay(1000); // Delay for 1 second before proceeding to the next queen placement
  
        await solve(col + 1, n, board, ans);
        board[row][col] = ".";
        idiv.innerHTML = "";
      }
    }
  };
  
  
  const solveNQueens = (n) => {
    let ans = [];
    let board = new Array(n).fill().map(() => new Array(n).fill("."));
  
    solve(0, n, board, ans);
  
    return ans;
  };
  
  const start = (n) => {
    let solutions = solveNQueens(n);
    console.log(solutions);
  };
  
  const inputBox = document.querySelector(".n-size");
  const startBtn = document.querySelector(".start-btn");
  
  const startBuild = (n) => {
    const chessBoard = document.querySelector(".chessBoard");
    const answers = document.querySelector(".answers");
    chessBoard.innerHTML = "";
    chessBoard.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    answers.innerHTML = "";

    const soln = document.querySelector('.solution');
    soln.innerHTML = `Solution : 0`;
  
    for (let i = 0; i < n; i++) {
      const mdiv = document.createElement("div");
  
      for (let j = 0; j < n; j++) {
        const idiv = document.createElement("div");
        idiv.classList.add("c");
        idiv.classList.add(`c${i}${j}`);
  
        if ((i + j) % 2 === 0) {
          idiv.style.background = "#b58864";
        } else {
          idiv.style.background = "#f2dab6";
        }
        mdiv.appendChild(idiv);
      }
  
      mdiv.classList.add("cc");
      mdiv.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
      chessBoard.appendChild(mdiv);
    }
  
    start(n);
  };
  
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (inputBox.value !== "") {
        startBuild(parseInt(inputBox.value));
      }
    }
  });
  startBtn.addEventListener("click", () => {
    if (inputBox.value !== "") {
      startBuild(parseInt(inputBox.value));
    }
  });
  