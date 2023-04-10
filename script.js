//Player is able to move along the map using the arrow keys/ WASD
let player =document.querySelector('#character');
let moveBy = 25;

window.addEventListener("keydown", function(e){
  switch(e.key){
    case 'ArrowLeft':
        player.style.left = parseInt(player.style.left) + -moveBy +'px';

    case 'ArrowRight':
        player.style.left = parseInt(player.style.left) + moveBy +'px';

    case 'ArrowUp':
        player.style.top = parseInt(player.style.top) + -moveBy +'px';

    case 'ArrowDown':
        player.style.top = parseInt(player.style.top) + moveBy +'px';

    }
})

/*When player is at the water's edge, they are able to press
SPACE to fish (pressing SPACE anywhere else will do nothing)*/

/*The player gets a random fish and is shown a choice between
releasing it (does nothing) or putting it in thier inventory*/

/*The Player can press the inventory button on the top right to
access the fish that they kept*/
