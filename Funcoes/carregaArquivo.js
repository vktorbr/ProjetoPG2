
var arquivo ="";

window.onload = function () {
    //Verifica se o navegador suporta a api
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = (function(f) {
                    return function(e){

                    };
                })()
                fileReader.onload = function (e) { 
                    arquivo=fileReader.result;
                    decomporArquivo();
                }
                fileReader.readAsText(fileTobeRead);
        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }
}

function decomporArquivo(){
    var linhas = arquivo.split('\n');
    //console.log(arquivos);
    var qtd = linhas[0].split(' ');
    qtd[0] = parseInt(qtd[0]);
    qtd[1] = parseInt(qtd[1]);
    
    
    var pts;
    var ponto;
    var pontosVet = [];
    for (let i = 1; i <= qtd[0]; i++) {
        pts = linhas[i];

        ponto = pts.split(' ');
        pontosVet[i-1] = new Ponto(ponto[0],ponto[1],ponto[2]);
    }

    var tri;
    var triangulo;
    var triangulosTri = [];
    for (let a = qtd[0]+1; a <= qtd[0]+qtd[1]; a++) {
        tri = linhas[a];
        
        triangulo =tri.split(' ');
        triangulosTri[a-1-qtd[0]] = new Triangulo(new Vertice(pontosVet[triangulo[0]-1]),new Vertice(pontosVet[triangulo[1]-1]),new Vertice(pontosVet[triangulo[2]-1]));
    }
    
    var objeto1 = new Objeto(qtd[0],qtd[1],pontosVet,triangulosTri);
    objeto1.NormalVertices();
    //console.log(objeto1);

    
}