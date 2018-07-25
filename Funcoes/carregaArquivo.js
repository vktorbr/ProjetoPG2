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

