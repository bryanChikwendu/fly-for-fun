var ws : WebSocket

//
export function connect(x: number, y:number, z:number){
    ws = new WebSocket("ws://localhost:8080/join");
    ws.addEventListener("open", (event) => {
        const buffer = new ArrayBuffer(8*3);
        const x_view = new Float64Array(buffer,0 , 1);
        const y_view = new Float64Array(buffer,8 , 1);
        const z_view = new Float64Array(buffer,16 , 1);
        x_view[0] = x;
        y_view[0] = y;
        z_view[0] = z;
        ws.send(buffer);
    });
}