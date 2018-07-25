class Ponto{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.normal = null;
    }
}

function SubtracaoPontos(p1,p2){
    let v = new Vetor();
    v.x = p2.x-p1.x;
    v.y = p2.y-p1.y;
    v.z = p2.z-p1.z;

    return v;
}