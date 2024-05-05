import { IsBoolean } from 'class-validator';

export class UpdateTransferDto {
  @IsBoolean()
  public readonly validated: boolean;

  @IsBoolean()
  public readonly inUse: boolean;
}
