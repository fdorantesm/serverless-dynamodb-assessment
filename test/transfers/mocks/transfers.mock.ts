import { OriginAccountType } from '@/transfers/domain/enums/origin-account-type.enum';
import { TransferType } from '@/transfers/domain/enums/transfer-type.enum';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';

export const transfers: Transfer[] = [
  {
    id: 'C00001',
    validated: true,
    inUse: false,
    monto: '1',
    tipo: TransferType.abono,
    fechaMovimiento: 1649909719000,
    fecha: '14-04-2022 00:15',
    originName: 'NOMBRE EMPRESA',
    originRut: '0223335554',
    originAccount: '00000000000087654321',
    receiverRut: '0112223334',
    receiverAccount: '00000012345678',
    originBankCode: 'cl_bci',
    originBankName: 'Banco BCI',
    comment: '',
    originAccountType: OriginAccountType.cuenta_corriente,
    validatedAt: new Date('2022-04-14T04:18:32.922Z'),
    createdAt: new Date('2022-04-14T04:15:19.000Z'),
    updatedAt: new Date('2022-06-07T23:59:58.569Z'),
  },
  {
    id: 'C00002',
    validated: false,
    inUse: false,
    monto: '100',
    tipo: TransferType.abono,
    fechaMovimiento: 1654344300000,
    fecha: '04-06-2022 12:05',
    originName: 'NOMBRE EMPRESA 2',
    originRut: '0334445556',
    originAccount: '00000000000087654322',
    receiverRut: '0112223334',
    receiverAccount: '00000012345678',
    originBankCode: 'cl_santander',
    originBankName: 'Banco Santander',
    comment: 'Pago cuentas basicas',
    originAccountType: OriginAccountType.cuenta_corriente,
    validatedAt: null,
    createdAt: new Date('2022-06-04T16:30:17.210929'),
    updatedAt: new Date('2022-06-04T16:31:01.450Z'),
  },
  {
    id: 'C00010',
    validated: true,
    inUse: false,
    monto: '100230',
    tipo: TransferType.abono,
    fechaMovimiento: 1654533240000,
    fecha: '06-06-2022 16:34',
    originName: 'NOMBRE EMPRESA 3',
    originRut: '0111111111',
    originAccount: '00000000000087654568',
    receiverRut: '0112223334',
    receiverAccount: '00000012345678',
    originBankCode: 'cl_bch',
    originBankName: 'Banco de Chile/Edwards',
    comment: 'SE ME OLVIDO LA FECHA DE LIMITA PARA PAGAR',
    originAccountType: OriginAccountType.cuenta_corriente,
    validatedAt: new Date('2022-06-06T21:01:06.078Z'),
    createdAt: new Date('2022-06-06T21:00:17.954396'),
    updatedAt: new Date('2022-06-06T21:01:06.078Z'),
  },
  {
    id: 'C00001',
    validated: true,
    inUse: false,
    monto: '1',
    tipo: TransferType.abono,
    fechaMovimiento: 1649909719000,
    fecha: '14-04-2022 00:15',
    originName: 'NOMBRE EMPRESA',
    originRut: '0223335554',
    originAccount: '00000000000087654321',
    receiverRut: '0112223334',
    receiverAccount: '00000012345678',
    originBankCode: 'cl_bci',
    originBankName: 'Banco BCI',
    comment: '',
    originAccountType: OriginAccountType.cuenta_corriente,
    validatedAt: new Date('2022-04-14T04:18:32.922Z'),
    createdAt: new Date('2022-04-14T04:15:19.000Z'),
    updatedAt: new Date('2022-06-07T23:59:58.569Z'),
  },
  {
    id: 'C03010',
    validated: true,
    inUse: false,
    monto: '125420',
    tipo: TransferType.abono,
    fechaMovimiento: 1654089840000,
    fecha: '01-06-2022 13:24',
    originName: 'NOMBRE EMPRESA 3',
    originRut: '0111111111',
    originAccount: '00000000000087654568',
    receiverRut: '018765534K',
    receiverAccount: '00000026453879',
    originBankCode: 'cl_bch',
    originBankName: 'Banco de Chile/Edwards',
    comment: 'pago adelantadó',
    originAccountType: OriginAccountType.cuenta_vista,
    validatedAt: new Date('2022-06-01T17:31:18.116Z'),
    createdAt: new Date('2022-06-01T17:30:16.361500'),
    updatedAt: new Date('2022-06-01T17:31:18.116Z'),
  },
  {
    id: 'A00001',
    validated: false,
    inUse: false,
    monto: '2500000',
    tipo: TransferType.cargo,
    fechaMovimiento: 1654060260000,
    fecha: '01-06-2022 05:11',
    originName: 'ETPAY',
    originRut: '0112223334',
    originAccount: '00000000000087654321',
    receiverRut: '0762223334',
    receiverAccount: '00000012356946',
    originBankCode: 'cl_santander',
    originBankName: 'Banco Santander',
    comment: 'Pago proveedor id 01',
    originAccountType: OriginAccountType.cuenta_corriente,
    validatedAt: new Date('2022-06-01T09:30:48.360Z'),
    createdAt: new Date('2022-06-01T09:30:14.425026'),
    updatedAt: new Date('2022-06-01T09:30:48.360Z'),
  },
];
