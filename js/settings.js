
// ============================================================================
export class Settings {

    constructor(escalaSel) {

        this.escala = {
            x: escalaSel,
            y: escalaSel
        };

        this.constante = {
            bsx: 15,
            bsy: 15,
            FPS: 60,
            nro_enemigos_inicial: 8,
            pausaNivelSuperado: 3400,
            pausaMsgNivelMostrar: 5200,
            duracion_sonido_intro_galaxian: 6500,
            ssheet: './img/ssheet_galaxian.png'
        };

        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 640;
        this.canvas.height = 480;

        this.marcadores = {
            puntos: 0,
            nivel: 1,
            vidas: 3,
            hi: 3000
        };

        this.lista_extras = [
            [5000, false],
            [10000, false],
            [50000, false],
            [100000, false],
            [500000, false],
        ];

        this.objeto = {
            scroll: null,
            jugador: null,
            naveexplota: null,
            enemigo: [],
            disparo: [],
            ataqueenemigo: [],
            exploenemigo: [],
            exploparticulas: [],
            texto: [],
            showvidas: [],
            banderita: [],
            banderita10: []
        };

        this.argumentos = {
            scroll: [0, 0, './img/fondoEspacial_galaximi.png'],
            jugador: [
                Math.floor((this.canvas.width / 2) / this.escala.x) - Math.floor(this.constante.bsx / 2),
                Math.floor((this.canvas.height - this.constante.bsy * 3) / this.escala.y),
                this.constante.ssheet
            ],
            enemigo: [-50, 0, this.constante.ssheet],
            disparoEnemigo: [],
            disparo: [-100, -100],
            explosion: [],
            exploenemigo: [],
            exploparticulas: [],
            texto: [],
            showvidas: [this.marcadores.vidas, this.constante.ssheet],
            banderita: [this.marcadores.nivel, this.constante.ssheet]
        };

        this.enemigosDificultad = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

        this.controles = {
            tecla_iz: false,
            tecla_de: false,
            tecla_at: false,
            tecla_enter: false,

            touch_iz: false,
            touch_de: false,
            touch_at: false,
            touch_canvas: false
        };

        this.tecla = {
            tecla_iz: ['ArrowLeft', 'ArrowLeft'],
            tecla_de: ['ArrowRight', 'ArrowRight'],
            tecla_at: ['Control', ' '],
            tecla_enter: ['Enter', 'Enter'],

            touch_iz: ['boton__le', 'flecha__le'],
            touch_de: ['boton__ri', 'flecha__ri'],
            touch_at: ['boton__at', 'boton__at'],
            touch_canvas: ['canvas', 'canvas']
        };

        this.estado = {
            preJuego: true,
            playerStart: false,
            enJuego: false,
            jugadorDies: false,
            gameOver: false,
            reJugar: false,
            nivelSuperado: false
        };
        
        this.colores = {
            fondo: 'rgb(0, 0, 19)',
            blanco_nube: 'rgb(233, 233, 233)',
            txt_amar2: 'rgb(240, 240, 170)',
            txt_amar1: 'rgb(255, 89, 19)',
            txt_amar3: 'rgb(225, 155, 29)'
        };

        this.trucos = {
            invisible: false,
            vidasInfinitas: false
        };

        this.sonidos = {
            gameOver: new Audio('./audio/gameoveretro.ogg'),
            dieThrow1: new Audio('./audio/dieThrow1.ogg'),
            dieThrow2: new Audio('./audio/dieThrow2.ogg'),
            chips1: new Audio('./audio/chipsCollide1.ogg'),
            chips2: new Audio('./audio/chipsCollide2.ogg'),
            chips3: new Audio('./audio/chipsCollide3.ogg'),
            eatingGhost: new Audio('./audio/pacmaneatinghost.ogg'),
            fireWorks: new Audio('./audio/fireworks.mp3'),
            explosion: new Audio('./audio/explosion.wav'),
            naveExplota: new Audio('./audio/navexplota.mp3'),
            phaser: new Audio('./audio/phaser.ogg'),
            disparoCorto: new Audio('./audio/disparo_corto.mp3'),
            retroGameIntro: new Audio('./audio/retro-game-intro.mp3'),
            introGalaxian: new Audio('./audio/playing-galaxian.mp3'),
            levelPassed: new Audio('./audio/level-passed.mp3'),
        };

        this.volumen = {
            gameOver: 0.7,
            dieThrow1: 0.9,
            dieThrow2: 0.9,
            chips1: 0.9,
            chips2: 0.9,
            chips3: 0.9,
            eatingGhost: 0.8,
            fireWorks: 0.9,
            explosion: 0.9,
            naveExplota: 0.9,
            phaser: 0.9,
            disparoCorto: 1.0,
            retroGameIntro: 0.9,
            introGalaxian: 0.9,
            levelPassed: 0.4
        }
    }
}

