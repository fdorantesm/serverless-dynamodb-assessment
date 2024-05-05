import { IsString } from 'class-validator';

export class RestoreTransfersBackupDto {
  @IsString()
  public readonly backup: string;
}
