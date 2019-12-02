import { AgreementCreated, CreateAgreement1Call } from '../generated/EscrowAccessSecretStoreTemplate/EscrowAccessSecretStoreTemplate'
import { ServiceAgreement, SEACondition, DIDRegistry } from '../generated/schema'
import { Bytes, log } from '@graphprotocol/graph-ts'

export function handleNewEscrowAccessSecretStoreSEA(event: AgreementCreated): void {
	let id = event.params._agreementId.toHex()
	let did = DIDRegistry.load(event.params._did.toHex())
	log.info("======****** EVENT AgreementCreated id={} did={} ======******/n/n/n", [id, did != null ? "T":"F"])
	if (did != null) {
		let sea = new ServiceAgreement(id)
		// TODO
		// sea.did = did.id
		sea.did = event.params._did
		sea.template = "ESCROW_ACCESS_SECRETSTORE"
		sea.accessConsumer = event.params._accessConsumer
		sea.accessProvider = event.params._accessProvider
		sea.timeLocks = event.params._timeLocks
		sea.timeOuts = event.params._timeOuts
		sea.lastBlockUpdated = event.block.number
		sea.save()
	}
}

export function handleNewSEACall(call: CreateAgreement1Call): void {
	let id = call.inputs._id.toHex()
	let sea = ServiceAgreement.load(id)
	log.info("======****** CALL handleNewSEACall id={} {} ======******/n/n/n", [id, sea != null ? "T":"F"])
	if (sea != null) {
		let conditions = call.inputs._conditionIds
		let condArray: Array<string> = []
		for (let i:i32 = 0; i < conditions.length; i++) {
			let condId = conditions[i].toHex()
			let condition = SEACondition.load(condId)
			log.info("======****** Adding Condition {} {} ======******/n/n/n", [condId, condition != null ? "T":"F"])
			if (condition != null) {
				condArray.push(condition.id)
			}
		}
		sea.conditions = condArray
		sea.lastBlockUpdated = call.block.number
		sea.save()
	}
}