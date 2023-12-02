import { settings } from "./main.js";

// ============================================================================
export class NaveExplota {

    constructor(args) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = args[2];

        const anchoEsc = settings.constante.bsx;
        const altoEsc = Math.floor(settings.constante.bsy);

        this.corr_resta = 1;

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: 1,
            clipY: 87,
            clipAncho: 33,
            clipAlto: 33
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

        const clipX = this.rect.clipX + this.animacion.anima * (this.rect.clipAncho);

        this.ctx.drawImage(this.img, clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }
}
