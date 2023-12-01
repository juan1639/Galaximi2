import { settings } from "./main.js";

// ============================================================================
export class Enemigo {

    static nro_tiposEnemigo = 3;
    static suma_puntos = 50;
    static top_recorrido_haciaAbajo = 12;
    static resetFormacion = false;

    // --------------------------------------------------------
    // Args ---> x[0], y[1], img[2]
    // --------------------------------------------------------
    constructor(args, detras) {

        this.ctx = settings.ctx;
        this.img = new Image();
        this.img.src = args[2];

        this.id = this.elegir_enemigo(Enemigo.nro_tiposEnemigo);

        const anchoEsc = settings.constante.bsx * 1.5;
        const altoEsc = Math.floor(settings.constante.bsy * 1.3);

        this.corr_suma = 1;
        this.corr_resta = 1;

        let xIni;

        if (args[0] < 0) {
            xIni = args[0] - detras * anchoEsc;

        } else {
            xIni = args[0] + detras * anchoEsc;
        }

        this.rect = {
            x: xIni,
            y: args[1],
            // ancho: settings.constante.bsx * 2,
            // alto: Math.floor(settings.constante.bsy * 1.7),
            ancho: anchoEsc,
            alto: altoEsc,
            clipX: this.corr_suma,
            clipY: this.id * (settings.constante.bsy + 2) + this.corr_suma * 2,
            clipAncho: 16 - this.corr_resta,
            clipAlto: 16 - this.corr_resta * 2
        }

        const velX = this.velocidad_progresiva();
        console.log(velX);

        this.direccion = {
            derecha: [false, velX, 0],
            izquierda: [false, -velX, 0],
            arriba: [false, 0, -1],
            abajo: [false, 0, 1]
        };

        if (args[0] < 0) {
            this.direccion.derecha[0] = true;
        } else {
            this.direccion.izquierda[0] = true;
        }

        this.activo = true;

        this.recorrido_haciaAbajo = 0;

        this.anima = 0;
        this.nro_animas = 4;

        if (settings.marcadores.puntos <= 0) {
            this.pausa_newGame = true;
        
        } else {
            this.pausa_newGame = false;
        }

        setInterval(() => {
            this.anima ++;
            if (this.anima >= this.nro_animas) this.anima = 0;
        }, 99);

        setTimeout(() => {
            this.pausa_newGame = false;
        }, 5900);
    }

    dibuja() {

        if (!settings.estado.enJuego || settings.estado.nivelSuperado || !this.activo || this.pausa_newGame) return;

        this.actualiza();

        const anima = (this.rect.clipX * (this.anima + 1)) + this.anima * (this.rect.clipAncho + 1);

        this.ctx.drawImage(this.img, anima, this.rect.clipY, this.rect.clipAncho, this.rect.clipAlto, this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
    }

    actualiza() {

        const colision = this.check_limites();

        if (!colision) {
            if (this.direccion.derecha[0]) {
                this.rect.x += this.direccion.derecha[1];

            } else if (this.direccion.izquierda[0]) {
                this.rect.x += this.direccion.izquierda[1];

            } else if (this.direccion.arriba[0]) {
                this.rect.y += this.direccion.arriba[2];

            } else if (this.direccion.abajo[0]) {
                this.rect.y += this.direccion.abajo[2];
            }
        }

        this.check_siguienteFormacion();
    }

    check_limites() {

        const limite_dcho = Math.floor(settings.canvas.width / settings.escala.x);
        const enemigo_masAncho = this.rect.x + this.rect.ancho;

        if (this.direccion.derecha[0]) {
            if (enemigo_masAncho + this.direccion.derecha[1] > limite_dcho) {

                const calculo = limite_dcho - enemigo_masAncho;
                this.rect.x += calculo;

                this.reset_direcciones_bool();
                this.direccion.abajo[0] = true;
                this.recorrido_haciaAbajo = 0;
                return true;
            } 
        }

        if (this.direccion.izquierda[0]) {
            if (this.rect.x + this.direccion.izquierda[1] < 0) {

                const calculo = -this.rect.x;
                this.rect.x += calculo;

                this.reset_direcciones_bool();
                this.direccion.abajo[0] = true;
                this.recorrido_haciaAbajo = 0;
                return true;
            } 
        }

        if (this.direccion.abajo[0]) {
            if (this.recorrido_haciaAbajo > Enemigo.top_recorrido_haciaAbajo) {

                this.reset_direcciones_bool();
                this.recorrido_haciaAbajo = 0;

                if (this.rect.x < 100) {
                    this.direccion.derecha[0] = true;

                } else {
                    this.direccion.izquierda[0] = true;
                }

                return false;

            } else {
                this.recorrido_haciaAbajo ++;
                return false;
            }
        }

        return false;
    }

    velocidad_progresiva() {
        return 2 + Math.floor(settings.marcadores.nivel / 8);
    }

    check_siguienteFormacion() {

        const limite_bajo = Math.floor(settings.canvas.height / settings.escala.y);
        const limite_extra = settings.constante.bsy * (Math.floor(settings.marcadores.nivel / 10) + 1);

        if (this.rect.y > limite_bajo + limite_extra) Enemigo.resetFormacion = true; 
    }

    elegir_enemigo(tipo) {
        return Math.floor(Math.random()* tipo);
    }

    reset_direcciones_bool() {

        const keysDirecciones = Object.keys(this.direccion);

        for (let direccion of keysDirecciones) {
            this.direccion[direccion][0] = false;
        }
    }
}
