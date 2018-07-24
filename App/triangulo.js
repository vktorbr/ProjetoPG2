class Triangulo{

    constructor(vertice1,vertice2,vertice3){
        this.vertice1=vertice1;
        this.vertice2=vertice2;
        this.vertice3=vertice3;
        this.normal = NormalTriangulo(this);
    }
}

function NormalTriangulo(triangulo){
    
    let U = new Vetor();
    let V = new Vetor();
    U = SubtracaoPontos(triangulo.vertice1,triangulo.vertice2);
    V = SubtracaoPontos(triangulo.vertice1,triangulo.vertice3);

    let N = new Vetor();

    N = produtoVetorial(U,V);

    return N;
}