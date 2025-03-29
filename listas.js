import { ColeccionEnlazada, ElementoLista } from "./listaEnlazada.js"; // Asegúrate de que la ruta sea correcta.
import { describe, expect, test } from "@jest/globals";

class Nodo {
  constructor(dato, enlace = null) {
    this.dato = dato;
    this.enlace = enlace;
  }

  toString() {
    return `${this.dato} => ${this.enlace}`;
  }

  leerDato() {
    return this.dato;
  }

  siguiente() {
    return this.enlace;
  }
}

class Lista {
  constructor() {
    this.primero = null;
  }

  // Método: invertirOrden()
  // Propósito: Invierte el orden de los elementos en la colección enlazada.
  invertirOrden() {
    let elementoAnterior = null; // Elemento anterior en la inversión
    let elementoActual = this.primerElemento; // Elemento actual en la inversión
    let elementoSiguiente = null; // Elemento siguiente en la inversión

    // Recorre la colección, invirtiendo los enlaces de los elementos
    while (elementoActual !== null) {
      elementoSiguiente = elementoActual.siguienteElemento; // Guarda el siguiente elemento
      elementoActual.siguienteElemento = elementoAnterior; // Invierte el enlace del elemento actual
      elementoAnterior = elementoActual; // Mueve 'elementoAnterior' al elemento actual
      elementoActual = elementoSiguiente; // Mueve 'elementoActual' al siguiente elemento
    }

    this.primerElemento = elementoAnterior; // El último elemento se convierte en el primero
  }

  // Método: eliminarElementosConValoresDuplicados()
  // Propósito: Elimina los elementos con valores duplicados de la colección enlazada.
  eliminarElementosConValoresDuplicados() {
    let elementoActual = this.primerElemento; // Elemento actual en la comparación

    // Recorre la colección
    while (
      elementoActual !== null &&
      elementoActual.siguienteElemento !== null
    ) {
      let elementoComparador = elementoActual; // Elemento comparador para buscar duplicados

      // Compara el elemento actual con el resto de la colección
      while (elementoComparador.siguienteElemento !== null) {
        // Si se encuentra un duplicado, elimina el elemento duplicado
        if (
          elementoActual.valor === elementoComparador.siguienteElemento.valor
        ) {
          elementoComparador.siguienteElemento =
            elementoComparador.siguienteElemento.siguienteElemento; // Salta el elemento duplicado
        } else {
          elementoComparador = elementoComparador.siguienteElemento; // Avanza el comparador
        }
      }

      elementoActual = elementoActual.siguienteElemento; // Avanza al siguiente elemento
    }
  }

  // Método: obtenerElementoDesdeElFinalPorPosicion(posicionDesdeFinal)
  // Propósito: Obtiene el elemento en la posición especificada desde el final de la colección enlazada.
  obtenerElementoDesdeElFinalPorPosicion(posicionDesdeFinal) {
    let punteroLento = this.primerElemento; // Puntero lento
    let punteroRapido = this.primerElemento; // Puntero rápido

    // Mueve el puntero rápido 'posicionDesdeFinal' posiciones adelante
    for (let i = 0; i < posicionDesdeFinal; i++) {
      if (punteroRapido === null) return null; // 'posicionDesdeFinal' es mayor que la longitud de la colección
      punteroRapido = punteroRapido.siguienteElemento;
    }

    // Mueve ambos punteros hasta que 'punteroRapido' llegue al final
    while (punteroRapido !== null) {
      punteroLento = punteroLento.siguienteElemento;
      punteroRapido = punteroRapido.siguienteElemento;
    }

    return punteroLento ? punteroLento.valor : null; // Devuelve el valor del elemento o null si n = longitud
  }

  leerPrimero() {
    return this.primero;
  }

  insertarCabezaLista(entrada) {
    const nuevo = new Nodo(entrada, this.primero);
    this.primero = nuevo;
  }

  insertarLista(anterior, entrada) {
    const nuevo = new Nodo(entrada, anterior.enlace);
    anterior.enlace = nuevo;
  }

  eliminar(entrada) {
    let actual = this.primero;
    let anterior = null;

    while (actual !== null && actual.dato !== entrada) {
      anterior = actual;
      actual = actual.enlace;
    }

    if (actual !== null) {
      if (actual === this.primero) {
        this.primero = actual.enlace;
      } else {
        anterior.enlace = actual.enlace;
      }
    }
  }

  buscarLista(destino) {
    let indice = this.primero;
    while (indice !== null) {
      if (indice.dato === destino) {
        return indice;
      }
      indice = indice.enlace;
    }
    return null;
  }

  visualizar() {
    let n = this.primero;
    const elementos = [];
    while (n !== null) {
      elementos.push(n.dato);
      n = n.enlace;
    }
    console.log(elementos.join(" "));
  }

  toString() {
    return `=> ${this.primero}`;
  }
}

const lista = new Lista();
lista.insertarCabezaLista(3);
lista.insertarCabezaLista(2);
lista.insertarCabezaLista(1);

console.log("Lista inicial:");
lista.visualizar();

const nodo2 = lista.buscarLista(2);
if (nodo2) {
  lista.insertarLista(nodo2, 5);
}

describe("ColeccionEnlazada", () => {
  test("pruebas para la funcionalidad básica de la lista", () => {
    const lista = new ColeccionEnlazada();
    lista.agregarElementoAlInicio(3);
    lista.agregarElementoAlInicio(2);
    lista.agregarElementoAlInicio(1);

    // Verifica que la lista inicial esté correcta
    expect(lista.obtenerElementoDesdeElFinalPorPosicion(2)).toBe(1);
    expect(lista.obtenerElementoDesdeElFinalPorPosicion(1)).toBe(2);
    expect(lista.obtenerElementoDesdeElFinalPorPosicion(0)).toBe(3);

    const nodo2 = lista.buscarElementoPorValor(2);
    if (nodo2) {
      lista.agregarElementoDespuesDe(nodo2, 5);
    }

    // Verifica que el 5 se haya insertado correctamente después del 2
    expect(lista.obtenerElementoDesdeElFinalPorPosicion(1)).toBe(5);

    lista.removerElementoPorValor(5);

    // Verifica que el 5 se haya eliminado
    expect(lista.buscarElementoPorValor(5)).toBeNull();

    lista.removerElementoPorValor(1);

    // Verifica que la cabeza (1) se haya eliminado
    expect(lista.obtenerElementoDesdeElFinalPorPosicion(1)).toBe(3);
    expect(lista.obtenerElementoDesdeElFinalPorPosicion(0)).toBe(2);
  });

  // prueba para representacion de toString();
  test("prueba para toString", () => {
    const lista = new ColeccionEnlazada();
    lista.agregarElementoAlInicio(3);
    lista.agregarElementoAlInicio(2);
    lista.agregarElementoAlInicio(1);
    expect(lista.obtenerRepresentacionColeccion()).toBe(
      "=> ElementoLista { valor: 1, siguienteElemento: ElementoLista { valor: 2, siguienteElemento: ElementoLista { valor: 3, siguienteElemento: null } } }"
    );
  });
});
