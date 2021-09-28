const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
fetch(url).then(res=>res.json()).then(res=>{
    data = res
    console.log(data)
    /**
     * Cards html:
     * <div class="card" style="width: 18rem;">
     <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
     </div>
    </div>
     */
    for(let i=0; i<data[0].products.length;i++)
    {
        //Obtencion informacion
        let burger = data[0].products[i]
        console.log(burger.price)
        let name = document.createTextNode(burger.name)
        let precio = document.createTextNode(burger.price)
        let description = document.createTextNode(burger.description)
        let image = document.createTextNode(burger.image)
        //Creacion del script html
        let divCard = document.createElement("div")
        divCard.className = "card"
        divCard.style.width = "18rem"
        let imagen = document.createElement("img")
        imagen.href = image
        let divCardB = document.createElement("div")
        divCardB.className = "card-body"
        let h5 = document.createElement("h5")
        h5.className = "card-tittle"
        h5.appendChild(name)
        let descripcion = document.createElement("p")
        description.className="card-text"
        descripcion.appendChild(description)
        let precioXd = document.createElement("p")
        precioXd.className="card-text"
        precioXd.appendChild(precio)
        //Boton
        let boton = document.createElement("a")
        let botonText = document.createTextNode("Add to car")
        boton.appendChild(botonText)
        boton.href = "#"
        boton.className = "btn btn-primary"
        boton.id = "buttonCard"
        
        //Union de todo
        divCardB.appendChild(h5)
        divCardB.appendChild(description)
        divCardB.appendChild(precioXd)
        divCardB.appendChild(boton)
        divCard.appendChild(image)
        divCard.appendChild(divCardB)
        //Lo mando
        let container = document.getElementById("cardsBa")
        container.appendChild(divCard)
    }
})