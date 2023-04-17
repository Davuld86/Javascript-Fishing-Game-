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

      case 'ArrowUp' :style.top = `${parseInt(style.top) - modifier}px`; break;

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

      case 'ArrowDown': style.top = `${parseInt(style.top) + modifier}px`; break;
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

      case 'ArrowLeft': style.left = `${parseInt(style.left) - modifier}px`; break;
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

      case 'ArrowRight': style.left = `${parseInt(style.left) + modifier}px`; break;

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

   console.log('Player X: ' + playerPos.playerX)
   console.log('Player Y: '+ playerPos.playerY)

   let bridgeColor = document.querySelector('#bridge')
   let bridge = {xl: 750, xr: 925, yt:100, yb:450}

  if (
    (playerPos.playerX > bridge.xl && playerPos.playerX + playerPos.playerWidth <bridge.xr)
    &&(playerPos.playerY > bridge.yt && playerPos.playerY +playerPos.playerHeight < bridge.yb)
    )
  {
    bridgeColor.style.backgroundColor = 'red';
    return true;

  }
  else{
    bridgeColor.style.backgroundColor = 'orange';
    return false;
  }
}



/*When player is at the water's edge, they are able to press
SPACE to fish (pressing SPACE anywhere else will do nothing)*/

/*The player gets a random fish and is shown a choice between
releasing it (does nothing) or putting it in thier inventory*/

/*The Player can press the inventory button on the top right to
access the fish that they kept*/

/* When the player hovers over the fish, its stats (length, weight, type, selling price, etc.) are displayed*/

/* The player can sell the fish from the inventory menu and gain gold equal to its sell price*/
