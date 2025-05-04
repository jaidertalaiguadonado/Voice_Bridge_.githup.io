document.addEventListener('DOMContentLoaded', () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const synth = window.speechSynthesis; 

    if (SpeechRecognition && synth) {
        let recognition = new SpeechRecognition();
        recognition.lang = 'es-MX'; 
        recognition.interimResults = true;
        recognition.continuous = true;

        const titleContainer = document.getElementById('title-container');
        const transcriptContainer = document.getElementById('transcript-container');
        const microphoneElement = document.querySelector('.microphone span');
        const abrirAjustesBtn = document.getElementById('abrirAjustesBtn');
        const panelAjustes = document.getElementById('panelAjustes');
        const cerrarAjustesBtn = document.getElementById('cerrarAjustesBtn');
        const tamanoTextoSlider = document.getElementById('tamanoTexto');
        const abrirHistorialBtn = document.getElementById('abrirHistorialBtn');
        const panelHistorial = document.getElementById('panelHistorial');
        const cerrarHistorialBtn = document.getElementById('cerrarHistorialBtn');
        const historialCheckbox = document.getElementById('historialTranscripciones');
        const historialContenido = document.getElementById('historial-contenido');
        const cambiarIdiomaBtn = document.getElementById('cambiarIdiomaBtn');
        const panelIdioma = document.getElementById('panelIdioma');
        const cerrarIdiomaBtn = document.getElementById('cerrarIdiomaBtn');
        const abrirTecladoBtn = document.getElementById('abrirTecladoBtn'); 
        const panelEntradaTexto = document.getElementById('panelEntradaTexto');
        const cerrarEntradaTextoBtn = document.getElementById('cerrarEntradaTextoBtn');
        const botonSonido = document.getElementById('botonSonido'); 
        const botonBorrar = document.getElementById('botonBorrar'); 
        const textoEntrada = document.getElementById('texto-entrada'); 
        const idiomaOpciones = document.querySelectorAll('.idioma-opcion');

        let contenidoFinal = '';
        let historialTranscripciones = [];
        let speaking = false; 

        const actualizarIdiomaBoton = (langCode) => {
            switch (langCode) {
                case 'es-MX':
                    cambiarIdiomaBtn.textContent = 'español (México)';
                    break;
                case 'en-US':
                    cambiarIdiomaBtn.textContent = 'inglés (Estados Unidos)';
                    break;
                case 'fr-FR':
                    cambiarIdiomaBtn.textContent = 'francés (Francia)';
                    break;
                default:
                    cambiarIdiomaBtn.textContent = 'Idioma';
            }
        };

        const reiniciarReconocimiento = (newLang) => {
            console.log('Reiniciando reconocimiento con idioma:', newLang);
            recognition.stop();

            recognition = new SpeechRecognition();
            recognition.lang = newLang;
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onstart = () => {
                console.log('Nuevo reconocimiento iniciado.');
                if (titleContainer) {
                    titleContainer.style.display = 'none';
                }
                if (microphoneElement) {
                    microphoneElement.textContent = '';
                }
            };

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let nuevaFinalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        nuevaFinalTranscript += event.results[i][0].transcript + ' ';
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                if (historialCheckbox.checked && nuevaFinalTranscript.trim()) {
                    historialTranscripciones.push(nuevaFinalTranscript.trim());
                    console.log('Historial actualizado:', historialTranscripciones);
                }

                contenidoFinal += nuevaFinalTranscript;

                if (transcriptContainer) {
                    transcriptContainer.textContent = contenidoFinal + interimTranscript;
                }

                if (nuevaFinalTranscript) {
                    console.log('onresult (final - nuevo reconocimiento):', nuevaFinalTranscript.trim());
                }
                if (interimTranscript) {
                    console.log('onresult (interim - nuevo reconocimiento):', interimTranscript);
                }
            };

            recognition.onerror = (event) => {
                console.error('Error en el nuevo reconocimiento:', event.error);
                if (transcriptContainer) {
                    transcriptContainer.textContent = 'Error al reconocer el habla.';
                }
                if (microphoneElement) {
                    microphoneElement.textContent = 'Error';
                }
            };

            recognition.onend = () => {
                console.log('Nuevo reconocimiento finalizado. Reiniciando...');
                recognition.start();
                if (microphoneElement) {
                    microphoneElement.textContent = '';
                }
            };

            recognition.start();
            actualizarIdiomaBoton(newLang);
            contenidoFinal = '';
            if (transcriptContainer) {
                transcriptContainer.textContent = '';
            }
        };

        recognition.onstart = () => {
            console.log('onstart: Voice recognition started.');
            if (titleContainer) {
                titleContainer.style.display = 'none';
            }
            if (microphoneElement) {
                microphoneElement.textContent = '';
            }
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let nuevaFinalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    nuevaFinalTranscript += event.results[i][0].transcript + ' ';
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            if (historialCheckbox.checked && nuevaFinalTranscript.trim()) {
                historialTranscripciones.push(nuevaFinalTranscript.trim());
                console.log('Historial actualizado:', historialTranscripciones);
            }

            contenidoFinal += nuevaFinalTranscript;

            if (transcriptContainer) {
                transcriptContainer.textContent = contenidoFinal + interimTranscript;
            }

            if (nuevaFinalTranscript) {
                console.log('onresult (final):', nuevaFinalTranscript.trim());
            }
            if (interimTranscript) {
                console.log('onresult (interim):', interimTranscript);
            }
        };

        recognition.onerror = (event) => {
            console.error('onerror: Speech recognition error:', event.error);
            if (transcriptContainer) {
                transcriptContainer.textContent = 'Error al reconocer el habla.';
            }
            if (microphoneElement) {
                microphoneElement.textContent = 'Error';
            }
        };

        recognition.onend = () => {
            console.log('onend: Voice recognition ended. Restarting...');
            recognition.start();
            if (microphoneElement) {
                microphoneElement.textContent = '';
            }
        };

        if (abrirAjustesBtn && panelAjustes && cerrarAjustesBtn) {
            abrirAjustesBtn.addEventListener('click', () => {
                panelAjustes.style.display = 'block';
            });

            cerrarAjustesBtn.addEventListener('click', () => {
                panelAjustes.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === panelAjustes) {
                    panelAjustes.style.display = 'none';
                }
            });
        }

        if (abrirHistorialBtn && panelHistorial && cerrarHistorialBtn && historialContenido && historialCheckbox) {
            abrirHistorialBtn.addEventListener('click', () => {
                panelHistorial.style.display = 'block';
                historialContenido.textContent = historialTranscripciones.join('\n');
            });

            cerrarHistorialBtn.addEventListener('click', () => {
                panelHistorial.style.display = 'none';
            });
        }

        if (tamanoTextoSlider && transcriptContainer) {
            tamanoTextoSlider.addEventListener('input', () => {
                const nuevoTamano = tamanoTextoSlider.value + 'px';
                transcriptContainer.style.fontSize = nuevoTamano;
                console.log('Tamaño del texto cambiado a:', nuevoTamano);
            });
        }

        if (cambiarIdiomaBtn && panelIdioma && cerrarIdiomaBtn && idiomaOpciones) {
            cambiarIdiomaBtn.addEventListener('click', () => {
                panelIdioma.style.display = 'block';
            });

            cerrarIdiomaBtn.addEventListener('click', () => {
                panelIdioma.style.display = 'none';
            });

            idiomaOpciones.forEach(opcion => {
                opcion.addEventListener('click', () => {
                    const nuevoIdioma = opcion.getAttribute('data-lang');
                    reiniciarReconocimiento(nuevoIdioma);
                    panelIdioma.style.display = 'none';
                });
            });
        } else {
            console.error("Uno o más elementos del panel de idioma no se encontraron.");
        }

        if (abrirTecladoBtn && transcriptContainer && panelEntradaTexto && cerrarEntradaTextoBtn && textoEntrada && recognition && botonSonido && botonBorrar) {
            abrirTecladoBtn.addEventListener('click', () => {
                recognition.stop(); 
                panelEntradaTexto.style.display = 'block';
            });

            cerrarEntradaTextoBtn.addEventListener('click', () => {
                panelEntradaTexto.style.display = 'none';
                recognition.start(); 
                if (microphoneElement) {
                    microphoneElement.textContent = 'Escuchando...';
                }
            });

            botonSonido.addEventListener('click', () => {
                const textToSpeak = textoEntrada.value;
                if (textToSpeak && !speaking) {
                    const utterance = new SpeechSynthesisUtterance(textToSpeak);
                    utterance.lang = recognition.lang; 
                    synth.speak(utterance);
                    speaking = true;
                    utterance.onend = () => {
                        speaking = false;
                    };
                    utterance.onerror = (event) => {
                        console.error('Error al hablar:', event);
                        speaking = false;
                    };
                } else if (speaking) {
                    synth.cancel();
                    speaking = false;
                }
            });

            botonBorrar.addEventListener('click', () => {
                textoEntrada.value = ''; 
            });
        }

        if (titleContainer) {
            titleContainer.style.display = 'none';
        }

        recognition.start();
        actualizarIdiomaBoton(recognition.lang); 

        console.log('Initialization: Voice recognition initialized with language:', recognition.lang);

    } else if (!synth) {
        console.log('Initialization: Web Speech API (SpeechSynthesis) not supported in this browser.');
    } else {
        console.log('Initialization: Web Speech API (SpeechRecognition) not supported in this browser.');
        const transcriptContainer = document.getElementById('transcript-container');
        if (transcriptContainer) {
            transcriptContainer.textContent = 'La transcripción de voz no es compatible con este navegador.';
        }
    }
});