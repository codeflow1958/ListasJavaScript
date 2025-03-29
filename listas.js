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

  // Método: invertir()
  // Propósito: Invierte el orden de los nodos en la lista enlazada.
  invertir() {
    let anterior = null; // Nodo anterior en la inversión
    let actual = this.primero; // Nodo actual en la inversión
    let siguiente = null; // Nodo siguiente en la inversión

    // Recorre la lista, invirtiendo los enlaces de los nodos
    while (actual !== null) {
      siguiente = actual.enlace; // Guarda el siguiente nodo
      actual.enlace = anterior; // Invierte el enlace del nodo actual
      anterior = actual; // Mueve 'anterior' al nodo actual
      actual = siguiente; // Mueve 'actual' al siguiente nodo
    }

    this.primero = anterior; // El último nodo se convierte en el primero
  }

  // Método: eliminarDuplicados()
  // Propósito: Elimina los nodos duplicados de la lista enlazada.
  eliminarDuplicados() {
    let actual = this.primero; // Nodo actual en la comparación

    // Recorre la lista
    while (actual !== null && actual.enlace !== null) {
      let compara = actual; // Nodo comparador para buscar duplicados

      // Compara el nodo actual con el resto de la lista
      while (compara.enlace !== null) {
        // Si se encuentra un duplicado, elimina el nodo duplicado
        if (actual.dato === compara.enlace.dato) {
          compara.enlace = compara.enlace.enlace; // Salta el nodo duplicado
        } else {
          compara = compara.enlace; // Avanza el comparador
        }
      }

      actual = actual.enlace; // Avanza al siguiente nodo
    }
  }
  // Método: obtenerDesdeElFinal
  // Propósito: Obtiene el numero de elemento desde el final de la lista enlazada.
  obtenerDesdeElFinal(n) {
    let final = this.primero; // Puntero final
    let inicio = this.primero; // Puntero inicio

    // Mueve el puntero inicial  posiciones adelante
    for (let i = 0; i < n; i++) {
      if (inicio === null) return null; // 'n' es mayor que la longitud de la lista
      inicio = inicio.enla;
    }

    // Mueve ambos punteros hasta que 'inicial' llegue al final
    while (inicio !== null) {
      final = final.enlace;
      inicio = inicio.enlace;
    }

    return final ? final.dato : null; // Devuelve el dato del nodo o null si n = longitud
  }
}
