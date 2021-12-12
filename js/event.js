// GONZALO DE LA TORRE MARTÍNEZ


//-----------------DESPLEGAR PANEL comments------------------------------
var buttonDisplay = document.getElementById("button_com");

function mostrarcomments(){
	document.getElementById("panel_com").classList.toggle("no_activo");
};

buttonDisplay.addEventListener("click", mostrarcomments);

//----------------Send COEMNTARIO NUEVO-----------------------------------

var buttonSend = document.getElementById("Send");


//FUNCION PARA CALCULAR FECHA ACTUAL
function calculaFecha(){
	var dia, mes, anio, hora, min;

	var date = new Date();

	dia = date.getDate();
	if(dia < 10) dia = "0" + dia;

	mes = date.getMonth() +1;
	if(mes < 10) mes = "0" + mes;
	
	anio = date.getFullYear();

	hora = date.getHours();
	if(hora < 10) hora = "0" + hora;

	min = date.getMinutes();
	if(min < 10) min = "0" + min;

	return (dia + "/" + mes + "/" + anio + "  " + hora + ":" + min);
}

function anadircomment() {

	// Coge el nombre
	var nombre = document.getElementById("nombre").value;

	//El nombre debe tener al menos 2 caracteres
	if(nombre.length > 1){

		// Coge el email
		var email = document.getElementById("email").value;

		// El e-mail debe ser válido
		if(pruebaEmail(email)){

			 // Coge el texto
			var texto = document.getElementById("texto").value;

			// Si el texto tiene más de 240 caracteres abortamos la función,
			// para no haya demasiado texto en los comments
			// Debe tener al menos 10 caracteres
			if(texto.length <= 240 && texto.length > 9){

				var fechaN = calculaFecha();

				document.getElementById("nombreN").innerHTML = nombre;
				document.getElementById("fechaN").innerHTML = fechaN;
				document.getElementById("textoN").innerHTML = '"' + texto + '"';

				//MOSTRAR  NUEVO comment
				document.getElementById("nuevo_com").classList.remove("no_activo");

			}else alert('Text must have at least 240 characters');

		}else alert('Invalid e-mail');

	}else alert('Name can not be empty');

};

// FUNCION QUE COMPRUEBA EL email (mediante expresión regular)
function pruebaEmail (email){
	var valido = false;

	re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

	if(re.exec(email)){
		valido = true;
	}

	return valido;
};

buttonSend.addEventListener("click", anadircomment);

//FILTRO DE PALABRAS PROHIBIDAS

var areaTexto = document.getElementById("texto");

function filtro(){  

	//lista palabras prohibidas
	var prohibidas = ["coronavirus", "dumb", "asshole"];

    var content = document.getElementById("texto").value;

    // Hago una copia de la cadena para asegurarme que esta escrita en
    // minúscula y así comparar con el array
    var content_lower = content.toLowerCase();
    console.log(content_lower);

    var posicion, longitud;
    for(var i=0; i<prohibidas.length; i++){
    	//devuelve la posición donde empieza la palabra prohibida

    	posicion = content_lower.indexOf(prohibidas[i]);

    	if(posicion > -1){
    		longitud = prohibidas[i].length;

    		for(var j=0; j<longitud-1; j++){
    			
    			content = content.substring(0, posicion+j+1) 
    			            + "*" + content.substring(posicion+j+2);
    		}
    	}
    }
    document.getElementById("texto").value = content;
}

areaTexto.addEventListener("keyup", filtro);