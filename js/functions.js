import { settings } from "./main.js";
import { Disparo } from './disparo.js';
import { Enemigo } from "./enemigo.js";
import { Banderita, Banderita10 } from "./banderita.js";
import { Vidas } from "./vidas.js";

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
        settings.objeto.ataqueenemigo = [];
        settings.objeto.exploenemigo = [];
        settings.objeto.exploparticulas = [];

        // playSonidosLoop(settings.sonidos.retroGameIntro, false, settings.volumen.retroGameIntro);
        playSonidosLoop(settings.sonidos.levelPassed, false, settings.volumen.levelPassed);

        setTimeout(() => {
            playSonidosLoop(settings.sonidos.retroGameIntro, false, settings.volumen.retroGameIntro);
        }, 1800);

        const nuevo_nro_enemigos = settings.constante.nro_enemigos_inicial + settings.marcadores.nivel * 4;
        let xIni = -50;

        if (Math.floor(Math.random()* 99) < 50) xIni = Math.floor(settings.canvas.width / settings.escala.x);

        const args = [xIni, 0, settings.constante.ssheet];
        
        for (let i = 0; i < nuevo_nro_enemigos; i ++) {
            settings.objeto.enemigo.push(new Enemigo(args, i));
        }

        console.log(settings.objeto.enemigo.length);

        agrega_banderitas(settings.marcadores.nivel);

        settings.estado.nivelSuperado = true;

        setTimeout(() => {
            settings.estado.nivelSuperado = false;
        }, settings.constante.pausaNivelSuperado);
    }
}

// ============================================================================
function agrega_banderitas(nivel) {

    if (nivel < 2) return;

    settings.objeto.banderita = [];
    let banderas = nivel - 1;
    console.log('banderas:', banderas, nivel);

    if (banderas < 10) {

        for (let i = 0; i < banderas; i ++) {
            settings.objeto.banderita.push(new Banderita(settings.argumentos.banderita, i));
        }

    } else {

        const entre10 = banderas / 10;
        const entre10Int = Math.floor(entre10);
        const banderitas10 = entre10.toString().slice(-1);
        console.log('entre10:', banderitas10, entre10.toString().length);

        if (entre10.toString().length === 1) {

            for (let i = 0; i < entre10Int; i ++) {
                settings.objeto.banderita10.push(new Banderita10(settings.argumentos.banderita, i));
            }

        } else {

            for (let i = 0; i < banderitas10; i ++) {
                settings.objeto.banderita.push(new Banderita(settings.argumentos.banderita, i));
            }
        }
    }
}

// ============================================================================
function check_vidaExtra() {

    for (let listaExtra of settings.lista_extras) {

        if (settings.marcadores.puntos >= listaExtra[0] && !listaExtra[1]) {
            listaExtra[1] = true;
            settings.marcadores.vidas ++;
            playSonidosLoop(settings.sonidos.eatingGhost, false, settings.volumen.eatingGhost);

            reset_showVidas();
        }
    }
}

// ============================================================================
function reset_showVidas() {

    settings.objeto.showvidas = [];

    for (let i = 0; i < settings.marcadores.vidas; i ++) {
        settings.objeto.showvidas.push(new Vidas(settings.argumentos.showvidas, i));
    }
}

// ============================================================================
function comenzar_partida() {

    if (settings.marcadores.puntos > 0) {

        settings.marcadores.puntos = 0;
        settings.marcadores.nivel = 0;
        settings.marcadores.vidas = 3;

        settings.objeto.jugador.revivir.invisible = true;
        setTimeout(() => {
            settings.objeto.jugador.revivir.invisible = false;
        }, settings.objeto.jugador.revivir.duracion_invisible);

        Enemigo.resetFormacion = true;
        reset_showVidas();
        settings.objeto.banderita = [];
        settings.objeto.banderita10 = [];

        console.log(settings.objeto.exploenemigo.length);
        console.log(settings.objeto.exploparticulas.length);
    }

    settings.estado.preJuego = false;
    settings.estado.reJugar = false;
    settings.estado.enJuego = true;
    settings.estado.playerStart = true;

    playSonidosLoop(settings.sonidos.introGalaxian, false, settings.volumen.introGalaxian);

    setTimeout(() => {
        settings.sonidos.introGalaxian.pause();
        settings.estado.playerStart = false;
    }, settings.constante.duracion_sonido_intro_galaxian);
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
    check_vidaExtra,
    reset_showVidas,
    reset_formacion,
    check_gameOver,
    comenzar_partida,
    borraCanvas,
    playSonidosLoop
};
