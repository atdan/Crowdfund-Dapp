// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

contract CrowdFund {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    statsStruct public stats;
    projectStruct[] projects;

    mapping(address => projectStruct[]) projectsOf; //returns all the projects created by the address provided
    mapping(uint => backerStruct[]) backersOf; //maps the project id to all the backers of the project
    mapping (uint => bool) public projectExist; // returns true or false if a certain project exists by supplying the project id

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct statsStruct {
        uint totalProjects;
        uint totalBacking;
        uint totalDonations;
    }

    struct backerStruct {
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }

    struct projectStruct {
        uint id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint cost; // amount project expected to raise
        uint raised; // amount project raised
        uint timestamp; // time project was created
        uint expiresAt;
        uint backers;
        statusEnum status;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Owner reserved only");
        _;
    }

    event Action(uint256 id, string actionType, address indexed executor, uint256 timestamp );

    constructor (uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    function createProject(
        string memory title,
        string memory description,
        string memory imageURL,
        uint cost,
        uint expiresAt
    ) public returns (bool){
        // validations
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image URL cannot be empty");
        require(cost > 0, "Cost cannot be zero");
        // require(expiresAt > block.timestamp, "expires must be greater than block timestamp");

        projectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.imageURL = imageURL;
        project.cost = cost;
        project.timestamp = block.timestamp;
        project.expiresAt = expiresAt;

        projects.push(project);
        projectExist[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        emit Action (
            projectCount++,
            "PROJECT CREATED",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function updateProject(
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint expiresAt
    ) public returns (bool) {
        // validations
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(projectExist[id], "Project not Found");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "Image URL cannot be empty");

        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        emit Action (
            id,
            "PROJECT UPDATED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function deleteProject(uint id) public returns (bool) {
        require(projectExist[id], "Project not found");
        require(projects[id].status == statusEnum.OPEN, "Project no longer opened");
        require(msg.sender == projects[id].owner
            // || msg.sender == owner
            , "Unauthorized Entity");

        projects[id].status = statusEnum.DELETED;
        performRefund(id);

        emit Action (
            id,
            "PROJECT DELETED",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function performRefund(uint id) internal {
        for (uint i = 0; i < backersOf[id].length; i++) {
            address _owner = backersOf[id][i].owner;
            uint _contribution = backersOf[id][i].contribution;

            backersOf[id][i].refunded = true;
            backersOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _contribution);

            stats.totalBacking -= 1;
            stats.totalDonations -= _contribution;
        }
    }

    function backProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether must be greater than zero");
        require(projectExist[id], "Project not found");
        require(projects[id].status == statusEnum.OPEN, "Project no longer opened");

        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].backers += 1;

        backersOf[id].push(
            backerStruct(
                msg.sender,
                msg.value,
                block.timestamp,
                false
            )
        );

        emit Action (
            id,
            "PROJECT BACKED",
            msg.sender,
            block.timestamp
        );

        if(projects[id].raised >= projects[id].cost) {
            projects[id].status = statusEnum.APPROVED;
            balance += projects[id].raised;
            performPayout(id);
            return true;
        }

        if (block.timestamp >= projects[id].expiresAt){
            projects[id].status = statusEnum.REVERTED;
            performRefund(id);
            return true;
        }

        return true;
    }

    function payTo(address to, uint amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    } 

    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        uint tax = raised * projectTax / 100;

        projects[id].status = statusEnum.PAIDOUT;

        payTo(projects[id].owner, (raised - tax));
        payTo(owner, tax);

        balance -= projects[id].raised;

        emit Action (
            id, 
            "PROJECT PAID OUT",
            msg.sender,
            block.timestamp
        );
    }

    function requestRefund(uint id) public returns (bool) {
        require(
            projects[id].status != statusEnum.REVERTED ||
            projects[id].status != statusEnum.DELETED,
            "Project not marked as revert or delete"
        );

        projects[id].status = statusEnum.REVERTED;
        performRefund(id);
        return true;
    }

    function payoutProject(uint id) public returns (bool) {
        require(projects[id].status == statusEnum.APPROVED, "Project no longer APPROVED");
        require(projects[id].raised >= balance, "Insufficient Fund");
        require(msg.sender == projects[id].owner ||
            msg.sender == owner, "Unauthorized Entity");

        performPayout(id);
        return true;
    }

    function changeTax(uint _taxPct) public ownerOnly() {
        projectTax = _taxPct;
    }

    function getProject(uint id) public view returns (projectStruct memory){
        require(projectExist[id], "Project not found");
        return projects[id];
    }

    function getProjects() public view returns (projectStruct[] memory) {
        return projects;
    }

    function getBackers(uint id) public view returns (backerStruct[] memory) {
        return backersOf[id];
    }

}