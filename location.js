function showBranch(evt, branchId) {

    evt.preventDefault();

    var branches = document.querySelectorAll(".branch-content");

    branches.forEach(function(branch) {
        branch.classList.remove("active");
    });

    var buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    var selectedBranch = document.getElementById(branchId);

    if (selectedBranch) {
        selectedBranch.classList.add("active");
    }

    evt.currentTarget.classList.add("active");
}