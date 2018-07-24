class Vetor{

    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function produtoVetorial(vetorA,vetorB){
    let vetorC= new Vetor();
    vetorC.x = (vetorA.y*vetorB.z) - (vetorA.z*vetorB.y);

    vetorC.y = (vetorA.z*vetorB.x) - (vetorA.x*vetorB.z);

    vetorC.z = (vetorA.x*vetorB.y) - (vetorA.y*vetorB.x);

    return vetorC;
}

function produtoInterno(vetorA,vetorB){
    let escalar;
    escalar = 0;
    escalar += (vetorA.x*vetorB.x);
    escalar += (vetorA.y*vetorB.y);
    escalar += (vetorA.z*vetorB.z);
    return escalar;
}

function projecaoVetores(vetorB,vetorA){
    let escalar = (produtoInterno(vetorA,vetorB)/produtoInterno(vetorB,vetorB)); 
    let proj = new Vetor();
    
    proj.x = (escalar*vetorB.x);
    proj.y = (escalar*vetorB.y);
    proj.z = (escalar*vetorB.z);

    return proj;
}

function multiplicarVetorPorEscalar(escalar, vetorA){
    let vetorB = new Vetor();
    
    vetorB.x = (escalar * vetorA.x);
    vetorB.y = (escalar * vetorA.y);
    vetorB.z = (escalar * vetorA.z);

    return vetorB;
}

function moduloVetor(vetorA){
    let modulo;
    modulo = 0;
    modulo += (Math.pow(vetorA.x, 2));
    modulo += (Math.pow(vetorA.y, 2));
    modulo += (Math.pow(vetorA.z, 2));
    modulo = Math.sqrt(modulo);

    return modulo;
}

function normalizarVetor(vetorA){    
    let vetorB= new Vetor();
    
    let aux;
    aux = 0;
    aux = (1/moduloVetor(vetorA));
    
    vetorB = multiplicarVetorPorEscalar(aux, vetorA);

    return vetorB;
}

function OrtogonalizarVetor(vetorV, vetorN){
    let vetorOrto = new Vetor();
   
    let proj = projecaoVetores(vetorN,vetorV);
    vetorOrto.x = vetorV.x - proj.x;
    vetorOrto.y = vetorV.y - proj.y;
    vetorOrto.z = vetorV.z - proj.z;
    
    return vetorOrto;
}

