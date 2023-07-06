const {Vector, Matrix} = require('./modules');

let v1 = new Vector([1,2,3,4,5]);
let m1 = new Matrix().Set([
    [1,2],
    [5,3],
    [2,7]
]);
let m4 = new Matrix().Set([
    [5,3,4],
    [9,1,2]
]);

let m2 = new Matrix().SetDiagonal(3,3);
let m5 = new Matrix().SetIdentity(5);
let m7 = new Matrix().SetOnes(3);

console.log(m2.AddScalar(3));
