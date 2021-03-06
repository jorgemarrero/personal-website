import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";
import { Icon, Divider, Progress } from 'semantic-ui-react'
import { HTMLContent } from '../components/Content';

export default class HomePageTemplate extends React.Component {
  renderSocial(social) {
    return social.map((icon) => (
      <a key={icon.social_url} href={icon.social_url}>
        <Icon circular inverted link name={icon.social_network} />
      </a>)
    );
  }

  renderSkills(skills) {
    console.log(skills);
    return skills.map(({skill_name, skill_value}) => (
      <div className="skills">
        {skill_name}
        <Progress percent={skill_value*10}/>
      </div>
    ));
  }

  render() {
    const { frontmatter, html } = this.props.data.markdownRemark;
    const { name, profile_image: image, position, social, skills } = frontmatter;

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <div className="personal">
              <img className="profile-image" src={image} alt="ALT" />
              <div className="personal-content">
                <h1 className="has-text-weight-bold">{name}</h1>
                <h2 className="position">{position}</h2>
                <div className="social">
                  {this.renderSocial(social)}
                </div>
              </div>
            </div>
            <Divider />
            <HTMLContent className="description" content={html} />
            {skills && <h3>Skills</h3>}
            {skills && this.renderSkills(skills)}
          </div>
        </div>
      </section>
    );
  }
}

export const homePageQuery = graphql`
  query HomePage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        profile_image
        name
        position
        skills {
          skill_name
          skill_value
        }
        social {
          social_network
          social_url
        }
      }
    }
  }
`;
