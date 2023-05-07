let i =81;
fetch(`http://acnhapi.com/v1/fish/${i}`)
.then((response)=> response.json())
.then((data)=>{
    let newFish = {
        name: data.name["name-USen"],
        price: data.price,
        length: `${Math.floor(Math.random() *36)+1} in`,
        weight: `${Math.floor(Math.random() *5)+1} lbs`,
        image: data.image_uri,
    }
    console.log(newFish)
    fetch(`http://localhost:3000/fish`,{
        method: 'POST',
        headers:
        {
          "Content-Type": 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newFish)
       })
       console.log(i)
       i++;
});


