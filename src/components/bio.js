/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
            }}
          >
            <p style={{
                marginBottom: rhythm(0.5),
                fontSize: `0.8rem`,
                lineHeight: `1.6em`,
            }}>
              Co-founder of <a href="https://t-squared.org">T-Squared</a><br />
              Software Developer at <a href="https://axiallon.com">Axiallon</a><br />
              Lover of my <a target="_new" href={`https://twitter.com/${social.halesTwitter}`}>girlfriend</a> and <a href="">dalmatian</a> <br />
              <a target="_new" href={`https://twitter.com/${social.twitter}`}>Twitter</a>,
              &nbsp;<a target="_new" href={`https://github.com/${social.github}`}>Github</a>,
              &nbsp;<a href={`mailto:${social.email}`}>Email</a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter,
          email,
          github,
        }
      }
    }
  }
`

export default Bio
