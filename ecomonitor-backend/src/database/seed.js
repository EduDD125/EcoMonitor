"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var fs_1 = require("fs");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
// Carregar variáveis de ambiente
dotenv_1.default.config();
// Configurar conexão com o banco de dados
var sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: console.log, // Para ver os logs das queries
});
// Função para executar o arquivo SQL
var runSeed = function () { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, sql, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 6]);
                console.log("🚀 Rodando seed do banco de dados...");
                // Limpando dados antigos
                return [4 /*yield*/, sequelize.query('DELETE FROM "reading";')];
            case 1:
                // Limpando dados antigos
                _a.sent();
                console.log("🗑️  Dados antigos removidos da tabela 'reading'.");
                filePath = path_1.default.join(__dirname, "insert_readings.sql");
                sql = fs_1.default.readFileSync(filePath, "utf8");
                // Executando SQL no banco
                return [4 /*yield*/, sequelize.query(sql)];
            case 2:
                // Executando SQL no banco
                _a.sent();
                console.log("✅ Seed executado com sucesso!");
                return [3 /*break*/, 6];
            case 3:
                error_1 = _a.sent();
                console.error("❌ Erro ao executar seed:", error_1);
                return [3 /*break*/, 6];
            case 4: 
            // Fechar conexão com o banco
            return [4 /*yield*/, sequelize.close()];
            case 5:
                // Fechar conexão com o banco
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Executar o seed
runSeed();
