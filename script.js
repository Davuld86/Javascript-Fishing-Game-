document.addEventListener('DOMContentLoaded',function(){
fetch('http://localhost:3000/caughtPkmn')
.then((response)=> response.json())
.then((data)=> data.forEach((element)=> makeCard(element)))

fetch('http://localhost:3000/gold')
.then((response)=> response.json())
.then((data)=> {
if(data.amount != undefined){document.querySelector('#goldTally').textContent = `Gold: ${data.amount}`}
  })
})

//Player is able to move along the map using the arrow keys/ WASD
 const player =document.querySelector('#character');
 const water = getComputedStyle(document.querySelector('#water'));
 let playerPos= {playerX:parseInt(player.style.left), playerY:parseInt(player.style.top), playerWidth:50, playerHeight:50}

let modifier = 25;
window.addEventListener('keydown', (event) => {
    const {style} = player;
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
const waterPos  = {waterX:parseInt(water.left), waterY: parseInt(water.top), waterWidth:parseInt(water.width), waterHeight:parseInt(water.height)};

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

window.addEventListener('keydown', (event) => {
  let caughtFish =''
  let randNum = Math.floor(Math.random() * 10) + 1
  let randGold = Math.floor(Math.random() * 517) + 1
  let randIndex = (Math.floor(Math.random() * 80) +1);
if(event.key ==' ' && waterCol()==true) {
  if(randNum == 1){
    alert("Nothing's biting...")
  }
  else if(randNum< 4 && randNum>1){
    alert(`You fished up ${randGold} gold!`);
    addGold(randGold);
  }
  else if(randNum>=4){
fetch(`http://localhost:3000/fish/${randIndex}`)
.then((response)=> response.json())
.then((data)=> {
 caughtFish = data.name;
  if (confirm(`You caught a ${caughtFish}!`)){
    storeFish(data);
      }
    })
  }
}
});

/*The player gets a random fish and is shown a choice between
releasing it (does nothing) or putting it in thier inventory*/
function storeFish(fishObj){
  let newFish = { name: fishObj.name,
                  length: `${Math.floor(Math.random() * 36)}.${Math.floor(Math.random() * 99)} in`,
                  weight: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 99)} lbs`,
                  price: fishObj.price,
                  imageUrl: fishObj.image,
  }
  makeCard(newFish);
  fetch(`http://localhost:3000/caughtFish`,{
    method: 'POST',
    headers:
    {
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newFish)
   })
}

function makeCard(fishObj){
  console.log(fishObj)
  let sellPrice  = (fishObj.price)
  let fishCard=document.createElement('div');
  fishCard.className = 'card';
  fishCard.textContent = fishObj.name;

  if (fishObj.id){
    fishCard.id = fishObj.id;
  }
  else if(document.querySelectorAll('.card')[document.querySelectorAll('.card').length-1]!= undefined){
    fishCard.id = parseInt(document.querySelectorAll('.card')[document.querySelectorAll('.card').length-1].id) +1;
  }
  else{
    fishCard.id = 1
}
   let fishImg = document.createElement('img');

  fishCard.appendChild(fishImg)
  fishImg.className = 'fish';
  console.log(fishObj.imageUrl)
  fishImg.src = fishObj.imageUrl;
  createStats(fishCard,fishObj);
  fishImg.addEventListener('mouseover', function(){
     fishCard.querySelector('.stats').removeAttribute('hidden')
  })
  fishImg.addEventListener('mouseout', function(){
    fishCard.querySelector('.stats').setAttribute('hidden',true);
   })
  fishCard.appendChild(document.createElement('button'))
  fishCard.querySelector('button').className = 'sellBtn'
  fishCard.querySelector('button').textContent = `Sell for ${sellPrice} gold`
  document.querySelector('#contianer').appendChild(fishCard)

  fishCard.querySelector('button').addEventListener('click', function(){
    if(confirm(`Sell this fish?`)){
      sellFish(this);
      addGold(sellPrice);
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

function createStats(imgElement,fishObj){
  let statCard = document.createElement('div');
  statCard.className = 'stats';
  statCard.setAttribute('hidden', true);

  let statList = document.createElement('dl');
  let stats = Object.fromEntries(Object.entries(fishObj).slice(1,6));
  console.log(stats)

Object.entries(stats).forEach((element)=> {
  let x = document.createElement('dl');
  x.textContent= `${element[0]}: ${element[1]}`;
  statList.appendChild(x);


  statCard.appendChild(statList)
  imgElement.appendChild(statCard);
})
};

/* The player can sell the fish from the inventory menu and gain gold equal to its sell price*/

function sellFish(element){
  element.parentElement.remove();
  fetch(`http://localhost:3000/caughtPkmn/${element.parentElement.id}`,{
    method: 'DELETE'
  })
}

function addGold(price){
 let goldTally = document.querySelector('#goldTally');
 let goldAmt = parseInt(document.querySelector('#goldTally').textContent.replace(/[^0-9]/g,""))
 goldTally.textContent=(`Gold: ${goldAmt + price}`)
 fetch(`http://localhost:3000/gold/`,{
  method: 'PATCH',
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify({
    "amount": goldAmt+price
  })
})
}

