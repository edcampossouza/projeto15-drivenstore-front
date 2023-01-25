export function formataReais(preco) {
  if (typeof preco !== "string" && typeof preco !== "number")
    return "valor inválido";
  if (typeof preco === "string") {
    preco = Number(preco);
    if (isNaN(preco)) return "valor inválido";
  }
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}
