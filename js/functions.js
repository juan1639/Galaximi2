import { settings } from "./main.js";
import { Disparo } from './disparo.js';
import { Enemigo } from "./enemigo.js";

// ============================================================================
//  Funciones varias
// 
// ============================================================================
function checkColision(obj1, obj2, corr, dy) {
    
    return obj1.rect.x + corr.obj1_hor < obj2.rect.x + obj2.rect.ancho - corr.obj2_hor && 
            obj1.rect.x + obj1.rect.ancho - corr.obj1_hor > obj2.rect.x + corr.obj2_hor &&
            obj1.rect.y + corr.obj1_ver < obj2.rect.y + dy + obj2.rect.alto - corr.obj2_ver && 
            obj1.rect.y + obj1.rect.alto - corr.obj1_ver > obj2.rect.y + dy + corr.obj2_ver;
}

// ============================================================================
function inicializa_disparo(nave) {

    const args = [
        nave.rect.x + Math.floor(nave.rect.ancho / 2),
        nave.rect.y - Math.floor(nave.rect.alto / 2.7)
    ];

    settings.objeto.disparo.push(new Disparo(args));
}

// ============================================================================
function reset_formacion() {

    const nivelSuperado = settings.objeto.enemigo.every(enemy => !enemy.activo);

    if (nivelSuperado) Enemigo.resetFormacion = true;

    // --------------------------------------------------
    if (Enemigo.resetFormacion) {

        Enemigo.resetFormacion = false;
        settings.marcadores.nivel ++;
        settings.objeto.enemigo = [];
        playSonidosLoop(settings.sonidos.eatingGhost, false, settings.volumen.eatingGhost);

        const nuevo_nro_enemigos = settings.constante.nro_enemigos_inicial + settings.marcadores.nivel;
        let xIni = -50;

        if (Math.floor(Math.random()* 99) < 50) xIni = Math.floor(settings.canvas.width / settings.escala.x);

        const args = [xIni, 0, settings.constante.ssheet];
        
        for (let i = 0; i < nuevo_nro_enemigos; i ++) {
            settings.objeto.enemigo.push(new Enemigo(args, i));
        }

        console.log(settings.objeto.enemigo.length);

        settings.estado.nivelSuperado = true;

        setTimeout(() => {
            settings.estado.nivelSuperado = false;
        }, settings.constante.pausaNivelSuperado);
    }
}

// ============================================================================
function check_gameOver() {
    return;
}

// ============================================================================
function reescalaCanvas() {
    return;
}

// ----------------------------------------------------------------------------
function borraCanvas() {
    // canvas.width = canvas.width;
    // canvas.height = canvas.height;
    settings.ctx.fillStyle = settings.colores.fondo;
    settings.ctx.fillRect(0, 0, settings.canvas.width, settings.canvas.height);
}

// ----------------------------------------------------------------------------
function playSonidosLoop(sonido, loop, volumen) {
    sonido.play();
    sonido.loop = loop;
    sonido.volume = volumen;
}

export {
    checkColision,
    inicializa_disparo,
    reset_formacion,
    check_gameOver,
    borraCanvas,
    playSonidosLoop
};
