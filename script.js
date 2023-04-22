//Player is able to move along the map using the arrow keys/ WASD
 const player =document.querySelector('#character');
 const water = getComputedStyle(document.querySelector('#water'));
 let playerPos= {playerX:parseInt(player.style.left)  ,playerY:parseInt(player.style.top), playerWidth:50, playerHeight:50}

console.log(getComputedStyle(document.querySelector(".game")).top)
console.log(getComputedStyle(document.querySelector(".game")).left)

let modifier = 25;

window.addEventListener('keydown', (event) => {
    const { style } = player;
    waterCol();
    onBridge();
    switch(event.key) {

      case 'ArrowUp':
        if(waterCol()==false && isInsideBox()==true){
          style.top = `${parseInt(style.top) - modifier}px`;
        }
        else if(waterCol() == true && onBridge() == true){
          style.top = `${parseInt(style.top) - modifier}px`;
        }
        else{
          style.top = `${parseInt(style.top) + modifier}px`;
          waterCol();
          onBridge();
        }
        break;


      case 'w':
        if(waterCol()==false && isInsideBox()==true){
          style.top = `${parseInt(style.top) - modifier}px`;
        }
        else if(waterCol() == true && onBridge() == true){
          style.top = `${parseInt(style.top) - modifier}px`;
        }
        else{
          style.top = `${parseInt(style.top) + modifier}px`;
          waterCol();
          onBridge();
        }
        break;

        case 'ArrowDown':
          if(waterCol()==false && isInsideBox()==true){
          style.top = `${parseInt(style.top) + modifier}px`;
          }

          else if(waterCol() == true && onBridge() == true){
            style.top = `${parseInt(style.top) + modifier}px`;
          }
          else{
            style.top = `${parseInt(style.top) - modifier}px`;
            waterCol();
            onBridge();
          }
          break;


      case 's':
      if(waterCol()==false && isInsideBox()==true){
      style.top = `${parseInt(style.top) + modifier}px`;
      }

      else if(waterCol() == true && onBridge() == true){
        style.top = `${parseInt(style.top) + modifier}px`;
      }
      else{
        style.top = `${parseInt(style.top) - modifier}px`;
        waterCol();
        onBridge();
      }
      break;

      case 'ArrowLeft':
      if(waterCol()==false && isInsideBox()==true){
      style.left = `${parseInt(style.left) - modifier}px`;
      }

      else if(waterCol() == true && onBridge() == true){
        style.left = `${parseInt(style.left) - modifier}px`;
      }

      else{
        style.left = `${parseInt(style.left) + modifier}px`;

      }
      break;


      case 'a':
      if(waterCol()==false && isInsideBox()==true){
      style.left = `${parseInt(style.left) - modifier}px`;
      }

      else if(waterCol() == true && onBridge() == true){
        style.left = `${parseInt(style.left) - modifier}px`;
      }

      else{
        style.left = `${parseInt(style.left) + modifier}px`;

      }
      break;

      case 'ArrowRight':
        if(waterCol()==false && isInsideBox()==true){
         style.left = `${parseInt(style.left) + modifier}px`;
        }

        else if(waterCol() == true && onBridge() == true){
          style.left = `${parseInt(style.left) + modifier}px`;
        }

        else{
          style.left=`${parseInt(style.left) - modifier}px`;
          waterCol();
          onBridge();
        }
         break;

      case 'd':
        if(waterCol()==false && isInsideBox()==true){
         style.left = `${parseInt(style.left) + modifier}px`;
        }

        else if(waterCol() == true && onBridge() == true){
          style.left = `${parseInt(style.left) + modifier}px`;
        }

        else{
          style.left=`${parseInt(style.left) - modifier}px`;
          waterCol();
          onBridge();
        }
         break;
    }
  });
  function updatePlayer(){
    playerPos.playerX = parseInt(player.style.left);
    playerPos.playerY = parseInt(player.style.top);
  }

function isInsideBox(){
  updatePlayer()
  let gameArea= {xl: 575, xr:1075, yt:0, yb:505}
  if (playerPos.playerX> gameArea.xl &&
      playerPos.playerX+ playerPos.playerWidth < gameArea.xr &&
      playerPos.playerY> gameArea.yt &&
      playerPos.playerY+playerPos.playerHeight <gameArea.yb
    )
    {
    return true;
  }
  else{
    return false;
  }
}

function waterCol(){
updatePlayer();
let waterPos  = {waterX:parseInt(water.left), waterY: parseInt(water.top), waterWidth:parseInt(water.width), waterHeight:parseInt(water.height)};

if (playerPos.playerX > waterPos.waterX +waterPos.waterWidth||
      playerPos.playerX + playerPos.playerWidth < waterPos.waterX ||
      playerPos.playerY > waterPos.waterY+ waterPos.waterHeight||
      playerPos.playerY + playerPos.playerHeight < waterPos.waterY
    )
    {
      return false;
    }
    else{
      return true;
    }
  }

  function onBridge(){
   updatePlayer();
   let bridge = {xl: 750, xr: 925, yt:100, yb:450}

  if (
    (playerPos.playerX > bridge.xl && playerPos.playerX + playerPos.playerWidth <bridge.xr)
    &&(playerPos.playerY > bridge.yt && playerPos.playerY +playerPos.playerHeight < bridge.yb)
    )
  {
    return true;
  }
  else{
    return false;
  }
}

/*When player is at the water's edge, they are able to press
SPACE to fish (pressing SPACE anywhere else will do nothing)*/

function parseName(word){
  console.log(word);
  let newWord ='';
  if(word.includes('-')){
      newWord = word.slice(0, word.indexOf('-'));
  }
  else newWord =word;
  return newWord.charAt(0).toUpperCase() + newWord.substring(1)
}






window.addEventListener('keydown', (event) => {
  let caughtPkmn =''
  let pkmnNbr = 0;
  let randIndex = (Math.floor(Math.random() * 185) + 1);
if(event.key ==' ' && waterCol()==true) {
fetch('https://pokeapi.co/api/v2/type/water/')
.then((response)=> response.json())
.then((data)=> {
  caughtPkmn= parseName(data.pokemon[randIndex].pokemon.name);
  pkmnNbr = data.pokemon[randIndex];
  console.log(pkmnNbr);
  if (confirm(`You caught a ${caughtPkmn}!`)){
    storePkmn(caughtPkmn);

  }
})

}

});

/*The player gets a random fish and is shown a choice between
releasing it (does nothing) or putting it in thier inventory*/
function storePkmn(pkmn){
  let query=pkmn.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
  .then((response)=> response.json())
  .then((data)=> {
    console.log(data);
    let newPkmn = {name:pkmn,
                   id:data.id,
                   type:[data.types[0].type.name, data.types[1]? data.types[1].type.name : ''],
                   level: Math.floor(Math.random() *100),
                   height:data.height,
                   weight:data.weight,
                   imageSrc:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`,
                  }
   makeCard(newPkmn);
  })
}

function makeCard(pkmnObj){
  let pkmnCard=document.createElement('div');
  pkmnCard.className = 'card';
  pkmnCard.textContent = pkmnObj.name;

  pkmnCard.appendChild(document.createElement('img'))
  pkmnCard.querySelector('img').className = 'pkmn';
  pkmnCard.querySelector('img').src = pkmnObj.imageSrc;

  pkmnCard.appendChild(document.createElement('button'))
  pkmnCard.querySelector('button').className = 'sellBtn'
  pkmnCard.querySelector('button').textContent = 'sell'
  document.querySelector('#contianer').appendChild(pkmnCard)

  pkmnCard.querySelector('button').addEventListener('click', function(){
    if(confirm('Sell this pokemon?')){
      this.parentElement.remove();
    }
  })

}


/*The Player can press the "cooler" button on the top right to
access the fish that they kept*/
const inventoryBtn = document.querySelector('#cooler')
const storageBtn = document.querySelector('#closeStorage')
const storage = document.querySelector('#storage')


inventoryBtn.addEventListener('click',function(){
  storage.removeAttribute('hidden');
});

storageBtn.addEventListener('click',function(){
  storage.setAttribute('hidden',true);
});
/* When the player hovers over the "fish", its stats (length, weight, type, selling price, etc.) are displayed*/

/* The player can sell the fish from the inventory menu and gain gold equal to its sell price*/

