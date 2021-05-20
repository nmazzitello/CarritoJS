const carrito= document.querySelector("#carrito");
const contenedorCarrito=document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito=document.querySelector("#vaciar-carrito");
const listaCursos= document.querySelector("#lista-cursos");
let articulosCarrito=[];

//voy a cargar todos los eventos aca
cargarEventListeners();

function cargarEventListeners(){
    //cuando agregas el curso seleccionado a la lista del carrito
    listaCursos.addEventListener("click", agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //vaciar el carrito
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);
};

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
};

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const idAeliminar= e.target.getAttribute("data-id");
        articulosCarrito= articulosCarrito.filter( cursos => cursos.id !== idAeliminar);
        console.log(articulosCarrito);
        carritoHTML();
    }
}

function vaciarCarrito(){
    articulosCarrito=[];

    carritoHTML();
}

//lee el contenido del elemento que le di click para agregar al carrito y extrae info del cursp
function leerDatosCurso(curso){
    const infoCurso={
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector("span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad:1,
    };

    //revisa si un elemento del carrito ya existe
    const existe= articulosCarrito.some(curso => curso.id=== infoCurso.id);
    if(existe){
        const cursos=articulosCarrito.map( curso => {
            if(curso.id=== infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el aticulo actualizado
            }else{
                return curso;
            }
        });
        articulosCarrito=[...cursos];
    }else{
        articulosCarrito= [...articulosCarrito, infoCurso];
    }

    carritoHTML();
};

//muestra el carrito en el html
function carritoHTML(){
    //limpiar el html para no sobreescrbir
    limpiarCarrito();
    
    articulosCarrito.forEach( curso => {
        const row= document.createElement("tr");
        row.innerHTML= `
            <td> <img src="${curso.imagen}" width=100> </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.precio} </td>
            <td> ${curso.cantidad} </td>     
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X </a>
            </td>      
        `;
        contenedorCarrito.appendChild(row);
    })
};

//elimina los cursos del tbody
function limpiarCarrito(){
    //forma lenta de eliminar
   // contenedorCarrito.innerHTML= "";

   //forma rapida
   while(contenedorCarrito.firstChild){
       contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
};