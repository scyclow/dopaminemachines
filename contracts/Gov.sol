// ERC721 admin contract
import "hardhat/console.sol";

interface ERC721 {
  function ownerOf(uint256 tokenId) external view returns (address);
  function totalSupply() external view returns (uint256);
}

contract Gov {
  ERC721 erc721;

  address public admin;

  struct Proposal {
    bool executed;
    uint256 totalVotes;
    uint256 maxVotes;
  }

  mapping(uint256 => Proposal) public proposals;
  mapping(uint256 => mapping(uint256 => bool)) public proposalVotes;

  constructor(ERC721 _erc726) {
    erc721 = _erc726;
  }

  function hashProposal(
    address target,
    uint256 value,
    bytes memory calldata_
  ) public pure returns (uint256) {
    return uint256(keccak256(abi.encode(target, value, calldata_)));
  }


  /*
    target    - target contract
    value     - amount of ETH to send
    calldata_ - abi.encodeWithSignature("functionToCall(string,uint256)", "function signature + args", 123)
  */
  function propose(
    uint256 tokenId,
    address target,
    uint256 value,
    bytes memory calldata_
  ) public returns (uint256) {
    uint256 proposalId = hashProposal(target, value, calldata_);

    proposals[proposalId].maxVotes = erc721.totalSupply();

    castVote(proposalId, tokenId, true);

    console.log(proposalId);

    return proposalId;
  }

  function castVote(uint256 proposalId, uint256 tokenId, bool vote) public {
    require(erc721.ownerOf(tokenId) == msg.sender);
    if (proposalVotes[proposalId][tokenId] == vote) return;

    proposalVotes[proposalId][tokenId] = vote;
    if (vote) {
      proposals[proposalId].totalVotes += 1;
    } else {
      proposals[proposalId].totalVotes -= 1;
    }
  }

  function execute(
    address target,
    uint256 value,
    bytes memory calldata_
  ) public payable returns (uint256) {
    uint256 proposalId = hashProposal(target, value, calldata_);

    Proposal storage proposal = proposals[proposalId];

    require(!proposal.executed, "Proposal has already been executed");
    require(
      proposal.totalVotes >= (proposal.maxVotes/2 + 1),
      "Insufficient votes to execute proposal"
    );

    proposal.executed = true;

    (bool success, bytes memory returndata) = target.call{value: value}(calldata_);
    Address.verifyCallResult(success, returndata, "Proposal execution reverted");

    return proposalId;
  }

  function adminExecute(
    address target,
    uint256 value,
    bytes memory calldata_
  ) public payable {
    require(msg.sender == admin);
    (bool success, bytes memory returndata) = target.call{value: value}(calldata_);
    Address.verifyCallResult(success, returndata, "Proposal execution reverted");
  }

  function setAdmin(address _admin) public {
    require(address(this) == msg.sender);
    admin = _admin;
  }
}

library Address {
    // /**
    //  * @dev Tool to verifies that a low level call was successful, and revert if it wasn't, either by bubbling the
    //  * revert reason using the provided one.
    //  *
    //  * _Available since v4.3._
    //  */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}