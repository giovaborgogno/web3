pragma solidity ^0.5.0;

contract Autos {

    address owner;
    uint256 precio;
    uint256[] identificadores;
    mapping(address => Auto) autos;
    struct Auto{
        uint256 identificador;
        string marca;
        uint32 caballos;
        uint32 kilometros;
    }
    modifier precioFiltro(uint256 _precio){
        require(precio == _precio);
        _;
    }

    constructor(uint256 _precio)public{
        owner = msg.sender;
        precio = _precio;

    } 

    function addAuto(uint256 _id, string memory _marca, uint32 _caballos, uint32 _kilometros)public precioFiltro(msg.value) payable{
        identificadores.push(_id);
        autos[msg.sender].identificador = _id;
        autos[msg.sender].marca = _marca;
        autos[msg.sender].caballos = _caballos;
        autos[msg.sender].kilometros = _kilometros;
    }

    function getIds()external view returns(uint256){
        return identificadores.length;
    }

    function getAuto() external view returns(string memory _marca, uint32 _caballos, uint32 _kilometros){
        _marca = autos[msg.sender].marca;
        _caballos = autos[msg.sender].caballos;
        _kilometros = autos[msg.sender].kilometros;
    }
}