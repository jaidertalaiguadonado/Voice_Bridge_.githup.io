
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transcripción</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div id="title-container">
            <h1>Listo para transcribir</h1>
        </div>
        <div class="microphone">
            <div id="mic-animation">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>
    <main>
        <div id="transcript-container" contenteditable="true"></div>
        <div class="panel-ajustes" id="panelAjustes">
            <h2>Ajustes de Transcripción</h2>
            <div class="ajuste-seccion">
                <label for="tamanoTexto">Tamaño del texto</label>
                <div class="control-slider">
                    <span>A</span>
                    <input type="range" id="tamanoTexto" name="tamanoTexto" min="10" max="24" value="16">
                    <span>A</span>
                </div>
            </div>
            <div class="ajuste-seccion">
                <label for="historialTranscripciones">Historial de transcripciones</label>
                <div class="control-switch">
                    <span class="descripcion">Se guardará durante 3 días</span>
                    <label class="switch">
                        <input type="checkbox" id="historialTranscripciones" name="historialTranscripciones" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="ajuste-seccion">
                <label for="notificacionesSonidos">Abrir Notificaciones de sonidos</label>
                <span class="descripcion">Recibe notificaciones sobre sonidos importantes</span>
                <button class="boton-opcion">Abrir</button>
            </div>
            <div class="ajuste-seccion">
                <button id="cerrarAjustesBtn" class="boton-cerrar">Cerrar</button>
            </div>
        </div>
        <div class="panel-historial" id="panelHistorial">
            <h2>Historial de Transcripciones</h2>
            <div id="historial-contenido">
            </div>
            <button id="cerrarHistorialBtn" class="boton-cerrar">Cerrar Historial</button>
        </div>
        <div class="panel-idioma" id="panelIdioma">
            <h2>Seleccionar Idioma</h2>
            <button class="idioma-opcion" data-lang="es-MX">Español (México)</button>
            <button class="idioma-opcion" data-lang="en-US">Inglés (Estados Unidos)</button>
            <button class="idioma-opcion" data-lang="fr-FR">Francés (Francia)</button>
            <button id="cerrarIdiomaBtn" class="boton-cerrar">Cerrar</button>
        </div>
    </main>
    <div class="panel-entrada-texto" id="panelEntradaTexto">
        <h2>Escribir Texto</h2>
        <textarea id="texto-entrada" placeholder="Escribe aquí..."></textarea>
        <div class="panel-entrada-botones">
            <button id="botonSonido" class="icono-boton">🔊</button>
            <button id="botonBorrar" class="icono-boton">🗑️</button>
            <button id="cerrarEntradaTextoBtn" class="boton-cerrar">Cerrar</button>
        </div>
    </div>
    <footer>
        <div class="footer">
            <button class="icon" id="abrirAjustesBtn">⚙️</button>
            <button class="icon" id="abrirHistorialBtn">📜</button>
            <button class="icon" id="abrirTecladoBtn">⌨️</button>
            <button class="idioma-btn" id="cambiarIdiomaBtn">español (México)</button>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>
