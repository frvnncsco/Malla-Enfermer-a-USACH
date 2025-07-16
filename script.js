const estados = {};

const todosAprobados = (n) => Object.keys(semestres).filter(k => parseInt(k) <= n).every(k => {
  return semestres[k].every(r => {
    const nombre = typeof r === "string" ? r : r[0];
    return estados[nombre];
  });
});

const semestres = {
  1: ["Inglés I", "Química General", "Biología", "Anatomía", "Introducción a la Enfermería I", "Taller de Desarrollo Integral", "Sociología"],
  2: [["Inglés II", ["Inglés I"]], ["Bioquímica", ["Biología", "Química General"]], ["Agentes Biológicos en Salud - Enfermedad", ["Biología"]], ["Fisiología", ["Anatomía", "Biología"]], ["Introducción a la Enfermería II", ["Introducción a la Enfermería I"]], ["Histología", ["Anatomía", "Biología"]], ["Taller de Relaciones Humanas", ["Taller de Desarrollo Integral"]]],
  3: [["Inglés III", ["Inglés II"]], ["Farmacología", ["Fisiología", "Bioquímica"]], ["Fisiopatología", ["Fisiología", "Bioquímica"]], ["Procesos de Atención y Cuidados Básicos de Enfermería I", ["Introducción a la Enfermería II", "Agentes Biológicos en Salud - Enfermedad"]], ["Metodología de la Investigación I", ["Introducción a la Enfermería II"]], ["Educación para la Salud", ["Introducción a la Enfermería II"]], "Electivo I"],
  4: [["Inglés IV", ["Inglés III"]], ["Introducción a la Enfermería en Salud Mental", ["Taller de Desarrollo Integral", "Taller de Relaciones Humanas"]], ["Salud Pública", ["Introducción a la Enfermería II"]], ["Proceso de Atención y Cuidados Básicos de Enfermería II", ["Farmacología", "Educación para la Salud", "Procesos de Atención y Cuidados Básicos de Enfermería I", "Fisiopatología"]], ["Introducción a la Enfermería Comunitaria y Salud Familiar", ["Sociología", "Educación para la Salud"]], ["Administración en Enfermería", ["Procesos de Atención y Cuidados Básicos de Enfermería I"]], ["Metodología de la Investigación II", ["Metodología de la Investigación I"]], "Electivo II"],
  5: [["Gestión del Cuidado del Adulto y Adulto Mayor I", [], 4], ["Enfermería Comunitaria y Salud Familiar I", [], 4], ["Gestión en Enfermería", [], 4], ["Investigación en Enfermería I", [], 4], "Electivo III"],
  6: [["Gestión del Cuidado del Adulto y Adulto Mayor II", ["Gestión del Cuidado del Adulto y Adulto Mayor I"]], ["Enfermería Comunitaria y Salud Familiar II", ["Enfermería Comunitaria y Salud Familiar I"]], ["Gestión del Cuidado en Salud Mental", [], 4], ["Género, Cultura y Sexualidad", [], 4], ["Investigación en Enfermería II", ["Investigación en Enfermería I"]]],
  7: [["Gestión del Cuidado del Adulto y Adulto Mayor III", ["Gestión del Cuidado del Adulto y Adulto Mayor II"]], ["Enfermería Comunitaria y Salud Familiar III", ["Enfermería Comunitaria y Salud Familiar II"]], ["Gestión del Cuidado en Niños y Adolescentes I", [], 6], ["Gerencia en Enfermería", ["Gestión en Enfermería"]], ["Proyecto de Seminario de Grado", ["Investigación en Enfermería II"]]],
  8: [["Enfermería en Urgencias", ["Gestión del Cuidado del Adulto y Adulto Mayor III"]], ["Gestión del Cuidado en Niños y Adolescentes II", ["Gestión del Cuidado en Niños y Adolescentes I"]], ["Formulación de Proyectos de Gestión y Gerencia", ["Gerencia en Enfermería"]], ["Seminario de Grado", ["Proyecto de Seminario de Grado"]]],
  9 y 10: ["Internado Enfermería del Adulto", "Internado Enfermería del Niño y Adolescente", "Internado Enfermería Comunitaria"]
};

const malla = document.getElementById("malla");

function crearCaja(nombre, requisitos = [], requiereTodosHasta = null) {
  const div = document.createElement("div");
  div.className = "curso bloqueado";
  div.textContent = nombre;
  div.dataset.nombre = nombre;
  div.dataset.requisitos = JSON.stringify(requisitos);
  if (requiereTodosHasta !== null) div.dataset.requiereTodos = requiereTodosHasta;
  if (requisitos.length === 0 && requiereTodosHasta === null) div.classList.remove("bloqueado");
  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;
    if (div.classList.contains("aprobado")) {
      div.classList.remove("aprobado");
      estados[nombre] = false;
    } else {
      div.classList.add("aprobado");
      estados[nombre] = true;
    }
    actualizarEstado();
  });
  return div;
}

function actualizarEstado() {
  document.querySelectorAll(".curso").forEach(curso => {
    const nombre = curso.dataset.nombre;
    const requisitos = JSON.parse(curso.dataset.requisitos);
    const hasta = curso.dataset.requiereTodos;
    const desbloqueado = requisitos.every(req => estados[req]) && (!hasta || todosAprobados(parseInt(hasta)));
    if (desbloqueado) {
      curso.classList.remove("bloqueado");
    } else if (!curso.classList.contains("aprobado")) {
      curso.classList.add("bloqueado");
    }
  });
}

function cargarMalla() {
  Object.entries(semestres).forEach(([semestre, ramos]) => {
    const contenedor = document.createElement("div");
    const titulo = document.createElement("h2");
    titulo.textContent = semestre === "9" ? "Semestre 9 y 10" : `Semestre ${semestre}`;
    const nivel = document.createElement("div");
    nivel.className = "semestre";
    ramos.forEach(ramo => {
      if (typeof ramo === "string") {
        const caja = crearCaja(ramo);
        estados[ramo] = false;
        nivel.appendChild(caja);
      } else {
        const [nombre, requisitos, hasta] = ramo;
        const caja = crearCaja(nombre, requisitos || [], hasta);
        estados[nombre] = false;
        nivel.appendChild(caja);
      }
    });
    contenedor.appendChild(titulo);
    contenedor.appendChild(nivel);
    malla.appendChild(contenedor);
  });
}

cargarMalla();
