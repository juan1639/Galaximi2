import { settings } from "./main.js";

// ============================================================================
export class Banderita {

    // ----------------------------------------------------------
    constructor(args, indice) {

        this.ctx = settings.ctx;

        this.nro_banderitas = args[0];
        this.indice = indice;

        this.img = new Image();
        this.img.src = args[1];

        const anchoEsc = Math.floor((settings.constante.bsx / 2) / settings.escala.x);
        const altoEsc = Math.floor(settings.constante.bsy / settings.escala.y);

        this.rect = {
            x: anchoEsc * this.indice,
            y: Math.floor((settings.canvas.height / settings.escala.y) - ((settings.constante.bsy * 2) / settings.escala.y)),
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: 35,
            clipY: 68 + 2,
            clipAncho: 8,
            clipAlto: 16
        }
    }

    dibuja() {
        this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

    }
}

// ============================================================================
export class Banderita10 {

    // ----------------------------------------------------------
    constructor(args, indice) {

        this.ctx = settings.ctx;

        this.nro_banderitas = args[0];
        this.indice = indice;

        this.img = new Image();
        this.img.src = args[1];

        const anchoEsc = Math.floor(settings.constante.bsx / settings.escala.x);
        const altoEsc = Math.floor(settings.constante.bsy / settings.escala.y);

        this.rect = {
            x: Math.floor((settings.canvas.width / settings.escala.x) / 1.8) + anchoEsc * this.indice,
            y: Math.floor(settings.canvas.height - ((settings.constante.bsy * 2) / settings.escala.y)),
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: 44,
            clipY: 68 + 2,
            clipAncho: 16,
            clipAlto: 16
        }
    }

    dibuja() {
        this.ctx.drawImage(this.img, this.rect.clipX, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

    }
}
