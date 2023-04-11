//Player is able to move along the map using the arrow keys/ WASD
const player =document.querySelector('#character');
let modifier = 25;

window.addEventListener('keydown', (event) => {
    const { style } = player;
    switch(event.key) {

      case 'ArrowUp':style.top = `${parseInt(style.top) - modifier}px`; break;
      case 'ArrowDown': style.top = `${parseInt(style.top) + modifier}px`; break;
      case 'ArrowLeft': style.left = `${parseInt(style.left) - modifier}px`; break;
      case 'ArrowRight': style.left = `${parseInt(style.left) + modifier}px`; break;
    }
  });
/*When player is at the water's edge, they are able to press
SPACE to fish (pressing SPACE anywhere else will do nothing)*/

/*The player gets a random fish and is shown a choice between
releasing it (does nothing) or putting it in thier inventory*/

/*The Player can press the inventory button on the top right to
access the fish that they kept*/
