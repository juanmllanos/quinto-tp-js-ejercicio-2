const $agregarPersona = document.querySelector('#agregarPersona');
const $formulario = document.querySelector('#formulario');

const $botonAgregarPersona = document.querySelector('#botonAgregarPersona')

const $nombre = document.querySelector('#nombre');
let $edad = document.querySelector('#edad');
const $documento = document.querySelector('#numeroDocumento');
const $anioNacimiento = document.querySelector('#anioNacimiento');
const $peso = document.querySelector('#peso');
const $altura = document.querySelector('#altura');
const $sexoMasculino = document.querySelector("input[type='radio'][name='sexo']");

const $generacionJuan = document.querySelectorAll('.generacionJuan');
const $mayorMenorJuan = document.querySelectorAll('.mayorMenorJuan');
const $nombreJuan = document.querySelectorAll('.nombreJuan');
const $sexoJuan = document.querySelectorAll('.sexoJuan');
const $generoJuan = document.querySelectorAll('.generoJuan');
const $rasgoJuan = document.querySelectorAll('.rasgoJuan');
const $edadJuan = document.querySelectorAll('.edadJuan')

const $personasAgregadas = document.querySelector('.personasAgregadas');
const $personas = document.querySelectorAll('.persona')

class Persona {
	#nombre; #edad; #dni; #sexo; #peso; #altura; #anioNacimiento;

	constructor(nombre, edad, dni, sexo, peso, altura, anioNacimiento,) {
		this.#nombre = nombre;
		this.#edad = edad;
		this.#dni = dni
		this.#sexo = sexo;
		this.#peso = peso;
		this.#altura = altura;
		this.#anioNacimiento = anioNacimiento;
	};

	get nombre() {
		return this.#nombre;
	};
	get edad() {
		return this.#edad;
	}
	get dni() {
		return this.#dni;
	};
	get sexo() {
		return this.#sexo;
	};
	get peso() {
		return this.#peso;
	};
	get altura() {
		return this.#altura;
	};
	get anioNacimiento() {
		return this.#anioNacimiento;
	};

	generacion() {
		const $generacion = document.createElement('p');
		$generacion.innerText = `${calcularGeneracion(this.anioNacimiento)}`;
		return $generacion;
	};
	rasgo() {
		const $rasgo = document.createElement('p');
		$rasgo.innerText = `${calcularRasgo(this.anioNacimiento)}`;
		return $rasgo;
	};
	esMayorDeEdad() {
		const $mayorDeEdad = document.createElement('p');
		$mayorDeEdad.innerText = `${2023 - this.anioNacimiento >= 18 ? 'Mayor de edad' : 'Menor de edad'}`;
		return $mayorDeEdad;
	};
	mostrarDatos() {
		const $mostrarDatos = document.createElement('p');
		$mostrarDatos.innerText = `${this.nombre} DNI: ${this.dni} (${this.sexo}) nacio en el año ${this.anioNacimiento}, tiene ${this.edad} años pesa ${this.peso}kg y mide ${this.altura}cm.`;
		return $mostrarDatos;
	};
};

function calcularGeneracion(anio) {
	if (anio >= 1994 && anio <= 2010) {
		return 'Generacion Z';
	} else if (anio >= 1981 && anio <= 1993) {
		return 'Generacion Y';
	} else if (anio >= 1969 && anio <= 1980) {
		return 'Generacion X';
	} else if (anio >= 1949 && anio <= 1968) {
		return 'Baby Boom';
	} else if (anio >= 1930 && anio <= 1948) {
		return 'Silent Generation';
	} else {
		return 'Desconocida'
	};
};

function calcularRasgo(anio) {
	if (anio >= 1994 && anio <= 2010) {
		return 'Irreverencia';
	} else if (anio >= 1981 && anio <= 1993) {
		return 'Frustracion';
	} else if (anio >= 1969 && anio <= 1980) {
		return 'Obsesion por el exito';
	} else if (anio >= 1949 && anio <= 1968) {
		return 'Ambicion';
	} else if (anio >= 1930 && anio <= 1948) {
		return 'Austeridad';
	} else {
		return 'Desconocido'
	};
};

const listaPersonas = [];

$formulario.addEventListener('submit', (event) => {
	listaPersonas.push(new Persona($nombre.value, $edad.value, $documento.value, $sexoMasculino.checked ? 'Masculino' : 'Femenino', $peso.value, $altura.value, Number($anioNacimiento.value.split('-')[0])));
	$formulario.reset();
	borraDeLaLista();
	mostrarPersonas(listaPersonas);
	$formulario.className = `d-none`
	event.preventDefault();
});

$botonAgregarPersona.onclick = function () {
	$formulario.className = `container mx-auto px-5`
}

const juan = new Persona('Juan Manuel', 31, 35707402, 'Masculino', 90, 178, 1991);

function borraDeLaLista() {
	const personasABorrar = document.querySelectorAll('.persona');

	if ($personasAgregadas.children.length) {
		personasABorrar.forEach(personita => personita.remove())
	};
}

function mostrarPersonas(arreglo) {
	borraDeLaLista();

	for (let i = 0; i < arreglo.length; i++) {
		const contenedorPersona = document.createElement('div');
		contenedorPersona.classList = `d-flex justify-content-between px-4 my-2`

		const nuevaPersona = document.createElement('p');
		nuevaPersona.innerHTML = `${(arreglo[i].nombre)}`;
		nuevaPersona.className = `persona col-3`;

		const botonMayorDeEdad = document.createElement('button');
		botonMayorDeEdad.innerHTML = `Edad?`;
		botonMayorDeEdad.className = `persona btn btn-info mx-auto col-4 col-md-3 col-lg-2`;
		botonMayorDeEdad.onclick = function () {
			alert(`${arreglo[i].nombre} es ${arreglo[i].esMayorDeEdad().innerHTML}`);
		};
		const botongeneracion = document.createElement('button');
		botongeneracion.innerHTML = `Generacion`;
		botongeneracion.className = `persona btn btn-info col-4 col-md-3 col-lg-2`;
		botongeneracion.onclick = function () {
			alert(`La generacion de ${arreglo[i].nombre} es "${arreglo[i].generacion().innerHTML}"`);
		};
		
		contenedorPersona.appendChild(nuevaPersona);
		contenedorPersona.appendChild(botonMayorDeEdad);
		contenedorPersona.appendChild(botongeneracion);
		$personasAgregadas.appendChild(contenedorPersona);
	};
};

$nombreJuan.forEach(elemento => elemento.innerHTML = `${juan.nombre}`);
$edadJuan.forEach(elemento => elemento.innerHTML = `${juan.edad}`);
$sexoJuan.forEach(elemento => elemento.innerHTML = `${juan.sexo}`);
$generacionJuan.forEach(elemento => elemento.innerHTML = `${juan.generacion().innerHTML}`);
$rasgoJuan.forEach(elemento => elemento.innerHTML = `${juan.rasgo().innerHTML}`);
$mayorMenorJuan.forEach(elemento => elemento.innerHTML = `${juan.esMayorDeEdad().innerHTML}`);