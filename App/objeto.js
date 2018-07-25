class Objeto{
    constructor(nome,qtd_pontos,qtd_triangulos,pontos,triangulos){
        this.nome = nome;
        this.qtd_pontos = qtd_pontos;
        this.qtd_triangulos = qtd_triangulos;
        this.pontos = pontos;
        this.triangulos = triangulos;
        this.pontos_tela = [];
    }

    NormalTriangulo(){
        for (let index = 0; index < this.triangulos.length; index++) {
           
            let U = new Vetor();
            let V = new Vetor();
            U = SubtracaoPontos(this.pontos[this.triangulos[index].vertice1],this.pontos[this.triangulos[index].vertice2]);
            V = SubtracaoPontos(this.pontos[this.triangulos[index].vertice1],this.pontos[this.triangulos[index].vertice3]);
            
            let N = new Vetor();
        
            N = produtoVetorial(U,V);
        
            this.triangulos[index].normal = N;
        }
    }

    NormalVertices(){
        for (let i = 0; i < this.triangulos.length; i++) {
            if(this.pontos[this.triangulos[i].vertice1].normal == null){//Verificar se já foi feita a norma deste vertice!
                let normaisTri = [];
                let cont = 0;
                for (let j = i; j < this.triangulos.length; j++) {
                    if(this.triangulos[i].vertice1 == this.triangulos[j].vertice1){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice1 == this.triangulos[j].vertice2 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice1 == this.triangulos[j].vertice3){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }
                }

                let somador=new Vetor(0,0,0);
                for (let j = 0; j < cont; j++) {                    
                    somador=SomaVetores(somador,normaisTri[j]);
                }
                this.pontos[this.triangulos[i].vertice1].normal =multiplicarVetorPorEscalar(1/cont,somador);//Divisão da soma das normais pelo numero de triangulos ao que o vertice faz parte
            }

            if(this.pontos[this.triangulos[i].vertice2].normal == null){//Verificar se já foi feita a norma deste vertice!
                let normaisTri = [];
                let cont = 0;
                for (let j = i; j < this.triangulos.length; j++) {
                    if(this.triangulos[i].vertice2 == this.triangulos[j].vertice1 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice2 == this.triangulos[j].vertice2 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice2 == this.triangulos[j].vertice3 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }
                }

                let somador=new Vetor(0,0,0);
                for (let j = 0; j < cont; j++) {
                    somador=SomaVetores(somador,normaisTri[j]);
                }
                this.pontos[this.triangulos[i].vertice2].normal =multiplicarVetorPorEscalar(1/cont,somador);
            }

            if(this.pontos[this.triangulos[i].vertice3].normal == null){//Verificar se já foi feita a norma deste vertice!
                let normaisTri = [];
                let cont = 0;
                for (let j = i; j < this.triangulos.length; j++) {
                    if(this.triangulos[i].vertice3 == this.triangulos[j].vertice1 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice3 == this.triangulos[j].vertice2 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }else if(this.triangulos[i].vertice3 == this.triangulos[j].vertice3 ){
                        normaisTri[cont] = this.triangulos[j].normal;
                        cont++;
                    }
                }

                let somador=new Vetor(0,0,0);
                for (let j = 0; j < cont; j++) {
                    somador=SomaVetores(somador,normaisTri[j]);
                }
                this.pontos[this.triangulos[i].vertice3].normal =multiplicarVetorPorEscalar(1/cont,somador);
            }
        }
    }

}

 