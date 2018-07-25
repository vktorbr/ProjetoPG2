var Objetos = [];
var camera;
var iluminacao;
let I;

function Inicializar(){
    prepararCamera();
    mudarCoordenadasVista();
    normais_Triangulos_Vertices();
    normalizar_Normais();
    projecaoPespectiva();
    mudarCoordenadasTela();
    ordenarVertices();
    console.log(Objetos);
}

//Função para criar o vetor U e a matriz I
function prepararCamera(){

    camera.V_orto = OrtogonalizarVetor(camera.V, camera.N);
    camera.V_norm = normalizarVetor(camera.V_orto);
    camera.N_norm = normalizarVetor(camera.N);
    camera.U = produtoVetorial(camera.V_norm, camera.N_norm);

    I=matrizVetores(camera.U,camera.V_norm,camera.N_norm);

}

//Função para mudar as coordenadas de mundo para de vista
function mudarCoordenadasVista(){
    //Mudar coordenadas dos pontos
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].qtd_pontos; j++) {
            let aux = Objetos[i].pontos[j];
            let aux_vet = SubtracaoPontos(camera.C,aux);
            Objetos[i].pontos[j] = MultMatrizVetor(I,aux_vet);
        }
    }
    //Mudar coordenadas da fonte de luz
    let auxIlu_vet = SubtracaoPontos(camera.C,iluminacao.Pl);
    iluminacao.Pl = MultMatrizVetor(I,auxIlu_vet);

}

//Função para calcular as normais dos triangulos e das suas vertices
function normais_Triangulos_Vertices(){
    Objetos[Objetos.length-1].NormalTriangulo();
    Objetos[Objetos.length-1].NormalVertices();
}

//Função para normalizar as normais dos triangulos e vertices
function normalizar_Normais(){
    //Normaliza as normas dos triangulos
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].triangulos.length; j++) {
            let aux = Objetos[i].triangulos[j].normal;
            Objetos[i].triangulos[j].normal = normalizarVetor(aux);
        }
    }
    //Normaliza as normas dos vertices
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].pontos.length; j++) {
            let aux = Objetos[i].pontos[j].normal;
            Objetos[i].pontos[j].normal = normalizarVetor(aux);
        }
    }
    
}

//Função para converter os vertices de coordenadas de vista para perspectiva
function projecaoPespectiva(){
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].pontos.length; j++) {
            Objetos[i].pontos_tela[j] = new Ponto();
            Objetos[i].pontos_tela[j].x = (Objetos[i].pontos[j].x/Objetos[i].pontos[j].z)*(camera.d/camera.hx);
            Objetos[i].pontos_tela[j].y = (Objetos[i].pontos[j].y/Objetos[i].pontos[j].z)*(camera.d/camera.hy);
        }
    }
}

//Função para converter para as coordenadas de tela
function mudarCoordenadasTela(){
    let telaX = window.screen.availWidth;
    let telaY = window.screen.availHeight;
    console.log(telaX, telaY);
    
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].pontos.length; j++) {
            
            let ptX = Objetos[i].pontos_tela[j].x;
            let ptY = Objetos[i].pontos_tela[j].y;
           
            Objetos[i].pontos_tela[j].x = parseInt(((ptX+1)/2)*telaX);
            Objetos[i].pontos_tela[j].y = parseInt(((1-ptY)/2)*telaY);

        }
    }
}

//Função para Ordenar os vertices dos triangulos pelo menor Y
function ordenarVertices(){
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].triangulos.length; j++) {

            let aux1=Objetos[i].triangulos[j].vertice1;
            let aux2=Objetos[i].triangulos[j].vertice2;
            let aux3=Objetos[i].triangulos[j].vertice3;

            if(Objetos[i].pontos[aux1].y<Objetos[i].pontos[aux2].y){
                Objetos[i].triangulos[j].vertice1 = aux2;
                Objetos[i].triangulos[j].vertice2 = aux1;
                aux1=Objetos[i].triangulos[j].vertice1;
                aux2=Objetos[i].triangulos[j].vertice2;

            }else if(Objetos[i].pontos[aux1].y==Objetos[i].pontos[aux2].y){
                if(Objetos[i].pontos[aux1].x<Objetos[i].pontos[aux2].x){
                    Objetos[i].triangulos[j].vertice1 = aux2;
                    Objetos[i].triangulos[j].vertice2 = aux1;
                    aux1=Objetos[i].triangulos[j].vertice1;
                    aux2=Objetos[i].triangulos[j].vertice2;
                }
            }

            if(Objetos[i].pontos[aux1].y<Objetos[i].pontos[aux3].y){
                Objetos[i].triangulos[j].vertice1 = aux3;
                Objetos[i].triangulos[j].vertice3 = aux1;
                aux1=Objetos[i].triangulos[j].vertice1;
                aux3=Objetos[i].triangulos[j].vertice3;

            }else if(Objetos[i].pontos[aux1].y==Objetos[i].pontos[aux2].y){
                if(Objetos[i].pontos[aux1].x<Objetos[i].pontos[aux2].x){
                    Objetos[i].triangulos[j].vertice1 = aux3;
                    Objetos[i].triangulos[j].vertice3 = aux1;
                    aux1=Objetos[i].triangulos[j].vertice1;
                    aux3=Objetos[i].triangulos[j].vertice3;
                }
            }

            if(Objetos[i].pontos[aux2].y<Objetos[i].pontos[aux3].y){
                Objetos[i].triangulos[j].vertice2 = aux3;
                Objetos[i].triangulos[j].vertice3 = aux2;
                aux2=Objetos[i].triangulos[j].vertice2;
                aux3=Objetos[i].triangulos[j].vertice3;

            }else if(Objetos[i].pontos[aux2].y==Objetos[i].pontos[aux3].y){
                if(Objetos[i].pontos[aux2].x<Objetos[i].pontos[aux3].x){
                    Objetos[i].triangulos[j].vertice2 = aux3;
                    Objetos[i].triangulos[j].vertice3 = aux2;
                    aux2=Objetos[i].triangulos[j].vertice2;
                    aux3=Objetos[i].triangulos[j].vertice3;
                }
            }
        }
    }
}
/*
function IluminacaoCriada(){
    console.log(iluminacao);
    
}*/