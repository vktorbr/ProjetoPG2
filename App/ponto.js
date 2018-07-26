class Ponto{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.normal = new Vetor(0,0,0);
    }
}

function SubtracaoPontos(p1,p2){
    let v = new Vetor();
    v.x = p2.x-p1.x;
    v.y = p2.y-p1.y;
    v.z = p2.z-p1.z;

    return v;
}

function SomaPontos(p1,p2){
    let v = new Ponto();
    v.x = p2.x+p1.x;
    v.y = p2.y+p1.y;
    v.z = p2.z+p1.z;

    return v;
}

function multiplicarPontoPorEscalar(escalar, pontoa){
    let pontob = new Ponto();
    
    pontob.x = (escalar * pontoa.x);
    pontob.y = (escalar * pontoa.y);
    pontob.z = (escalar * pontoa.z);

    return pontob;
}