// ============================================================================
//  G A L A X I M I   ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
import { Settings } from './settings.js';
import { Scroll } from './scroll.js';
import { Jugador } from './jugador.js';
import { Disparo } from './disparo.js';
import { Enemigo } from './enemigo.js';
import { Textos } from './textos.js';
import { Vidas } from './vidas.js';

// ----------------------------------------------------------------------------
import {
    check_vidaExtra,
    reset_formacion,
    borraCanvas,
    check_gameOver,
} from "./functions.js";

// ----------------------------------------------------------------------------
import { 
    eventos_touchStart,
    eventos_touchEnd,
    eventos_keyDown,
    eventos_keyUp,
    eventos_click
} from "./controles.js";

// ----------------------------------------------------------------------------
const escalas_validas = [1, 2, 3, 4];
let escalaSel = 1;
let settings;
let dxdy = [0, 0];

// ===========================================================================
//  Funcion Inicializadora
// 
// ---------------------------------------------------------------------------
window.onload = () => {

    settings = new Settings(escalaSel);

    settings.ctx.scale(settings.escala.x, settings.escala.y);
    console.log(settings.canvas.width, settings.canvas.height);

    comenzar_instancias();
}

// ===========================================================================
//  Instancias
// ---------------------------------------------------------------------------
function comenzar_instancias() {

    settings.objeto.scroll = new Scroll(settings.argumentos.scroll);

    settings.objeto.jugador = new Jugador(settings.argumentos.jugador);
    settings.objeto.disparo.push(new Disparo(settings.argumentos.disparo));

    for (let i = 0; i < settings.constante.nro_enemigos_inicial; i ++) {
        settings.objeto.enemigo.push(new Enemigo(settings.argumentos.enemigo, i));
    }

    for (let i = 0; i < Textos.array_textos.length; i ++) {
        const args = Textos.array_textos[i];
        settings.objeto.texto.push(new Textos(args));
    }

    for (let i = 0; i < settings.marcadores.vidas; i ++) {
        settings.objeto.showvidas.push(new Vidas(settings.argumentos.showvidas, i));
    }

    // ---------------------------------------------------------------
    setInterval(() => {
        bucle_principal();
    }, 1000 / settings.constante.FPS);
}

// ===================================================================
function bucle_principal() {

    borraCanvas();

    const keyObjs = Object.keys(settings.objeto);

    for (let objeto of keyObjs) {

        if (objeto === 'jugador' || objeto === 'scroll' || objeto === 'naveexplota') {
            if (settings.objeto[objeto]) settings.objeto[objeto].dibuja();

        } else if (objeto === 'explosion') {
            //settings.objeto[objeto].dibuja();

        } else {
            for (let arg of settings.objeto[objeto]) {
                arg.dibuja();
            }
        }
    }

    check_vidaExtra();
    reset_formacion();
    check_gameOver();
}

export { settings };
