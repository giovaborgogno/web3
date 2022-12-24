const UNISWAP = require('@uniswap/sdk');
const chainID = UNISWAP.ChainId.MAINNET;
// const chainID = UNISWAP.ChainId.GÖRLI;

const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI
const decimals = 18;
const DAI = new UNISWAP.Token(chainID, tokenAddress, decimals, 'DAI', 'DAI Stablecoin');

const myAddress = '';

async function trade(){
    const pair = await UNISWAP.Fetcher.fetchPairData(DAI, UNISWAP.WETH[chainID]);
    const route = new UNISWAP.Route([pair], UNISWAP.WETH[chainID]);
    const trade = new UNISWAP.Trade(route, new UNISWAP.TokenAmount(UNISWAP.WETH[chainID], 1000000000000000000), UNISWAP.TradeType.EXACT_INPUT)

    // console.log(new Date());
    // console.log(`Precio promedio de 1 ETH ${route.midPrice.toSignificant(6)} DAI($)`)
    // console.log(`Precio promedio de 1 DAI($) ${route.midPrice.invert().toSignificant(6)} ETH`)
    // console.log(`Precio ejecucion de 1 ETH ${trade.executionPrice.toSignificant(6)} DAI($)`)
    // console.log(`Precio ejecucion de 1 DAI($) ${trade.executionPrice.invert().toSignificant(6)} ETH`)

    const slippageTolerance = new UNISWAP.Percent('50', '10000'); // 0.050%
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;

    const path = [UNISWAP.WETH[chainID].address, DAI.address];
    const to = myAddress;
    const deadline = Math.floor((Date.now()/1000)/60) + 60;
    const value = trade.inputAmount.raw;
}

trade();

/* 
function swapExactETHForTokens(
    uint amountOutMin,
    address[] calldata path,
    address to,
    uint deadline
) external payable returns(uint[] memory amounts);
 */