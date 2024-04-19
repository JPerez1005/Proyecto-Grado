//Navigation bar effects on scroll
window.addEventListener('scroll', function(){
    const header=this.document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY>0);
});

//REsponsive navigation menu toggle

const menuBtn=document.querySelector('.nav_menu_btn');
const closeBtn=document.querySelector('.nav_close_btn');
const navigation=document.querySelector('.navigation');

menuBtn.addEventListener('click', ()=>{
    navigation.classList.add('active');
});

closeBtn.addEventListener('click',()=>{
    navigation.classList.remove('active');
});

// Ejemplo1

const d=document;
let lista2;

// Recuperar el valor del 'localStorage' y verificar si es nulo o indefinido
const listaAlmacenada = localStorage.getItem('usuario');
if (listaAlmacenada === null || listaAlmacenada === undefined) {
    // Inicializar 'list' como un array vacío si no hay un valor almacenado
    lista2 = [];
} else {
    // Parsear el valor almacenado como un array
    lista2 = JSON.parse(listaAlmacenada);
}

// if(lista2){
//     let lista=d.getElementById('lista');//nos adueñamos de la lista
//     lista.innerHTML='';
//     for(let i=0; i<lista2.length; i++){
//         lista.innerHTML+='<li>'+lista2[i]+'</li>';
//     }
// }

function agregar(){
    let name=d.getElementById('nombre').value;//solo el valor
    let lista=d.getElementById('lista');//nos adueñamos de la lista
    lista2.push(name);
    lista.innerHTML='';
    for(let i=0; i<lista2.length; i++){
        lista.innerHTML+='<li>'+lista2[i]+'</li>';
    }
    localStorage.setItem('usuario',JSON.stringify(lista2));
}

function eliminar(){
    let lista=d.getElementById('lista');//nos adueñamos de la lista
    lista2.pop();
    lista.innerHTML='';
    for(let i=0; i<lista2.length; i++){
        lista.innerHTML+='<li id=item'+i+'>'+lista2[i]+'</li>'; //volvemos a mostrar
    }
    localStorage.setItem('usuario',JSON.stringify(lista2));
}

function removerTodo(){
    let lista=d.getElementById('lista');//nos adueñamos de la lista
    lista.innerHTML='';
    lista2 = [];
    localStorage.setItem('usuario',JSON.stringify(lista2));
    // console.log(lista2);
}

// Ejemplo 2
let createBox = d.querySelector('.createBox');
let notes = d.querySelector('.notes');
let input = d.getElementById('userInput');
let i = 0;
let list;

// Recuperar el valor del 'localStorage' y verificar si es nulo o indefinido
const storedList = localStorage.getItem('note');
if (storedList === null || storedList === undefined) {
    // Inicializar 'list' como un array vacío si no hay un valor almacenado
    list = [];
} else {
    // Parsear el valor almacenado como un array
    list = JSON.parse(storedList);
}

if (list) {
    for (let i = 0; i < list.length; i++) {
        let div = d.createElement('div');
        div.className = 'note';
        div.innerHTML = `
            <div class="details">
                <h3>${list[i]}</h3>
            </div>`;
        // fill random colors in note
        div.setAttribute('style', 'background:' + color() + '');
        // Agregar el nuevo elemento "div" al documento, por ejemplo, a un contenedor existente
        notes.appendChild(div);
    }
}

// createBox.addEventListener('keydown', content);

// d.getElementById('create').addEventListener('click', () => {
//     createBox.style.display = "block"; //activamos la vista del textarea
// });

function content(e) {
    if (e.keyCode == '13') /*cuando presionamos enter entonces...*/
    {
        divStyle(input.value);
        list.push(input.value);
        localStorage.setItem('note', JSON.stringify(list));
        input.value = "";
        createBox.style.display = "none";
    }
}

function color() {
    const coloresCrema = [
        "#FFF5E1", // Crema claro
        "#FFDAB9", // Salmón claro
        "#FFE4B5", // Almendra
        "#F0E68C", // Khaki claro
        "#FAF0E6"  // Lino antiguo
    ];

    if (i > coloresCrema.length - 1) {//recorremos toda la lista de colores desde i,
        //la reinicializamos desde cero si llega al final
        i = 0;
    }
    return coloresCrema[i++];//cada vez aumenta
}

function divStyle(text) {
    let div = d.createElement('div');
    div.className = 'note';
    div.innerHTML = `
        <div class="details">
            <h3>${text}</h3>
        </div>`;
    // remove note on double click
    div.addEventListener('dblclick', () => {
        div.remove();
    });
    // fill random colors in note
    div.setAttribute('style', 'background:' + color() + '');
    notes.appendChild(div);
}

function eliminarUltimaNota() {
    const notas = d.querySelectorAll('.note');
    if (notas.length > 0) {
        const ultimaNota = notas[notas.length - 1];
        ultimaNota.remove();

        // Eliminar la última nota del array 'list'
        list.pop();
        localStorage.setItem('note', JSON.stringify(list));
    }
}