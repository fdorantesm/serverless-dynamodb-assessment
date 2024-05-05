import type { OriginAccountType } from '@/transfers/domain/enums/origin-account-type.enum';
import type { TransferType } from '@/transfers/domain/enums/transfer-type.enum';

export interface Transfer {
  id: string;
  validated: boolean;
  inUse: boolean;
  monto: string;
  tipo: TransferType;
  fechaMovimiento: number;
  fecha: string;
  originName: string;
  originRut: string;
  originAccount: string;
  receiverRut: string;
  receiverAccount: string;
  originBankCode: string;
  originBankName: string;
  comment: string;
  originAccountType: OriginAccountType;
  validatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
