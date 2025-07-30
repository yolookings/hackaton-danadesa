// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DanaDesa {
    address public admin;
    uint public totalDana;
    
    struct Distribusi {
        string desa;
        uint jumlah;
        string keterangan;
        uint timestamp;
        address distributor;
    }
    
    Distribusi[] public riwayat;
    
    event DanaDisalurkan(
        string indexed desa, 
        uint jumlah, 
        string keterangan, 
        uint timestamp,
        address distributor
    );
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Hanya admin yang dapat melakukan distribusi");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    function salurkanDana(
        string memory desa, 
        uint jumlah, 
        string memory keterangan
    ) public onlyAdmin {
        require(bytes(desa).length > 0, "Nama desa tidak boleh kosong");
        require(jumlah > 0, "Jumlah dana harus lebih dari 0");
        require(bytes(keterangan).length > 0, "Keterangan tidak boleh kosong");
        
        totalDana += jumlah;
        
        riwayat.push(Distribusi({
            desa: desa,
            jumlah: jumlah,
            keterangan: keterangan,
            timestamp: block.timestamp,
            distributor: msg.sender
        }));
        
        emit DanaDisalurkan(desa, jumlah, keterangan, block.timestamp, msg.sender);
    }
    
    function getRiwayatDistribusi() public view returns (Distribusi[] memory) {
        return riwayat;
    }
    
    function getJumlahDistribusi() public view returns (uint) {
        return riwayat.length;
    }
    
    function getDistribusiByIndex(uint index) public view returns (
        string memory desa,
        uint jumlah,
        string memory keterangan,
        uint timestamp,
        address distributor
    ) {
        require(index < riwayat.length, "Index tidak valid");
        Distribusi memory dist = riwayat[index];
        return (dist.desa, dist.jumlah, dist.keterangan, dist.timestamp, dist.distributor);
    }
    
    function changeAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Alamat admin tidak valid");
        admin = newAdmin;
    }
}
