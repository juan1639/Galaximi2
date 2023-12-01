import { settings } from "./main.js";

// ============================================================================
export class Scroll {

    static vel_scroll = 0.3;

    // -------------------------------------------------
    constructor(args) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = args[2];

        this.rect = {
            x: args[0],
            y: args[1],
            ancho: Math.floor(settings.canvas.width / settings.escala.x),
            alto: Math.floor(settings.canvas.height / settings.escala.y)
        }

        this.move = {
            abajo: [true, 0, Scroll.vel_scroll]
        };
    }

    dibuja() {

        if (!settings.estado.enJuego) return;

        this.actualiza();

        const scrollUp = this.rect.y - this.rect.alto;

        this.ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
        this.ctx.drawImage(this.img, this.rect.x, scrollUp, this.rect.ancho, this.rect.alto);
    }

    actualiza() {

        if (this.move.abajo[0]) this.rect.y += this.move.abajo[2];

        if (this.rect.y >= this.rect.alto) this.rect.y = 0;

    }
}
