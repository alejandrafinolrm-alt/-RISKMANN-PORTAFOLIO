/* ==========================================================================
   ARCHIVO JAVASCRIPT EXTERNO: script.js
   Documento: Propuesta Ejecutiva Portafolio RiskMann PESV
   Guía: Cada línea de comando cuenta con un comentario detallando su función
         y cómo modificarla o adaptarla según tus necesidades.
   ========================================================================== */

// Espera a que todo el contenido HTML (DOM) esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {

  // ------------------------------------------------------------------------
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM (BOTONES DE LA BARRA DE HERRAMIENTAS)
  // ------------------------------------------------------------------------

  // Selecciona el botón para ir a la Página 1 mediante su ID único 'btn-page-1'
  const btnPagina1 = document.getElementById('btn-page-1');

  // Selecciona el botón para ir a la Página 2 mediante su ID único 'btn-page-2'
  const btnPagina2 = document.getElementById('btn-page-2');

  // Selecciona el botón para imprimir o exportar a PDF mediante su ID 'btn-print'
  const btnImprimir = document.getElementById('btn-print');

  // Selecciona el contenedor de la Página 2 en el documento mediante su ID 'page-2'
  const seccionPagina2 = document.getElementById('page-2');


  // ------------------------------------------------------------------------
  // 2. FUNCIÓN Y EVENTO: NAVEGAR A LA PÁGINA 1
  // ------------------------------------------------------------------------

  // Verifica que el botón de la Página 1 exista en el documento antes de asignarle el evento
  if (btnPagina1) {

    // Escucha el evento de clic del usuario sobre el botón de Página 1
    btnPagina1.addEventListener('click', function () {

      // Desplaza la ventana del navegador suavemente hasta la coordenada vertical 0 (inicio de la página)
      window.scrollTo({
        // 'top: 0' indica la posición vertical en píxeles a la que debe desplazarse (0 = arriba del todo)
        top: 0,
        // 'behavior: smooth' hace que la transición sea animada y fluida (cámbialo a 'auto' si prefieres salto instantáneo)
        behavior: 'smooth'
      });

    });

  }


  // ------------------------------------------------------------------------
  // 3. FUNCIÓN Y EVENTO: NAVEGAR A LA PÁGINA 2
  // ------------------------------------------------------------------------

  // Verifica que tanto el botón de Página 2 como la sección de la Página 2 existan
  if (btnPagina2 && seccionPagina2) {

    // Escucha el evento de clic del usuario sobre el botón de Página 2
    btnPagina2.addEventListener('click', function () {

      // Desplaza la vista del navegador de forma automática y suave directamente hasta la sección de la Página 2
      seccionPagina2.scrollIntoView({
        // 'behavior: smooth' proporciona un desplazamiento animado suave hacia la sección
        behavior: 'smooth',
        // 'block: start' alinea la parte superior de la Página 2 con la parte superior de la ventana visible
        block: 'start'
      });

    });

  }


  // ------------------------------------------------------------------------
  // 4. FUNCIÓN Y EVENTO: IMPRIMIR O GENERAR ARCHIVO PDF
  // ------------------------------------------------------------------------

  // Verifica que el botón de imprimir exista en el documento
  if (btnImprimir) {

    // Escucha el evento de clic del usuario sobre el botón de Imprimir / Guardar PDF
    btnImprimir.addEventListener('click', function () {

      // Invoca el cuadro de diálogo nativo del navegador para imprimir o seleccionar "Guardar como PDF"
      // Nota: Gracias a las reglas '@media print' de estilos.css, la barra flotante se ocultará automáticamente en el PDF.
      window.print();

    });

  }

});
