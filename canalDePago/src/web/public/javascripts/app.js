let app = {
    web3Provider: null,
    defaultAccount: null,
    contractAddress: null,
    sign: null,


    initWeb3: async () => {
        if (ethereum) {
            web3 = new Web3(ethereum)
            try {
                await ethereum.enable()
                app.defaultAccount = await web3.eth.getAccounts()
                $('#defaultAccount').val(app.defaultAccount)
            } catch (error) {
                alert(error)
            }
        } else if (typeof web3 !== 'undefined') {
            app.web3Provider = web3.currentProvider
            web3 = new Web3(app.web3Provider)
            app.defaultAccount = await web3.eth.getAccounts()
            $('#defaultAccount').val(app.defaultAccount)
        } else {
            alert('Necesitas tener Metamask instalado.')
            return
        }
        return actualizar()
    }
}

function actualizar() {
    setInterval(async () => {
        app.defaultAccount = await web3.eth.getAccounts()
        $('#addressUsed').html(`<strong>Origen</strong>: ${app.defaultAccount}`)
        $('#defaultAccount').val(app.defaultAccount)
    }, 1000)
}

$('#sign').on('click', () => {
    const address = $('#pagadorAddress').attr('data-content')
    const hash = $('#hash').attr('data-content') 

    if (address === app.defaultAccount.toString()) {
        web3.eth.sign(hash, app.defaultAccount.toString(), (err, signature) => {
            app.sign = signature
            swal({
                title: 'FIRMA',
                text: signature,
                type: 'success',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        })
    } else {
        // alert('error bro')
        swal({
            title: 'ERROR',
            text: 'Estas tratando de firmar con una ADDRESS incorrecta',
            icon: 'error',
            type: 'error',
            confirmButtonText: 'OK'
        })
    }
})

$(() => {
    $(window).load(() => {
        app.initWeb3()
    })
})