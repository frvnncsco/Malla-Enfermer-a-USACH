const semestres = {
  1: ["INGLÉS I", "QUÍMICA GENERAL", "BIOLOGÍA", "ANATOMÍA", "INTRODUCCIÓN A LA ENFERMERÍA I", "TALLER DE DESARROLLO INTEGRAL", "SOCIOLOGÍA"],
  2: [
    ["INGLÉS II", ["INGLÉS I"]],
    ["BIOQUÍMICA", ["BIOLOGÍA", "QUÍMICA GENERAL"]],
    ["AGENTES BIOLÓGICOS EN SALUD – ENFERMEDAD", ["BIOLOGÍA"]],
    ["FISIOLOGÍA", ["ANATOMÍA", "BIOLOGÍA"]],
    ["INTRODUCCIÓN A LA ENFERMERÍA II", ["INTRODUCCIÓN A LA ENFERMERÍA I"]],
    ["HISTOLOGÍA", ["ANATOMÍA", "BIOLOGÍA"]],
    ["TALLER DE RELACIONES HUMANAS", ["TALLER DE DESARROLLO INTEGRAL"]]
  ],
  3: [
    ["INGLÉS III", ["INGLÉS II"]],
    ["FARMACOLOGÍA", ["FISIOLOGÍA", "BIOQUÍMICA"]],
    ["FISIOPATOLOGÍA", ["FISIOLOGÍA", "BIOQUÍMICA"]],
    ["PROCESOS DE ATENCIÓN Y CUIDADOS BÁSICOS DE ENFERMERÍA I", ["INTRODUCCIÓN A LA ENFERMERÍA II", "AGENTES BIOLÓGICOS EN SALUD – ENFERMEDAD"]],
    ["METODOLOGÍA DE LA INVESTIGACIÓN I", ["INTRODUCCIÓN A LA ENFERMERÍA II"]],
    ["EDUCACIÓN PARA LA SALUD", ["INTRODUCCIÓN A LA ENFERMERÍA II"]],
    "ELECTIVO I"
  ],
  4: [
    ["INGLÉS IV", ["INGLÉS III"]],
    ["INTRODUCCIÓN A LA ENFERMERÍA EN SALUD MENTAL", ["TALLER DE DESARROLLO INTEGRAL", "TALLER DE RELACIONES HUMANAS"]],
    ["SALUD PÚBLICA", ["INTRODUCCIÓN A LA ENFERMERÍA II"]],
    ["PROCESO DE ATENCIÓN Y CUIDADOS BÁSICOS DE ENFERMERÍA II", ["FARMACOLOGÍA", "EDUCACIÓN PARA LA SALUD", "PROCESOS DE ATENCIÓN Y CUIDADOS BÁSICOS DE ENFERMERÍA I", "FISIOPATOLOGÍA"]],
    ["INTRODUCCIÓN A LA ENFERMERÍA COMUNITARIA Y SALUD FAMILIAR", ["SOCIOLOGÍA", "EDUCACIÓN PARA LA SALUD"]],
    ["ADMINISTRACIÓN EN ENFERMERÍA", ["PROCESOS DE ATENCIÓN Y CUIDADOS BÁSICOS DE ENFERMERÍA I"]],
    ["METODOLOGÍA DE LA INVESTIGACIÓN II", ["METODOLOGÍA DE LA INVESTIGACIÓN I"]],
    "ELECTIVO II"
  ],
  5: [
    ["GESTIÓN DEL CUIDADO DEL ADULTO Y ADULTO MAYOR I", ["SEMESTRE 1", "SEMESTRE 2", "SEMESTRE 3", "SEMESTRE 4"]],
    ["ENFERMERÍA COMUNITARIA Y SALUD FAMILIAR I", ["SEMESTRE 1", "SEMESTRE 2", "SEMESTRE 3", "SEMESTRE 4"]],
    ["GESTIÓN EN ENFERMERÍA", ["SEMESTRE 1", "SEMESTRE 2", "SEMESTRE 3", "SEMESTRE 4"]],
    ["INVESTIGACIÓN EN ENFERMERÍA I", ["SEMESTRE 1", "SEMESTRE 2", "SEMESTRE 3", "SEMESTRE 4"]],
    "ELECTIVO III"
  ],
  6: [
    ["GESTIÓN DEL CUIDADO DEL ADULTO Y ADULTO MAYOR II", ["GESTIÓN DEL CUIDADO DEL ADULTO Y ADULTO MAYOR I"]],
    ["ENFERMERÍA COMUNITARIA Y SALUD FAMILIAR II", ["ENFERMERÍA COMUNITARIA Y SALUD FAMILIAR I"]],
    ["GESTIÓN DEL CUIDADO EN SALUD MENTAL", ["SEMESTRE 1", "SEMESTRE 2", "SEMESTRE 3", "SEMESTRE 4"]],
    ["GENERO, CULTURA Y SEXUALIDAD", ["SEMESTRE 1", "SEMESTRE 2", "SEMESTRE 3", "SEMESTRE 4"]],
    ["INVESTIGACIÓN EN ENFERMERÍA II", ["INVESTIGACIÓN EN ENFERMERÍA I"]]
  ],
  7: [
    ["GESTIÓN DEL CUIDADO DEL ADULTO Y ADULTO MAYOR III", ["GESTIÓN DEL CUIDADO DEL ADULTO Y ADULTO MAYOR II"]],
    ["ENFERMERÍA COMUNITARIA Y SALUD FAMILIAR III", ["ENFERMERÍA COMUNITARIA Y SALUD FAMILIAR II"]],
    ["GESTIÓN DEL CUIDADO EN NIÑOS Y ADOLESCENTES I", ["SEMESTRE 5", "SEMESTRE 6"]],
    ["GERENCIA EN ENFERMERÍA", ["GESTIÓN EN ENFERMERÍA"]],
    ["PROYECTO DE SEMINARIO DE GRADO", ["INVESTIGACIÓN EN ENFERMERÍA II"]]
  ],
  8: [
    ["ENFERMERÍA EN URGENCIAS", ["GESTIÓN DEL CUIDADO DEL ADULTO Y ADULTO MAYOR III"]],
    ["GESTIÓN DEL CUIDADO EN NIÑOS Y ADOLESCENTES II", ["GESTIÓN DEL CUIDADO EN NIÑOS Y ADOLESCENTES I"]],
    ["FORMULACIÓN DE PROYECTOS DE GESTIÓN Y GERENCIA", ["GERENCIA EN ENFERMERÍA"]],
    ["SEMINARIO DE GRADO", ["PROYECTO DE SEMINARIO DE GRADO"]]
  ],
  9: ["INTERNADO ENFERMERÍA DEL ADULTO", "INTERNADO ENFERMERÍA DEL NIÑO Y ADOLESCENTE", "INTERNADO ENFERMERÍA COMUNITARIA"],
  10: []
};

const malla = document.getElementById("malla");
const estados = {};

function crearCaja(nombre, requisitos = []) {
  const div = document.createElement("div");
  div.className = "curso bloqueado";
  div.textContent = nombre;
  div.dataset.nombre = nombre;
  div.dataset.requisitos = JSON.stringify(requisitos);

  if (requisitos.length === 0) div.classList.remove("bloqueado");

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

    const desbloqueado = requisitos.every(req => estados[req]);
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
    titulo.textContent = `Semestre ${semestre}`;
    const nivel = document.createElement("div");
    nivel.className = "semestre";

    ramos.forEach(ramo => {
      if (typeof ramo === "string") {
        const caja = crearCaja(ramo);
        estados[ramo] = false;
        nivel.appendChild(caja);
      } else {
        const [nombre, requisitos] = ramo;
        const caja = crearCaja(nombre, requisitos);
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
