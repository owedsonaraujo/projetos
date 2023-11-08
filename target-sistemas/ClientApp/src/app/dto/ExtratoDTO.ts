export interface ExtratoDTO {
    id: number,
    descricao: string,
    data: Date,
    valor: number,
    avulso: boolean,
    status: "Válido" | "Cancelado"
}

