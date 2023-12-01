import { settings } from "./main.js";

// ============================================================================
export class ExploEnemigo {

    constructor(args) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = args[2];

        const anchoEsc = settings.constante.bsx * 1.5;
        const altoEsc = Math.floor(settings.constante.bsy * 1.3);

        this.corr_resta = 1;

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: 61,
            clipY: 70,
            clipAncho: 16 - this.corr_resta,
            clipAlto: 16 - this.corr_resta * 2
        }

        this.animacion = {
            anima: 0,
            nro_animas: 4,
            vel_anima: 150
        }

        this.activo = true;

        setInterval(() => {
            this.animacion.anima ++;

            if (this.animacion.anima >= 4) this.activo = false;
        }, this.animacion.vel_anima);
    }

    dibuja() {

        if (!settings.estado.enJuego) return;
        if (!this.activo) return;

        const clipX = this.rect.clipX + this.animacion.anima * (this.rect.clipAncho + 2);

        this.ctx.drawImage(this.img, clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }
}

// ============================================================================
export class ExploParticulas {

    static nro_particulas = 20;

    // -------------------------------------------------------
    constructor(args) {

        this.ctx = settings.ctx;

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: this.devuelve_numeroRandom(1, 3),
            alto: this.devuelve_numeroRandom(1, 3),
        }

        const listaRnd = [-2, -1, 1, 2];

        this.move = {
            x: listaRnd[this.devuelve_numeroRandom(0, 4)],
            y: listaRnd[this.devuelve_numeroRandom(0, 4)],
        }

        this.activo = true;
        this.duracion = 1000;

        setTimeout(() => {
            this.activo = false;
        }, this.duracion);
    }

    dibuja() {

        if (!settings.estado.enJuego) return;
        if (!this.activo) return;

        this.actualiza();

        const rgb = this.devuelve_numeroRandom(50, 255);
        this.ctx.fillStyle = 'rgb(255,' + rgb.toString() + ',0)';

        this.ctx.fillRect(this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }

    actualiza() {

        this.rect.x += this.move.x;
        this.rect.y += this.move.y;
    }

    devuelve_numeroRandom(min, max) {

        return Math.floor(Math.random()* ((max - min) + min));
    }
}

