// start game and find you name
document.querySelector(".btn button").onclick = () => {
  let name = prompt("what is your name?");

  let yourName = document.querySelector(".info .name span");

  if (name == null || name == "") {
    yourName.innerHTML = "notfound";
  } else {
    yourName.innerHTML = name;
  }

  document.querySelector(".btn").remove();
};

// array from length of blocks
let duration = 1000;

let game = document.querySelector(".game");

let blocks = Array.from(game.children);

let range = [...Array(blocks.length).keys()];

shuffle(range);

// add properaty order to css of blocks
blocks.forEach((block, index) => {
  block.style.order = range[index];

  // click event
  block.addEventListener("click", () => {
    flipBack(block);
  });
});

// function shuffle
function shuffle(array) {
  let currant = array.length,
    temp,
    random;

  while (currant > 0) {
    random = Math.floor(Math.random() * currant);

    currant--;

    temp = array[currant];

    array[currant] = array[random];

    array[random] = temp;
  }

  return array;
}

// click to flip
function flipBack(block) {
  block.classList.add("flip");

  let allFlipBlocks = blocks.filter((fliped) =>
    fliped.classList.contains("flip")
  );

  if (allFlipBlocks.length == 2) {
    stopClick();
    blockMatches(allFlipBlocks[0], allFlipBlocks[1]);
  }
}

function stopClick() {
  game.classList.add("stop-click");

  setTimeout(() => {
    game.classList.remove("stop-click");
  }, duration);
}

function blockMatches(fristBlock, secondBlock) {
  let tries = document.querySelector(".score span");

  if (fristBlock.dataset.game === secondBlock.dataset.game) {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    fristBlock.classList.remove("flip");
    secondBlock.classList.remove("flip");

    fristBlock.classList.add("matches");
    secondBlock.classList.add("matches");

    document.getElementById("success").play();
  } else {
    document.getElementById("fail").play();

    tries.innerHTML = parseInt(tries.innerHTML) - 1;

    setTimeout(() => {
      fristBlock.classList.remove("flip");
      secondBlock.classList.remove("flip");
    }, duration);
  }
}
