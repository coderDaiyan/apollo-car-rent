"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
async function main() {
    try {
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Example app listening on port ${config_1.default.port}`);
        });
        await mongoose_1.default.connect(config_1.default.db_url);
    }
    catch (e) {
        console.log(e);
    }
}
main();
process.on('uncaughtException', () => {
    console.log(`😈 Uncaught exception detected: shutting down the server`);
    process.exit(1);
});
process.on('unhandledRejection', () => {
    console.log(`😈 Unhandled rejection detected: shutting down the server`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
