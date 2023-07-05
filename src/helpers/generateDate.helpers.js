export const getNowDate = () => {
    let fechaActual = new Date();
    let anio = fechaActual.getFullYear();
    let mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    let dia = String(fechaActual.getDate()).padStart(2, '0');
    let fechaFormateada = anio + '-' + mes + '-' + dia;
    return fechaFormateada;
}

export const getNowTime = () => {
    let fechaActual = new Date();
    let hora = String(fechaActual.getHours()).padStart(2, '0');
    let minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    let segundos = String(fechaActual.getSeconds()).padStart(2, '0');
    let horaFormateada = hora + ':' + minutos + ':' + segundos;
    return horaFormateada;
}