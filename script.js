//Player is able to move along the map using the arrow keys/ WASD
 const player =document.querySelector('#character');
 const water = getComputedStyle(document.querySelector('#water'));

let modifier = 25;

window.addEventListener('keydown', (event) => {
    const { style } = player;
    switch(event.key) {

      case 'ArrowUp' :style.top = `${parseInt(style.top) - modifier}px`; break;

      case 'w':
        if(waterCol()==false){
          style.top = `${parseInt(style.top) - modifier}px`;
        }
        else{
          style.top = `${parseInt(style.top) + modifier}px`;
        }
        break;

      case 'ArrowDown': style.top = `${parseInt(style.top) + modifier}px`; break;
      case 's':
      if(waterCol()==false){
      style.top = `${parseInt(style.top) + modifier}px`;
      }
      else{
        style.top = `${parseInt(style.top) - modifier}px`;
      }
      break;

      case 'ArrowLeft': style.left = `${parseInt(style.left) - modifier}px`; break;
      case 'a':
      if(waterCol()==false){
      style.left = `${parseInt(style.left) - modifier}px`;
      }
      else{
        style.left = `${parseInt(style.left) + modifier}px`;
      }
      break;

      case 'ArrowRight': style.left = `${parseInt(style.left) + modifier}px`; break;

      case 'd':
        if(waterCol()==false){
         style.left = `${parseInt(style.left) + modifier}px`;
        }
        else{
          style.left=`${parseInt(style.left) - modifier}px`;
        }
         break;
    }
  });


function isInsideBox(){

}

function waterCol(){
  let playerX =parseInt(player.style.left);
  let playerY = parseInt(player.style.top);
  let playerWidth= parseInt(player.style.width);
  let playerHeight = parseInt(player.style.height);

  let waterX = parseInt(water.left);
  let waterY = parseInt(water.top);
  let waterWidth = parseInt(water.width);
  let waterHeight = parseInt(water.height);

  if (playerX > waterX +waterWidth||
      playerX + playerWidth < waterX ||
      playerY > waterY+ waterHeight||
      playerY + playerHeight < waterY
    )
    {
      console.log(`Player x: ${playerX}`)
      console.log(`Water x: ${waterX}`)
      console.log(`Player y: ${playerY}`)
      console.log(`Water y: ${waterY}`)
      return false;
    }
    else{
      return true;
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
