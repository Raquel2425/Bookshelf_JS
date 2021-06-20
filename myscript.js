//---------------------------VARIABLES GLOBALES------------

const requestLibros = new XMLHttpRequest();
    
requestLibros.open('GET', 'LibrosLeidos1.json', true);
requestLibros.send();
requestLibros.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){
        var Libros = JSON.parse(this.responseText);
    
const request = new XMLHttpRequest();

request.open('GET', 'Etiquetas.json', true);
request.send();
request.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200){
         var Etiquetas = JSON.parse(this.responseText);
    

var indexGlobalActual = 0;
EtiquetasElegidas=[];



//----------------------------FUNCIONES-------------------------

function PonerCategorias() {

    for (const [key, value] of Object.entries(Etiquetas[0])){

        var BotonEtiqueta = document.createElement("input");

        BotonEtiqueta.type="button";
        BotonEtiqueta.className="BotonEtiquetaStyle";
        BotonEtiqueta.id="BotonEtiqueta"+`${value}`;
        BotonEtiqueta.value=`${value}`;
        BotonEtiqueta.addEventListener("click", function(){ActualizarEtiquetasElegidas(value)});

        CategoriasBotones.appendChild(BotonEtiqueta);
    };
    
};

function ActualizarEtiquetasElegidas(Etiqueta){
    var BotonEtiqueta=document.getElementById("BotonEtiqueta"+`${Etiqueta}`);
    if(EtiquetasElegidas.indexOf(Etiqueta)==-1){
        BotonEtiqueta.style.backgroundColor="#c0a581";
        EtiquetasElegidas.push(`${Etiqueta}`);
    }
    else{
        BotonEtiqueta.style.backgroundColor="#ffe6c6";
        var indexEtiqueta=EtiquetasElegidas.indexOf(Etiqueta);
        EtiquetasElegidas.splice(indexEtiqueta, 1);
    }

    OrdenarPorEtiqueta(EtiquetasElegidas);
}

function OrdenarPorEtiqueta(Etiquetas){

    DivLibrosCategoria.style.display="block";

    while (DivLibrosCategoria.childElementCount>0) {
        DivLibrosCategoria.removeChild(DivLibrosCategoria.firstChild);
    };

    for(let libro of Libros){
        for (etiqueta of Etiquetas){
            if(libro[etiqueta]!=undefined){

                let indexActual=Libros.indexOf(libro);

                var BotonLibro = document.createElement("input");

                BotonLibro.type="image"
                BotonLibro.src=`${libro.PortadaPeque}`;
                BotonLibro.className="LibroStyle";
                BotonLibro.id="LibroPorCategoria"
                BotonLibro.addEventListener("click", function(){MostrarLibro(indexActual)});

                DivLibrosCategoria.appendChild(BotonLibro);
                break;
            }
        }
    };
};

function PonerLibros() {

    for(let libro of Libros){

        let indexActual=Libros.indexOf(libro);

        var BotonLibro = document.createElement("input");

        BotonLibro.type="image"
        BotonLibro.src=`${libro.PortadaPeque}`;
        BotonLibro.className="LibroStyle";
        BotonLibro.id="Libro"
        BotonLibro.addEventListener("click", function(){MostrarLibro(indexActual)});

        Escaparate.appendChild(BotonLibro);
    };
};

function AbrirDatosLibro(){
    DatosLibro.style.display = 'block';

    Encabezado.style.filter= "blur(4px)";
    Organizador.style.filter= "blur(4px)";
    Categorias.style.filter= "blur(4px)";
    Escaparate.style.filter= "blur(4px)";
}

function CerrarDatosLibro(){
    DatosLibro.style.display = 'none';
    
    Encabezado.style.filter= "none";
    Organizador.style.filter= "none";
    Categorias.style.filter= "none";
    Escaparate.style.filter= "none";
}

function MostrarLibro(Index){

    var BotonCerrar =document.createElement("input");
    BotonCerrar.type="image";
    BotonCerrar.src="icono cerrar2.png";
    BotonCerrar.className="BotonCerrarStyle";
    BotonCerrar.id="BotonCerrar";
    BotonCerrar.addEventListener("click", CerrarDatosLibro);
    DatosLibro.appendChild(BotonCerrar);

    //ABRIR NUEVO FRAME
    AbrirDatosLibro();

    //CERRAR NUEVO FRAME    
    Encabezado.ondblclick= CerrarDatosLibro;
    Organizador.ondblclick= CerrarDatosLibro;
    Categorias.ondblclick= CerrarDatosLibro;
    Escaparate.ondblclick= CerrarDatosLibro;
    MenuDesplegable.ondblclick= CerrarDatosLibro;

    indexGlobalActual=Index;
    Libro=Libros[Index];

    //CREAMOS LOS ELEMENTOS A VISUALIZAR

    //DivFichaTecnica
    var DivFicha= document.createElement("div");
    DivFicha.className="DivFichaStyle";
    DatosLibro.appendChild(DivFicha);

    //DivSinopsis
    var DivSinopsis= document.createElement("div");
    DivSinopsis.className="DivSinopsisStyle";
    DatosLibro.appendChild(DivSinopsis);

    var DivEtiquetas= document.createElement("div");
    DivEtiquetas.className="DivEtiquetasStyle";
    DivFicha.appendChild(DivEtiquetas);
    
    //Portada
    var PortadaGrande= document.createElement("img");
    PortadaGrande.className="PortadaGrandeStyle";
    PortadaGrande.src=`${Libro.PortadaGrande}`
    DivFicha.appendChild(PortadaGrande);

    //Titulo
    var Titulo= document.createElement("label");
    Titulo.innerHTML = `${Libro.Titulo}`;
    Titulo.className="TituloStyle";
    DivSinopsis.appendChild(Titulo);

    //Autor
    var Autor= document.createElement("label");
    Autor.className="AutorStyle";
    Autor.innerHTML =`${Libro.Autor}`;
    DivSinopsis.appendChild(Autor);

    //Num Pag
    if(Libro.NumeroPagina != undefined){
    var NumPag= document.createElement("label");
    NumPag.className="NumPagStyle",
    NumPag.innerHTML =`Número de páginas: ${Libro.NumeroPagina}`;
    DivSinopsis.appendChild(NumPag);
    };

    //Saga
    if(Libro.Saga!=" "){
    var Saga= document.createElement("label");
    Saga.className="SagaStyle";
    Saga.innerHTML =`Saga: ${Libro.Saga}`;
    DivSinopsis.appendChild(Saga);
    }
    else{NumPag.style.top= "14%"}
    
    //Sinopsis
    var Sinopsis=document.createElement("p");
    Sinopsis.className="SinopsisStyle";
    Sinopsis.innerHTML =`${Libro.Sinopsis}`;
    DivSinopsis.appendChild(Sinopsis);

    //Checkbox etiquetas
    
    for (const [key, value] of Object.entries(Etiquetas[0])){
        var CheckboxEtiqueta = document.createElement("input");
        CheckboxEtiqueta.type="button";
        CheckboxEtiqueta.id="Checkbox"+`${Libro.Titulo}`+`${value}`;
        CheckboxEtiqueta.className="CheckboxStyle";
        CheckboxEtiqueta.value=`${value}`;
        CheckboxEtiqueta.addEventListener("click", function(){EscribirEtiqueta(Libro, value)})
        DivEtiquetas.appendChild(CheckboxEtiqueta);   
        
        if(Libro[value]!=undefined){
            CheckboxEtiqueta.style.backgroundColor="#c0a581";
        }
    };

};

function EscribirEtiqueta(LibroActual, Etiqueta){
    LibroActual[Etiqueta] ="Si";
    console.log(LibroActual)

    LibroJSON=JSON.stringify(LibroActual)

    
    writeFile("thing.json", LibroJSON, function(err, result) {
        if(err) console.log('error', err);
    });
}

function Display(elem, subelem){

	const curDisplayStyle = subelem.style.display;	
    const curColorStyle= elem.style.backgroundColor;

	if (curDisplayStyle === 'none' || curDisplayStyle === ''){
		subelem.style.display = 'block';
        elem.style.backgroundColor = "#c0a581";
	}
	else{
		subelem.style.display = 'none';
        elem.style.backgroundColor = "#ffe6c6";
	};
};


//------------------------VARIABLES DIV------------------------

var Encabezado=document.querySelector('#Encabezado');
var Organizador= document.querySelector('#Organizador');
var Categorias= document.querySelector('#Categorias');
var Escaparate= document.querySelector('#Escaparate');
var MenuDesplegable= document.querySelector('#MenuDesplegable');
var DatosLibro= document.querySelector('#DatosLibro');

//------------------------ELEMENTOS ENCABEZADO------------------------

var Nombre = document.getElementById("Nombre");

//------------------------ELEMENTOS ORGANIZADOR------------------------

var OrganizarporTitulo= document.getElementById('OrganizarTitulo');
var OrganizarporAutor= document.getElementById('OrganizarAutor');
var OrganizarporAño= document.getElementById('OrganizarAño');

//------------------------ELEMENTOS CATEGORIAS------------------------

CategoriasBotones = document.getElementById('CategoriasBotones');

//------------------------ELEMENTOS ESCAPARATE------------------------

var DivLibrosCategoria =document.getElementById("DivLibrosCategoria")

//------------------------ELEMENTOS MENU DESPLEGABLE------------------------

var SubMenuTitulo=document.getElementById("SubMenuTitulo");
var SubMenuAutor=document.getElementById("SubMenuAutor");
var SubMenuAño=document.getElementById("SubMenuAño");

//------------------------ELEMENTOS DATOS LIBRO------------------------

var BotonCerrar=document.getElementById("BotonCerrar");

//------------------------CODIGO PRINCIPAL------------------------

Nombre.addEventListener("click", function(){DivLibrosCategoria.style.display="none";})

CategoriasBotones.addEventListener('load', PonerCategorias());
Escaparate.addEventListener('load', PonerLibros());

OrganizarporTitulo.addEventListener("click", function(){Display(OrganizarporTitulo, SubMenuTitulo)});
OrganizarporAutor.addEventListener("click", function(){Display(OrganizarporAutor, SubMenuAutor)});
OrganizarporAño.addEventListener("click", function(){Display(OrganizarporAño, SubMenuAño)});

document.addEventListener('keyup',function(e){
    if ( e.which == 39 ) {
        MostrarLibro(indexGlobalActual+1);
    };
});

document.addEventListener('keyup',function(e){
    if ( e.which == 37 ) {
        MostrarLibro(indexGlobalActual-1);
    };
});

document.addEventListener('keydown',function(e){
    if ( e.which == 27 ) {
        CerrarDatosLibro();
    };
});


};
};
};
};
