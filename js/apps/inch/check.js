export const check = async (val = 500) => {
  try {
    const str = '000000000000000000';
    const amount = val + str;
    const time = new Date().valueOf();

    const usdc = await fetch(
      `https://pathfinder-v3.1inch.io/v1.1/quotes-by-presets?chainId=1&fromTokenAddress=0x4e352cf164e64adcbad318c3a1e222e9eba4ce42&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=${amount}&gasPrice=92000000000&maxReturnProtocols=UNISWAP_V3&time=${time}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en',
          'sec-ch-ua':
            '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
        referrer: 'https://app.1inch.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
      }
    )
      .then((r) => r.json())
      .then((r) => r?.maxReturnResult?.toTokenAmount);

    let mcb = await fetch(
      `https://pathfinder-arbitrum-42161.1inch.io/v1.1/quotes-by-presets?chainId=42161&fromTokenAddress=0xff970a61a04b1ca14834a43f5de4533ebddb5cc8&toTokenAddress=0x4e352cf164e64adcbad318c3a1e222e9eba4ce42&amount=${usdc}&gasPrice=1427666022&maxReturnProtocols=ARBITRUM_BALANCER_V2,ARBITRUM_ONE_INCH_LIMIT_ORDER,ARBITRUM_DODO,ARBITRUM_DODO_V2,ARBITRUM_SUSHISWAP,ARBITRUM_DXSWAP,ARBITRUM_UNISWAP_V3,ARBITRUM_WETH,ARBITRUM_CURVE,ARBITRUM_CURVE_V2&time=${time}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'sec-ch-ua':
            '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
        referrer: 'https://app.1inch.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
      }
    )
      .then((r) => r.json())
      .then((r) => r?.maxReturnResult?.toTokenAmount);

    let mcb2 = await fetch(
      `https://pathfinder-bsc-56.1inch.io/v1.1/quotes-by-presets?chainId=56&fromTokenAddress=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d&toTokenAddress=0x5fe80d2cd054645b9419657d3d10d26391780a7b&amount=${usdc}000000000000&gasPrice=20000000000&maxReturnProtocols=WBNB,BURGERSWAP,PANCAKESWAP,VENUS,JULSWAP,BAKERYSWAP,BSC_ONE_INCH_LP,ACRYPTOS,BSC_DODO,APESWAP,SPARTAN,BELTSWAP,VSWAP,VPEGSWAP,HYPERSWAP,BSC_DODO_V2,SWAPSWIPE,ELLIPSIS_FINANCE,NERVE,BSC_SMOOTHY_FINANCE,CHEESESWAP,BSC_PMM1,PANCAKESWAP_V2,URANIUM,MDEX,WARDEN,WAULTSWAP,BSC_ONE_INCH_LIMIT_ORDER,BSC_PMM3,ACSI_FINANCE,GAMBIT_FINANCE,JETSWAP,BSC_UNIFI,BSC_PMMX,BSC_KYBER_DMM,BSC_BI_SWAP&time=${time}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7',
          'sec-ch-ua':
            '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
        referrer: 'https://app.1inch.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
      }
    )
      .then((r) => r.json())
      .then((r) => r?.maxReturnResult?.toTokenAmount);

    mcb /= 1e18;
    mcb2 /= 1e18;
    const gap = mcb - val;
    const gap2 = mcb2 - val;
    const gap3 = mcb - mcb2;
    console.log(
      '==========>',
      gap,
      gap2,
      gap3,
      `usdc: ${usdc / 1e6}`,
      `arb: ${mcb}`,
      `bsc: ${mcb2}`
    );
    return {
      usdc,
      arb: mcb,
      bsc: mcb2,
    };
  } catch {
    return check(val);
  }
};
