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