var arquivo_objetos = [];
var arquivo_iluminacao;
var arquivo_camera;

var upFile = function(parametro) {

    if(parametro=="id_objetos"){
        var objectsFileSelected = document.getElementById('id_objetos').files;
        //for (let i = 0; i < objectsFileSelected.length; i++) {
            var objectsFileTobeRead = objectsFileSelected;
            //console.log(objectsFileSelected[0].name);
            let indice=0;
            var objectsFileReader = [];
            for (let i = 0; i < objectsFileSelected.length; i++) {
                objectsFileReader[i] = new FileReader();
            }
            //objectsFileReader = new FileReader();
            //objectsFileReader.readAsText(objectsFileTobeRead);
            objectsFileReader[indice].onload = function (e) {
                //console.log(objectsFileReader);
                
                //console.log(objectsFileReader.result);
                //console.log(objectsFileReader);
                for (let j = 0; j < objectsFileSelected.length; j++) {
                    //console.log(j);

                    //console.log(objectsFileReader[j]);
                    
                    arquivo_objetos[j] = objectsFileReader[j].result;
                    let nome = objectsFileSelected[j].name;
                   // console.log("\n\n\nDocumento objeto: \n\n");
                   // console.log(arquivo_objetos[j]);
                   
                   //console.log(nome);
                   
                    decomporArquivo(j,nome); 
                //indice++;
                }
            }
            //console.log(objectsFileTobeRead);
            while(indice<objectsFileSelected.length){
                //objectsFileReader[indice] = new FileReader();
                objectsFileReader[indice].readAsText(objectsFileTobeRead[indice]);
                indice++;
            }
        //}
    }
    else if(parametro=="id_camera"){
        var cameraFileSelected = document.getElementById('id_camera');
        var cameraFileTobeRead = cameraFileSelected.files[0];
        var cameraFileReader = new FileReader();
        cameraFileReader.onload = function (e){
            arquivo_camera = cameraFileReader.result;
            //console.log("\n\n\ndocumento camera:\n\n");
            //console.log(cameraFileReader.result);
            decomporArquivoCamera(arquivo_camera);

        }
        cameraFileReader.readAsText(cameraFileTobeRead);
    }
    else{
        var illumFileSelected = document.getElementById('id_iluminacao');
        
        var illumFileTobeRead = illumFileSelected.files[0];
        var illumFileReader = new FileReader();
        illumFileReader.onload = function (e){
            arquivo_iluminacao = illumFileReader.result;
            //console.log("\n\n\nDocumento iluminação:\n\n");
            //console.log(illumFileReader.result);

            decomporArquivoIluminacao(arquivo_iluminacao);

            
        }
        illumFileReader.readAsText(illumFileTobeRead);
        
    }
}
//var objetos ="";
/*
window.onload = function () {
    //Verifica se o navegador suporta a api
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('id_objetos');
        fileSelected.addEventListener('change', function (e) {
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) { 
                    objetos=fileReader.result;
                    decomporArquivo();
                }
                fileReader.readAsText(fileTobeRead);
        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }
}*/

function decomporArquivo(indice, nome){
    var linhas = arquivo_objetos[indice].split('\n');
    //console.log(linhas);
    var qtd = linhas[0].split(' ');
    qtd[0] = parseInt(qtd[0]);
    qtd[1] = parseInt(qtd[1]);

    //console.log(qtd);
    
    
    var pts;
    var ponto;
    var pontosVet = [];
    for (let i = 1; i <= qtd[0]; i++) {
        pts = linhas[i];

        ponto = pts.split(' ');
        pontosVet[i-1] = new Ponto(ponto[0],ponto[1],ponto[2]);
    }
    //console.log(pontosVet);
    
    var tri;
    var triangulo;
    var triangulosTri = [];
    for (let a = qtd[0]+1; a <= qtd[0]+qtd[1]; a++) {
        tri = linhas[a];
        
        triangulo =tri.split(' ');
        //console.log(triangulo);
        //console.log(triangulo[0],triangulo[1],triangulo[2]);
        
        //console.log(new Vertice(pontosVet[triangulo[0]-1]),new Vertice(pontosVet[triangulo[1]-1]),new Vertice(pontosVet[triangulo[2]-1]));
        //console.log(a);
        
        //triangulosTri[a-1-qtd[0]] = new Triangulo(new Vertice(pontosVet[triangulo[0]-1]),new Vertice(pontosVet[triangulo[1]-1]),new Vertice(pontosVet[triangulo[2]-1]));
        //triangulosTri[a-1-qtd[0]] = new Triangulo(pontosVet[triangulo[0]-1],pontosVet[triangulo[1]-1],pontosVet[triangulo[2]-1]);/*Correto*/
        triangulosTri[a-1-qtd[0]] = new Triangulo(triangulo[0]-1,triangulo[1]-1,triangulo[2]-1);
        
    }
   //console.log(triangulosTri);

   let posicao_string = nome.indexOf(".");
   nome = nome.substring(0,posicao_string);

    Objetos[Objetos.length] = new Objeto(nome,qtd[0],qtd[1],pontosVet,triangulosTri);
    /*objeto1.NormalTriangulo();
    objeto1.NormalVertices();
    console.log(objeto1);*/
    ObjetoCriado();
    
}

function decomporArquivoCamera(arquivo){
    let linhas = arquivo.split('\n');
    //console.log(arquivo);

    let c = linhas[0].split(' ');
    let posicao_camera = new Ponto(parseFloat(c[0]), parseFloat(c[1]), parseFloat(c[2]));
    //console.log(posicao_camera);

    let n = linhas[1].split(' ');    
    let vetor_N = new Vetor(parseFloat(n[0]), parseFloat(n[1]), parseFloat(n[2]));
    //console.log(vetor_N);

    let v = linhas[2].split(' ');
    let vetor_V = new Vetor(parseFloat(v[0]), parseFloat(v[1]), parseFloat(v[2]));
    //console.log(vetor_V);

    let outros = linhas[3].split(' ');
    let distancia = parseFloat(outros[0]);
    let hx = parseFloat(outros[1]);
    let hy = parseFloat(outros[2]);
    //console.log(distancia, hx, hy);
    
    var camera1 = new Camera(posicao_camera, vetor_N, vetor_V, distancia, hx, hy);
}

function decomporArquivoIluminacao(arquivo){
    let linhas = arquivo.split('\n');
    //console.log(linhas);

    let l = linhas[0].split(' ');
    let posicao_luz = new Ponto(parseFloat(l[0]), parseFloat(l[1]), parseFloat(l[2]));
    //console.log(posicao_luz);

    let aux = linhas[1].split(' ');
    let ka = parseFloat(aux[0]);
    //console.log(ka);

    let corA = linhas[2].split(' ');
    let Ia = new Vetor(parseFloat(corA[0]), parseFloat(corA[1]), parseFloat(corA[2]));
    //console.log(Ia);
    
    let aux2 = linhas[3].split(' ');
    let kd = parseFloat(aux2[0]);
    //console.log(kd);

    let dif = linhas[4].split(' ');
    let Od = new Vetor(parseFloat(dif[0]), parseFloat(dif[1]), parseFloat(dif[2]));
    //console.log(Od);

    let esp = linhas[5].split(' ');
    let ks = parseFloat(esp[0]);
    //console.log(ks);
    
    let corL = linhas[6].split(' ');
    let Il = new Vetor(parseFloat(corL[0]), parseFloat(corL[1]), parseFloat(corL[2]));
    //console.log(Il);

    let rugo = linhas[7].split(' ');
    let n = parseFloat(rugo[0]);
    //console.log(n);

    var iluminacao1 = new Iluminacao(posicao_luz, ka, Ia, kd, Od, ks, Il, n);
}