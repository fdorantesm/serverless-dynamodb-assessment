import { IsTimestamp } from '@/core/infrastructure/validators/is-timestamp.validator';
import { OriginAccountType } from '@/transfers/domain/enums/origin-account-type.enum';
import { TransferType } from '@/transfers/domain/enums/transfer-type.enum';
import { IsBoolean, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTransferDto {
  @IsBoolean()
  public readonly validated: boolean;

  @IsBoolean()
  public readonly inUse: boolean;

  @IsString()
  public readonly monto: string;

  @IsString()
  @IsIn(Array.from(Object.values(TransferType)))
  public readonly tipo: TransferType;

  @IsTimestamp()
  public readonly fechaMovimiento: number;

  @IsString()
  public readonly fecha: string;

  @IsString()
  public readonly originName: string;

  @IsString()
  public readonly originRut: string;

  @IsString()
  public readonly originAccount: string;

  @IsString()
  public readonly receiverRut: string;

  @IsString()
  public readonly receiverAccount: string;

  @IsString()
  public readonly originBankCode: string;

  @IsString()
  public readonly originBankName: string;

  @IsOptional()
  @IsString()
  public readonly comment: string;

  @IsString()
  @IsIn(Array.from(Object.values(OriginAccountType)))
  public readonly originAccountType: OriginAccountType;
}
