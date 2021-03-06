pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

contract App {
    // Contract can have an instance variables.
    // In this example instance variable `timestamp`
    // is used to store the time of `constructor`
    // or `touch` function call.
    uint32 public timestamp;

    modifier onlyPublisher {
        // Check that message has signature (msg.pubkey() is not zero) and
        // message is signed with the owner's private key
        require(msg.pubkey() == tvm.pubkey(), 102);
        // The current smart contract agrees to buy some gas to finish the
        // current transaction. This actions required to process external
        // messages, which bring no value (hence no gas) with themselves.
        tvm.accept();
        _;
    }

    function destruct(address beneficiary) onlyPublisher external {
        selfdestruct(beneficiary);
    }

    // Contract can have a `constructor`.
    // The function that will be called when contract will be deployed to the blockchain.
    // In this example constructor adds current time to the instance variable.
    // All contracts need call `tvm.accept()` for succeeded deploy.
    constructor() onlyPublisher public {
        // Check that contract's public key is set
        require(tvm.pubkey() != 0, 101);
        timestamp = now;
    }

    function renderHelloWorld () public pure returns (string) {
        return 'helloWorld';
    }

    // Updates variable `timestamp` with current blockchain time.
    function touch() external {
        tvm.accept();
        // Update timestamp
        timestamp = now;
    }

    function send(address dest, uint128 value) onlyPublisher external view {
        require(msg.pubkey() == tvm.pubkey(), 102);
        tvm.accept();
        // It allows to make a transfer with arbitrary settings
        dest.transfer(value, true, 0);
    }
}
