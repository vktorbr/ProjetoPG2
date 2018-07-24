class Camera{

    constructor(C,N,V,d,hx,hy){
        this.C =C;
        this.N = N;
        this.V = V;
        this.d = d;
        this.hx = hx;
        this.hy = hy;
        
        this.V_orto = OrtogonalizarVetor(V,N);
        this.V_norm = normalizarVetor(this.V_orto);
        this.N_norm = normalizarVetor(N);
        this.U = produtoVetorial(this.V_norm,this.N_norm);
    }
}
