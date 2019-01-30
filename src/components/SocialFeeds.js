import React from "react"

import { Timeline } from 'react-twitter-widgets'

import GithubOrganizationEvents from './GithubOrganizationEvents'

import typography from '../utils/typography'

const { rhythm } = typography;

export default () => (
    <div style={{ marginTop: rhythm(2/3), display: `flex`, justifyContent: `space-between`}}>
        <Timeline 
            dataSource={{sourceType: 'profile', screenName: 'HSLdevcom'}} 
            options={{username: 'HSLdevcom', height: '500', width: '100%'}} />

        <GithubOrganizationEvents style={{height: '500px', width: '33%'}} organization="HSLdevcom" />

        <div style={{ background: 'white', height: '500px', width: '33%'}}>{ "Placeholder" }</div>
    </div>
)