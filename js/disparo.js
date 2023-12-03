import { settings } from "./main.js";
import { Enemigo } from "./enemigo.js";
import { checkColision, playSonidosLoop } from "./functions.js";
import { ExploEnemigo, ExploParticulas } from "./explo-enemigo.js";

// ============================================================================
export class Disparo {

    constructor(args) {

        this.ctx = settings.ctx;

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: 1,
            alto: Math.floor(settings.constante.bsy)
        }

        this.move = {
            arriba: [true, 0, -7]
        }

        // --------------------------------------------------------------------------
        // Correcciones en las colisiones
        // (Poniendo los 4 atributos = 0 ... sería una colision estricta rectangular)
        // --------------------------------------------------------------------------
        this.correcciones = {
            obj1_hor: 0,
            obj1_ver: 0,
            obj2_hor: 0,
            obj2_ver: 0
        }

        this.activo = true;
    }

    dibuja() {

        if (!settings.estado.enJuego) return;

        this.actualiza();

        if (!this.activo) return;

        this.ctx.save();

        this.ctx.shadowColor = 'white';
        this.ctx.shadowBlur = 12;

        this.ctx.fillStyle = 'lightyellow';
        this.ctx.fillRect(this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

        this.ctx.restore();
    }

    actualiza() {

        this.check_colisionEnemigos();
        
        if (this.move.arriba[0]) this.rect.y += this.move.arriba[2];
        
        if (this.rect.y <= -this.rect.alto) settings.objeto.disparo.shift();
    }

    check_colisionEnemigos() {

        for (let ene of settings.objeto.enemigo) {

            if (checkColision(ene, this, this.correcciones, 0) && ene.activo && this.activo) {

                ene.activo = false;
                this.activo = false;
                settings.marcadores.puntos += Enemigo.suma_puntos + (Math.floor(Math.random()* 5) * 10);

                playSonidosLoop(settings.sonidos.explosion, false, settings.volumen.explosion);

                let args = [ene.rect.x, ene.rect.y, './img/ssheet_galaxian.png'];
                settings.objeto.exploenemigo.push(new ExploEnemigo(args));

                for (let i = 0; i < ExploParticulas.nro_particulas; i ++) {
                    args = [ene.rect.x, ene.rect.y];
                    settings.objeto.exploparticulas.push(new ExploParticulas(args));
                }
                
            }
        }
    }
}
