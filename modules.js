class Vector {
    constructor(x){
        this.data = x;
        this.length = x.length;
    }

    GetVector(){
        return this.data;
    }

    GetShape(){
        return `(1, ${this.length})`;
    }

};

class Matrix {

    Set(x=[]){
        this.data = x;
        this.noCols = x.length ? x[0].length : 0;
        this.noRows = x.length ? x.length : 0;

        return this;
    }

    GetShape(){
        return `(${this.noRows}, ${this.noCols})`;
    }

    GetMatrix(){
        let str = '';

        for (let i=0; i<this.noRows; i++){
            str += '[';
            for (let j=0; j<this.noCols; j++){
                str += this.data[i][j];
                if (j != this.noCols-1){
                    str += ','
                }
            }
            str += ']\n';
        }

        return str;
    }

    ConvertToArr(){
        return this.data;
    }

    SetDiagonal(size, scalar){
        let x = [];
        for (let i=0; i<size; i++){
            x.push([]);
            for (let j=0; j<size; j++){
                (i==j) ? x[i][j]=scalar : x[i][j]=0;
            }
        }
        return new Matrix().Set(x);
    }

    SetIdentity(size){
        return this.SetDiagonal(size, 1);
    }

    SetZeros(size){
        return this.SetDiagonal(size, 0);
    }

    SetOnes(size){
        let x = [];
        for (let i=0; i<size; i++){
            x.push([]);
            for (let j=0; j<size; j++){
                x[i][j] = 1;
            }
        }

        return new Matrix().Set(x);
    }

    MakeTranspose(){
        var rows = this.noRows;
        var cols = this.noCols;
        var m1 = this.ConvertToArr();

        let x = [];

        for (let i=0; i<cols; i++){
            x.push([]);
            for (let j=0; j<rows; j++){
                x[i][j] = m1[j][i];
            }
        }

        return new Matrix().Set(x);
    }

    GetSum(){
        var rows = this.noRows;
        var cols = this.noCols;
        var sum = 0;

        let m1 = this.ConvertToArr();
        
        for (let i=0; i<rows; i++){
            for (let j=0; j<cols; j++){
                sum += m1[i][j];
            }
        }

        return sum;
    }

    AddScalar(scalar){
        var rows = this.noRows;
        var cols = this.noCols;

        let m1 = this.ConvertToArr();

        for (let i=0; i<rows; i++){
            for (let j=0; j<cols; j++){
                m1[i][j] += scalar;
            }
        }

        return new Matrix().Set(m1);
    }

    static Add(m1, m2){
        if (m1.noRows == m2.noRows && m1.noCols == m2.noCols){
            var rows = m1.noRows;
            var cols = m1.noCols;
            m1 = m1.ConvertToArr();
            m2 = m2.ConvertToArr();

            let x = [];

            for (let i=0; i<rows; i++){
                x.push([]);
                for (let j=0; j<cols; j++){
                    x[i].push(m1[i][j]+m2[i][j]);
                }
            }

            return new Matrix().Set(x);
        }else {
            return `Can't add 2 different length Matrices`;
        }
    }

    static Subtract(m1, m2){
        if (m1.noRows == m2.noRows && m1.noCols == m2.noCols){
            var rows = m1.noRows;
            var cols = m1.noCols;
            m1 = m1.ConvertToArr();
            m2 = m2.ConvertToArr();

            let x = [];

            for (let i=0; i<rows; i++){
                x.push([]);
                for (let j=0; j<cols; j++){
                    x[i].push(m1[i][j]-m2[i][j]);
                }
            }

            return new Matrix().Set(x);
        }else {
            return `Can't subtract 2 different length Matrices`;
        }
    }

    static ScalarMul(m1, scalar){
        var rows = m1.noRows;
        var cols = m1.noCols;
        m1 = m1.ConvertToArr();

        for (let i=0; i<rows; i++){
            for (let j=0; j<cols; j++){
                m1[i][j] *= scalar;
            }
        }

        return new Matrix().Set(m1);
    }

    static HelperMul(v1, v2){
        var len = v1.length;
        var res = 0;

        for (let i=0; i<len; i++){
            res += (v1[i]*v2[i])
        }

        return res;
    }

    static MatrixMul(m1, m2){
        if (m1.noCols == m2.noRows){
            var rows = m1.noRows;

            m1 = m1.ConvertToArr();
            m2 = m2.MakeTranspose().ConvertToArr();

            var x = [];
            for (let i=0; i<rows; i++){
                x.push([]);
                for (let j=0; j<rows; j++){
                    x[i][j] = Matrix.HelperMul(m1[i],m2[j]);
                }
            }
            return new Matrix().Set(x);
        }else {
            return `Wrond Dimensions`;
        }
    }

    static MatrixElementMul(m1, m2){
        if (m1.noRows == m2.noRows && m1.noCols == m2.noCols){
            var rows = m1.noRows;
            var cols = m1.noCols;
            m1 = m1.ConvertToArr();
            m2 = m2.ConvertToArr();

            let x = [];

            for (let i=0; i<rows; i++){
                x.push([]);
                for (let j=0; j<cols; j++){
                    x[i].push(m1[i][j]*m2[i][j]);
                }
            }

            return new Matrix().Set(x);
        }else {
            return `Can't Mul 2 different length Matrices`;
        }
    }

    static DotProduct(m1, m2){
        let mR = Matrix.MatrixElementMul(m1, m2);

        return mR.GetSum();
    }
};

module.exports = {
    Vector, Matrix, 
}