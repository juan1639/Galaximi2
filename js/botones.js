import { settings } from "./main.js";

// ============================================================================
export class Botones {

    // ----------------------------------------------------------
    constructor(indice) {

        this.ctx = settings.ctx;
        this.indice = indice;

        const limite_bajo = (settings.canvas.height / settings.escala.y);
        const ancho_canvas = (settings.canvas.width / settings.escala.x);
        const alto_boton = 10;

        const args = [
            [
                0, 
                limite_bajo - Math.floor(limite_bajo / alto_boton),
                Math.floor(ancho_canvas / 5),
                limite_bajo - Math.floor(limite_bajo / alto_boton),
                '<'
            ],
            [
                Math.floor(ancho_canvas / 4.5),
                limite_bajo - Math.floor(limite_bajo / alto_boton),
                Math.floor(ancho_canvas / 5),
                limite_bajo - Math.floor(limite_bajo / alto_boton),
                '>'
            ],
            [
                Math.floor(ancho_canvas / 1.9),
                limite_bajo - Math.floor(limite_bajo / alto_boton),
                Math.floor(ancho_canvas / 2),
                limite_bajo - Math.floor(limite_bajo / alto_boton),
                'Fire'
            ]
        ];

        this.rect = {
            x: args[this.indice][0],
            y: args[this.indice][1],
            ancho: args[this.indice][2],
            alto: args[this.indice][3]
        }

        this.txt = args[this.indice][4];
    }

    dibuja() {
        this.ctx.fillStyle = 'rgba(255, 100, 0, 0.3)';
        this.ctx.fillRect(this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);

        this.ctx.font = '12px arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'rgba(255, 100, 0, 0.4)';
        this.ctx.fillText(this.txt, this.rect.x + Math.floor(this.rect.ancho / 2), this.rect.y + Math.floor(this.rect.alto / 12));
    }
}
