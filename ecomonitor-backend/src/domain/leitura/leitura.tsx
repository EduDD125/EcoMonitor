export class Leitura {
    private local: String;
    private dataHorario: String;
    private tipoMedicao: String;
    private valor: String;

    constructor(local: String, dataHorario: String, tipoMedicao: String, valor: String ) {
        this.local = local;
        this.dataHorario = dataHorario;
        this.tipoMedicao = tipoMedicao;
        this.valor = valor;
    }

    getLocal(): String {
        return this.local;
    }

    setLocal(local: String): void {
        this.local = local;
    }

    getDataHorario(): String {
        return this.dataHorario;
    }

    setDataHorario(dataHorario: String): void {
        this.dataHorario = dataHorario;
    }

    getTipoMedicao(): String {
        return this.tipoMedicao;
    }

    setTipoMedicao(tipoMedicao: String): void {
        this.tipoMedicao = tipoMedicao;
    }

    getValor(): String {
        return this.valor;
    }

    setValor(valor: String): void {
        this.valor = valor;
    }
}