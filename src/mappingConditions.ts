import { Fulfilled as AccessSecretStoreConditionFulfilled } from '../generated/AccessSecretStoreCondition/AccessSecretStoreCondition'
import { Fulfilled as LockRewardConditionFulFilled } from '../generated/LockRewardCondition/LockRewardCondition'
import { Fulfilled as EscrowRewardConditionFulfilled } from '../generated/EscrowRewardCondition/EscrowReward'
import { AccessSecretStoreCondition, LockRewardCondition, EscrowRewardCondition, ServiceAgreement } from '../generated/schema'
import { log } from '@graphprotocol/graph-ts'

export function handleFulfilledAccessSecretStoreCondition(event: AccessSecretStoreConditionFulfilled): void {
	log.info("==== **** EVENT handleFulfilledAccessSecretStoreCondition ==== ****", [])
	let agreementId = event.params._agreementId
	let sea = ServiceAgreement.load(agreementId.toHex())
	if (sea != null) {
		let condition = new AccessSecretStoreCondition(event.params._conditionId.toHex())
		condition.agreement = sea.id
		condition.documentId = event.params._documentId
		condition.grantee = event.params._grantee
		condition.conditionId = event.params._conditionId.toHex()
		condition.lastBlockUpdated = event.block.number
		condition.save()
	}
}

export function handleFulfilledLockRewardCondition(event: LockRewardConditionFulFilled): void {
	log.info("==== **** EVENT handleFulfilledLockRewardCondition ==== ****", [])
	let agreementId = event.params._agreementId
	let sea = ServiceAgreement.load(agreementId.toHex())
	if (sea != null) {
		let condition = new LockRewardCondition(event.params._conditionId.toHex())
		condition.agreement = sea.id
		condition.rewardAddress = event.params._rewardAddress
		condition.amount = event.params._amount
		condition.conditionId = event.params._conditionId.toHex()
		condition.lastBlockUpdated = event.block.number
		condition.save()
	}
}

export function handleFulfilledEscrowRewardCondition(event: EscrowRewardConditionFulfilled): void {
	log.info("==== **** EVENT handleFulfilledEscrowRewardCondition ==== ****", [])
	let agreementId = event.params._agreementId
	let sea = ServiceAgreement.load(agreementId.toHex())
	if (sea != null) {
		let condition = new EscrowRewardCondition(event.params._conditionId.toHex())
		condition.agreement = sea.id
		condition.receiver = event.params._receiver
		condition.amount = event.params._amount
		condition.conditionId = event.params._conditionId.toHex()
		condition.lastBlockUpdated = event.block.number
		condition.save()
	}
}