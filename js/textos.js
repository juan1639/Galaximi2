import { settings } from "./main.js";

// ============================================================================
export class Textos {

    static colores = {
        azul_fondo: 'rgb(134, 210, 230)',
        blanco_nube: 'rgb(233, 233, 233)',
        txt_amar2: 'rgb(240, 240, 170)',
        txt_amar1: 'rgb(255, 89, 19)',
        txt_amar3: 'rgb(225, 155, 29)',
        azul_claro: 'lightskyblue',
        orange: 'orange',
        orangered: 'orangered'
    };

    static array_textos = [
        ['GalaxIMI', 'center', 28, this.colores.azul_claro],
        ['Game Over', 'center', 24, this.colores.orangered],
        ['Enhorabuena!', 'center', 18, this.colores.txt_amar3],
        ['Ptos: ', 'left', 12, this.colores.txt_amar2],
        ['Hi: ', 'center', 12, this.colores.txt_amar2]
    ];

    // -------------------------------------------------------
    constructor(args) {

        console.log(args);
        this.idTxt = args[0];
        this.alin = args[1];
        this.size = args[2];
        this.color = args[3];

        this.ctx = settings.ctx;
    }

    dibuja() {

        let x = Math.floor(settings.canvas.width / settings.escala.x / 2);
        let y = Math.floor(settings.canvas.height / settings.escala.y / 2);
        
        if (this.idTxt.slice(0, 3) === 'Pto') {
            x = 0;
            y = this.size;

        } else if (this.idTxt.slice(0, 2) === 'Hi') {
            y = this.size;
        }

        this.ctx.save();

        this.ctx.font = this.size.toString() + 'px arial';
        this.ctx.textAlign = this.alin;
        this.ctx.fillStyle = 'transparent';
        this.ctx.fillStyle = this.renderizado_condicional();

        this.ctx.fillText(this.idTxt, x, y);

        this.ctx.restore();
    }

    renderizado_condicional() {

        if (this.size === 12) return this.color;
        if (this.idTxt.slice(0, 5) === 'Galax' && settings.estado.preJuego) return this.color;
        if (this.idTxt.slice(0, 5) === 'Enhor' && settings.estado.nivelSuperado) return this.color;
        if (this.idTxt.slice(0, 4) === 'Game' && settings.estado.gameOver) return this.color;

        return 'transparent';
    }
}