import { settings } from "./main.js";

// ============================================================================
export class Vidas {

    // ----------------------------------------------------------
    constructor(args, indice) {

        this.ctx = settings.ctx;

        this.nro_vidas = args[0];
        this.indice = indice;

        this.img = new Image();
        this.img.src = args[1];

        const anchoEsc = Math.floor(settings.constante.bsx / 2);
        const altoEsc = Math.floor(settings.constante.bsy / 2);

        this.rect = {
            x: Math.floor((settings.canvas.width / settings.escala.x) / 1.2) + anchoEsc * this.indice,
            y: 0,
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: 2,
            clipY: 68 + 2,
            clipAncho: 16 - 2,
            clipAlto: 16
        }
    }

    dibuja() {
        this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

    }
}
