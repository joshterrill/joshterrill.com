import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    'html, body': {
        fontFamily: `"Roboto Regular", sans-serif !important`,
        fontWeight: 400,
        color: `#333`,
        lineHeight: `1.6em`,
        fontSize: `18px`,
    },
    'h1, h2, h3, h4, h5, h6': {
        color: `#333`,
        fontWeight: 500,
        lineHeight: `1.3em`,
        fontFamily: `inherit`,
        marginTop: `1.0rem`,
        marginBottom: `1.0rem`,
    },
    'a': {
        color: `#3700ff`,
        textDecoration: `none`,
        wordBreak: `break-word`,
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
