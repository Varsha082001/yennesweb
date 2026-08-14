function showBranch(evt, branchId){

    var branches = document.querySelectorAll(".branch-content");

    branches.forEach(function(branch){
        branch.classList.remove("active");
    });

    var buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(function(btn){
        btn.classList.remove("active");
    });

    document.getElementById(branchId).classList.add("active");

    evt.currentTarget.classList.add("active");

}