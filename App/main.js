var Objetos = [];
var camera;
var iluminacao;
let I;
let telaX = window.screen.availWidth;
let telaY = window.screen.availHeight;
var ZbufferX = [];
var Zbuffer = [];
var bufferCorX = [];
var bufferCor = [];
let Cd;
let Cs;
let Ca;
let CIlum;

function Inicializar(){
    InicializadorZbuffer();     
    prepararCamera();
    mudarCoordenadasVista();
    normais_Triangulos_Vertices();
    normalizar_Normais();
    projecaoPespectiva();
    mudarCoordenadasTela();
    ordenarVertices();
    desenharTriangulos();
    draw();
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

function desenharTrianguloYIgualBaixo(objetoIndice,vt1,vt2,v3){
    let v1 = Objetos[objetoIndice].pontos_tela[vt1];
    let v2 = Objetos[objetoIndice].pontos_tela[vt2];
    //let v3 = Objetos[objetoIndice].pontos_tela[vt3];

    let Xmin = v1.x;
    let Xmax = v1.x;

    let Mmin = parseInt(parseFloat(v2.y-v1.y)/parseFloat(v2.x-v1.x));
    let Mmax = parseInt(parseFloat(v3.y-v1.y)/parseFloat(v3.x-v1.x));

    for (let Yscan = v1.y; Yscan < v3.y; Yscan++) {
        
        desenhadorBaixo(Xmin,Xmax,Yscan,vt1,vt2,v3,objetoIndice);
        Xmin += parseInt(1/parseFloat(Mmin));
        Xmax += parseInt(1/parseFloat(Mmax));

    }

}

function desenharTrianguloYIgualCima(objetoIndice,vt1,v2,vt3){
    let v1 = Objetos[objetoIndice].pontos_tela[vt1];
    //let v2 = Objetos[objetoIndice].pontos_tela[vt2];
    let v3 = Objetos[objetoIndice].pontos_tela[vt3];

    let Xmin = v3.x;
    let Xmax = v3.x;

    let Mmin = parseInt(parseFloat(v3.y-v1.y)/parseFloat(v3.x-v1.x));
    let Mmax = parseInt(parseFloat(v3.y-v2.y)/parseFloat(v3.x-v2.x));

    for (let Yscan = v3.y; Yscan > v1.y; Yscan--) {
        
        desenhadorCima(Xmin,Xmax,Yscan,vt1,v2,vt3,objetoIndice);
        Xmin -= parseInt(1/parseFloat(Mmin));
        Xmax -= parseInt(1/parseFloat(Mmax));

    }
}

function desenharTriangulos(){
    for (let i = 0; i < Objetos.length; i++) {
        for (let j = 0; j < Objetos[i].triangulos.length; j++) {

            let tri = Objetos[i].triangulos[j];

            if(Objetos[i].pontos_tela[tri.vertice1].y==Objetos[i].pontos_tela[tri.vertice2].y){
                desenharTrianguloYIgualCima(i,tri.vertice1,tri.vertice2,tri.vertice3);

            }else if(Objetos[i].pontos_tela[tri.vertice2].y == Objetos[i].pontos_tela[tri.vertice3].y){
                desenharTrianguloYIgualBaixo(i,tri.vertice1,tri.vertice2,tri.vertice3);

            }else{
                let vertice_aux = new Ponto();
                vertice_aux.x = parseInt(Objetos[i].pontos_tela[tri.vertice1].x + ((parseFloat(Objetos[i].pontos_tela[tri.vertice2].y - Objetos[i].pontos_tela[tri.vertice1].y)/parseFloat(Objetos[i].pontos_tela[tri.vertice3].y-Objetos[i].pontos_tela[tri.vertice1].y))*(Objetos[i].pontos_tela[tri.vertice3].x-Objetos[i].pontos_tela[tri.vertice1].x)));
                vertice_aux.y = Objetos[i].pontos_tela[tri.vertice2].y;
                vertice_aux.z = Math.abs(Objetos[i].pontos[tri.vertice1].z - Objetos[i].pontos[tri.vertice3].z);
                desenharTrianguloYIgualBaixo(i,tri.vertice1,tri.vertice2, vertice_aux);
                desenharTrianguloYIgualCima(i,tri.vertice2,vertice_aux,tri.vertice3);
            }
            
        }
    }
}

function InicializadorZbuffer(){
    for (let i = 0; i < telaY; i++) {
        for (let j = 0; j < telaX; j++) {
            ZbufferX[j] = Infinity;
            bufferCorX[j] = (0,0,0);
        }
        Zbuffer[i] = ZbufferX;
        bufferCor[i] = bufferCorX;
    }
}

function desenhadorBaixo(Xmin,Xmax,Yscan,vt1,vt2,v3,objetoIndice){
    let v1 = Objetos[objetoIndice].pontos_tela[vt1];
    let v2 = Objetos[objetoIndice].pontos_tela[vt2];
    //let v3 = Objetos[objetoIndice].pontos_tela[vt3];

    let vv1 = Objetos[objetoIndice].pontos[vt1];
    let vv2 = Objetos[objetoIndice].pontos[vt2];
    //let vv3 = Objetos[objetoIndice].pontos[vt3];
    let vv3 = new Ponto();
    vv3.z = v3.z;
    vv3.x = (((2*v3.x*camera.hx)/(telaX * camera.d))-(camera.hx/camera.d))*v3.z;
    vv3.y = ((camera.hx/camera.d)-((2*v3.y*camera.hy)/(telaY * camera.d)))*v3.z;
    let p = new Ponto();
    let bari = [];
    let p_linha = new Ponto();
    for (let i = Xmin; i <= Xmax; i++) {
        p.x=i;
        p.y=Yscan;
        
        bari = acharBaricentro(p,v1,v2,v3);
        
        p_linha = SomaPontos(SomaPontos(multiplicarPontoPorEscalar(bari[0],vv1),multiplicarPontoPorEscalar(bari[1],vv2)),multiplicarPontoPorEscalar(bari[2],vv3));

        if( Zbuffer.length > p.x && Zbuffer[p.x].length > p.y && p_linha.z < Zbuffer[p.x][p.y]){
            Zbuffer[p.x][p.y] = p_linha.z;

            let zero = new Ponto(0,0,0);
            let N = SomaVetores(SomaVetores(multiplicarVetorPorEscalar(bari[0],vv1.normal),multiplicarVetorPorEscalar(bari[1],vv2.normal)),multiplicarVetorPorEscalar(bari[2],vv3.normal));
            let V = SubtracaoPontos(zero, p_linha);
            let L = SubtracaoVetorPonto(iluminacao.Pl, p_linha);
            let R = SubtracaoVetores( multiplicarVetorPorEscalar((2*produtoInterno(L,N)),N) ,L);

            N = normalizarVetor(N);
            V = normalizarVetor(V);
            L = normalizarVetor(L);
            R = normalizarVetor(R);

            Ca = multiplicarVetorPorEscalar(iluminacao.ka, iluminacao.Ia);
            Cd = MultiplicacaoComponenteComponente(multiplicarVetorPorEscalar((iluminacao.kd * produtoInterno(N,L)),iluminacao.Od),iluminacao.Il);
            Cs = multiplicarVetorPorEscalar((iluminacao.ks*(Math.pow(produtoInterno(R,V),iluminacao.n))),iluminacao.Il);

            if(produtoInterno(N,V)<0){
                N = multiplicarVetorPorEscalar(-1,N);
            }

            if(produtoInterno(N,L)<0){
                /*iluminacao.kd = 0;
                iluminacao.ks = 0;*/
                Cd = 0;
                Cs = 0;
            }else{
                if(produtoInterno(R,V)<0){
                    //iluminacao.ks = 0;
                    Cs = 0;
                }
            }

            CIlum = SomaVetores(SomaVetores(Ca,Cd),Cs);
            if(CIlum.x > 255){
                CIlum.x = 255;
            }
            if(CIlum.y > 255){
                CIlum.y = 255;
            }
            if(CIlum.z > 255){
                CIlum.z = 255;
            }

            bufferCor[p.x][p.y] = CIlum;
            //draw();
        }

    }
    
}

function desenhadorCima(Xmin,Xmax,Yscan,vt1,v2,vt3,objetoIndice){
    let v1 = Objetos[objetoIndice].pontos_tela[vt1];
    //let v2 = Objetos[objetoIndice].pontos_tela[vt2];
    let v3 = Objetos[objetoIndice].pontos_tela[vt3];

    let vv1 = Objetos[objetoIndice].pontos[vt1];
    //let vv2 = Objetos[objetoIndice].pontos[vt2];
    let vv3 = Objetos[objetoIndice].pontos[vt3];
    let vv2 = new Ponto();
    vv2.z = v2.z;
    vv2.x = (((2*v2.x*camera.hx)/(telaX * camera.d))-(camera.hx/camera.d))*v2.z;
    vv2.y = ((camera.hx/camera.d)-((2*v2.y*camera.hy)/(telaY * camera.d)))*v2.z;
    let p = new Ponto();
    let bari = [];
    let p_linha = new Ponto();
    for (let i = Xmin; i <= Xmax; i++) {
        p.x=i;
        p.y=Yscan;
        
        bari = acharBaricentro(p,v1,v2,v3);
        
        p_linha = SomaPontos(SomaPontos(multiplicarPontoPorEscalar(bari[0],vv1),multiplicarPontoPorEscalar(bari[1],vv2)),multiplicarPontoPorEscalar(bari[2],vv3));

        if( Zbuffer.length > p.x && Zbuffer[p.x].length > p.y && p_linha.z < Zbuffer[p.x][p.y]){
            Zbuffer[p.x][p.y] = p_linha.z;

            let zero = new Ponto(0,0,0);
            let N = SomaVetores(SomaVetores(multiplicarVetorPorEscalar(bari[0],vv1.normal),multiplicarVetorPorEscalar(bari[1],vv2.normal)),multiplicarVetorPorEscalar(bari[2],vv3.normal));
            let V = SubtracaoPontos(zero, p_linha);
            let L = SubtracaoVetorPonto(iluminacao.Pl, p_linha);
            let R = SubtracaoVetores( multiplicarVetorPorEscalar((2*produtoInterno(L,N)),N) ,L);

            N = normalizarVetor(N);
            V = normalizarVetor(V);
            L = normalizarVetor(L);
            R = normalizarVetor(R);

            Ca = multiplicarVetorPorEscalar(iluminacao.ka, iluminacao.Ia);
            Cd = MultiplicacaoComponenteComponente(multiplicarVetorPorEscalar((iluminacao.kd * produtoInterno(N,L)),iluminacao.Od),iluminacao.Il);
            Cs = multiplicarVetorPorEscalar((iluminacao.ks*(Math.pow(produtoInterno(R,V),iluminacao.n))),iluminacao.Il);

            if(produtoInterno(N,V)<0){
                N = multiplicarVetorPorEscalar(-1,N);
            }

            if(produtoInterno(N,L)<0){
                /*iluminacao.kd = 0;
                iluminacao.ks = 0;*/
                Cd = 0;
                Cs = 0;
            }else{
                if(produtoInterno(R,V)<0){
                    //iluminacao.ks = 0;
                    Cs = 0;
                }
            }

            CIlum = SomaVetores(SomaVetores(Ca,Cd),Cs);
            if(CIlum.x > 255){
                CIlum.x = 255;
            }
            if(CIlum.y > 255){
                CIlum.y = 255;
            }
            if(CIlum.z > 255){
                CIlum.z = 255;
            }

            bufferCor[p.x][p.y] = CIlum;

        }

    }
    
}

function acharBaricentro(p,v1,v2,v3){
    let baricentro = [];
    
    let a = (v1.x+v2.x+v3.x);
    let b = a;
    let c = a - p.x;
    
    let d = (v1.y+v2.y+v3.y);
    let e = d;
    let f = d - p.y;

    let gama = (parseFloat((f*a)-(d*c))/parseFloat((a*e)-(d*b)));
    let beta = (parseFloat(c-(b*gama))/parseFloat(a));
    let alfa = 1 - beta - gama;

    baricentro[0] = alfa ;//alfa
    baricentro[1] = beta ;//beta
    baricentro[2] = gama ;//gama

    return baricentro;
}



function draw(){
    var c=document.getElementById("canvas");
    canvas.width = telaX;
    canvas.heigth = telaY;
    var ctx=c.getContext("2d");
    //var canvas = document.getElementById('canvas');
    
    //if(canvas.getContext){
        //var ctx = canvas.getContext('2d');
        for (let i = 0; i < Zbuffer.length; i++) {
            for (let j = 0; j < Zbuffer[i].length; j++) {
                ctx.fillRect(j,i,1,1);
                ctx.fillStyle = "rgb("+bufferCor[i][j].x+","+bufferCor[i][j].y+","+bufferCor[i][j].z+")";
               // ctx.arc(,25,1,0,0);
            }
        }
        
       // ctx.beginPath();
        //ctx.arc(100,75,50,0,2*Math.PI);
        //ctx.stroke();   
        //ctx.fillStyle = "rgb(0,0,0)";
        
        
        //ctx.strokeRect(50,50,50,50);
    //}
}