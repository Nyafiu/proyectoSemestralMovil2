export default interface Place{
    nombre: string;
    apellido: string;
    edad: number;
    genero: string;
    correo: string;
    marcaAuto: string;
    modeloAuto: string;
    patenteAuto: string;
    foto?: File; 
}