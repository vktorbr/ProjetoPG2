class Objeto{
    constructor(qtd_pontos,qtd_triangulos,pontos,triangulos){
        this.qtd_pontos = qtd_pontos;
        this.qtd_triangulos = qtd_triangulos;
        this.pontos = pontos;
        this.triangulos = triangulos;
    }

    NormalVertices(){
        for (let i = 0; i < this.triangulos.length; i++) {
            if(this.triangulos[i].vertice1.normal == null){//Verificar se já foi feita a norma deste vertice!
                let normaisTri = [];
                let cont = 0;
                for (let j = i; j < this.triangulos.length; j++) {
                    if(this.triangulos[i].vertice1.x == this.triangulos[j].vertice1.x &&
                        this.triangulos[i].vertice1.y == this.triangulos[j].vertice1.y &&
                        this.triangulos[i].vertice1.z == this.triangulos[j].vertice1.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice1.x == this.triangulos[j].vertice2.x &&
                            this.triangulos[i].vertice1.y == this.triangulos[j].vertice2.y &&
                            this.triangulos[i].vertice1.z == this.triangulos[j].vertice2.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice1.x == this.triangulos[j].vertice3.x &&
                        this.triangulos[i].vertice1.y == this.triangulos[j].vertice3.y &&
                        this.triangulos[i].vertice1.z == this.triangulos[j].vertice3.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }
                }

                let somador=new Vetor(0,0,0);
                for (let j = 0; j < cont; j++) {                    
                    somador=SomaVetores(somador,normaisTri[j]);
                }
                this.triangulos[i].vertice1.normal =multiplicarVetorPorEscalar(1/cont,somador);//Divisão da soma das normais pelo numero de triangulos ao que o vertice faz parte
            }

            if(this.triangulos[i].vertice2.normal == null){//Verificar se já foi feita a norma deste vertice!
                let normaisTri = [];
                let cont = 0;
                for (let j = i; j < this.triangulos.length; j++) {
                    if(this.triangulos[i].vertice2.x == this.triangulos[j].vertice1.x &&
                        this.triangulos[i].vertice2.y == this.triangulos[j].vertice1.y &&
                        this.triangulos[i].vertice2.z == this.triangulos[j].vertice1.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice2.x == this.triangulos[j].vertice2.x &&
                            this.triangulos[i].vertice2.y == this.triangulos[j].vertice2.y &&
                            this.triangulos[i].vertice2.z == this.triangulos[j].vertice2.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice2.x == this.triangulos[j].vertice3.x &&
                        this.triangulos[i].vertice2.y == this.triangulos[j].vertice3.y &&
                        this.triangulos[i].vertice2.z == this.triangulos[j].vertice3.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }
                }

                let somador=new Vetor(0,0,0);
                for (let j = 0; j < cont; j++) {
                    somador=SomaVetores(somador,normaisTri[j]);
                }
                this.triangulos[i].vertice2.normal =multiplicarVetorPorEscalar(1/cont,somador);
            }

            if(this.triangulos[i].vertice3.normal == null){//Verificar se já foi feita a norma deste vertice!
                let normaisTri = [];
                let cont = 0;
                for (let j = i; j < this.triangulos.length; j++) {
                    if(this.triangulos[i].vertice3.x == this.triangulos[j].vertice1.x &&
                        this.triangulos[i].vertice3.y == this.triangulos[j].vertice1.y &&
                        this.triangulos[i].vertice3.z == this.triangulos[j].vertice1.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice3.x == this.triangulos[j].vertice2.x &&
                            this.triangulos[i].vertice3.y == this.triangulos[j].vertice2.y &&
                            this.triangulos[i].vertice3.z == this.triangulos[j].vertice2.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice3.x == this.triangulos[j].vertice3.x &&
                        this.triangulos[i].vertice3.y == this.triangulos[j].vertice3.y &&
                        this.triangulos[i].vertice3.z == this.triangulos[j].vertice3.z ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }
                }

                let somador=new Vetor(0,0,0);
                for (let j = 0; j < cont; j++) {
                    somador=SomaVetores(somador,normaisTri[j]);
                }
                this.triangulos[i].vertice3.normal =multiplicarVetorPorEscalar(1/cont,somador);
            }
        }
    }

}

 