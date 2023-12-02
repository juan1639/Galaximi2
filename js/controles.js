import { settings } from "./main.js";
import { comenzar_partida } from "./functions.js";

// ----------------------------------------------------------------------
//  EVENTOS Keydown
// 
// ----------------------------------------------------------------------
const eventos_keyDown = document.addEventListener('keydown', (event) => {

    //console.log(event.key);
    const keysTeclas = Object.keys(settings.tecla);
    const pulsacion = event.key;

    if (settings.estado.reJugar) {

        if (pulsacion === settings.tecla.tecla_enter[0] || pulsacion === settings.tecla.tecla_enter[1]) {
            
            location.reload();
        }

    } else if (settings.estado.preJuego) {

        if (pulsacion === settings.tecla.tecla_enter[0] || pulsacion === settings.tecla.tecla_enter[1]) {

            comenzar_partida();
        }
    
    } else if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (pulsacion === settings.tecla[idTecla][0] || pulsacion === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = true;
            }
        }

        if (pulsacion === 'T') {

            if (settings.trucos.invisible) {
                console.log('modo normal');
                settings.trucos.invisible = false;
            } else {
                console.log('modo invisible');
                settings.trucos.invisible = true;
            }
        }

        if (pulsacion === 'Y') settings.trucos.vidasInfinitas = true;
    }
});

// ----------------------------------------------------------------------
//  EVENTOS Keyup
// 
// ----------------------------------------------------------------------
const eventos_keyUp = document.addEventListener('keyup', (event) => {

    const keysTeclas = Object.keys(settings.tecla);
    const pulsacion = event.key;

    if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (pulsacion === settings.tecla[idTecla][0] || pulsacion === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = false;
            }
        }
    }
});

// ----------------------------------------------------------------------
//  EVENTOS touchstart
// 
// ----------------------------------------------------------------------
const eventos_touchStart = document.addEventListener('touchstart', (event) => {

    const keysTeclas = Object.keys(settings.tecla);
    const touch = event.target.id;
    const coordX = event.targetTouches[0].clientX;
    const coordY = event.targetTouches[0].clientY;
    console.log(event.targetTouches[0].clientX, event.targetTouches[0].clientY);

    // boton iz -->  0-85,   285-
    // boton de -->  90-180, 285-
    // boton fire -> 220- 

    if (settings.estado.reJugar) {

        if (touch === settings.tecla.touch_canvas[0]) {
            location.reload();
        }
    
    } else if (settings.estado.preJuego) {

        if (touch === settings.tecla.touch_canvas[0]) {

            comenzar_partida();
        }
    }

    if (settings.estado.enJuego) {

        if (coordY > 285) {

            if (coordX < 85) {
                settings.controles.touch_iz = true;
                
            } else if (coordX > 90 && coordX < 180) {
                settings.controles.touch_de = true;
                
            } else if (coordX > 220) {
                settings.controles.touch_at = true;
            }
        }
    }
});

// ----------------------------------------------------------------------
//  EVENTOS touchend
// 
// ----------------------------------------------------------------------
const eventos_touchEnd = document.addEventListener('touchend', (event) => {

    //console.log(event.target.id, event.targetTouches);
    const keysTeclas = Object.keys(settings.tecla);
    const touchEnd = event.target.id;
    /* const coordX = event.targetTouches[0].clientX;
    const coordY = event.targetTouches[0].clientY; */

    if (settings.estado.enJuego) {

        /* if (coordY > 285) {

            if (coordX < 85) {
                settings.controles.touch_iz = false;
                
            } else if (coordX > 90 && coordX < 180) {
                settings.controles.touch_de = false;
                
            } else if (coordX > 220) {
                settings.controles.touch_at = false;
            }
        } */

        /* if (touchEnd === settings.tecla[idTecla][0] || touchEnd === settings.tecla[idTecla][1]) {
            settings.controles[idTecla] = false;
        } */
    }
});

// ----------------------------------------------------------------------
//  EVENTOS Click
// 
// ----------------------------------------------------------------------
const eventos_click = document.addEventListener('click', (event) => {

    //console.log(event.target.id, event.targetTouches, event);
    const clickar = event.target.id;

    if (settings.estado.reJugar) {

        if (clickar === settings.tecla.touch_canvas[0]) {

            location.reload();
        }
        
    } else if (settings.estado.preJuego) {

        if (clickar === settings.tecla.touch_canvas[0]) {

            comenzar_partida();
        }
    }
});

// ----------------------------------------------------------------------------
export {
    eventos_touchStart,
    eventos_touchEnd,
    eventos_keyDown,
    eventos_keyUp,
    eventos_click
};
