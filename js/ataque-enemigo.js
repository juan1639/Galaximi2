import { settings } from "./main.js";

// ============================================================================
export class AtaqueEnemigo {

    constructor(args) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = args[2];

        this.detras = args[3];

        const anchoEsc = Math.floor(settings.constante.bsx / 2);
        const altoEsc = Math.floor(settings.constante.bsy);

        this.corr_resta = 1;

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: 0,
            clipY: 0,
            clipAncho: 8,
            clipAlto: 18
        }

        this.move = {
            x: 0,
            y: 5
        }

        this.animacion = {
            anima: false,
            vel_anima: 120
        }

        this.activo = true;

        setInterval(() => {
            if (this.animacion.anima) {
                this.animacion.anima = false;
            } else {
                this.animacion.anima = true;
            }
        }, this.animacion.vel_anima);
    }

    dibuja() {

        if (!settings.estado.enJuego) return;
        if (!this.activo) return;

        // ----------------------------------------------------------
        this.actualiza();

        let clipX = 0;
        if (this.animacion.anima) {clipX = 0;} else {clipX = 8;}

        this.ctx.drawImage(this.img, clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }

    actualiza() {

        this.rect.y += this.move.y;

        if (this.rect.y > Math.floor(settings.canvas.height / settings.escala.y)) {
            this.activo = false;
            settings.objeto.enemigo[this.detras].atacando = false;
        }
    }
}
