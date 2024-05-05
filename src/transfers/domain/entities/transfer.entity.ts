import { BaseEntity } from '@/core/domain/classes/base-entity';
import type { OriginAccountType } from '@/transfers/domain/enums/origin-account-type.enum';
import type { TransferType } from '@/transfers/domain/enums/transfer-type.enum';
import type { Transfer } from '@/transfers/domain/interfaces/transfer';

export class TransferEntity extends BaseEntity<Transfer> {
  constructor(data: Transfer) {
    super(data);
  }

  public static create(data: Transfer): TransferEntity {
    return new TransferEntity(data);
  }

  public getValidated() {
    return this._props.validated;
  }

  public getMonto() {
    return this._props.monto;
  }

  public inUse() {
    return this._props.inUse;
  }

  public getTipo() {
    return this._props.tipo;
  }

  public getFechaMovimiento() {
    return this._props.fechaMovimiento;
  }

  public getFecha() {
    return this._props.fecha;
  }

  public getOriginName() {
    return this._props.originName;
  }

  public getOriginRut() {
    return this._props.originRut;
  }

  public getOriginAccount() {
    return this._props.originAccount;
  }

  public getReceiverRut() {
    return this._props.receiverRut;
  }

  public getReceiverAccount() {
    return this._props.receiverAccount;
  }

  public getOriginBankCode() {
    return this._props.originBankCode;
  }

  public getOriginBankName() {
    return this._props.originBankName;
  }

  public getComment() {
    return this._props.comment;
  }

  public getOriginAccountType() {
    return this._props.originAccountType;
  }

  public getValidatedAt() {
    return this._props.validatedAt;
  }

  public getCreatedAt() {
    return this._props.createdAt;
  }

  public getUpdatedAt() {
    return this._props.updatedAt;
  }

  public setValidated(validated: boolean) {
    this._props.validated = validated;
  }

  public setInUse(inUse: boolean) {
    this._props.inUse = inUse;
  }

  public setMonto(monto: string) {
    this._props.monto = monto;
  }

  public setTipo(tipo: TransferType) {
    this._props.tipo = tipo;
  }

  public setFechaMovimiento(fechaMovimiento: number) {
    this._props.fechaMovimiento = fechaMovimiento;
  }

  public setFecha(fecha: string) {
    this._props.fecha = fecha;
  }

  public setOriginName(originName: string) {
    this._props.originName = originName;
  }

  public setOriginRut(originRut: string) {
    this._props.originRut = originRut;
  }

  public setOriginAccount(originAccount: string) {
    this._props.originAccount = originAccount;
  }

  public setReceiverRut(receiverRut: string) {
    this._props.receiverRut = receiverRut;
  }

  public setReceiverAccount(receiverAccount: string) {
    this._props.receiverAccount = receiverAccount;
  }

  public setOriginBankCode(originBankCode: string) {
    this._props.originBankCode = originBankCode;
  }

  public setOriginBankName(originBankName: string) {
    this._props.originBankName = originBankName;
  }

  public setComment(comment: string) {
    this._props.comment = comment;
  }

  public setOriginAccountType(originAccountType: OriginAccountType) {
    this._props.originAccountType = originAccountType;
  }

  public setValidatedAt(validatedAt: Date) {
    this._props.validatedAt = validatedAt;
  }

  public setCreatedAt(createdAt: Date) {
    this._props.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date) {
    this._props.updatedAt = updatedAt;
  }
}
