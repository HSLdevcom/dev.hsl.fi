import React from "react";

import moment from "moment";

import { organizationEvents } from "../utils/githubEvents";

import pluralize from "../utils/pluralize";

import typography from "../utils/typography";

const { rhythm, adjustFontSizeTo } = typography;

const getGithubURL = path => "https://github.com/" + path;

const getGithubAvatarWithSize = (avatarUrl, size) =>
  avatarUrl.includes("?")
    ? avatarUrl.endsWith("?")
      ? avatarUrl + "s=" + size
      : avatarUrl + "&s=" + size
    : avatarUrl + "?s=" + size;

const GithubUserLink = ({ login }) => (
  <a href={getGithubURL(login)} style={{ fontWeight: "bold" }}>
    {login}
  </a>
);

const GithubRepoLink = ({ repoName }) => (
  <a href={getGithubURL(repoName)} style={{ fontWeight: "bold" }}>
    {repoName}
  </a>
);

const FormattedDate = ({ date }) => (
  <span style={{ fontStyle: "italic" }}>{moment(date).fromNow()}</span>
);

const PushEvent = ({ event }) => (
  <>
    <GithubUserLink login={event.actor.login} /> pushed {event.payload.size}{" "}
    {pluralize("commit", "commits", event.payload.size)} to{" "}
    <GithubRepoLink repoName={event.repo.name} />
  </>
);

const CreateEvent = ({ event }) => (
  <>
    <GithubUserLink login={event.actor.login} /> created repository{" "}
    <GithubRepoLink repoName={event.repo.name} />
  </>
);

const PullRequestEvent = ({ event }) => (
  <>
    <GithubUserLink login={event.actor.login} /> opened pull request{" "}
    <a
      href={event.payload.pull_request.html_url}
      style={{ fontWeight: "bold" }}
    >
      {event.payload.pull_request.title}
    </a>{" "}
    in <GithubRepoLink repoName={event.repo.name} />
  </>
);

const ReleaseEvent = ({ event }) => (
  <>
    <GithubUserLink login={event.actor.login} /> published release{" "}
    <a href={event.payload.release.html_url} style={{ fontWeight: "bold" }}>
      {event.payload.release.name}
    </a>{" "}
    of <GithubRepoLink repoName={event.repo.name} />
  </>
);

const IssuesEvent = ({ event }) => (
  <>
    <GithubUserLink login={event.actor.login} /> opened issue{" "}
    <a href={event.payload.issue.html_url} style={{ fontWeight: "bold" }}>
      {event.payload.issue.title}
    </a>{" "}
    in <GithubRepoLink repoName={event.repo.name} />
  </>
);

const Event = ({ avatarUrl, date, children }) => (
  <li>
    <img
      src={getGithubAvatarWithSize(avatarUrl, "36")}
      style={{
        width: "36px",
        height: "36px",
        float: "left",
        marginRight: "8px",
        marginBottom: "4px",
        marginTop: "8px"
      }}
    />
    {children}
    <br />
    <FormattedDate date={date} />
  </li>
);

class GithubOrganizationEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = { events: undefined, error: undefined };
  }

  componentDidMount() {
    organizationEvents(this.props.organization)
      .then(events => this.setState({ events }))
      .catch(error => this.setState({ error }));
  }

  render() {
    if (!this.state.events && !this.state.error) {
      return <span>{"Loading..."}</span>;
    }

    if (this.state.error) {
      return <span>{this.state.error}</span>;
    }

    console.log(this.state.events);

    return (
      <ul
        style={{
          display: "block",
          flex: "0 1 auto",
          margin: "0",
          padding: `${rhythm(1 / 5)} 0 0 ${rhythm(4 / 10)}`,
          maxHeight: "100%",
          overflow: "hidden",
          overflowY: "auto",
          listStyle: "none",
          ...adjustFontSizeTo("14px")
        }}
      >
        {this.state.events.map(event => {
          let component;

          if (event.type === "PushEvent") {
            component = <PushEvent event={event} />;
          } else if (
            event.type === "CreateEvent" &&
            event.payload.ref_type === "repository"
          ) {
            component = <CreateEvent event={event} />;
          } else if (
            event.type === "PullRequestEvent" &&
            event.payload.action === "opened"
          ) {
            component = <PullRequestEvent event={event} />;
          } else if (event.type === "ReleaseEvent") {
            component = <ReleaseEvent event={event} />;
          } else if (
            event.type === "IssuesEvent" &&
            event.payload.action === "opened"
          ) {
            component = <IssuesEvent event={event} />;
          }

          if (component) {
            console.log(event.actor);
            return (
              <Event avatarUrl={event.actor.avatar_url} date={event.created_at}>
                {component}
              </Event>
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  }
}

export default props => (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      background: "white",
      border: "solid thin #e8e8e8",
      borderRadius: "5px",
      ...props.style
    }}
  >
    <h3
      style={{
        marginBottom: "0",
        padding: rhythm(4 / 10),
        borderBottom: "solid thin #e8e8e8",
        ...adjustFontSizeTo("16px")
      }}
    >
      {"GitHub"}
    </h3>
    <GithubOrganizationEvents {...props} />
  </div>
);
