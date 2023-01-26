export function formataReais(preco) {
  if (typeof preco !== "string" && typeof preco !== "number")
    return "valor inválido";
  if (typeof preco === "string") {
    preco = Number(preco);
    if (isNaN(preco)) return "valor inválido";
    console.log(preco);
  }
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}

export function formataData(dataHora) {
  if (typeof dataHora === "number") {
    const data = new Date();
    data.setTime(dataHora);
    dataHora = data;
  }
  return dataHora.toLocaleDateString();
}
