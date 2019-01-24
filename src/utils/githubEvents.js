const organizationEvents = orgName => {
    return fetch(`https://api.github.com/orgs/${orgName}/events`)
            .then(response => response.json())
}

export { organizationEvents }