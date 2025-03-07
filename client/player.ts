import * as THREE from 'three';

export class Player {
    focused;
    speed = 0.05;
    input = {f: false, b: false, l: false, r: false};
    canvas: HTMLCanvasElement;
    sens: number;
    camera: THREE.Camera;
    dir: number = 90;

    model : THREE.Mesh
    constructor(canvas, sens, camera){
        this.canvas = canvas;
        this.focused = false;
        this.sens = sens;
        this.camera = camera;

       
    }

    handleMouseP(event){
        if(this.focused){
            this.camera.rotateY(THREE.MathUtils.degToRad((-event.movementX)/this.sens));
        }
    }

    handleKeyP(event){
        if(this.focused){
            switch (event.key) {
                case 'w':
                    this.input.f = true;
                    this.input.b = false;
                    break;
                case 's':
                    this.input.f = false;
                    this.input.b = true;
                    break;
                case 'a':
                    this.input.r = false;
                    this.input.l = true;
                    break;
                default:
                    break;
            }
        }
    }
    handleKeyR(event){
        if(this.focused){
            switch (event.key) {
                case 'w':
                    this.input.f = false;
                    break;
                case 's':
                    this.input.b = false;
                    break;
                case 'a':
                    this.input.l = false;
                    break;
                default:
                    break;
            }
        }
    }

    setup(scene: THREE.Scene){
        document.addEventListener("pointerlockchange", (event) => {
            if (document.pointerLockElement === this.canvas) {
                console.log("The pointer lock status is now locked");
                this.focused = true;
              } else {
                console.log("The pointer lock status is now unlocked");
                this.focused = false;
              }
        }, false);

        this.canvas.addEventListener("click", async () => {
            await this.canvas.requestPointerLock({
                unadjustedMovement: true,
              });
        });

        this.canvas.addEventListener('mousemove', (event) => {
            this.handleMouseP(event);
        });

        document.addEventListener('keydown', e => this.handleKeyP(e));
        document.addEventListener('keyup', e => this.handleKeyR(e));

        const geometry = new THREE.BoxGeometry( 0.5, 0.15, 1.2 );
        const material = new THREE.MeshPhongMaterial( { color: 0xaa2222 } );
        this.model = new THREE.Mesh( geometry, material );
        scene.add(this.model);
    }

    _moveForward(s: number){
        console.log("Position Before: " + this.camera.position.x + " "
            + this.camera.position.y + " "
            + this.camera.position.z
        )
        // Calculate "Forward Vector", add it to position * speed
        var forward = new THREE.Vector3(Math.cos( THREE.MathUtils.degToRad(this.dir)),0,Math.sin(THREE.MathUtils.degToRad(this.dir)));
        forward.multiplyScalar(s);

        console.log("Forward: " + forward.x + " "
                                + forward.y + " "
                                + forward.z
        )
        this.camera.position.add(forward);
    }

    update(){
        
        
        if(this.input.f){
            this._moveForward(-0.2);
        } else if (this.input.b){
            this._moveForward(0.2);
        }
        
        
        if (this.input.l){
            this.dir--;
            if (this.dir < 0){
                this.dir = 359;
            }
        } else if (this.input.r){
            this.dir++;
            if (this.dir >= 360){
                this.dir = 0;
            }
        }
        
        this.model.position.copy(this.camera.position);
        this.model.position.z -= 3.5;
        this.model.position.y -= 1;
    }
}


