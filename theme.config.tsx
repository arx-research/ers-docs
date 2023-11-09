import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: '%s – ERS Documentation'
    }
  },
  head: (
    <>
      <meta property="og:description" content="The Ethereum Reality Service is a set of smart contracts that enables decentralized authentication, claims, and redirection for secure chips." />
    </>
  ),
  logo: (
    <>
      <svg width="50" height="20" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10.0561C0 4.11562 3.76618 0 9.27955 0C14.7929 0 18.2097 3.72735 18.2097 9.3572V10.1079C18.2097 10.4443 17.9379 10.7204 17.6014 10.7204L3.53753 10.7593C3.80932 14.7584 5.90595 16.9715 9.51683 16.9715C12.1829 16.9715 13.9862 15.9405 14.711 14.0121C14.7972 13.7791 15.0259 13.6324 15.2761 13.6324H17.4504C17.8645 13.6324 18.1622 14.038 18.0371 14.4305C16.8896 18.0069 13.8223 20 9.44349 20C3.84383 19.9957 0 15.9577 0 10.0561ZM3.61087 8.30889H14.56C14.56 5.16393 12.5022 3.0673 9.27955 3.0673C6.05695 3.0673 4.07679 4.9698 3.61087 8.30889ZM25.3236 19.5298H22.8991C22.5626 19.5298 22.2865 19.258 22.2865 18.9172V4.84469C22.2865 4.5082 22.5582 4.2321 22.8991 4.2321H25.9362V18.9172C25.9362 19.2537 25.6644 19.5298 25.3236 19.5298ZM37.9508 14.0164C38.2571 14.0164 38.5073 14.245 38.5548 14.547C38.805 16.1691 40.22 17.1225 42.3986 17.1225C44.9612 17.1225 46.4366 16.0742 46.4366 14.327C46.4366 13.0457 45.8154 12.2692 43.8352 11.7645L40.4961 10.9879C37.1182 10.1726 35.5263 8.50302 35.5263 5.70751C35.5263 2.21311 38.4771 0 42.6704 0C46.5574 0 49.1847 2.03624 49.5729 5.25453C49.6161 5.61691 49.327 5.94047 48.9603 5.94047H46.6739C46.3719 5.94047 46.1217 5.72045 46.0699 5.42278C45.7981 3.82226 44.5557 2.83434 42.5539 2.83434C40.2632 2.83434 38.9819 3.84383 38.9819 5.59103C38.9819 6.8723 39.9137 7.72649 41.7774 8.19241L45.1165 9.00776C48.3391 9.7843 49.931 11.2597 49.931 14.094C49.931 17.7049 46.8249 19.9957 42.321 19.9957C38.1406 19.9957 35.3883 17.9206 35.0561 14.6894C35.0173 14.3313 35.3063 14.0164 35.6687 14.0164H37.9508ZM32.5453 0.582399H26.5488C26.2123 0.582399 25.9362 0.854185 25.9362 1.195V4.2321H32.5453C32.8818 4.2321 33.1579 3.96031 33.1579 3.6195V1.195C33.1579 0.858499 32.8861 0.582399 32.5453 0.582399Z" fill="currentColor"/>
      </svg>
    </>
  ),
  project: {
    link: 'https://github.com/arx-research/ers-contracts',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase: 'https://github.com/arx-research/ers-docs',
  footer: {
    text: 'Ethereum Reality Service',
  },
}

export default config
