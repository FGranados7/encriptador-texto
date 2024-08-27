const confirmacion = document.querySelector('.msj-confimacion');
const accion = document.querySelector('.mensaje-accion');
const color = document.querySelector('.color');
const textArea = document.querySelector('.text-tarea');
const mensaje = document.getElementById('mensaje');
const btnCopiar = document.querySelector(".btn-copiar");

document.getElementById("btn-encriptar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Verificar si la tecla presionada es "Enter"
        btnEncriptar();  // Llamar a la función 
    }
});

function btnEncriptar(){
    let textoEncriptado = encriptar(textArea.value.toLowerCase())

    if(textoEncriptado != ''){

        textoEncriptado = eliminaEspeciales(textoEncriptado);
        mostrar_ocultar(mensaje)
        mostrar_ocultar(btnCopiar)
        textArea.value = ""
        mensaje.value = textoEncriptado
        mostrarAlerta(confirmacion, 'Texto Encriptado correctamente!','confirmacion')

    }else{
        mostrar_ocultar(confirmacion)
        mostrarAlerta(confirmacion, 'Ingresa el texto a Encriptar', 'error')

    }
        
}

function btnDesencriptar(){
    let textoDesencriptado = desencriptar(textArea.value.toLowerCase())

    if(textoDesencriptado != ''){   
        textoDesencriptado = eliminaEspeciales(textoDesencriptado);

        mostrar_ocultar(mensaje)
        mostrar_ocultar(btnCopiar)
        textArea.value = ""
        mensaje.value = textoDesencriptado
        mostrarAlerta(confirmacion, 'Texto Desencriptado correctamente!','confirmacion')

    }else{
        mostrarAlerta(confirmacion, 'Ingresa el texto a Desencriptar','error')
    }
}

// COPIAR
btnCopiar.addEventListener("click", () => {
    mensaje.select();
    document.execCommand('copy');    
    mensaje.value = "";
    // mostrarAlerta();
    mostrarAlerta(confirmacion, 'Texto copiado exitosamente', 'confirmacion')

});

function encriptar(stringEncriptado){    
    let matrizCodigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    // stringEncriptado = stringEncriptado.toLowerCase():
    
    for(let i=0; i < matrizCodigo.length; i++){
        if(stringEncriptado.includes(matrizCodigo[i][0])){
            stringEncriptado = stringEncriptado.replaceAll(matrizCodigo[i][0],matrizCodigo[i][1])
        }
    }

    return stringEncriptado
}

function desencriptar(stringDesencriptado){    
    let matrizCodigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    
    for(let i=0; i < matrizCodigo.length; i++){
        if(stringDesencriptado.includes(matrizCodigo[i][1])){
            stringDesencriptado = stringDesencriptado.replaceAll(matrizCodigo[i][1],matrizCodigo[i][0])
        }
    }

    return stringDesencriptado
}

function eliminaEspeciales(texto) {

    // Aqui indicamos los simbolos que queremos remover de nuestro texto
    var pattern = /[\^*@!"´#$%&/()=?¡!¿'\\]/gi;

    // Removemos los simbolos segun la regla
    texto = texto.replace(pattern, '');

    return texto
}


function mostrar_ocultar(elemento) {
    elemento.style.display = "block";

    // if (elemento.style.display === "none") {
    //     elemento.style.display = "block";
    // } else {
    //     elemento.style.display = "none";
    // }
}

function mostrarAlerta(elemento, mensaje, tipo) {
let fondo = ''
switch (tipo) {
    case 'confirmacion':
        fondo = 'green'
        break;

    case 'error':
        fondo = 'red'        
        break;

    default:
        fondo = 'white'     
        break;
}

    accion.innerHTML = ('<b>'+mensaje+'</b>')
    let colors = document.getElementsByClassName("color");
    for(let color of colors){
        color.style.backgroundColor = fondo;
    }
    
    elemento.style.visibility = 'visible';
    setTimeout(function() {
        elemento.style.visibility = 'hidden';
    }, 4000);
}


textArea.addEventListener("focus", (event) => {
  event.target.style.background = "white";
  event.target.style.opacity = 1;
});


     