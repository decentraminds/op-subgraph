// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class ConditionCreated extends EthereumEvent {
  get params(): ConditionCreated__Params {
    return new ConditionCreated__Params(this);
  }
}

export class ConditionCreated__Params {
  _event: ConditionCreated;

  constructor(event: ConditionCreated) {
    this._event = event;
  }

  get _id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _typeRef(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _who(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ConditionUpdated extends EthereumEvent {
  get params(): ConditionUpdated__Params {
    return new ConditionUpdated__Params(this);
  }
}

export class ConditionUpdated__Params {
  _event: ConditionUpdated;

  constructor(event: ConditionUpdated) {
    this._event = event;
  }

  get _id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _typeRef(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _state(): i32 {
    return this._event.parameters[2].value.toI32();
  }

  get _who(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class OwnershipTransferred extends EthereumEvent {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ConditionStoreManager__getConditionResult {
  value0: Address;
  value1: i32;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: Address;
  value6: BigInt;

  constructor(
    value0: Address,
    value1: i32,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: Address,
    value6: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set(
      "value1",
      EthereumValue.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromUnsignedBigInt(this.value4));
    map.set("value5", EthereumValue.fromAddress(this.value5));
    map.set("value6", EthereumValue.fromUnsignedBigInt(this.value6));
    return map;
  }
}

export class ConditionStoreManager extends SmartContract {
  static bind(address: Address): ConditionStoreManager {
    return new ConditionStoreManager("ConditionStoreManager", address);
  }

  isContract(addr: Address): boolean {
    let result = super.call("isContract", [EthereumValue.fromAddress(addr)]);

    return result[0].toBoolean();
  }

  try_isContract(addr: Address): CallResult<boolean> {
    let result = super.tryCall("isContract", [EthereumValue.fromAddress(addr)]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  getCurrentBlockNumber(): BigInt {
    let result = super.call("getCurrentBlockNumber", []);

    return result[0].toBigInt();
  }

  try_getCurrentBlockNumber(): CallResult<BigInt> {
    let result = super.tryCall("getCurrentBlockNumber", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", []);

    return result[0].toAddress();
  }

  try_owner(): CallResult<Address> {
    let result = super.tryCall("owner", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  isOwner(): boolean {
    let result = super.call("isOwner", []);

    return result[0].toBoolean();
  }

  try_isOwner(): CallResult<boolean> {
    let result = super.tryCall("isOwner", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  getCreateRole(): Address {
    let result = super.call("getCreateRole", []);

    return result[0].toAddress();
  }

  try_getCreateRole(): CallResult<Address> {
    let result = super.tryCall("getCreateRole", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  createCondition(
    _id: Bytes,
    _typeRef: Address,
    _timeLock: BigInt,
    _timeOut: BigInt
  ): BigInt {
    let result = super.call("createCondition", [
      EthereumValue.fromFixedBytes(_id),
      EthereumValue.fromAddress(_typeRef),
      EthereumValue.fromUnsignedBigInt(_timeLock),
      EthereumValue.fromUnsignedBigInt(_timeOut)
    ]);

    return result[0].toBigInt();
  }

  try_createCondition(
    _id: Bytes,
    _typeRef: Address,
    _timeLock: BigInt,
    _timeOut: BigInt
  ): CallResult<BigInt> {
    let result = super.tryCall("createCondition", [
      EthereumValue.fromFixedBytes(_id),
      EthereumValue.fromAddress(_typeRef),
      EthereumValue.fromUnsignedBigInt(_timeLock),
      EthereumValue.fromUnsignedBigInt(_timeOut)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  createCondition1(_id: Bytes, _typeRef: Address): BigInt {
    let result = super.call("createCondition", [
      EthereumValue.fromFixedBytes(_id),
      EthereumValue.fromAddress(_typeRef)
    ]);

    return result[0].toBigInt();
  }

  try_createCondition1(_id: Bytes, _typeRef: Address): CallResult<BigInt> {
    let result = super.tryCall("createCondition", [
      EthereumValue.fromFixedBytes(_id),
      EthereumValue.fromAddress(_typeRef)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  updateConditionState(_id: Bytes, _newState: i32): i32 {
    let result = super.call("updateConditionState", [
      EthereumValue.fromFixedBytes(_id),
      EthereumValue.fromUnsignedBigInt(BigInt.fromI32(_newState))
    ]);

    return result[0].toI32();
  }

  try_updateConditionState(_id: Bytes, _newState: i32): CallResult<i32> {
    let result = super.tryCall("updateConditionState", [
      EthereumValue.fromFixedBytes(_id),
      EthereumValue.fromUnsignedBigInt(BigInt.fromI32(_newState))
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toI32());
  }

  getConditionListSize(): BigInt {
    let result = super.call("getConditionListSize", []);

    return result[0].toBigInt();
  }

  try_getConditionListSize(): CallResult<BigInt> {
    let result = super.tryCall("getConditionListSize", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  getCondition(_id: Bytes): ConditionStoreManager__getConditionResult {
    let result = super.call("getCondition", [
      EthereumValue.fromFixedBytes(_id)
    ]);

    return new ConditionStoreManager__getConditionResult(
      result[0].toAddress(),
      result[1].toI32(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toAddress(),
      result[6].toBigInt()
    );
  }

  try_getCondition(
    _id: Bytes
  ): CallResult<ConditionStoreManager__getConditionResult> {
    let result = super.tryCall("getCondition", [
      EthereumValue.fromFixedBytes(_id)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(
      new ConditionStoreManager__getConditionResult(
        value[0].toAddress(),
        value[1].toI32(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toAddress(),
        value[6].toBigInt()
      )
    );
  }

  getConditionState(_id: Bytes): i32 {
    let result = super.call("getConditionState", [
      EthereumValue.fromFixedBytes(_id)
    ]);

    return result[0].toI32();
  }

  try_getConditionState(_id: Bytes): CallResult<i32> {
    let result = super.tryCall("getConditionState", [
      EthereumValue.fromFixedBytes(_id)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toI32());
  }

  isConditionTimeLocked(_id: Bytes): boolean {
    let result = super.call("isConditionTimeLocked", [
      EthereumValue.fromFixedBytes(_id)
    ]);

    return result[0].toBoolean();
  }

  try_isConditionTimeLocked(_id: Bytes): CallResult<boolean> {
    let result = super.tryCall("isConditionTimeLocked", [
      EthereumValue.fromFixedBytes(_id)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }

  isConditionTimedOut(_id: Bytes): boolean {
    let result = super.call("isConditionTimedOut", [
      EthereumValue.fromFixedBytes(_id)
    ]);

    return result[0].toBoolean();
  }

  try_isConditionTimedOut(_id: Bytes): CallResult<boolean> {
    let result = super.tryCall("isConditionTimedOut", [
      EthereumValue.fromFixedBytes(_id)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBoolean());
  }
}

export class RenounceOwnershipCall extends EthereumCall {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends EthereumCall {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class InitializeCall extends EthereumCall {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class DelegateCreateRoleCall extends EthereumCall {
  get inputs(): DelegateCreateRoleCall__Inputs {
    return new DelegateCreateRoleCall__Inputs(this);
  }

  get outputs(): DelegateCreateRoleCall__Outputs {
    return new DelegateCreateRoleCall__Outputs(this);
  }
}

export class DelegateCreateRoleCall__Inputs {
  _call: DelegateCreateRoleCall;

  constructor(call: DelegateCreateRoleCall) {
    this._call = call;
  }

  get delegatee(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DelegateCreateRoleCall__Outputs {
  _call: DelegateCreateRoleCall;

  constructor(call: DelegateCreateRoleCall) {
    this._call = call;
  }
}

export class DelegateUpdateRoleCall extends EthereumCall {
  get inputs(): DelegateUpdateRoleCall__Inputs {
    return new DelegateUpdateRoleCall__Inputs(this);
  }

  get outputs(): DelegateUpdateRoleCall__Outputs {
    return new DelegateUpdateRoleCall__Outputs(this);
  }
}

export class DelegateUpdateRoleCall__Inputs {
  _call: DelegateUpdateRoleCall;

  constructor(call: DelegateUpdateRoleCall) {
    this._call = call;
  }

  get _id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get delegatee(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class DelegateUpdateRoleCall__Outputs {
  _call: DelegateUpdateRoleCall;

  constructor(call: DelegateUpdateRoleCall) {
    this._call = call;
  }
}

export class CreateConditionCall extends EthereumCall {
  get inputs(): CreateConditionCall__Inputs {
    return new CreateConditionCall__Inputs(this);
  }

  get outputs(): CreateConditionCall__Outputs {
    return new CreateConditionCall__Outputs(this);
  }
}

export class CreateConditionCall__Inputs {
  _call: CreateConditionCall;

  constructor(call: CreateConditionCall) {
    this._call = call;
  }

  get _id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _typeRef(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _timeLock(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _timeOut(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class CreateConditionCall__Outputs {
  _call: CreateConditionCall;

  constructor(call: CreateConditionCall) {
    this._call = call;
  }

  get size(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CreateCondition1Call extends EthereumCall {
  get inputs(): CreateCondition1Call__Inputs {
    return new CreateCondition1Call__Inputs(this);
  }

  get outputs(): CreateCondition1Call__Outputs {
    return new CreateCondition1Call__Outputs(this);
  }
}

export class CreateCondition1Call__Inputs {
  _call: CreateCondition1Call;

  constructor(call: CreateCondition1Call) {
    this._call = call;
  }

  get _id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _typeRef(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class CreateCondition1Call__Outputs {
  _call: CreateCondition1Call;

  constructor(call: CreateCondition1Call) {
    this._call = call;
  }

  get size(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class UpdateConditionStateCall extends EthereumCall {
  get inputs(): UpdateConditionStateCall__Inputs {
    return new UpdateConditionStateCall__Inputs(this);
  }

  get outputs(): UpdateConditionStateCall__Outputs {
    return new UpdateConditionStateCall__Outputs(this);
  }
}

export class UpdateConditionStateCall__Inputs {
  _call: UpdateConditionStateCall;

  constructor(call: UpdateConditionStateCall) {
    this._call = call;
  }

  get _id(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _newState(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class UpdateConditionStateCall__Outputs {
  _call: UpdateConditionStateCall;

  constructor(call: UpdateConditionStateCall) {
    this._call = call;
  }

  get value0(): i32 {
    return this._call.outputValues[0].value.toI32();
  }
}
