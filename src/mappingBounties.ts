import { BountyIssued, ContributionAdded, BountyFulfilled, FulfillmentAccepted, ContributeCall
  } from '../generated/StandardBounties/StandardBounties'
import { Bounty, Fulfillment, Contribution } from '../generated/schema'
import { BigInt, Bytes, Value } from '@graphprotocol/graph-ts'

export function handleBountyIssued(event: BountyIssued): void {
  let bounty = new Bounty(event.params._bountyId.toHex())
  bounty.creator = event.params._creator
  let issuers = event.params._issuers
  let issArray: Array<Bytes> = []
  for(let i:i32 = 0; i < issuers.length; i++) {
    issArray.push(issuers[i])
  }
  bounty.issuers = issArray
  let approvers = event.params._approvers
  let appArray: Array<Bytes> = []
  for(let i:i32 = 0; i < approvers.length; i++) {
    appArray.push(approvers[i])
  }
  bounty.approvers = appArray
  bounty.data = event.params._data
  bounty.deadline = event.params._deadline
  bounty.token = event.params._token
  bounty.tokenVersion = event.params._tokenVersion
  bounty.balance = new BigInt(0)
  bounty.hasPaidout = false
  bounty.status = "ACTIVE"
  bounty.save()
}

export function handleContributionAdded(event: ContributionAdded): void {
  let bounty = Bounty.load(event.params._bountyId.toHex())
  if(bounty) {
    let contributions: Array<string> | null = bounty.contributions != null ? bounty.contributions:[]
    let contribution = new Contribution(event.params._contributionId.toHex())
    contribution.contributor = event.params._contributor
    contribution.amount = event.params._amount
    contribution.refunded = false
    bounty.balance = bounty.balance.plus(contribution.amount)
    contributions.push(contribution.id)
    bounty.contributions = contributions
    bounty.save()
    contribution.save()
  }
}

export function handleBountyFulfilled(event: BountyFulfilled): void {
  let bounty = Bounty.load(event.params._bountyId.toHex())
  if(bounty) {
    let fulfillment = new Fulfillment(event.params._fulfillmentId.toHex())
    let fulfillers = event.params._fulfillers
    let fulArray: Array<Bytes> = []
    for(let i:i32 = 0; i < fulfillers.length; i++) {
      fulArray.push(fulfillers[i])
    }
    fulfillment.fulfillers = fulArray
    fulfillment.submitter = event.params._submitter
    fulfillment.data = event.params._data
    fulfillment.accepted = false
    
    let fulfillments: Array<string> | null = bounty.fulfillments != null ? bounty.fulfillments:[]
    fulfillments.push(fulfillment.id)
    bounty.fulfillments = fulfillments
    bounty.save()
    fulfillment.save()

  }

}

export function handleFulfillmentAccepted(event: FulfillmentAccepted): void {
  let fi = Fulfillment.load(event.params._fulfillmentId.toHex())
  if (fi) {
    fi.accepted = true
    fi.payouts = event.params._tokenAmounts
    fi.save()
  }
  // TODO: set if paidout has been completed for all fulfillers
  // let bounty = Bounty.load(event.params._bountyId.toHex())
  // if (bounty) {
  //   bounty.hasPaidout = true
  //   let fulfillments: Array<string> = bounty.fulfillments != null ? bounty.fulfillments:([] as string[])
  //   let allAccepted = true
  //   for (let i:i32 = 0; i < fulfillments.length; i++) {
  //     let fi = Fulfillment.load(fulfillments[i])
  //     if (fi.id === event.params._fulfillmentId.toHex()) {
  //       fi.accepted = true
  //       fi.payout = event.params._tokenAmounts[i]
  //       fi.save()
  //     } else if (!fi.accepted) {
  //       allAccepted = false
  //     }
  //   }
  //   if (allAccepted) {
  //     bounty.status = "FULFILLED"
  //   }
  //   bounty.save()
  // }
}

// export function handlerContributeCall(call: ContributeCall):void {
//   let bounty = Bounty.load(call.inputs._bountyId.toHex())
//   if(bounty) {
//     let contributions: Array<string> | null = bounty.contributions != null ? bounty.contributions:[]
//     let contribution = new Contribution(Value.fromI32(contributions.length).toBytes().toHex())
//     contribution.contributor = call.inputs._sender
//     contribution.amount = call.inputs._amount
//     contribution.refunded = false
//     bounty.balance = bounty.balance.plus(contribution.amount)
//     contributions.push(contribution.id)
//     bounty.contributions = contributions
//     bounty.save()
//     contribution.save()
//   }
// }