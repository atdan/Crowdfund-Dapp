import abi from '../abis/src/contracts/CrowdFund.sol/CrowdFund.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } catch (error) {
        reportError(error)
    }
}

const reportError = (error) => {
    console.log(error.message)
    throw new Error('No Ethereum Object')
}

//This function watches out for any changes with metamask like account, network(gorlei or mainnet or ...)
const isWalletConnected = async () => {
    try {
        if (!ethereum) return alert("Please install metamask")
        const accounts = await ethereum.request({ method: 'eth_accounts'})
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

        // changes in network reloads the application
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
        })

        // checks for account change on the same network
        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
            await isWalletConnected()
        })

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        }else {
            alert('Please connect wallet')
            console.log('No accounts found')
        }
    } catch (error) {
        reportError(error)
    }
}

export {
    connectWallet,
    isWalletConnected
}