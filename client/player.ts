import * as THREE from 'three';

export class Player {
    focused;
    speed = 0.05;
    input = {f: false, b: false};
    constructor(canvas, sens: number, camera){
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
                default:
                    break;
            }
        }
    }

    setup(scene){
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
    }

    update(){
        if(this.input.f){
            this.camera.position.z -= this.speed;
        } else if (this.input.b){
            this.camera.position.z += this.speed;
        }
    }
}


