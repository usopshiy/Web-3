let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

let value_r : number = 4;

function windowToCanvas(canvas : HTMLCanvasElement, x : number, y : number) : {x: number, y : number} {
    let bbox : DOMRect = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

window.onload = function ():void{
    let rly_y: HTMLInputElement = <HTMLInputElement> document.forms["InputForm"]["InputForm:YValue"];
    if ($('[id^=InputForm\\:YValues]:checked').val() != null){rly_y.value = <string> $('[id^=InputForm\\:YValues]:checked').val();}
}
function setYValue(y:string):void{
    let rly_y: HTMLInputElement = <HTMLInputElement> document.forms["InputForm"]["InputForm:YValue"];
    rly_y.value = y;
}

canvas.onmousedown = function (e:MouseEvent): void {
    let loc:{x:number, y:number} = windowToCanvas(canvas, e.clientX, e.clientY);
    let rly_x:number = value_r*((loc.x - 250)/200)
    let rly_y:number = (-1) * value_r*((loc.y - 250)/200)

    if(rly_x > value_r || rly_y > value_r || rly_x < -1 * value_r || rly_y < -1 *value_r){
        alert("Input error!")
    }else {
        let out: HTMLInputElement = <HTMLInputElement> document.forms["InputForm"]["InputForm:XValue"];
        out.value = String(rly_x);

        out = <HTMLInputElement> document.forms["InputForm"]["InputForm:YValue"];
        let y_buf: string = out.value;
        out.value = String(rly_y);

        out = <HTMLInputElement> document.forms["InputForm"]["InputForm:OutButton"];
        out.click()

        setYValue(y_buf);
    }
};
function set_r_value(flag_draw : number) : void{
    if(flag_draw == 1){
        let input : string = <string> $('[id^=InputForm\\:RValue]').val();
         value_r = parseFloat(input);
    }else {
        let cells = Array.prototype.slice.call(document.getElementById("OutDataTable").getElementsByTagName("td"));

        if(Number(cells[2].innerHTML) !== 0) {
            value_r = Number(cells[2].innerHTML);
        }else{
            let input : string = <string> $('[id^=InputForm\\:RValue]').val();
            value_r = parseFloat(input);
        }
    }
}

function drawPoint(x : number, y : number, r : number, res : string) : void {
    let flag : boolean = x > r || y > r || x < -1 * r || y < -1 * r || r === 0;
    if(!flag){
        ctx.beginPath();

        if (res === "true") {
            ctx.fillStyle = "rgba(0, 255, 0, 1)";
        }else{
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
        }

        ctx.arc(250 + 200 * x / r, 250 - 200 * y/r, 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

function draw(flag_draw : number) : void{

    set_r_value(flag_draw)

    ctx.clearRect(0, 0, 500, 500);

    ctx.fillStyle = "rgba(91,95,201,1)";
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 100,Math.PI, Math.PI*3/2, false);
    ctx.fillRect(250, 250, -200, 200);
    ctx.moveTo(250,250);
    ctx.lineTo(350,250);
    ctx.lineTo(250,450);
    ctx.fill();

    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.moveTo(30,250);
    ctx.lineTo(470,250);

    ctx.lineTo(465,255);
    ctx.moveTo(470,250);
    ctx.lineTo(465,245);
    ctx.font = "20px serif";
    ctx.fillText('X',470,245);

    ctx.moveTo(250,470);
    ctx.lineTo(250,30);

    ctx.lineTo(255,35);
    ctx.moveTo(250,30);
    ctx.lineTo(245,35);

    ctx.fillText('Y',255,35);

    ctx.moveTo(450,260);
    ctx.lineTo(450,240);
    ctx.fillText("R" ,445,230);

    ctx.moveTo(350,260);
    ctx.lineTo(350,240);
    ctx.fillText("R/2" ,345,230);

    ctx.moveTo(50,260);
    ctx.lineTo(50,240);
    ctx.fillText("-R" ,55,230);

    ctx.moveTo(150,260);
    ctx.lineTo(150,240);
    ctx.fillText("-R/2",145,230);

    ctx.moveTo(240,50);
    ctx.lineTo(260,50);
    ctx.fillText("R" ,260,60);

    ctx.moveTo(240,150);
    ctx.lineTo(260,150);
    ctx.fillText("R/2" ,260,160);

    ctx.moveTo(240,450);
    ctx.lineTo(260,450);
    ctx.fillText("-R",260,460);

    ctx.moveTo(240,350);
    ctx.lineTo(260,350);
    ctx.fillText("-R/2" ,260,360);

    ctx.closePath();
    ctx.stroke();

    checkTableAndDraw()
}


function checkTableAndDraw() : void{
    let cells = Array.prototype.slice.call(document.getElementById("OutDataTable").getElementsByTagName("td"));
    let n = cells.length;
    if(Number(cells[2].innerHTML) !== 0){
        for(let i : number = 0; i < n; i=i+4){
            drawPoint(Number(cells[i].innerHTML),
                Number(cells[i+1].innerHTML),
                Number(cells[i+2].innerHTML),cells[i+3].innerText);
        }
    }
}

function eventHandler() : void {
    draw(1)
}

$(window).on('resize', eventHandler)
$(window).on('load', eventHandler)
