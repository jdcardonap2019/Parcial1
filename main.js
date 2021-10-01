    const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
fetch(url).then(res=>res.json()).then(res=>{
    data = res
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
    let carrito = []
    const anvorguesas = document.getElementById("anv")
    anvorguesas.addEventListener("click", ()=>{
        Menu(0)
        agregarListenerBoton()
    })
    const tacos = document.getElementById("tacos")
    tacos.addEventListener("click", ()=>{
        Menu(1)
        agregarListenerBoton()
    })
    const salads = document.getElementById("salads")
    salads.addEventListener("click", ()=>{
        Menu(2)
        agregarListenerBoton()
    })
    const desserts = document.getElementById("desserts")
    desserts.addEventListener("click", ()=>{
        Menu(3)
        agregarListenerBoton()
    })
    const drinks = document.getElementById("drinks")
    drinks.addEventListener("click", ()=>{
        Menu(4)
        agregarListenerBoton()
    })
    function limpiar(){
        if(document.getElementById("divConfirmCancel"))
        {
            hijo = document.getElementById("divConfirmCancel")
            padre = hijo.parentNode
            padre.removeChild(hijo)
        }
        table = document.getElementsByClassName("table table-striped table-hover")
        if(table.length>0){
            while(table.length!==0)
            {
                tablaActual = table[0]
                hijo = tablaActual
                padre = hijo.parentNode;
                padre.removeChild(tablaActual);
            }   
        }
        card = document.getElementsByClassName("card");	
        if (card.length>0){
            while(card.length!==0)
            {
                cardActual = card[0]
                hijo = cardActual
                padre = hijo.parentNode;
                padre.removeChild(cardActual);
            }   
        }
        men = document.getElementById("menuTittle");	
        if (men){
            padre = men.parentNode;
            padre.removeChild(men);
        }
    }
    function Menu(index)
    {
        limpiar()
        for(let i=0; i<data[index].products.length;i++)
        {
            //Creacion Card
            let divCard = document.createElement("div")
            divCard.className = "card"
            divCard.id = "marginCard"
            divCard.style.width = "18rem"
            //Obtencion informacion
            let burger = data[index].products[i]
            let name = document.createTextNode(burger.name)
            let precio = document.createTextNode("$ " + burger.price)
            let description = document.createTextNode(burger.description)
            //Creacion del script html
            let imagen = document.createElement("img")
            imagen.src = burger.image
            imagen.className = "card-img-top"
            imagen.id = "img-format"
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
            precioXd.id = "price"
            precioXd.appendChild(precio)
            //Boton
            let boton = document.createElement("a")
            let botonText = document.createTextNode("Add to car")
            boton.appendChild(botonText)
            boton.href = "#"
            boton.className = "btn btn-primary"
            boton.id = "buttonCard"
            
            //Union de todo lo de la carta
            divCardB.appendChild(h5)
            divCardB.appendChild(description)
            divCardB.appendChild(precioXd)
            divCardB.appendChild(boton)
            divCard.appendChild(imagen)
            divCard.appendChild(divCardB)

            //Lo mando
            let container = document.getElementById("cardsBa")
            container.appendChild(divCard)
        }
        let menu = document.getElementById("Menu")
        let h1 = document.createElement("h1")
        h1.align="center"
        h1.id = "menuTittle"
        let titulo = document.createTextNode(data[index].name)
        h1.appendChild(titulo)
        menu.appendChild(h1)
    }
    function agregarListenerBoton()
    {
        let botonesCompra = document.getElementsByClassName("btn btn-primary")
        for(let i = 0; i< botonesCompra.length; i++)
        {
                botonesCompra[i].addEventListener("click", ()=>{
                    if(botonesCompra[i].parentNode)
                    {
                        agregarAlCarrito(botonesCompra[i].parentNode)
                    }
                })            
        }
    }
   
    function agregarAlCarrito(element)
    {
        let compra = element.parentNode
        let info = compra.childNodes
        let name = info[1].childNodes[0].innerHTML
        let estaEnCarro = false;
        let unit_price = parseFloat(info[1].childNodes[2].innerHTML.replace('$', '')).toFixed(2)
        if(carrito.length>0)
        {
            for(let i=0;i<carrito.length;i++)
            {
                estaEnCarro = name===carrito[i].description?true:false;
                if(estaEnCarro)
                {   
                    carrito[i].quantity+=1
                    break
                }
            }
            if(!estaEnCarro){
                carrito.push({item: carrito.length+1, quantity:1, description: name, unitPrice: unit_price})
            }
        }else if(carrito.length===0)
        {
            carrito.push({item: carrito.length+1, quantity:1, description: name, unitPrice: unit_price})
        }
        let cantidadObjetos = 0
        for(let i=0;i<carrito.length;i++)
        {
            cantidadObjetos+=carrito[i].quantity
        }
        document.getElementById("noCarrito").innerHTML= cantidadObjetos
    }
    let imgCarrito = document.getElementById("carro")
    imgCarrito.addEventListener("click",()=>{
        cargarCarrito()
    })
    function cargarCarrito()
    {
        limpiar()
        /** Forma de las líneas de la tabla:
             * <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Events</th>
                <th scope="col">Squirrel</th>
              </tr>
              </thead>
              <tbody> 
             *<tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              </tbody>
            */
              let table = document.createElement("table")
              table.className = "table table-striped table-hover"
              let fila = document.createElement("tr")
              //Parte del thead
              let thead = document.createElement("thead")
               let th1h = document.createElement("th")
               th1h.scope="col"
               th1h.innerHTML = "Item"
               let th2h = document.createElement("th")
               th2h.scope="col"
               th2h.innerHTML = "Qty."
               let th3h = document.createElement("th")
               th3h.scope="col"
               th3h.innerHTML = "Descrption"
               let th4h = document.createElement("th")
               th4h.scope="col"
               th4h.innerHTML = "Unit Price"
               let th5h = document.createElement("th")
               th5h.scope="col"
               th5h.innerHTML = "Amount"
               let th6h = document.createElement("th")
               th6h.scope="col"
               th6h.innerHTML = "Modify"
               //Parte del tbody
               let tbody = document.createElement("tbody")
               //Union
               fila.appendChild(th1h)
               fila.appendChild(th2h)
               fila.appendChild(th3h)
               fila.appendChild(th4h)
               fila.appendChild(th5h)
               fila.appendChild(th6h)
               thead.appendChild(fila)
               table.appendChild(thead)
        for(let i = 0; i<carrito.length;i++)
        {
            let tbody = document.createElement("tbody")
            let th = document.createElement("th")
            let iterador = document.createTextNode(i+1)
            th.appendChild(iterador)
            let tr = document.createElement("tr")
            let td1 = document.createElement("td")
            td1.innerHTML = carrito[i].quantity
            let td2 = document.createElement("td")
            td2.innerHTML = carrito[i].description
            let td3 = document.createElement("td")
            td3.innerHTML = carrito[i].unitPrice
            let td4 = document.createElement("td")
            td4.innerHTML = parseFloat(carrito[i].unitPrice*carrito[i].quantity).toFixed(2)
            let buttonsModify = createModifyButtons()
            let divButtons = document.createElement("div")
            divButtons.appendChild(buttonsModify[0])
            divButtons.appendChild(buttonsModify[1])
            tr.appendChild(th)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(divButtons)
            tbody.appendChild(tr)
            table.appendChild(tbody)
        }
        let divConfirmCancel = createConfirmCancelDiv()
        let titulo = document.getElementById("Menu")
        let titulo2 = document.createElement("h1")
        titulo2.innerHTML="Order detail"   
        titulo2.align="center"
        titulo2.id = "menuTittle"
        titulo.appendChild(titulo2)
        let menu = document.getElementById("cardsBa")
        menu.appendChild(table)
        menu.appendChild(divConfirmCancel)
    }
    function createModifyButtons(){
        let btns = []
        let button1 = document.createElement("button")
        let button2 = document.createElement("button")
        button1.innerHTML="+"
        button1.id="buttonModify"
        button2.innerHTML="-"
        button2.id="buttonModify"
        button1.addEventListener("click",()=>{
            modifyQuantity(button1)
        })
        button2.addEventListener("click",()=>{
            modifyQuantity(button2)
        })
        btns.push(button1,button2)
        return btns
    }
    function modifyQuantity(element)
    {
        boton = element
        operacion = boton.innerHTML
        padreDiv = boton.parentNode
        padreTr = padreDiv.parentNode
        id = parseInt(padreTr.childNodes[0].innerHTML)-1
        operacion=operacion.toString()
        if(operacion==="+")
        {
            carrito[id].quantity++
            let numCarritoFront = parseInt(document.getElementById("noCarrito").innerHTML)
            numCarritoFront++
            document.getElementById("noCarrito").innerHTML = numCarritoFront
        }
        else{
            carrito[id].quantity--
            document.getElementById("noCarrito").innerHTML=document.getElementById("noCarrito").innerHTML-1
        }
        padreTr.childNodes[1].innerHTML=carrito[id].quantity
        padreTr.childNodes[4].innerHTML=parseFloat(carrito[id].unitPrice*carrito[id].quantity).toFixed(2)
        let total = document.getElementById("TOTAL")
        total.innerHTML= calcularTotal()
    }
    function createConfirmCancelDiv()
    {
        let divConfirmCancel = document.createElement("div")
        divConfirmCancel.className="row"
        divConfirmCancel.id="divConfirmCancel"
        let divTotal = document.createElement("div")
        let th = document.createElement("th")
        th.innerHTML=calcularTotal()
        th.id="TOTAL"
        divTotal.appendChild(th)
        divTotal.className="col-6"
        let divBotones = document.createElement("div")
        divBotones.className="col-6"
        let buttons = createConfirmCancelButtons()
        divBotones.appendChild(buttons[1])
        divBotones.appendChild(buttons[0])
        divConfirmCancel.appendChild(divTotal)
        divConfirmCancel.appendChild(divBotones)
        return divConfirmCancel
    }
    function createConfirmCancelButtons()
    {
        let btns = []
        let button1 = document.createElement("button")
        let button2 = document.createElement("button")
        button1.innerHTML="Cancel"
        button1.id="buttonCancel"
        button2.innerHTML="Confirm order"
        button2.id="buttonConfirm"
        button1.addEventListener("click",()=>{
                $("#windowcancell").modal("toggle")
                let buttonYes = document.getElementById("buttonConfirm2")
                buttonYes.addEventListener("click",()=>{
                    carrito=[]
                    cargarCarrito()
                    document.getElementById("noCarrito").innerHTML= carrito.length
                })
                let buttonNo = document.getElementById("buttonCancel2")
                buttonNo.addEventListener("click",()=>{
        
                })
        })
        button2.addEventListener("click",()=>{
            console.log(carrito)
        })
        btns.push(button1,button2)
        return btns
    }
    function calcularTotal()
    {
        let total=0
        for(let i=0;i<carrito.length;i++)
        {
            total+=carrito[i].quantity*carrito[i].unitPrice
        }
        total = parseFloat(total).toFixed(2)
        let res = "Total: $"+total
        return res
    }
})