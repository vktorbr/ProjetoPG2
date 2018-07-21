function produtoVetorial(vetorA,vetorB){
    let vetorC={};
    vetorC[0] = null;
    vetorC[0] = (vetorA[1]*vetorB[2]) - (vetorA[2]*vetorB[1]);

    vetorC[1] = null;
    vetorC[1] = (vetorA[2]*vetorB[0]) - (vetorA[0]*vetorB[2]);

    vetorC[2] = null;
    vetorC[2] = (vetorA[0]*vetorB[1]) - (vetorA[1]*vetorB[0]);

    return vetorC;
}

function produtoInterno(vetorA,vetorB){
    let escalar;
    escalar = 0;
    escalar += (vetorA[0]*vetorB[0]);
    escalar += (vetorA[1]*vetorB[1]);
    escalar += (vetorA[2]*vetorB[2]);
    return escalar;
}

function projecaoVetores(vetorB,vetorA){
    let escalar = (produtoInterno(vetorA,vetorB)/produtoInterno(vetorB,vetorB));
    let proj ={};
    proj[0] = null;
    proj[0] = (escalar*vetorB[0]);

    proj[1] = null;
    proj[1] = (escalar*vetorB[1]);

    proj[2] = null;
    proj[2] = (escalar*vetorB[2]);

    return proj;
}

function NormalizacaoVetor(vetorA){
    let vetorB = {};
    let magnitude;
    magnitude = 0;
    magnitude += vetorA[0]*vetorA[0];
    magnitude += vetorA[1]*vetorA[1];
    magnitude += vetorA[2]*vetorA[2];
    magnitude = Math.sqrt(magnitude);
    
    vetorB[0] = null;
    vetorB[0] = vetorA[0]/magnitude;

    vetorB[1] = null;
    vetorB[1] = vetorA[1]/magnitude;

    vetorB[2] = null;
    vetorB[2]=  vetorA[2]/magnitude;
    
    return vetorB;
}
