import React from 'react'
import MemberSelector from './MemberSelector'

export default function GroupPane({ group, campaign, baseURL, setSelectedGroup, chooseCampaign }) {
  return (
    <div className="ajs-group-pane">
      <MemberSelector campaign={ campaign } group={group} baseURL={baseURL} setSelectedGroup={setSelectedGroup} chooseCampaign={chooseCampaign} />
    </div>
  )
}
