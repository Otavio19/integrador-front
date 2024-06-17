class Convert {
  //Método para receber uma data, caso essa seja 1, será adicionado um 0, ficando 01.
  date(number) {
    const numberString = number.toString();

    return numberString.length < 2 ? 0 + numberString : numberString;
  }
}

export default Convert;
