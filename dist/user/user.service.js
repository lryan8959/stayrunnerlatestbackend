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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const Bid_schema_1 = require("../schemas/Bid.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const Customer_schema_1 = require("../schemas/Customer.schema");
let UserService = class UserService {
    constructor(bidModel, customerModel) {
        this.bidModel = bidModel;
        this.customerModel = customerModel;
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    findAll() {
        return `This action returns all user`;
    }
    async findOne(bitId, userRole) {
        console.log('id------>', bitId);
        const customerBid = await this.bidModel.findOne({ _id: bitId }).exec();
        console.log('db data---->', customerBid);
        const customerID = customerBid.customer.toString();
        console.log('db id---->', customerID);
        const customerData = await this.customerModel
            .findOne({ _id: customerID })
            .exec();
        console.log('customerData', customerData);
        return { customerData, userRole, bitId };
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(Bid_schema_1.Bid.name)),
    __param(1, (0, mongoose_2.InjectModel)(Customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], UserService);
//# sourceMappingURL=user.service.js.map