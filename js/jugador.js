import { settings } from "./main.js";
import { ExploEnemigo, ExploParticulas } from "./explo-enemigo.js";
import { NaveExplota } from "./nave-explota.js";
import { Enemigo } from "./enemigo.js";

import { 
    reset_showVidas,
    checkColision,
    inicializa_disparo,
    playSonidosLoop
} from "./functions.js";

// ============================================================================
export class Jugador {

    // --------------------------------------------------------
    // Args ---> x[0], y[1], img[2]
    // --------------------------------------------------------
    constructor(args) {
        
        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = args[2];

        this.corr_suma = 2;
        this.corr_resta = 1;

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: Math.floor(settings.constante.bsx),
            alto: Math.floor(settings.constante.bsy),
            clipX: this.corr_suma,
            clipY: 68 + this.corr_suma,
            clipAncho: 16 - this.corr_resta * 2,
            clipAlto: 16
        }

        this.move = {
            velX: 6,
            velY: 0,
        }

        this.revivir = {
            invisible: true,
            duracion_invisible: 3000,
            intermitente: true,
            duracion_dies: 3200
        }

        this.disparo = {
            cadencia: true,
            ms_cadencia: 210
        }

        this.correcciones_enemigos = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: 0,
            obj2_ver: 0
        }

        setInterval(() => {
            this.revivir.intermitente = this.revivir.intermitente ? this.revivir.intermitente = false : this.revivir.intermitente = true;
        }, 50);

        setTimeout(() => {
            this.revivir.invisible = false;
        }, this.revivir.duracion_invisible);

        console.log(this.rect.x, this.rect.y);
    }

    dibuja() {

        if (!settings.estado.enJuego) return;

        this.actualiza();

        if (settings.estado.jugadorDies) return;

        if (!this.revivir.invisible || (this.revivir.invisible && this.revivir.intermitente)) {
            
            this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
        }
    }

    actualiza() {

        //if (settings.estado.nivelSuperado) return;
        if (settings.estado.jugadorDies) return;

        // -----------------------------------------------
        let dx = 0;

        dx = this.leer_teclado();
        dx = this.check_limitesHorizontales(dx);

        if (!settings.trucos.invisible && !this.revivir.invisible) {
            this.check_colisionEnemigos();
            this.check_colisionAtaqueEnemigos();
        }

        this.rect.x += dx;
    }

    check_limitesHorizontales(dx) {

        const limite_dcho = Math.floor(settings.canvas.width / settings.escala.x);
        const nave_masAncho = this.rect.x + this.rect.ancho;

        if (this.rect.x + this.rect.ancho + dx > limite_dcho && dx > 0) dx = limite_dcho - nave_masAncho;
        if (this.rect.x + dx < 0 && dx < 0) dx = -this.rect.x;

        return dx;
    }

    check_colisionEnemigos() {

        for (let ene of settings.objeto.enemigo) {

            if (checkColision(ene, this, this.correcciones_enemigos, 0)) {

                ene.activo = false;
                settings.estado.jugadorDies = true;

                setTimeout(() => {
                    this.revivir_jugador();
                }, this.revivir.duracion_dies);

                playSonidosLoop(settings.sonidos.explosion, false, settings.volumen.explosion);

                let args = [ene.rect.x, ene.rect.y, './img/ssheet_galaxian.png'];
                settings.objeto.exploenemigo.push(new ExploEnemigo(args));

                for (let i = 0; i < ExploParticulas.nro_particulas; i ++) {
                    args = [ene.rect.x, ene.rect.y];
                    settings.objeto.exploenemigo.push(new ExploParticulas(args));
                }
            }
        }
    }

    check_colisionAtaqueEnemigos() {

        for (let ene of settings.objeto.ataqueenemigo) {

            if (checkColision(ene, this, this.correcciones_enemigos, 0)) {

                settings.estado.jugadorDies = true;

                setTimeout(() => {
                    this.revivir_jugador();
                }, this.revivir.duracion_dies);

                playSonidosLoop(settings.sonidos.naveExplota, false, settings.volumen.naveExplota);

                let args = [this.rect.x, this.rect.y, './img/ssheet_galaxian.png'];
                settings.objeto.naveexplota = new NaveExplota(args);

                for (let i = 0; i < ExploParticulas.nro_particulas; i ++) {
                    args = [this.rect.x, this.rect.y];
                    settings.objeto.exploenemigo.push(new ExploParticulas(args));
                }
            }
        }
    }

    leer_teclado() {

        let dx = 0;

        if (settings.controles.tecla_iz || settings.controles.touch_iz) {
            
            dx = -(this.move.velX);
            //console.log('iz');
            
        } else if (settings.controles.tecla_de || settings.controles.touch_de) {
            
            dx = this.move.velX;
            //console.log('de');
        }

        if (settings.controles.tecla_at || settings.controles.touch_at) {

            if (this.disparo.cadencia) {
                inicializa_disparo(this);
                this.disparo.cadencia = false;
                playSonidosLoop(settings.sonidos.disparoCorto, false, settings.volumen.disparoCorto);

                setTimeout(() => {
                    this.disparo.cadencia = true;
                }, this.disparo.ms_cadencia);
            }
        }

        return dx;
    }

    revivir_jugador() {

        settings.estado.jugadorDies = false;
        settings.marcadores.vidas --;

        if (settings.marcadores.vidas < 0) {

            settings.estado.gameOver = true;
            settings.estado.enJuego = false;

            setTimeout(() => {
                settings.estado.gameOver = false;
                settings.estado.reJugar = true;
            }, 6100);

            playSonidosLoop(settings.sonidos.gameOver, false, settings.volumen.gameOver);
            return;
        }

        console.log(settings.marcadores.vidas);

        reset_showVidas();
        
        Enemigo.resetFormacion = true;
        this.revivir.invisible = true;

        setTimeout(() => {
            this.revivir.invisible = false;
        }, this.revivir.duracion_invisible);
    }
}
