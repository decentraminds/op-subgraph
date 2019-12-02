import { TemplateStoreManager, ProposeTemplateCall, ApproveTemplateCall, RevokeTemplateCall 
	} from '../generated/SEATemplateStore/TemplateStoreManager'
import { ConditionStoreManager, ConditionCreated, ConditionUpdated
	} from '../generated/SEAConditionStore/ConditionStoreManager'
import { SEATemplate, SEACondition } from '../generated/schema'
import { BigInt, log } from '@graphprotocol/graph-ts'

export function handleNewTemplateProposal(call: ProposeTemplateCall): void {
	log.info("======****** CALL handleNewTemplateProposal ======******", [])
	let contract = TemplateStoreManager.bind(call.to)
	let id = call.inputs._id.toHex()
	let rs = contract.getTemplate(call.inputs._id)
	let template = SEATemplate.load(id)
	if (template == null) {
		template = new SEATemplate(id)
		template.owner = rs.value1
		template.lastUpdatedBy = rs.value2
		template.blockNumberUpdated = rs.value3
	}
	template.state = "PROPOSED"
	template.save()
}

export function handleNewTemplateApproval(call: ApproveTemplateCall): void {
	log.info("======****** CALL handleNewTemplateApproval ======******", [])
	let contract = TemplateStoreManager.bind(call.to)
	let id = call.inputs._id.toHex()
	let rs = contract.getTemplate(call.inputs._id)
	let template = SEATemplate.load(id)
	if (template != null) {
		template.state = "APPROVED"
		template.lastUpdatedBy = rs.value2
		template.blockNumberUpdated = rs.value3
		template.save()
	}
}

export function handleNewTemplateRevoke(call: RevokeTemplateCall): void {
	log.info("======****** CALL handleNewTemplateRevoke ======******", [])
	let contract = TemplateStoreManager.bind(call.to)
	let id = call.inputs._id.toHex()
	let rs = contract.getTemplate(call.inputs._id)
	let template = SEATemplate.load(id)
	if (template != null) {
		template.state = "REVOKED"
		template.lastUpdatedBy = rs.value2
		template.blockNumberUpdated = rs.value3
		template.save()
	}
}

export function handleNewCondition(event: ConditionCreated): void {
	let id = event.params._id.toHex()
	let condition = SEACondition.load(id)
	let contract = ConditionStoreManager.bind(event.address)
	let rs = contract.getCondition(event.params._id)
	if (condition == null) {
		condition = new SEACondition(id)
		condition.contractAddress = event.params._typeRef
  		condition.timeLock = rs.value2
  		condition.timeOut = rs.value3
	}
	condition.state = "UNFULFILLED"
	condition.lastUpdatedBy = event.params._who
  	condition.blockNumberUpdated = rs.value6
  	condition.save()
}

export function handleConditionUpdated(event: ConditionUpdated): void {
	let id = event.params._id.toHex()
	let condition = SEACondition.load(id)
	if (condition != null) {
		let contract = ConditionStoreManager.bind(event.address)
		let rs = contract.getCondition(event.params._id)
		switch (event.params._state) {
			case 0:
				condition.state = "UNINITIALIZED"
				break;
			case 1:
				condition.state = "UNFULFILLED"
				break;
			case 2:
				condition.state = "FULFILLED"
				break;
			case 3:
				condition.state = "ABORTED"
				break;
			default:
				break;
		}
		condition.lastUpdatedBy = event.params._who
	  	condition.blockNumberUpdated = rs.value6
	  	condition.save()
	}
}