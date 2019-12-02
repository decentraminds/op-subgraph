import { DIDAttributeRegistered, RegisterAttributeCall, DIDOwnershipTransferred, DIDProviderAdded, 
          DIDProviderRemoved, DIDPermissionGranted, DIDPermissionRevoked 
        } from '../generated/DIDRegistry/DIDRegistry'
import { DIDRegistry, DIDGrantee } from '../generated/schema'
import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts'

export function handleNewDIDRegistry(event: DIDAttributeRegistered): void {
  let registry = new DIDRegistry(event.params._did.toHex())
  registry.owner = event.params._owner
  registry.checksum = event.params._checksum
  registry.value = event.params._value
  registry.lastUpdatedBy = event.params._lastUpdatedBy
  registry.lastBlockUpdated = event.block.number
  registry.save()
}

export function handleNewDIDRegistryCall(call: RegisterAttributeCall): void {
  log.info("==== **** CALL handleNewDIDRegistryCall ==== ****", [])
  let id  = call.inputs._did.toHex();
  let registry = DIDRegistry.load(id)
  if (registry != null) {
    let providers = call.inputs._providers
    let provArray: Array<Bytes> = []
    for(let i:i32 = 0; i < providers.length; i++) {
      provArray.push(providers[i])
    }
    registry.providers = provArray
    registry.save()
  }
}

export function handletTransferredDIDOwnership(event: DIDOwnershipTransferred): void {
  let id = event.params._did.toHex()
  let registry = DIDRegistry.load(id)
  if (registry != null) {
    registry.owner = event.params._newOwner
    registry.lastBlockUpdated = event.block.number
    registry.save()
  }
}

export function handletDIDProviderAdded(event: DIDProviderAdded): void {
  let id = event.params._did.toHex()
  let registry = DIDRegistry.load(id)
  if (registry != null) {
    let providers: Array<Bytes> | null = registry.providers != null ? registry.providers:[]
    providers.push(event.params._provider)
    registry.providers = providers
    registry.lastBlockUpdated = event.block.number
    registry.save()
  }
}

export function handletDIDProviderRemoved(event: DIDProviderRemoved): void {
  let id = event.params._did.toHex()
  let registry = DIDRegistry.load(id)
  if (registry != null && event.params.state === true) {
    let providers: Array<Bytes> | null = registry.providers != null ? registry.providers:[]
    providers = providers.filter((provider) => provider !== event.params._provider)
    registry.providers = providers
    registry.lastBlockUpdated = event.block.number
    registry.save()
  }
}

export function handletDIDPermissionGranted(event: DIDPermissionGranted): void {
  let id = event.params._did.toHex() + event.params._grantee.toHex()
  let permission = DIDGrantee.load(id)
  let registry = DIDRegistry.load(event.params._did.toHex())
  if (permission == null) {
    permission = new DIDGrantee(id)
    permission.did = event.params._did
    permission.grantee = event.params._grantee
  }
  permission.lastBlockUpdated = event.block.number
  permission.allowed = true
  permission.save()
  let perArray: Array<string> | null = registry.permissions != null ? registry.permissions: []
  if (!perArray.includes(permission.id)) {
    perArray.push(permission.id)
    registry.permissions = perArray
    registry.lastBlockUpdated = event.block.number
    registry.save()
  }
}

export function handletDIDPermissionRevoked(event: DIDPermissionRevoked): void {
  let id = event.params._did.toHex() + event.params._grantee.toHex()
  let permission = DIDGrantee.load(id)
  let registry = DIDRegistry.load(event.params._did.toHex())
  if (permission == null) {
    permission = new DIDGrantee(id)
    permission.did = event.params._did
    permission.grantee = event.params._grantee
  }
  permission.lastBlockUpdated = event.block.number
  permission.allowed = false
  permission.save()
  let perArray: Array<string> | null = registry.permissions != null ? registry.permissions: []
  if (!perArray.includes(permission.id)) {
    perArray.push(permission.id)
    registry.permissions = perArray
    registry.lastBlockUpdated = event.block.number
    registry.save()
  }
}

