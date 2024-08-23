"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const CreateBid_dto_1 = require("./dtos/CreateBid.dto");
const mongoose_1 = require("mongoose");
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    async createBid(createBidDto, res) {
        const isValidCity = mongoose_1.default.Types.ObjectId.isValid(createBidDto.city);
        if (!isValidCity)
            throw new common_1.HttpException('City does not exist', 400);
        const customer = await this.customersService.createBid(createBidDto);
        if (customer === 'City does not exist') {
            throw new common_1.HttpException('City does not exist', 400);
        }
        else if (customer === null) {
            throw new common_1.HttpException('Invalid data', 400);
        }
        else if (customer) {
            return res.status(201).json({
                data: customer,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)('/create-bid'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBid_dto_1.CreateBidDto, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "createBid", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map