import * as THREE from 'three'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import {Controller, GUI} from 'three/examples/jsm/libs/lil-gui.module.min'
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader"
import fontJson from './assets/Roboto_Regular.json'
import {drones} from "./proto/drones"
import State = drones.State;
import Options = drones.Options;

type GamesDataActionV1 = {
    data: number[]
    user: number
}

type GamesDataTickV1 = {
    tick: number
    state: string
    actions: GamesDataActionV1[]
}

type GamesDataUserV1 = {
    id: number
    gh_login: string
    name: string
    avatar_url: string
}

type GamesDataGameUserV1 = {
    score: number
    new_score: number
    user: GamesDataUserV1
}

type GamesDataGameV1 = {
    ts: string
    participants: GamesDataGameUserV1[]
    winner: number
    options: string
    ticks: GamesDataTickV1[]
}

export class Player {
    private readonly container: HTMLElement
    private readonly options: Options
    private readonly ticks: Array<State>
    private readonly participants: GamesDataGameUserV1[]
    private readonly winner: number
    private settings: {
        curTick: number
        play: Function
        pause: Function
    }
    private readonly clock = new THREE.Clock()
    private readonly scene: THREE.Scene
    private readonly camera: THREE.PerspectiveCamera
    private readonly renderer: THREE.WebGLRenderer
    private readonly font: Font
    private drones: Array<THREE.Mesh> = []
    private dronesNextPoints: Array<THREE.Mesh> = []

    constructor(container: HTMLElement, gameData: GamesDataGameV1) {
        this.container = container
        container.style.height = (container.clientWidth / 3 * 2).toString().concat('px')

        this.options = Options.decode(Uint8Array.from(window.atob(gameData.options), (v) => v.charCodeAt(0)))

        this.ticks = gameData.ticks.map(t => {
            return State.decode(Uint8Array.from(window.atob(t.state), (v) => v.charCodeAt(0)))
        })

        this.participants = gameData.participants
        this.winner = gameData.winner

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.offsetHeight, 1, 5000)
        this.camera.position.set(800, 550, 1500)
        this.camera.lookAt(800, 550, 0)

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.offsetHeight)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        container.appendChild(this.renderer.domElement)

        const fontLoader = new FontLoader()
        this.font = fontLoader.parse(fontJson)

        this.initScene()
        this.initGUI()
    }

    private initScene() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4))

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.position.set(0, 0, 1).normalize()
        this.scene.add(directionalLight)
        let gameScale = this.getGameScale();

        let scaledCellSize = this.options.cellSize * gameScale;

        for (let y = 0; y < this.options.maze.height; y++) {
            for (let x = 0; x < this.options.maze.width; x++) {
                if (this.hasWall(x, y)) {
                    const geometry = new THREE.BoxGeometry()

                    geometry.scale(scaledCellSize, scaledCellSize, scaledCellSize)
                    const material = new THREE.MeshPhongMaterial({color: 0x00ff00})
                    const cube = new THREE.Mesh(geometry, material)
                    cube.position.set(x * scaledCellSize, y * scaledCellSize, 10)
                    this.scene.add(cube)
                }
            }
        }

        this.options.maze.checkpoints.forEach((c, i) => {
            const geometry = new THREE.BoxGeometry()
            geometry.scale(scaledCellSize, scaledCellSize, scaledCellSize)
            const material = new THREE.MeshPhongMaterial({color: 0x00ffff, opacity: 0.3, transparent: true})
            const cube = new THREE.Mesh(geometry, material)
            cube.position.set(c.x * scaledCellSize, c.y * scaledCellSize, 10)
            this.scene.add(cube)
        })

        this.ticks[0].players.forEach(((p, i) => {
            const geometry = new THREE.BoxGeometry()
            geometry.scale(this.options.drone.width * gameScale, this.options.drone.height * gameScale, this.options.drone.width * gameScale)
            geometry.rotateZ(p.drone.angle)
            let playerColor = i == 0 ? 0xff0000 : 0xffff00;
            const material = new THREE.MeshPhongMaterial({color: playerColor})
            const cube = new THREE.Mesh(geometry, material)
            cube.position.set(p.drone.pos.x * gameScale, p.drone.pos.y * gameScale, 10)
            this.drones.push(cube)
            this.scene.add(cube)
            this.addNextPoint(p, playerColor, i, gameScale);
        }))

        this.participants.forEach((p, i) => {
            const t = this.newText(
                p.user.name || p.user.gh_login,
                i == 0
                    ? [
                        new THREE.MeshPhongMaterial({color: 0xff0000, flatShading: true}), // front
                        new THREE.MeshPhongMaterial({color: 0xff0000}) // side
                    ]
                    : [
                        new THREE.MeshPhongMaterial({color: 0xffff00, flatShading: true}), // front
                        new THREE.MeshPhongMaterial({color: 0xffff00}) // side
                    ]
            )
            t.geometry.computeBoundingBox()
            t.position.set(1250, i == 0 ? 550 : 450, 0)
            this.scene.add(t)
        })

        this.animate()
    }

    private getGameScale() {
        let targetSize = 23 * 50;
        let actualSize = Math.max(this.options.maze.width, this.options.maze.height) * this.options.cellSize

        return targetSize / actualSize;
    }

    private addNextPoint(p: drones.IPlayer, playerColor: number, playerI: number, gameScale: number) {
        const nextCheckpointPos = this.options.maze.checkpoints[p.drone.nextCheckpoint]
        const geometry = new THREE.SphereGeometry()
        let scaledCellSize = this.options.cellSize * gameScale

        geometry.scale(scaledCellSize / 4, scaledCellSize / 4, scaledCellSize / 4)
        const material = new THREE.MeshPhongMaterial({color: playerColor, opacity: 0.6, transparent: true})
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
            nextCheckpointPos.x * scaledCellSize + scaledCellSize / 8,
            nextCheckpointPos.y * scaledCellSize + scaledCellSize / 8,
            scaledCellSize + playerI * scaledCellSize
        )
        this.dronesNextPoints.push(sphere)
        this.scene.add(sphere)
    }

    private initGUI() {
        let curTickCtrl: Controller
        let playBtn: Controller
        let pauseBtn: Controller

        this.settings = {
            curTick: 0,
            play: () => {
                playBtn.hide()
                pauseBtn.show()

                if (this.settings.curTick == this.ticks.length - 1)
                    curTickCtrl.setValue(0)

                const play = () => {
                    if (pauseBtn._hidden)
                        return

                    if (this.settings.curTick < this.ticks.length - 1) {
                        this.settings.curTick++
                        curTickCtrl.setValue(this.settings.curTick)
                    } else {
                        pauseBtn.hide()
                        playBtn.show()
                    }

                    window.setTimeout(play, 30)
                }
                play()
            },
            pause() {
                pauseBtn.hide()
                playBtn.show()
            }
        }

        const panel = new GUI({
            title: 'Drones',
            container: this.container,
            width: this.container.clientWidth,
            autoPlace: true
        })
        curTickCtrl = panel.add(this.settings, 'curTick', 0, this.ticks.length - 1, 1)
            .name('Current tick')
            .listen()
            .onChange(() => {
                let gameScale = this.getGameScale();
                let scaledCellSize = this.options.cellSize * gameScale;

                this.ticks[this.settings.curTick].players.forEach((p, i) => {
                    this.drones[i].position.setX(p.drone.pos.x * gameScale)
                    this.drones[i].position.setY(p.drone.pos.y * gameScale)
                    this.drones[i].rotation.z = p.drone.angle

                    const nextCheckpointPos = this.options.maze.checkpoints[p.drone.nextCheckpoint]
                    this.dronesNextPoints[i].position.setX(nextCheckpointPos.x * scaledCellSize /*+ this.options.cellSize / 8*/)
                    this.dronesNextPoints[i].position.setY(nextCheckpointPos.y * scaledCellSize /*+ this.options.cellSize / 8*/)
                })
            })
            .setValue(0)

        playBtn = panel.add(this.settings, 'play')
            .name('Play')

        pauseBtn = panel.add(this.settings, 'pause')
            .name('Pause')
            .hide()

        window.addEventListener('resize', () => {
            this.container.style.height = (this.container.clientWidth / 2).toString().concat('px')
            this.camera.aspect = this.container.clientWidth / this.container.offsetHeight
            this.camera.updateProjectionMatrix()

            this.renderer.setSize(this.container.clientWidth, this.container.offsetHeight)
        })
    }

    private animate() {
        requestAnimationFrame(() => {
            this.animate()
        })

        const delta = this.clock.getDelta()

        this.renderer.render(this.scene, this.camera)
    }

    private hasWall(x: number, y: number): boolean {
        const i = (this.options.maze.height - y - 1) * this.options.maze.width + x
        const byteIndex = Math.floor(i / 8)
        const bitIndex = i % 8

        return (this.options.maze.walls[byteIndex] & (1 << bitIndex)) > 0
    }

    private lettersMaterial = [
        new THREE.MeshPhongMaterial({color: 0x555555, flatShading: true}), // front
        new THREE.MeshPhongMaterial({color: 0x888888}) // side
    ]

    private newText(text: string, material: Array<THREE.MeshPhongMaterial> = this.lettersMaterial) {
        return new THREE.Mesh(
            new TextGeometry(text, {
                font: this.font,
                size: 50,
                height: 10,
                curveSegments: 40,
                bevelThickness: 0.5,
                bevelSize: 0.1,
                bevelEnabled: true
            }),
            material
        )
    }

    private piecesMaterials = {
        Green: new THREE.MeshPhongMaterial({color: 0x00ff00, flatShading: true}),
        Yellow: new THREE.MeshPhongMaterial({color: 0xffff00, flatShading: true}),
        Red: new THREE.MeshPhongMaterial({color: 0xff0000, flatShading: true}),
    }

    private newPiece(): THREE.Mesh {
        const shape = new THREE.Shape()
        shape.moveTo(0, 1)
        shape.quadraticCurveTo(1, 1, 1, 0)
        shape.quadraticCurveTo(1, -1, 0, -1)
        shape.quadraticCurveTo(-1, -1, -1, 0)
        shape.quadraticCurveTo(-1, 1, 0, 1)

        const geometry = new THREE.ExtrudeGeometry(shape, {depth: 0.2, bevelEnabled: false})

        const piece = new THREE.Mesh(geometry, this.piecesMaterials.Green)
        piece.rotateX(Math.PI / 2)
        piece.scale.setScalar(15)
        piece.visible = false

        return piece
    }
}