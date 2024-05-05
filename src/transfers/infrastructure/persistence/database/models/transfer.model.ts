import * as dynamoose from 'dynamoose';

const transferSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  validated: {
    type: Boolean,
  },
  inUse: {
    type: Boolean,
  },
  monto: {
    type: String,
  },
  tipo: {
    type: String,
  },
  fechaMovimiento: {
    type: Number,
  },
  fecha: {
    type: String,
  },
  originName: {
    type: String,
  },
  originRut: {
    type: String,
  },
  originAccount: {
    type: String,
  },
  receiverRut: {
    type: String,
  },
  receiverAccount: {
    type: String,
  },
  originBankCode: {
    type: String,
  },
  originBankName: {
    type: String,
  },
  comment: {
    type: String,
    required: false,
  },
  originAccountType: {
    type: String,
  },
  validatedAt: {
    type: String,
    required: false,
    default: undefined,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

export const Transfer = dynamoose.model('Transfer', transferSchema, {
  create: false,
  waitForActive: false,
});
